#!/usr/bin/env python3
"""
Script para comparar tokens por valores hexadecimales y nombres similares
Identifica tokens faltantes y tokens que necesitan actualización
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple, Set, Any
from difflib import SequenceMatcher

# Rutas
FIGMA_DIR = Path("/Users/elkinmac/Desktop/tokens")
PROJECT_TOKENS = Path("/Users/elkinmac/Desktop/Autoframe/packages/tokens/tokens.json")
OUTPUT_REPORT = Path("/Users/elkinmac/Desktop/Autoframe/COMPARACION_TOKENS_HEX.md")

def normalize_hex(hex_value: str) -> str:
    """Normalizar valor hexadecimal para comparación"""
    if not isinstance(hex_value, str):
        return ""
    
    # Remover espacios y convertir a minúsculas
    hex_value = hex_value.strip().lower()
    
    # Si es rgba, extraer solo el hex si es posible
    if hex_value.startswith('rgba'):
        # Intentar extraer valores
        match = re.search(r'rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)', hex_value)
        if match:
            r, g, b, a = match.groups()
            # Convertir a hex (ignorar alpha por ahora)
            hex_value = f"#{int(r):02x}{int(g):02x}{int(b):02x}"
    
    # Asegurar que empiece con #
    if not hex_value.startswith('#'):
        if re.match(r'^[0-9a-f]{6}$', hex_value):
            hex_value = '#' + hex_value
    
    return hex_value

def similarity(a: str, b: str) -> float:
    """Calcular similitud entre dos strings"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def extract_name_parts(name: str) -> Set[str]:
    """Extraer partes del nombre para comparación"""
    # Dividir por puntos, guiones, etc.
    parts = re.split(r'[.\-_]', name.lower())
    # Filtrar partes muy cortas
    return {p for p in parts if len(p) > 2}

