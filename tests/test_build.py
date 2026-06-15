# =============================================================================
# Multi-Catalog Project: AI & Unreal Engine — Shared core codebase generating separate AI Content and Unreal Engine Content Catalogs
# Copyright (c) 2026 David Bueno Vallejo · https://davidbuenov.com
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

import os
import unittest
import shutil
import build

class TestBuildScript(unittest.TestCase):
    def setUp(self):
        # We ensure build runs for both themes before we run assertion tests
        self.themes = ["ai", "unreal"]
        self.dist_folders = [f"dist_{theme}" for theme in self.themes]

    def test_compilation_generates_files(self):
        """Test that running the build script generates the output folders and files."""
        # Execute build
        for theme in self.themes:
            build.build_theme(theme)

        # Check directories exist
        for folder in self.dist_folders:
            self.assertTrue(os.path.exists(folder), f"Output folder {folder} does not exist.")
            self.assertTrue(os.path.isdir(folder), f"{folder} is not a directory.")

            # Check for core files
            self.assertTrue(os.path.exists(os.path.join(folder, "index.html")), f"index.html missing in {folder}")
            self.assertTrue(os.path.exists(os.path.join(folder, "css", "style.css")), f"style.css missing in {folder}")
            self.assertTrue(os.path.exists(os.path.join(folder, "js", "script.js")), f"script.js missing in {folder}")
            self.assertTrue(os.path.exists(os.path.join(folder, "data", "courses.json")), f"courses.json missing in {folder}")

    def test_placeholder_replacement(self):
        """Test that HTML placeholders are replaced with theme-specific configurations."""
        # Execute build
        for theme in self.themes:
            build.build_theme(theme)

        # Verify AI index.html title
        ai_index_path = os.path.join("dist_ai", "index.html")
        with open(ai_index_path, "r", encoding="utf-8") as f:
            ai_content = f.read()
            self.assertIn("<title>AI Content Catalog</title>", ai_content)
            self.assertIn('id="logo-title">AI Content Catalog</span>', ai_content)
            self.assertNotIn("{{PAGE_TITLE}}", ai_content)
            self.assertNotIn("{{HEADER_TITLE}}", ai_content)

        # Verify Unreal index.html title
        unreal_index_path = os.path.join("dist_unreal", "index.html")
        with open(unreal_index_path, "r", encoding="utf-8") as f:
            unreal_content = f.read()
            self.assertIn("<title>Unreal Engine Content Catalog</title>", unreal_content)
            self.assertIn('id="logo-title">Unreal Engine Content Catalog</span>', unreal_content)
            self.assertNotIn("{{PAGE_TITLE}}", unreal_content)
            self.assertNotIn("{{HEADER_TITLE}}", unreal_content)

if __name__ == "__main__":
    unittest.main()
