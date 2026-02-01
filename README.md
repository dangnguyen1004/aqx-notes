# AQX Notes

A React Native notes app with categories, multi-language support, and theme customization.

## 📱 Try it Now with Expo Go

**No setup required!** Scan this QR code with Expo Go to preview the app instantly:

👉 **[Open in Expo Go](https://expo.dev/preview/update?message=ci%3A+update+%5Bci+build%5D&updateRuntimeVersion=1.0.0&createdAt=2026-02-01T08%3A23%3A21.059Z&slug=exp&projectId=8082d5c5-2b35-4b15-a805-11ca66675683&group=09ff72d9-2898-4931-863d-76a18e8d5898)**

1. Install [Expo Go](https://expo.dev/go) on your phone
2. Click the link above or scan the QR code on the page
3. The app will load automatically

---

## Run Locally

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start
```bash
npm install
npx expo start
```
Scan the QR code with Expo Go (Android) or Camera app (iOS).

---

## Features

- **Notes by Categories** - Organize notes into Work, Life, Health categories
- **Soft Delete & Restore** - Deleted notes go to trash, can be restored
- **Multi-language** - English & Vietnamese (auto-detects device language)
- **Theme Support** - Light, Dark, Auto modes
- **Deep Linking** - Open notes via `aqxnotes://note/[id]`
- **Persistent Storage** - Data survives app restarts

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Expo SDK 54, React Native 0.81.5 |
| Language | TypeScript (strict mode) |
| Navigation | Expo Router v6 (file-based) |
| State | Zustand v5 + AsyncStorage |
| i18n | i18next + expo-localization |

---

## CI/CD

- **EAS Build** - Automated builds on push to master
- **OTA Updates** - Instant updates via Expo Updates (no app store review)
- **Preview Builds** - Test any branch with Expo Go

---

## Project Structure

```
aqx-notes/
├── app/                 # Screens (Expo Router)
│   ├── (tabs)/          # Tab screens (Home, Summary)
│   ├── settings/        # Settings screens
│   └── note/            # Note detail screen
├── components/          # Reusable UI components
├── store/               # Zustand stores
├── i18n/                # Translations (en, vi)
├── hooks/               # Custom React hooks
├── constants/           # Design tokens
└── types/               # TypeScript interfaces
```

---

## Deep Linking

```bash
# Test on iOS Simulator
npx uri-scheme open aqxnotes://note/[note-id] --ios

# Test on Android Emulator
npx uri-scheme open aqxnotes://note/[note-id] --android
```

---

## License

Created for interview assessment purposes.
