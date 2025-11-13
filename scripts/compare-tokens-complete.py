#!/usr/bin/env python3
"""
Script completo para comparar tokens de Figma con tokens del proyecto
Resuelve referencias y genera un reporte detallado
"""

import json
from pathlib import Path
from typing import Dict, Any, List, Tuple

# Rutas
FIGMA_DIR = Path("/Users/elkinmac/Desktop/tokens")
PROJECT_TOKENS = Path("/Users/elkinmac/Desktop/Autoframe/packages/tokens/tokens.json")
OUTPUT = Path("/Users/elkinmac/Desktop/Autoframe/ANALISIS_TOKENS_COMPARACION_COMPLETA.md")

def load_figma_file(file_path: Path) -> Dict[str, Any]:
    """Cargar un archivo JSON de Figma"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def resolve_reference(ref: str, p_colors: Dict[str, Any]) -> str:
    """Resolver una referencia como {color.light.accent.brand}"""
    # Remover llaves
    ref = ref.strip('{}')
    parts = ref.split('.')
    
    # Buscar en p-colors
    current = p_colors
    for part in parts:
        if isinstance(current, dict) and part in current:
            current = current[part]
            if isinstance(current, dict) and '$value' in current:
                value = current['$value']
                # Si es otra referencia, resolver recursivamente
                if isinstance(value, str) and value.startswith('{'):
                    return resolve_reference(value, p_colors)
                return value
    
    return ref  # Retornar referencia si no se puede resolver

def extract_figma_tokens() -> Tuple[Dict[str, str], Dict[str, str]]:
    """Extraer tokens de Figma resolviendo referencias"""
    # Cargar archivos principales
    p_colors = load_figma_file(FIGMA_DIR / "p-colors" / "Mode 1.json")
    s_colors_light = load_figma_file(FIGMA_DIR / "s-colors" / "Light Mode.json")
    s_colors_dark = load_figma_file(FIGMA_DIR / "s-colors" / "Dark Mode.json")
    
    def extract_values(obj: Any, prefix: str = "", result: Dict[str, str] = None) -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            if '$value' in obj:
                value = obj['$value']
                if isinstance(value, str) and value.startswith('{'):
                    resolved = resolve_reference(value, p_colors)
                    result[prefix] = resolved
                else:
                    result[prefix] = value
            else:
                for key, val in obj.items():
                    new_prefix = f"{prefix}.{key}" if prefix else key
                    extract_values(val, new_prefix, result)
        
        return result
    
    light_tokens = extract_values(s_colors_light.get('color', {}))
    dark_tokens = extract_values(s_colors_dark.get('color', {}))
    
    return light_tokens, dark_tokens

def flatten_project_tokens(project: Dict[str, Any]) -> Tuple[Dict[str, str], Dict[str, str]]:
    """Aplanar tokens del proyecto"""
    def _flatten(obj: Any, prefix: str = "", result: Dict[str, str] = None) -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            for key, value in obj.items():
                new_key = f"{prefix}.{key}" if prefix else key
                _flatten(value, new_key, result)
        elif isinstance(obj, str):
            result[prefix] = obj
        
        return result
    
    light = _flatten(project.get('light', {}))
    dark = _flatten(project.get('dark', {}))
    
    return light, dark

def map_figma_to_project(figma_key: str) -> str:
    """Mapear clave de Figma a clave del proyecto"""
    mapping = {
        # Brand
        'color.accent.brand': 'light.brand.ubits-accent-brand',
        'brand.ubits.logo': 'light.brand.ubits-logo',
        
        # Foreground
        'color.fg.1.high': 'light.foreground.ubits-fg-1-high',
        'color.fg.1.medium': 'light.foreground.ubits-fg-1-medium',
        'color.fg.2.high': 'light.foreground.ubits-fg-2-high',
        'color.fg.2.medium': 'light.foreground.ubits-fg-2-medium',
        'color.fg.disabled': 'light.foreground.ubits-fg-disabled',
        'color.fg.on-disabled': 'light.foreground.ubits-fg-on-disabled',
        'color.fg.bold': 'light.foreground.ubits-fg-bold',
        
        # Background
        'color.bg.1': 'light.background.ubits-bg-1',
        'color.bg.2': 'light.background.ubits-bg-2',
        'color.bg.3': 'light.background.ubits-bg-3',
        'color.bg.4': 'light.background.ubits-bg-4',
        'color.bg.5': 'light.background.ubits-bg-5',
        'color.bg.active': 'light.background.ubits-bg-active',
        'color.bg.disabled': 'light.background.ubits-bg-disabled',
        'color.bg.dim': 'light.background.ubits-bg-dim',
        
        # Border
        'color.border.1': 'light.borders.ubits-border-1',
        'color.border.2': 'light.bordersMain.ubits-border-2',
        'color.border.disabled': 'light.bordersMain.ubits-border-disabled',
        
        # Feedback
        'color.feedback.accent.success': 'light.feedback.ubits-feedback-accent-success',
    }
    
    return mapping.get(figma_key, '')

def normalize_value(value: str) -> str:
    """Normalizar valor para comparación"""
    if isinstance(value, str):
        return value.lower().strip()
    return str(value).lower().strip()

def compare_tokens(figma_light: Dict[str, str], project_light: Dict[str, str]) -> Tuple[List[str], List[Tuple[str, str, str]], List[str]]:
    """Comparar tokens"""
    synced = []
    different = []
    missing = []
    
    for figma_key, figma_value in figma_light.items():
        project_key = map_figma_to_project(figma_key)
        
        if project_key and project_key in project_light:
            project_value = project_light[project_key]
            if normalize_value(figma_value) == normalize_value(project_value):
                synced.append((figma_key, project_key))
            else:
                different.append((figma_key, figma_value, project_key, project_value))
        elif not project_key:
            missing.append(figma_key)
    
    return synced, different, missing

def main():
    print("=" * 80)
    print("COMPARACIÓN COMPLETA DE TOKENS: FIGMA vs PROYECTO")
    print("=" * 80)
    
    # Cargar tokens
    print("\n📦 Cargando tokens...")
    with open(PROJECT_TOKENS, 'r', encoding='utf-8') as f:
        project = json.load(f)
    
    project_light, project_dark = flatten_project_tokens(project)
    print(f"✅ Proyecto Light: {len(project_light)} tokens")
    print(f"✅ Proyecto Dark: {len(project_dark)} tokens")
    
    figma_light, figma_dark = extract_figma_tokens()
    print(f"✅ Figma Light: {len(figma_light)} tokens")
    print(f"✅ Figma Dark: {len(figma_dark)} tokens")
    
    # Comparar
    print("\n🔍 Comparando tokens...")
    synced, different, missing = compare_tokens(figma_light, project_light)
    
    # Generar reporte
    report = []
    report.append("# 📊 Análisis Completo: Comparación de Tokens Figma vs Proyecto\n\n")
    report.append(f"**Tokens del Proyecto (Light):** {len(project_light)}\n")
    report.append(f"**Tokens de Figma (Light):** {len(figma_light)}\n\n")
    
    report.append("## ✅ Tokens Sincronizados\n\n")
    report.append(f"Total: **{len(synced)}**\n\n")
    for figma_key, project_key in synced[:30]:
        report.append(f"- `{figma_key}` → `{project_key}`\n")
    if len(synced) > 30:
        report.append(f"\n... y {len(synced) - 30} más\n")
    
    report.append("\n## 🔄 Tokens con Valores Diferentes\n\n")
    report.append(f"Total: **{len(different)}**\n\n")
    for figma_key, figma_val, project_key, project_val in different[:50]:
        report.append(f"### `{figma_key}` → `{project_key}`\n")
        report.append(f"- **Figma:** `{figma_val}`\n")
        report.append(f"- **Proyecto:** `{project_val}`\n\n")
    if len(different) > 50:
        report.append(f"\n... y {len(different) - 50} más\n")
    
    report.append("\n## ➕ Tokens en Figma sin Mapeo en el Proyecto\n\n")
    report.append(f"Total: **{len(missing)}**\n\n")
    for token in missing[:100]:
        report.append(f"- `{token}`\n")
    if len(missing) > 100:
        report.append(f"\n... y {len(missing) - 100} más\n")
    
    # Guardar reporte
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write(''.join(report))
    
    print(f"\n✅ Reporte guardado en: {OUTPUT}")
    print(f"\n📊 Resumen:")
    print(f"   - ✅ Sincronizados: {len(synced)}")
    print(f"   - 🔄 Diferentes: {len(different)}")
    print(f"   - ➕ Sin mapeo: {len(missing)}")

if __name__ == "__main__":
    main()

