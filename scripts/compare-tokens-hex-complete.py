#!/usr/bin/env python3
"""
Script para comparar tokens por valores hexadecimales y nombres similares
Identifica tokens faltantes y tokens que necesitan actualización
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple, Set
from difflib import SequenceMatcher

# Rutas
FIGMA_DIR = Path("/Users/elkinmac/Desktop/tokens")
PROJECT_TOKENS = Path("/Users/elkinmac/Desktop/Autoframe/packages/tokens/tokens.json")
OUTPUT_REPORT = Path("/Users/elkinmac/Desktop/Autoframe/ANALISIS_TOKENS_HEX_COMPARACION.md")

def load_json(file_path: Path) -> Dict:
    """Cargar archivo JSON"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def resolve_reference(ref: str, p_colors: Dict, max_depth: int = 10) -> str:
    """Resolver referencia recursivamente"""
    if not isinstance(ref, str) or not ref.startswith('{'):
        return ref
    
    if max_depth <= 0:
        return ref
    
    ref_clean = ref.strip('{}')
    parts = ref_clean.split('.')
    
    # Buscar en p-colors
    current = p_colors
    for part in parts:
        if isinstance(current, dict) and part in current:
            current = current[part]
            if isinstance(current, dict) and '$value' in current:
                value = current['$value']
                if isinstance(value, str) and value.startswith('{'):
                    return resolve_reference(value, p_colors, max_depth - 1)
                return value
    
    return ref

def extract_hex_value(value: str) -> str:
    """Extraer valor hexadecimal de un string"""
    if not isinstance(value, str):
        return ""
    
    # Buscar patrones hex (#RRGGBB, #RRGGBBAA, rgba(...))
    hex_match = re.search(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})', value)
    if hex_match:
        return hex_match.group(0).upper()
    
    # Buscar rgba y convertir a hex si es posible
    rgba_match = re.search(r'rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)', value)
    if rgba_match:
        r, g, b = map(int, rgba_match.groups()[:3])
        return f"#{r:02X}{g:02X}{b:02X}"
    
    return ""

def normalize_hex(hex_val: str) -> str:
    """Normalizar hex a formato estándar"""
    if not hex_val:
        return ""
    hex_val = hex_val.upper().strip()
    if hex_val.startswith('#'):
        return hex_val
    return f"#{hex_val}"

def extract_figma_tokens() -> Dict[str, str]:
    """Extraer todos los tokens de Figma con sus valores hex"""
    p_colors = load_json(FIGMA_DIR / "p-colors" / "Mode 1.json")
    s_colors_light = load_json(FIGMA_DIR / "s-colors" / "Light Mode.json")
    s_colors_dark = load_json(FIGMA_DIR / "s-colors" / "Dark Mode.json")
    
    def extract_all(obj: Dict, prefix: str = "", result: Dict[str, str] = None) -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            if '$value' in obj:
                value = obj['$value']
                resolved = resolve_reference(value, p_colors)
                hex_val = extract_hex_value(resolved)
                if hex_val:
                    result[prefix] = normalize_hex(hex_val)
            else:
                for key, val in obj.items():
                    new_prefix = f"{prefix}.{key}" if prefix else key
                    extract_all(val, new_prefix, result)
        
        return result
    
    light_tokens = extract_all(s_colors_light.get('color', {}), "light")
    dark_tokens = extract_all(s_colors_dark.get('color', {}), "dark")
    
    # Combinar
    all_tokens = {}
    all_tokens.update(light_tokens)
    all_tokens.update(dark_tokens)
    
    return all_tokens

def extract_project_tokens() -> Dict[str, str]:
    """Extraer todos los tokens del proyecto con sus valores hex"""
    project = load_json(PROJECT_TOKENS)
    
    def flatten(obj: Dict, prefix: str = "", result: Dict[str, str] = None) -> Dict[str, str]:
        if result is None:
            result = {}
        
        if isinstance(obj, dict):
            for key, val in obj.items():
                new_prefix = f"{prefix}.{key}" if prefix else key
                flatten(val, new_prefix, result)
        elif isinstance(obj, str):
            hex_val = extract_hex_value(obj)
            if hex_val:
                result[prefix] = normalize_hex(hex_val)
        
        return result
    
    light = flatten(project.get('light', {}), "light")
    dark = flatten(project.get('dark', {}), "dark")
    
    all_tokens = {}
    all_tokens.update(light)
    all_tokens.update(dark)
    
    return all_tokens

def normalize_name(name: str) -> str:
    """Normalizar nombre para comparación"""
    # Remover prefijos comunes
    name = name.lower()
    name = re.sub(r'^(light|dark)\.', '', name)
    name = re.sub(r'^ubits-', '', name)
    name = re.sub(r'^color\.', '', name)
    # Remover guiones y puntos
    name = re.sub(r'[-_.]', '', name)
    return name

