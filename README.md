# PISMARK Studio — Digital Experience Portfolio

A high-performance, video-backed studio portfolio designed for **PISMARK** (Youssef Hamdy, Cairo / Worldwide). Ready for instant deployment on GitHub Pages.

---

## 📁 Repository Structure

```
PISMARK-video-portfolio/
├── .gitignore               # Excludes raw video source & OS metadata
├── .nojekyll                # Bypasses Jekyll processing on GitHub Pages
├── index.html               # Main website markup & semantic sections
├── README.md                # Project documentation & deployment guide
├── assets/                  # Video & media assets
│   ├── background-video.mp4  # Main full-page ambient background video (3.9 MB)
│   └── services-background.mp4 # Dedicated section background video (24.9 MB)
├── css/                     # Styling stylesheets
│   ├── styles.css           # Core typography, dark theme & responsive layout
│   ├── accessibility.css    # Focus styles, skip links & screen reader rules
│   ├── services-video.css   # Full-bleed video styles for Expertise section
│   └── hero-full-bleed.css  # Hero section stage modifier stylesheet
└── js/                      # Client-side JavaScript
    └── script.js            # Video autoplay control, scroll progress & mobile menu
```

---

## 🚀 How to Publish to GitHub Pages

1. **Copy folder contents** into your GitHub repository root (e.g. `your-username.github.io` or repository root).
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy PISMARK Video Portfolio"
   git push origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub.
   - Navigate to **Pages** (under Code and automation).
   - Under **Source**, select `Deploy from a branch` and choose `main` / `/ (root)`.
   - Click **Save**.

Your site will be live at `https://<your-username>.github.io/`!
