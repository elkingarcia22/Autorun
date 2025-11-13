#!/usr/bin/env python3
"""
Script para comparar tokens de Figma con tokens del proyecto
Lee todos los archivos JSON de la carpeta tokens de Figma y los compara con el proyecto
"""

import json
import os
import re
from pathlib import Path
from typing import Dict, Any, List, Tuple

# Rutas
FIGMA_TOKENS_DIR = Path("/Users/elkinmac/Desktop/tokens")
PROJECT_TOKENS_PATH = Path("/Users/elkinmac/Desktop/Autoframe/packages/tokens/tokens.json")

def load_figma_tokens() -> Dict[str, Any]:
    """Cargar todos los tokens de Figma desde la carpeta"""
    tokens = {}
    
    # Cargar archivos principales
    for json_file in FIGMA_TOKENS_DIR.rglob("*.json"):
        if json_file.name.startswith("$"):
            continue
        
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Usar ruta relativa como clave
                rel_path = str(json_file.relative_to(FIGMA_TOKENS_DIR))
                tokens[rel_path] = data
        except Exception as e:
            print(f"⚠️  Error cargando {json_file}: {e}")
    
    return tokens

def resolve_references(tokens: Dict[str, Any], path: str = "") -> Dict[str, Any]:
    """Resolver referencias como {color.light.accent.brand}"""
    # Por ahora, retornar los tokens tal cual
    # La resolución completa requeriría entender toda la estructura
    return tokens

def flatten_project_tokens(project_tokens: Dict[str, Any]) -> Dict[str, str]:
    """Aplanar tokens del proyecto a formato clave-valor"""
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
            _flatten(project_tokens[mode], f"{mode}")
    
    return flat

def extract_figma_color_values(figma_tokens: Dict[str, Any]) -> Dict[str, str]:
    """Extraer valores de color de los tokens de Figma"""
    colors = {}
    
    # Buscar en s-colors (semantic colors)
    for file_path, data in figma_tokens.items():
        if 's-colors' in file_path:
            # Procesar estructura de colores
            def _extract_colors(obj: Any, prefix: str = ""):
                if isinstance(obj, dict):
                    if '$value' in obj:
                        value = obj.get('$value', '')
                        # Si es una referencia, intentar resolverla
                        if isinstance(value, str) and value.startswith('{'):
                            # Por ahora, guardar la referencia
                            colors[prefix] = value
                        else:
                            colors[prefix] = value
                    else:
                        for key, val in obj.items():
                            new_prefix = f"{prefix}.{key}" if prefix else key
                            _extract_colors(val, new_prefix)
            
            _extract_colors(data, file_path.replace('.json', ''))
    
    return colors

def main():
    print("=" * 80)
    print("COMPARACIÓN DE TOKENS: FIGMA vs PROYECTO")
    print("=" * 80)
    
    # Cargar tokens del proyecto
    print("\n📦 Cargando tokens del proyecto...")
    with open(PROJECT_TOKENS_PATH, 'r', encoding='utf-8') as f:
        project_tokens = json.load(f)
    
    project_flat = flatten_project_tokens(project_tokens)
    print(f"✅ Tokens del proyecto cargados: {len(project_flat)} tokens")
    
    # Cargar tokens de Figma
    print("\n📦 Cargando tokens de Figma...")
    figma_tokens = load_figma_tokens()
    print(f"✅ Archivos de Figma cargados: {len(figma_tokens)} archivos")
    
    # Extraer colores de Figma
    figma_colors = extract_figma_color_values(figma_tokens)
    print(f"✅ Colores extraídos de Figma: {len(figma_colors)} tokens")
    
    # Mostrar estructura
    print("\n📋 Archivos de Figma encontrados:")
    for file_path in sorted(figma_tokens.keys()):
        print(f"   - {file_path}")
    
    print("\n📋 Estructura de tokens del proyecto:")
    categories = {}
    for key in project_flat.keys():
        parts = key.split('.')
        if len(parts) > 1:
            cat = parts[1]
            if cat not in categories:
                categories[cat] = 0
            categories[cat] += 1
    
    for cat, count in sorted(categories.items()):
        print(f"   - {cat}: {count} tokens")

if __name__ == "__main__":
    main()
