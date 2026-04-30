# Intro Metrics W2026 Website

This repository contains a Material for MkDocs course website.

## Local Preview

```bash
pip install -r requirements.txt
python -m mkdocs serve
```

Then open <http://127.0.0.1:8000>.

## Publish With GitHub Pages

1. Create a GitHub repository named `intro_metrics_W2026`.
2. Push this folder to GitHub.
3. In the repository settings, open `Pages`.
4. Set the publishing source to `Deploy from a branch`.
5. Select the `gh-pages` branch and the `/root` folder.

The GitHub Action in `.github/workflows/ci.yml` will build and deploy the site after every push to `main`.

On this Windows machine, the Anaconda Python executable is available at:

```powershell
& 'C:\Users\Lorenzo Navarini\anaconda3\python.exe' -m mkdocs serve
```
