# AQX Notes

A React Native notes application built with Expo, featuring categories, multi-language support, and theme customization.

## Features

- **Notes Management**: Create, view, and delete notes organized by categories
- **Categories**: Work and Study, Life, Health and Well-being
- **Soft Delete**: Deleted notes go to trash and can be restored
- **Multi-language**: English and Vietnamese support (auto-detects device language)
- **Theme Support**: Light, Dark, and Auto (follows system) modes
- **Deep Linking**: Open specific notes via `aqxnotes://note/[id]`
- **Persistent Storage**: Notes and settings persist across app restarts

## Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router 6 (file-based routing)
- **State Management**: Zustand with AsyncStorage persistence
- **Internationalization**: react-i18next + expo-localization
- **Styling**: React Native StyleSheet

## Runtime Environment

- **Node.js**: 18.x or higher
- **Expo SDK**: 54.0.32
- **React**: 19.1.0
- **React Native**: 0.81.5

## Dependencies

| Package | Version |
|---------|---------|
| expo | ~54.0.32 |
| expo-router | ~6.0.22 |
| expo-localization | ~17.0.8 |
| expo-linking | ~8.0.11 |
| zustand | ^5.0.10 |
| react-i18next | ^16.5.4 |
| i18next | ^25.8.0 |
| @react-native-async-storage/async-storage | 2.2.0 |
| @expo/vector-icons | - |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running the App

1. Start the development server: `npx expo start`
2. Scan the QR code with:
   - **iOS**: Camera app or Expo Go
   - **Android**: Expo Go app

## Project Structure

```
aqx-notes/
├── app/                    # Screens (Expo Router)
│   ├── (tabs)/            # Tab screens (Home, Summary)
│   ├── settings/          # Settings screens
│   ├── note/              # Note detail screen
│   └── new-note.tsx       # New note screen
├── components/            # Reusable UI components
├── store/                 # Zustand stores
├── i18n/                  # Internationalization
├── providers/             # React context providers
├── hooks/                 # Custom hooks
├── constants/             # App constants
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## Deep Linking

Test deep links with:

```bash
# iOS Simulator
npx uri-scheme open aqxnotes://note/[note-id] --ios

# Android Emulator
npx uri-scheme open aqxnotes://note/[note-id] --android
```

## Building for Production

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Or use EAS Build
npx eas build
```

## License

This project is created for interview assessment purposes.
