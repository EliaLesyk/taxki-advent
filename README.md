# Tax KI Advent Calendar

Ein einfacher Adventskalender mit 24 KI-Tipps für Steuerkanzleien. Jeden Tag öffnet sich ein neues Türchen mit praktischen Tipps.

## Features

- ✅ 24 Adventskalender-Türchen mit automatischem täglichen Freischalten (1.-24. Dezember)
- ✅ Responsive Design - funktioniert auf allen Geräten
- ✅ Email-Benachrichtigung bei neuen Abonnenten
- ✅ Komplett in Deutsch
- ✅ Einfache Vercel-Deployment

## Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. Environment Variables konfigurieren

Kopiere `.env.example` nach `.env` und füge deine Werte ein:

```bash
cp .env.example .env
```

Du benötigst:
- **RESEND_API_KEY**: Erstelle einen kostenlosen Account bei [resend.com](https://resend.com) und hole dir einen API-Key
- **NOTIFICATION_EMAIL**: Deine Email-Adresse, die Benachrichtigungen über neue Abonnenten erhält

### 3. Lokal testen

```bash
npx vercel dev
```

Öffne `http://localhost:3000` im Browser.

**Testing-Modus**: Setze in `index.html` Zeile 523 `DEBUG_MODE = true`, um alle Türchen freizuschalten.

## Deployment auf Vercel

### Option 1: Via Vercel Dashboard

1. Gehe zu [vercel.com](https://vercel.com) und logge dich ein
2. Klicke "Add New Project" → "Import Git Repository"
3. Wähle dieses Repository
4. Füge Environment Variables hinzu:
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
5. Klicke "Deploy"

### Option 2: Via CLI

```bash
npm i -g vercel
vercel

# Bei der ersten Deployment werden Environment Variables abgefragt
```

## Wie es funktioniert

### Türchen-Freischaltung
- Türchen 1-24 entsprechen dem 1.-24. Dezember
- Nur freigeschaltete Türchen können geöffnet werden
- Geöffnete Türchen werden im localStorage gespeichert

### Email-Subscription
- Besucher können sich für Tipps anmelden
- Du erhältst eine Email-Benachrichtigung mit der Abonnenten-Email
- Keine Datenbank nötig - KISS-Prinzip

### URL-Routing
- Direktlinks wie `/1`, `/2`, `/3` funktionieren
- `vercel.json` regelt das URL-Rewriting

## Customization

### Farben ändern
Bearbeite die CSS-Variablen in `index.html`:

```css
:root {
    --primary: #1e3a5f;
    --accent: #c9a227;
    /* ... weitere Farben */
}
```

### Inhalte ändern
Bearbeite `data.json` für die Türchen-Inhalte.

### Design anpassen
Das komplette Styling ist in `index.html` im `<style>`-Tag.

## Struktur

```
.
├── index.html          # Haupt-HTML-Datei mit komplettem Frontend
├── data.json           # Advent-Content für alle 24 Türchen
├── api/
│   └── subscribe.js    # Vercel Serverless Function für Email-Subscriptions
├── vercel.json         # Vercel Konfiguration (URL-Routing)
├── package.json        # Dependencies
└── .env.example        # Environment Variables Template
```

## Support

Bei Fragen: [Elina Lesyk](https://elinalesyk.com)

---

Made with 🎄 by Elina Lesyk