def name_similarity(name1: str, name2: str) -> float:
    """Calcular similitud entre dos nombres"""
    norm1 = normalize_name(name1)
    norm2 = normalize_name(name2)
    return SequenceMatcher(None, norm1, norm2).ratio()

def find_similar_names(figma_name: str, project_names: List[str], threshold: float = 0.5) -> List[Tuple[str, float]]:
    """Encontrar nombres similares en el proyecto"""
    similar = []
    for proj_name in project_names:
        similarity = name_similarity(figma_name, proj_name)
        if similarity >= threshold:
            similar.append((proj_name, similarity))
    return sorted(similar, key=lambda x: x[1], reverse=True)

def compare_tokens(figma_tokens: Dict[str, str], project_tokens: Dict[str, str]) -> Dict:
    """Comparar tokens y generar análisis"""
    figma_hex_to_names: Dict[str, List[str]] = {}
    project_hex_to_names: Dict[str, List[str]] = {}
    
    # Agrupar por hex
    for name, hex_val in figma_tokens.items():
        if hex_val:
            if hex_val not in figma_hex_to_names:
                figma_hex_to_names[hex_val] = []
            figma_hex_to_names[hex_val].append(name)
    
    for name, hex_val in project_tokens.items():
        if hex_val:
            if hex_val not in project_hex_to_names:
                project_hex_to_names[hex_val] = []
            project_hex_to_names[hex_val].append(name)
    
    # Encontrar coincidencias exactas por hex
    exact_matches: List[Tuple[str, List[str], List[str]]] = []
    for hex_val in figma_hex_to_names:
        if hex_val in project_hex_to_names:
            exact_matches.append((hex_val, figma_hex_to_names[hex_val], project_hex_to_names[hex_val]))
    
    # Encontrar tokens de Figma que no están en el proyecto
    missing_hex: List[Tuple[str, List[str]]] = []
    for hex_val, names in figma_hex_to_names.items():
        if hex_val not in project_hex_to_names:
            missing_hex.append((hex_val, names))
    
    # Encontrar tokens del proyecto que no están en Figma
    extra_hex: List[Tuple[str, List[str]]] = []
    for hex_val, names in project_hex_to_names.items():
        if hex_val not in figma_hex_to_names:
            extra_hex.append((hex_val, names))
    
    # Encontrar tokens con nombres similares pero hex diferentes (posibles actualizaciones)
    updates_needed: List[Dict] = []
    figma_names = list(figma_tokens.keys())
    project_names = list(project_tokens.keys())
    
    for figma_name, figma_hex in figma_tokens.items():
        if not figma_hex:
            continue
        
        similar = find_similar_names(figma_name, project_names, threshold=0.4)
        for proj_name, similarity in similar[:3]:  # Top 3 más similares
            proj_hex = project_tokens.get(proj_name, "")
            if proj_hex and proj_hex != figma_hex:
                updates_needed.append({
                    'figma_name': figma_name,
                    'figma_hex': figma_hex,
                    'project_name': proj_name,
                    'project_hex': proj_hex,
                    'similarity': similarity
                })
    
    return {
        'exact_matches': exact_matches,
        'missing_hex': missing_hex,
        'extra_hex': extra_hex,
        'updates_needed': updates_needed
    }

