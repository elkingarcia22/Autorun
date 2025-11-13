#!/usr/bin/env python3
"""
Script detallado para comparar tokens de Figma con tokens del proyecto
Resuelve referencias y compara valores directamente
"""

import json
import os
import re
from pathlib import Path
from typing import Dict, Any, List, Tuple, Optional

# Rutas
FIGMA_TOKENS_DIR = Path("/Users/elkinmac/Desktop/tokens")
PROJECT_TOKENS_PATH = Path("/Users/elkinmac/Desktop/Autoframe/packages/tokens/tokens.json")
OUTPUT_REPORT = Path("/Users/elkinmac/Desktop/Autoframe/ANALISIS_TOKENS_COMPARACION_DETALLADA.md")

def load_all_figma_tokens() -> Dict[str, Any]:
    """Cargar todos los tokens de Figma"""
    all_tokens = {}
    
    for json_file in FIGMA_TOKENS_DIR.rglob("*.json"):
        if json_file.name.startswith("$"):
            continue
        
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                rel_path = str(json_file.relative_to(FIGMA_TOKENS_DIR))
                all_tokens[rel_path] = data
        except Exception as e:
            print(f"⚠️  Error cargando {json_file}: {e}")
    
    return all_tokens

def resolve_token_reference(ref: str, all_tokens: Dict[str, Any]) -> Optional[str]:
    """Resolver una referencia como {color.light.accent.brand}"""
    # Remover llaves
    ref = ref.strip('{}')
    
    # Buscar en todos los archivos
    parts = ref.split('.')
    
    # Buscar en s-colors primero (semantic colors)
    for file_path, data in all_tokens.items():
        if 's-colors' in file_path or 'p-colors' in file_path:
            value = get_nested_value(data, parts)
            if value and isinstance(value, dict) and '$value' in value:
                val = value['$value']
                # Si es otra referencia, resolver recursivamente
                if isinstance(val, str) and val.startswith('{'):
                    return resolve_token_reference(val, all_tokens)
                return val
    
    return None

def get_nested_value(obj: Any, path: List[str]) -> Any:
    """Obtener valor anidado de un objeto"""
    current = obj
    for part in path:
        if isinstance(current, dict) and part in current:
            current = current[part]
        else:
            return None
    return current

def extract_figma_colors_flat(all_tokens: Dict[str, Any]) -> Dict[str, str]:
    """Extraer todos los colores de Figma en formato plano"""
    colors = {}
    
    def _extract(obj: Any, prefix: str = "", file_path: str = ""):
        if isinstance(obj, dict):
            if '$value' in obj:
                value = obj['$value']
                # Resolver referencias
                if isinstance(value, str) and value.startswith('{'):
                    resolved = resolve_token_reference(value, all_tokens)
                    if resolved:
                        colors[prefix] = resolved
                    else:
                        colors[prefix] = value  # Guardar referencia si no se puede resolver
                else:
                    colors[prefix] = value
            else:
                for key, val in obj.items():
                    new_prefix = f"{prefix}.{key}" if prefix else key
                    _extract(val, new_prefix, file_path)
    
    # Procesar s-colors (semantic colors) - Light Mode y Dark Mode
    for file_path, data in all_tokens.items():
        if 's-colors' in file_path:
            mode = 'light' if 'Light' in file_path else 'dark'
            _extract(data, f"figma.{mode}", file_path)
    
    return colors

def flatten_project_tokens(project_tokens: Dict[str, Any]) -> Dict[str, str]:
    """Aplanar tokens del proyecto"""
    flat = {}
    
    def _flatten(obj: Any, prefix: str = ""):
        if isinstance(obj, dict):
            for key, value in obj.items():
                new_key = f"{prefix}.{key}" if prefix else key
                _flatten(value, new_key)
        elif isinstance(obj, str):
            flat[prefix] = obj
    
    for mode in ['light', 'dark']:
        if mode in project_tokens:
            _flatten(project_tokens[mode], mode)
    
    return flat

def map_figma_to_project_name(figma_key: str) -> str:
    """Mapear nombre de Figma a nombre del proyecto"""
    # Ejemplo: figma.light.color.accent.brand -> light.brand.ubits-accent-brand
    # Por ahora, retornar el key tal cual para comparación manual
    return figma_key

def normalize_color_value(value: str) -> str:
    """Normalizar valor de color para comparación"""
    if isinstance(value, str):
        return value.lower().strip()
    return str(value).lower().strip()

