# GitHub Pages Setup Instructions

## Quick Setup

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial commit: Tutorial website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings** (top menu)
   - Scroll down to **Pages** (left sidebar)
   - Under **Source**, select:
     - Branch: `main` (or `master`)
     - Folder: `/ (root)`
   - Click **Save**

3. **Your website will be available at**:
   ```
   https://[your-username].github.io/ISA-Tutorial/
   ```
   
   For example, if your username is `preetam7`, it would be:
   ```
   https://preetam7.github.io/ISA-Tutorial/
   ```

4. **Wait a few minutes** for GitHub to build and deploy your site (usually 1-2 minutes)

5. **Check the status**: Go back to Settings → Pages to see the deployment status

## Notes

- The site will automatically update whenever you push changes to the `main` branch
- If you need to update bios, edit the `.txt` files, run `python3 build.py`, commit, and push
- The URL will be active once GitHub finishes the first deployment

## Troubleshooting

- If the site doesn't load, check that `index.html` is in the root directory
- Make sure the branch name matches (could be `main` or `master`)
- Check the Actions tab to see if there are any build errors

