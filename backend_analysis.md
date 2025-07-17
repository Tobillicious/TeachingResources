# Backend Analysis

This document analyzes the functionality of the Python servers in this project.

## `server.py`

*   **Purpose:** A simple HTTP server for local development.
*   **Functionality:**
    *   Serves files from the root directory of the project (`.`).
    *   Listens on port 8001.
    *   Uses Python's built-in `http.server` and `socketserver` modules.
*   **How to run:** `python server.py`
*   **Access:** `http://localhost:8001`

## `server2.py`

*   **Purpose:** A more advanced HTTP server, likely for serving the React application.
*   **Functionality:**
    *   Serves files from the `te-kete-ako/dist` directory.
    *   Listens on port 8080.
    *   Handles different content types (HTML, CSS, JS, PNG, JPG, ICO, SVG).
    *   Includes a fallback mechanism, serving `index.html` for any requested path that doesn't correspond to an existing file. This is a common requirement for single-page applications (SPAs).
*   **How to run:** `python server2.py`
*   **Access:** `http://localhost:8080`
