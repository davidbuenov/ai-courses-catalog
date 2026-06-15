#!/bin/bash
# =============================================================================
# Multi-Catalog Project: AI & Unreal Engine — Shared core codebase generating separate AI Content and Unreal Engine Content Catalogs
# Copyright (c) 2026 David Bueno Vallejo · https://davidbuenov.com
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

echo "Starting local web server on http://localhost:8050 ..."
python3 -m http.server 8050 > /dev/null 2>&1 &
echo $! > .server.pid
echo "Opening web browser ..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8050
elif command -v open > /dev/null; then
    open http://localhost:8050
else
    echo "Please open http://localhost:8050 in your browser."
fi