def load_p_colors() -> Dict[str, str]:
    """Cargar valores base de p-colors"""
    p_colors_file = FIGMA_DIR / "p-colors" / "Mode 1.json"
    with open(p_colors_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    def extract_values(obj: Any, prefix: str = "", result: Dict[str, str] = None) -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            if '$value' in obj:
                value = obj['$value']
                if isinstance(value, str) and value.startswith('#'):
                    result[prefix] = normalize_hex(value)
            else:
                for key, val in obj.items():
                    new_prefix = f"{prefix}.{key}" if prefix else key
                    extract_values(val, new_prefix, result)
        
        return result
    
    return extract_values(data)

def resolve_figma_reference(ref: str, p_colors: Dict[str, str]) -> str:
    """Resolver referencia de Figma a valor hex"""
    if not isinstance(ref, str) or not ref.startswith('{'):
        return normalize_hex(ref)
    
    ref = ref.strip('{}')
    
    # Buscar en p_colors
    if ref in p_colors:
        return p_colors[ref]
    
    # Intentar buscar por partes
    parts = ref.split('.')
    for i in range(len(parts), 0, -1):
        partial = '.'.join(parts[-i:])
        for key, value in p_colors.items():
            if key.endswith(partial):
                return value
    
    return ref  # Retornar referencia si no se puede resolver

def extract_figma_tokens() -> Dict[str, str]:
    """Extraer todos los tokens de Figma con valores hex resueltos"""
    s_colors_light = FIGMA_DIR / "s-colors" / "Light Mode.json"
    s_colors_dark = FIGMA_DIR / "s-colors" / "Dark Mode.json"
    
    p_colors = load_p_colors()
    
    def extract_all(obj: Any, prefix: str = "", result: Dict[str, str] = None, mode: str = "") -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            if '$value' in obj:
                value = obj['$value']
                resolved = resolve_figma_reference(value, p_colors)
                if resolved.startswith('#'):
                    result[f"{mode}.{prefix}" if mode else prefix] = resolved
            else:
                for key, val in obj.items():
                    new_prefix = f"{prefix}.{key}" if prefix else key
                    extract_all(val, new_prefix, result, mode)
        
        return result
    
    tokens = {}
    
    # Light mode
    with open(s_colors_light, 'r', encoding='utf-8') as f:
        light_data = json.load(f)
        tokens.update(extract_all(light_data.get('color', {}), mode='light'))
    
    # Dark mode
    with open(s_colors_dark, 'r', encoding='utf-8') as f:
        dark_data = json.load(f)
        tokens.update(extract_all(dark_data.get('color', {}), mode='dark'))
    
    return tokens

def extract_project_tokens() -> Dict[str, str]:
    """Extraer todos los tokens del proyecto con valores hex"""
    with open(PROJECT_TOKENS, 'r', encoding='utf-8') as f:
        project = json.load(f)
    
    def flatten(obj: Any, prefix: str = "", result: Dict[str, str] = None) -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            for key, val in obj.items():
                new_prefix = f"{prefix}.{key}" if prefix else key
                flatten(val, new_prefix, result)
        elif isinstance(obj, str):
            normalized = normalize_hex(obj)
            if normalized.startswith('#'):
                result[prefix] = normalized
        
        return result
    
    tokens = {}
    tokens.update(flatten(project.get('light', {}), 'light'))
    tokens.update(flatten(project.get('dark', {}), 'dark'))
    
    return tokens

def find_matches(figma_tokens: Dict[str, str], project_tokens: Dict[str, str]) -> Tuple[List, List, List]:
    """Encontrar coincidencias por hex y nombre"""
    exact_matches = []  # Mismo hex y nombre similar
    hex_matches = []    # Mismo hex pero nombre diferente
    name_matches = []   # Nombre similar pero hex diferente
    missing = []        # Tokens de Figma sin match
    to_update = []      # Tokens que necesitan actualización
    
    # Crear índice por hex
    figma_by_hex: Dict[str, List[Tuple[str, str]]] = {}
    for name, hex_val in figma_tokens.items():
        if hex_val.startswith('#'):
            if hex_val not in figma_by_hex:
                figma_by_hex[hex_val] = []
            figma_by_hex[hex_val].append((name, hex_val))
    
    project_by_hex: Dict[str, List[Tuple[str, str]]] = {}
    for name, hex_val in project_tokens.items():
        if hex_val.startswith('#'):
            if hex_val not in project_by_hex:
                project_by_hex[hex_val] = []
            project_by_hex[hex_val].append((name, hex_val))
    
    # Buscar matches exactos (mismo hex)
    matched_figma = set()
    matched_project = set()
    
    for hex_val, figma_list in figma_by_hex.items():
        if hex_val in project_by_hex:
            for figma_name, figma_hex in figma_list:
                for project_name, project_hex in project_by_hex[hex_val]:
                    name_sim = similarity(figma_name, project_name)
                    if name_sim > 0.3:  # Al menos 30% de similitud en nombre
                        exact_matches.append((figma_name, project_name, hex_val, name_sim))
                        matched_figma.add(figma_name)
                        matched_project.add(project_name)
                    elif name_sim > 0.1:
                        hex_matches.append((figma_name, project_name, hex_val, name_sim))
                        matched_figma.add(figma_name)
                        matched_project.add(project_name)
    
    # Buscar matches por nombre (hex diferente)
    for figma_name, figma_hex in figma_tokens.items():
        if figma_name in matched_figma or not figma_hex.startswith('#'):
            continue
        
        figma_parts = extract_name_parts(figma_name)
        best_match = None
        best_sim = 0
        
        for project_name, project_hex in project_tokens.items():
            if project_name in matched_project or not project_hex.startswith('#'):
                continue
            
            project_parts = extract_name_parts(project_name)
            
            # Calcular similitud
            name_sim = similarity(figma_name, project_name)
            parts_overlap = len(figma_parts & project_parts) / max(len(figma_parts | project_parts), 1)
            combined_sim = (name_sim * 0.6 + parts_overlap * 0.4)
            
            if combined_sim > 0.4 and combined_sim > best_sim:
                best_match = (project_name, project_hex)
                best_sim = combined_sim
        
        if best_match:
            name_matches.append((figma_name, figma_hex, best_match[0], best_match[1], best_sim))
            matched_figma.add(figma_name)
            matched_project.add(best_match[0])
    
    # Tokens faltantes (en Figma pero no en proyecto)
    for figma_name, figma_hex in figma_tokens.items():
        if figma_name not in matched_figma and figma_hex.startswith('#'):
            missing.append((figma_name, figma_hex))
    
    # Tokens que necesitan actualización (mismo nombre pero hex diferente)
    to_update = name_matches
    
    return exact_matches, hex_matches, name_matches, missing, to_update

def main():
    print("=" * 80)
    print("COMPARACIÓN DE TOKENS POR VALORES HEX Y NOMBRES")
    print("=" * 80)
    
    print("\n📦 Cargando tokens...")
    figma_tokens = extract_figma_tokens()
    print(f"✅ Tokens de Figma: {len(figma_tokens)}")
    
    project_tokens = extract_project_tokens()
    print(f"✅ Tokens del Proyecto: {len(project_tokens)}")
    
    print("\n🔍 Comparando tokens...")
    exact_matches, hex_matches, name_matches, missing, to_update = find_matches(figma_tokens, project_tokens)
    
    print(f"\n📊 Resultados:")
    print(f"   ✅ Coincidencias exactas (mismo hex + nombre similar): {len(exact_matches)}")
    print(f"   🔄 Mismo hex, nombre diferente: {len(hex_matches)}")
    print(f"   ⚠️  Nombre similar, hex diferente (necesitan actualización): {len(to_update)}")
    print(f"   ➕ Tokens faltantes en proyecto: {len(missing)}")
    
    # Generar reporte
    report = []
    report.append("# 📊 Comparación de Tokens: Figma vs Proyecto (por Hex y Nombres)\n\n")
    report.append(f"**Fecha:** {Path(__file__).stat().st_mtime}\n\n")
    report.append(f"**Tokens de Figma:** {len(figma_tokens)}\n")
    report.append(f"**Tokens del Proyecto:** {len(project_tokens)}\n\n")
    
    report.append("## ✅ Coincidencias Exactas (Mismo Hex + Nombre Similar)\n\n")
    report.append(f"Total: **{len(exact_matches)}**\n\n")
    for figma_name, project_name, hex_val, sim in sorted(exact_matches, key=lambda x: x[3], reverse=True)[:50]:
        report.append(f"- `{figma_name}` ↔ `{project_name}` → `{hex_val}` (similitud: {sim:.2%})\n")
    if len(exact_matches) > 50:
        report.append(f"\n... y {len(exact_matches) - 50} más\n")
    
    report.append("\n## 🔄 Mismo Hex, Nombre Diferente\n\n")
    report.append(f"Total: **{len(hex_matches)}**\n\n")
    for figma_name, project_name, hex_val, sim in sorted(hex_matches, key=lambda x: x[3], reverse=True)[:30]:
        report.append(f"- `{figma_name}` ↔ `{project_name}` → `{hex_val}` (similitud: {sim:.2%})\n")
    if len(hex_matches) > 30:
        report.append(f"\n... y {len(hex_matches) - 30} más\n")
    
    report.append("\n## ⚠️ Tokens que Necesitan Actualización (Nombre Similar, Hex Diferente)\n\n")
    report.append(f"Total: **{len(to_update)}**\n\n")
    for figma_name, figma_hex, project_name, project_hex, sim in sorted(to_update, key=lambda x: x[4], reverse=True)[:50]:
        report.append(f"### `{figma_name}` ↔ `{project_name}`\n")
        report.append(f"- **Figma:** `{figma_hex}`\n")
        report.append(f"- **Proyecto:** `{project_hex}`\n")
        report.append(f"- **Similitud de nombre:** {sim:.2%}\n\n")
    if len(to_update) > 50:
        report.append(f"\n... y {len(to_update) - 50} más\n")
    
    report.append("\n## ➕ Tokens Faltantes en el Proyecto\n\n")
    report.append(f"Total: **{len(missing)}**\n\n")
    
    # Agrupar por categoría
    categories = {}
    for name, hex_val in missing:
        category = name.split('.')[0] if '.' in name else 'otros'
        if category not in categories:
            categories[category] = []
        categories[category].append((name, hex_val))
    
    for category in sorted(categories.keys()):
        report.append(f"### {category.upper()}\n\n")
        for name, hex_val in categories[category][:20]:
            report.append(f"- `{name}`: `{hex_val}`\n")
        if len(categories[category]) > 20:
            report.append(f"\n... y {len(categories[category]) - 20} más\n")
        report.append("\n")
    
    # Guardar reporte
    with open(OUTPUT_REPORT, 'w', encoding='utf-8') as f:
        f.write(''.join(report))
    
    print(f"\n✅ Reporte guardado en: {OUTPUT_REPORT}")

if __name__ == "__main__":
    main()

