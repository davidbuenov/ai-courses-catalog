:: =============================================================================
:: Multi-Catalog Project: AI & Unreal Engine — Shared core codebase generating separate AI Content and Unreal Engine Content Catalogs
:: Copyright (c) 2026 David Bueno Vallejo · https://davidbuenov.com
:: Licensed under the MIT License. See LICENSE for details.
:: Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
:: =============================================================================
@echo off
echo Starting local web server on http://localhost:8050 ...
start /b python -m http.server 8050
echo Opening web browser ...
start http://localhost:8050
