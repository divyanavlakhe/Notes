# To-Do & Notes App (React Native, TypeScript)

## Features
- Tasks: add / edit / delete / toggle completed
- Notes: add free-form notes
- Search and filter tasks
- Persistent storage via AsyncStorage
- Initial seed from JSONPlaceholder `/todos` (sample only)
- Simple LayoutAnimation for add/delete
- Clean folder structure & reusable components

## Run
1. npm install
2. npx react-native start --reset-cache
3. npx react-native run-android
   (iOS: cd ios && pod install && npx react-native run-ios)

## Notes
- JSONPlaceholder write endpoints are mocked (they respond but do not persist). We only fetch initial tasks from there.
- Improvements: validation with react-hook-form + zod, unit tests, better unique id generation (uuid), remote sync, theming.