def generate_report(analysis: Dict, figma_tokens: Dict[str, str], project_tokens: Dict[str, str]) -> str:
    """Generar reporte en Markdown"""
    report = []
    report.append("# 📊 Análisis de Tokens: Comparación por Valores Hexadecimales\n\n")
    report.append(f"**Fecha de análisis:** {Path(__file__).stat().st_mtime}\n\n")
    report.append(f"**Tokens de Figma:** {len(figma_tokens)}\n")
    report.append(f"**Tokens del Proyecto:** {len(project_tokens)}\n\n")
    
    # Resumen
    report.append("## 📋 Resumen Ejecutivo\n\n")
    report.append(f"- ✅ **Coincidencias exactas (mismo hex):** {len(analysis['exact_matches'])}\n")
    report.append(f"- ➕ **Tokens de Figma faltantes en proyecto:** {len(analysis['missing_hex'])}\n")
    report.append(f"- 🔄 **Tokens que necesitan actualización:** {len(analysis['updates_needed'])}\n")
    report.append(f"- ➖ **Tokens del proyecto no encontrados en Figma:** {len(analysis['extra_hex'])}\n\n")
    
    # Coincidencias exactas
    report.append("## ✅ Coincidencias Exactas (Mismo Hex)\n\n")
    report.append(f"Total: **{len(analysis['exact_matches'])}** valores hex únicos\n\n")
    for hex_val, figma_names, proj_names in analysis['exact_matches'][:30]:
        report.append(f"### `{hex_val}`\n\n")
        report.append(f"**Figma:** {', '.join(figma_names[:3])}\n")
        if len(figma_names) > 3:
            report.append(f"  ... y {len(figma_names) - 3} más\n")
        report.append(f"**Proyecto:** {', '.join(proj_names[:3])}\n")
        if len(proj_names) > 3:
            report.append(f"  ... y {len(proj_names) - 3} más\n")
        report.append("\n")
    if len(analysis['exact_matches']) > 30:
        report.append(f"\n... y {len(analysis['exact_matches']) - 30} coincidencias más\n\n")
    
    # Tokens faltantes
    report.append("## ➕ Tokens de Figma Faltantes en el Proyecto\n\n")
    report.append(f"Total: **{len(analysis['missing_hex'])}** valores hex únicos\n\n")
    for hex_val, names in analysis['missing_hex'][:50]:
        report.append(f"### `{hex_val}`\n\n")
        report.append(f"**Tokens de Figma:**\n")
        for name in names[:10]:
            report.append(f"- `{name}`\n")
        if len(names) > 10:
            report.append(f"  ... y {len(names) - 10} más\n")
        report.append("\n")
    if len(analysis['missing_hex']) > 50:
        report.append(f"\n... y {len(analysis['missing_hex']) - 50} valores hex más\n\n")
    
    # Actualizaciones necesarias
    report.append("## 🔄 Tokens que Necesitan Actualización\n\n")
    report.append(f"Total: **{len(analysis['updates_needed'])}** tokens con nombres similares pero hex diferentes\n\n")
    report.append("Estos tokens tienen nombres similares pero valores hex diferentes. Revisar si necesitan actualización:\n\n")
    
    # Agrupar por similitud
    high_similarity = [u for u in analysis['updates_needed'] if u['similarity'] >= 0.7]
    medium_similarity = [u for u in analysis['updates_needed'] if 0.5 <= u['similarity'] < 0.7]
    low_similarity = [u for u in analysis['updates_needed'] if u['similarity'] < 0.5]
    
    if high_similarity:
        report.append("### 🔴 Alta Similitud (≥70%)\n\n")
        for update in high_similarity[:30]:
            report.append(f"**Figma:** `{update['figma_name']}` = `{update['figma_hex']}`\n")
            report.append(f"**Proyecto:** `{update['project_name']}` = `{update['project_hex']}`\n")
            report.append(f"**Similitud:** {update['similarity']:.1%}\n\n")
        if len(high_similarity) > 30:
            report.append(f"... y {len(high_similarity) - 30} más\n\n")
    
    if medium_similarity:
        report.append("### 🟡 Media Similitud (50-70%)\n\n")
        for update in medium_similarity[:20]:
            report.append(f"**Figma:** `{update['figma_name']}` = `{update['figma_hex']}`\n")
            report.append(f"**Proyecto:** `{update['project_name']}` = `{update['project_hex']}`\n")
            report.append(f"**Similitud:** {update['similarity']:.1%}\n\n")
        if len(medium_similarity) > 20:
            report.append(f"... y {len(medium_similarity) - 20} más\n\n")
    
    # Tokens extra del proyecto
    report.append("## ➖ Tokens del Proyecto no Encontrados en Figma\n\n")
    report.append(f"Total: **{len(analysis['extra_hex'])}** valores hex únicos\n\n")
    report.append("Estos tokens existen en el proyecto pero no se encontraron en Figma:\n\n")
    for hex_val, names in analysis['extra_hex'][:30]:
        report.append(f"### `{hex_val}`\n\n")
        for name in names[:5]:
            report.append(f"- `{name}`\n")
        if len(names) > 5:
            report.append(f"  ... y {len(names) - 5} más\n")
        report.append("\n")
    if len(analysis['extra_hex']) > 30:
        report.append(f"\n... y {len(analysis['extra_hex']) - 30} valores hex más\n\n")
    
    return ''.join(report)

def main():
    print("=" * 80)
    print("COMPARACIÓN DE TOKENS POR VALORES HEXADECIMALES")
    print("=" * 80)
    
    # Extraer tokens
    print("\n📦 Extrayendo tokens de Figma...")
    figma_tokens = extract_figma_tokens()
    print(f"✅ Tokens de Figma extraídos: {len(figma_tokens)}")
    
    print("\n📦 Extrayendo tokens del proyecto...")
    project_tokens = extract_project_tokens()
    print(f"✅ Tokens del proyecto extraídos: {len(project_tokens)}")
    
    # Comparar
    print("\n🔍 Comparando tokens...")
    analysis = compare_tokens(figma_tokens, project_tokens)
    
    # Generar reporte
    print("\n📝 Generando reporte...")
    report = generate_report(analysis, figma_tokens, project_tokens)
    
    # Guardar
    with open(OUTPUT_REPORT, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\n✅ Reporte guardado en: {OUTPUT_REPORT}")
    print(f"\n📊 Resumen:")
    print(f"   - ✅ Coincidencias exactas: {len(analysis['exact_matches'])}")
    print(f"   - ➕ Tokens faltantes: {len(analysis['missing_hex'])}")
    print(f"   - 🔄 Necesitan actualización: {len(analysis['updates_needed'])}")
    print(f"   - ➖ Tokens extra: {len(analysis['extra_hex'])}")

if __name__ == "__main__":
    main()

