# Deployment Guide

Your project is now configured for deployment on **Vercel** or **Netlify**.

## Option 1: Netlify (Recommended)
This codebase already includes a `netlify.toml` file, making it 100% ready for Netlify.

1. **Push your changes** to GitHub:
   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push
   ```
2. Go to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** -> **"Import from an existing project"**.
4. Select **GitHub** and choose your `snackify` repository.
5. Netlify will detect the settings automatically (Command: `npm run build`, Publish directory: `dist`).
6. Click **Deploy**.

## Option 2: Vercel
Vercel is also a great option and will work out of the box with Vite.

1. **Push your changes** to GitHub (same as above).
2. Go to [Vercel](https://vercel.com/new).
3. Import your `snackify` repository.
4. Leave the default settings (Framework Preset: Vite).
5. Click **Deploy**.

## Why this works
We removed the `base: '/snackify/'` setting from `vite.config.js`. This means the app now expects to be served from the root domain (e.g., `https://snackify.netlify.app/`), which correctly matches your image paths (like `/snack_chips_....png`).
