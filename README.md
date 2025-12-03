# Tax KI Advent – Deployment Guide

## Files

- `index.html` – Main website (single file, self-contained)
- `data.json` – All 24 tips data
- `tax_ki_advent_complete.csv` – Same data for Google Sheets / MailerLite

## Quick Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click "Add New Project" → "Import Git Repository"
3. Or drag & drop these files to deploy

**Or via CLI:**
```bash
npm i -g vercel
vercel
```

## Quick Deploy to Netlify (Free)

1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Drag & drop the folder containing `index.html` and `data.json`
3. Done! You get a URL like `random-name.netlify.app`

## Custom Domain (advent.elinalesyk.com)

After deploying to Vercel/Netlify:

1. In your hosting dashboard, go to "Domains"
2. Add `advent.elinalesyk.com` (or `taxki.elinalesyk.com`)
3. In your DNS (where elinalesyk.com is registered), add:
   - Type: CNAME
   - Name: advent (or taxki)
   - Value: your-vercel-url.vercel.app (or netlify equivalent)

## URL Routing for /1, /2, /3 etc.

For clean URLs like `taxki.elinalesyk.com/5`, add this file:

### For Vercel – create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/:day(\\d+)", "destination": "/" }
  ]
}
```

### For Netlify – create `_redirects`:
```
/*    /index.html   200
```

## MailerLite Integration

Replace the placeholder in `index.html` (search for "TODO: Replace with actual MailerLite"):

```javascript
// Example MailerLite embedded form
// Get your form code from: MailerLite → Forms → Embedded forms
// Or use their JavaScript API
```

Simple option: Replace the form with MailerLite's embed code directly.

## Testing

Set `DEBUG_MODE = true` in the JavaScript to unlock all 24 doors for testing.

## Customization

- Colors: Edit CSS variables in `:root { }` section
- Text: Edit directly in HTML or in `data.json`
- Logo: Add your logo in the header section

---

Made with 🎄 by Elina Lesyk
