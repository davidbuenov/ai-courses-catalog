import os
import shutil
import json
import sys

# --- CONFIGURACIÓN DE LOS "SABORES" (THEMES) ---
THEMES = {
    "ai": {
        "PAGE_TITLE": "AI Content Catalog",
        "HEADER_TITLE": "AI Content Catalog",
        "SUBTITLE": "Find the best courses, books, and tools to learn about Artificial Intelligence.",
        # START: New link configuration
        "REPO_URL": "https://github.com/davidbuenov/ai-courses-catalog/",
        "OTHER_CATALOG_NAME": "Unreal Engine",
        "OTHER_CATALOG_URL": "https://davidbuenov.github.io/ai-courses-catalog/dist_unreal/" 
        # END: New link configuration
    },
    "unreal": {
        "PAGE_TITLE": "Unreal Engine Content Catalog",
        "HEADER_TITLE": "Unreal Engine Content Catalog",
        "SUBTITLE": "Discover tutorials, assets, and resources for Unreal Engine development.",
        # START: New link configuration
        "REPO_URL": "https://github.com/davidbuenov/ai-courses-catalog/", 
        "OTHER_CATALOG_NAME": "AI",
        "OTHER_CATALOG_URL": "https://davidbuenov.github.io/ai-courses-catalog/dist_ai/" # URL de la web de AI
        # END: New link configuration
    }
}

def build_theme(theme_name):
    """
    Builds a specific version of the website (e.g., 'ai' or 'unreal').
    """
    if theme_name not in THEMES:
        print(f"Error: Theme '{theme_name}' not found. Available themes: {list(THEMES.keys())}")
        return

    print(f"--- Building theme: {theme_name} ---")

    config = THEMES[theme_name]
    source_app_dir = "app"
    source_data_dir = os.path.join("data", theme_name)
    output_dir = f"dist_{theme_name}"
    output_data_dir = os.path.join(output_dir, "data")

    # 1. Clean up previous build
    if os.path.exists(output_dir):
        try:
            shutil.rmtree(output_dir)
        except PermissionError:
            print(f"Warning: '{output_dir}' is currently in use. Refreshing files in place instead of removing the folder.")

    # 2. Copy the shared 'app' files (css, js)
    shutil.copytree(source_app_dir, output_dir, ignore=shutil.ignore_patterns('*.html'), dirs_exist_ok=True)

    # 3. Copy the specific data files for the theme
    if os.path.exists(output_data_dir):
        try:
            shutil.rmtree(output_data_dir)
        except PermissionError:
            print(f"Warning: '{output_data_dir}' is currently in use. Overwriting data files in place.")
    shutil.copytree(source_data_dir, output_data_dir, dirs_exist_ok=True)

    # 4. Process and personalize the index.html template
    template_path = os.path.join(source_app_dir, "index.html")
    output_html_path = os.path.join(output_dir, "index.html")

    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Replace all placeholders with theme-specific content
    html_content = html_content.replace("{{PAGE_TITLE}}", config["PAGE_TITLE"])
    html_content = html_content.replace("{{HEADER_TITLE}}", config["HEADER_TITLE"])
    html_content = html_content.replace("{{SUBTITLE}}", config["SUBTITLE"])
    # START: New placeholder replacements
    html_content = html_content.replace("{{REPO_URL}}", config["REPO_URL"])
    html_content = html_content.replace("{{OTHER_CATALOG_URL}}", config["OTHER_CATALOG_URL"])
    html_content = html_content.replace("{{OTHER_CATALOG_NAME}}", config["OTHER_CATALOG_NAME"])
    # END: New placeholder replacements

    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"--- Build for '{theme_name}' complete in '{output_dir}/' folder. ---\n")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        build_theme(sys.argv[1])
    else:
        print("Building all available themes...")
        for theme_name in THEMES:
            build_theme(theme_name)
        print("All themes built successfully.")