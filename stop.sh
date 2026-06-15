#!/bin/bash
# =============================================================================
# Multi-Catalog Project: AI & Unreal Engine — Shared core codebase generating separate AI Content and Unreal Engine Content Catalogs
# Copyright (c) 2026 David Bueno Vallejo · https://davidbuenov.com
# Licensed under the MIT License. See LICENSE for details.
# Built with dbv-specs-ops · https://github.com/davidbuenov/dbv-specs-ops
# =============================================================================

echo "Stopping local web server..."
if [ -f .server.pid ]; then
    kill $(cat .server.pid)
    rm .server.pid
    echo "Server stopped."
else
    # Fallback to search by port if PID file not found
    PID=$(lsof -t -i:8050)
    if [ -n "$PID" ]; then
        kill $PID
        echo "Server stopped (found via port)."
    else
        echo "No server found running on port 8050."
    fi
fi