def compare_tokens(figma_colors: Dict[str, str], project_tokens: Dict[str, str]) -> Tuple[List[str], List[Tuple[str, str, str]], List[str]]:
    """Comparar tokens y retornar: faltantes, diferentes, sincronizados"""
    missing = []
    different = []
    synced = []
    
    # Mapeo aproximado de nombres
    name_mapping = {
        # Brand
        'figma.light.color.accent.brand': 'light.brand.ubits-accent-brand',
        'figma.dark.color.accent.brand': 'dark.brand.ubits-accent-brand',
        # Foreground
        'figma.light.color.fg.1.high': 'light.foreground.ubits-fg-1-high',
        'figma.light.color.fg.1.medium': 'light.foreground.ubits-fg-1-medium',
        'figma.light.color.fg.2.high': 'light.foreground.ubits-fg-2-high',
        'figma.light.color.fg.2.medium': 'light.foreground.ubits-fg-2-medium',
        # Background
        'figma.light.color.bg.1': 'light.background.ubits-bg-1',
        'figma.light.color.bg.2': 'light.background.ubits-bg-2',
        'figma.light.color.bg.3': 'light.background.ubits-bg-3',
        'figma.light.color.bg.4': 'light.background.ubits-bg-4',
        'figma.light.color.bg.5': 'light.background.ubits-bg-5',
        # Border
        'figma.light.color.border.1': 'light.borders.ubits-border-1',
        'figma.light.color.border.2': 'light.bordersMain.ubits-border-2',
    }
    
    # Comparar tokens conocidos
    for figma_key, figma_value in figma_colors.items():
        # Buscar mapeo
        project_key = None
        for fk, pk in name_mapping.items():
            if fk in figma_key:
                project_key = pk
                break
        
        if project_key and project_key in project_tokens:
            project_value = project_tokens[project_key]
            if normalize_color_value(figma_value) != normalize_color_value(project_value):
                different.append((figma_key, figma_value, project_value))
            else:
                synced.append(figma_key)
        elif not project_key:
            # Token de Figma sin mapeo conocido
            missing.append(figma_key)
    
    return missing, different, synced

def main():
    print("=" * 80)
    print("COMPARACIÓN DETALLADA DE TOKENS: FIGMA vs PROYECTO")
    print("=" * 80)
    
    # Cargar tokens
    print("\n📦 Cargando tokens...")
    with open(PROJECT_TOKENS_PATH, 'r', encoding='utf-8') as f:
        project_tokens_raw = json.load(f)
    
    project_flat = flatten_project_tokens(project_tokens_raw)
    print(f"✅ Tokens del proyecto: {len(project_flat)} tokens")
    
    all_figma_tokens = load_all_figma_tokens()
    print(f"✅ Archivos de Figma: {len(all_figma_tokens)} archivos")
    
    figma_colors = extract_figma_colors_flat(all_figma_tokens)
    print(f"✅ Colores de Figma extraídos: {len(figma_colors)} tokens")
    
    # Comparar
    print("\n🔍 Comparando tokens...")
    missing, different, synced = compare_tokens(figma_colors, project_flat)
    
    # Generar reporte
    report = []
    report.append("# 📊 Análisis Detallado: Comparación de Tokens Figma vs Proyecto\n")
    report.append(f"**Fecha:** {Path(__file__).stat().st_mtime}\n")
    report.append(f"**Tokens del Proyecto:** {len(project_flat)}\n")
    report.append(f"**Tokens de Figma:** {len(figma_colors)}\n")
    
    report.append("\n## ✅ Tokens Sincronizados\n")
    report.append(f"Total: {len(synced)}\n")
    for token in synced[:20]:  # Mostrar primeros 20
        report.append(f"- `{token}`\n")
    if len(synced) > 20:
        report.append(f"\n... y {len(synced) - 20} más\n")
    
    report.append("\n## 🔄 Tokens con Valores Diferentes\n")
    report.append(f"Total: {len(different)}\n")
    for figma_key, figma_val, project_val in different[:30]:
        report.append(f"### `{figma_key}`\n")
        report.append(f"- **Figma:** `{figma_val}`\n")
        report.append(f"- **Proyecto:** `{project_val}`\n\n")
    if len(different) > 30:
        report.append(f"\n... y {len(different) - 30} más\n")
    
    report.append("\n## ➕ Tokens en Figma sin Mapeo\n")
    report.append(f"Total: {len(missing)}\n")
    for token in missing[:50]:
        report.append(f"- `{token}`\n")
    if len(missing) > 50:
        report.append(f"\n... y {len(missing) - 50} más\n")
    
    # Guardar reporte
    with open(OUTPUT_REPORT, 'w', encoding='utf-8') as f:
        f.write(''.join(report))
    
    print(f"\n✅ Reporte guardado en: {OUTPUT_REPORT}")
    print(f"\n📊 Resumen:")
    print(f"   - ✅ Sincronizados: {len(synced)}")
    print(f"   - 🔄 Diferentes: {len(different)}")
    print(f"   - ➕ Sin mapeo: {len(missing)}")

if __name__ == "__main__":
    main()

