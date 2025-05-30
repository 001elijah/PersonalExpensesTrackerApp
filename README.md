# Personal Expenses Tracker App

A React Native mobile application for tracking personal expenses, built with TypeScript and Redux.

## Features

- User Authentication (Login/Registration)
- Secure Firebase Authentication
- Browse past expenses
- Add a new expense
- Update existing expense
- Delete an expense
- Redux state management with Redux Toolkit
- TypeScript support
- Native platform integration for iOS and Android

## Screenshots

Here are some screenshots showcasing the app's main features:

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.39.25.jpg" width="200" alt="Login Screen"/>
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.39.54.jpg" width="200" alt="Registration Screen"/>
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.40.39.jpg" width="200" alt="Expenses List"/>
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.40.43.jpg" width="200" alt="Expense Details"/>
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.40.52.jpg" width="200" alt="Add Expense"/>
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.41.00.jpg" width="200" alt="Edit Expense"/>
    <img src="./demo/Simulator Screenshot - iPhone 16 Pro - 2025-05-06 at 11.41.09.jpg" width="200" alt="Settings Screen"/>
</div>

## Tech Stack

- React Native: 0.79.1
- TypeScript: 5.0.4
- Redux Toolkit: 2.7.0
- React Navigation
- Firebase Authentication
- Firebase Firestore (Firebase stands out for its seamless integration with Google Cloud services and robust real-time synchronization capabilities, making it especially powerful for mobile applications requiring instant data updates)
- React Native Paper UI components
- Redux Persist for state persistence

This is a new [**PersonalExpensesTrackerApp**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites

- Node.js
- Yarn package manager
- Ruby (for iOS development)
- Xcode (for iOS development)
- Android Studio (for Android development)

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm install
npm start

# OR using Yarn
yarn install
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Project Structure

```
PersonalExpensesTrackerApp/
    ├── components/ # Reusable UI components
    ├── hooks/ # Reusable hooks
    ├── screens/ # App screens
    ├── redux/ # Redux store, slices, and operations
    ├── services/ # API and external service integrations
    ├── styles/ # Shared styles
    ├── types/ # TypeScript type definitions
    └── utils/ # Utility functions
```

