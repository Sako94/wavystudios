# Wavy Studios Website

Production-ready, SEO-optimized static website.

## Quick Start

1. Open any HTML file in your browser, or use a local server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

2. Deploy the entire folder to any static host (Netlify, Vercel, AWS S3, etc.)

## File Structure

```
├── assets/
│   ├── css/styles.css     # Main stylesheet
│   ├── js/main.js         # Navigation & interactions
│   └── img/               # Images & logo
├── index.html             # Homepage
├── growth-os.html         # Growth OS methodology
├── paid-social.html       # Paid Social service
├── paid-search.html       # Paid Search service
├── lifecycle.html         # Email/SMS marketing
├── creative.html          # Creative system
├── cro.html               # Conversion optimization
├── ecommerce.html         # Ecommerce landing page
├── lead-gen.html          # Lead gen landing page
├── insights.html          # Case studies & blog
├── labs.html              # Labs & ventures
├── partner.html           # Lead capture form
├── sitemap.xml            # XML sitemap
└── robots.txt             # Search engine rules
```

## Navigation Structure

- **Home** → index.html
- **Growth OS** → growth-os.html
- **Services** (dropdown)
  - Lifecycle Marketing → lifecycle.html
  - Paid Social → paid-social.html
  - Paid Search → paid-search.html
  - Creative System → creative.html
  - CRO & Funnels → cro.html
- **Case Studies** → insights.html
- **Who We Help** (dropdown)
  - Ecommerce & DTC → ecommerce.html
  - Lead Generation → lead-gen.html
- **Labs** → labs.html
- **Partner With Us** (CTA) → partner.html

## Editing Guide

### Update Page Content
Edit the HTML files directly. Main content is in `<main id="main-content">`.

### Update Styles
Edit `assets/css/styles.css`. CSS variables at the top control colors:
```css
:root {
    --accent-lime: #c8ff00;  /* Change brand color */
}
```

### Update Navigation
Search for `site-header` and `mobile-nav` sections in each HTML file.

### Add New Pages
1. Copy an existing page
2. Update `<title>` and `<meta>` tags
3. Edit content in `<main>`
4. Add to sitemap.xml
5. Add to navigation in all pages

## SEO Features

- Unique title & description per page
- Canonical URLs
- Open Graph tags
- Twitter Cards
- XML sitemap
- robots.txt
- Semantic HTML5
- Accessible navigation

## Performance Features

- Deferred JavaScript loading
- Font display swap
- Minimal external dependencies
- Optimized CSS

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)

---

© 2026 Wavy Studios
