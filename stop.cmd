:: =============================================================================
:: Multi-Catalog Project: AI & Unreal Engine — Shared core codebase generating separate AI Content and Unreal Engine Content Catalogs
:: Copyright (c) 2026 David Bueno Vallejo · https://davidbuenov.com
:: Licensed under the MIT License. See LICENSE for details.
:: Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
:: =============================================================================
@echo off
echo Stopping local web server on port 8050...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8050') do (
    taskkill /f /pid %%a
)
echo Server stopped.
