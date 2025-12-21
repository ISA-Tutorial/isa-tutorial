# Information Seeking in the Age of Agentic AI: A Half-Day Tutorial

Website for the CHIIR'26 tutorial "Information Seeking in the Age of Agentic AI: A Half-Day Tutorial"

## About

This repository contains the website for the half-day tutorial presented at ACM SIGIR CHIIR'26 (March 22--26, 2026, Seattle, WA, USA).

## Website

The website is hosted on GitHub Pages. To view it locally:

1. Clone this repository
2. Open `index.html` in a web browser, or
3. Use a local web server (e.g., `python -m http.server 8000` or `npx serve`)

## Structure

```
ISA-Tutorial/
├── index.html          # Main tutorial page
├── css/
│   └── style.css      # Stylesheet
├── bios/               # Presenter biography files
│   ├── preetam-dammu.txt
│   └── tanya-roosta.txt
├── README.md          # This file
└── proposal_chiir2025.tex  # Original proposal document
```

## Editing Presenter Bios

The presenter biographies are stored in separate text files in the `bios/` directory:
- `bios/preetam-dammu.txt` - Preetam Dammu's biography
- `bios/tanya-roosta.txt` - Tanya Roosta's biography

To update the biographies:
1. Edit the text files in the `bios/` directory
2. Run the build script to update the HTML:
   ```bash
   python3 build.py
   ```

The script reads the text files and automatically updates the HTML with the new content. No server needed!

## Setup for GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch (usually `main` or `master`)
4. The site will be available at `https://[username].github.io/ISA-Tutorial/`


## Conference

ACM SIGIR CHIIR'26 - Conference on Human Information Interaction and Retrieval  
March 22--26, 2026 | Seattle, WA, USA

