# React Native Navigation Setup

This project implements a navigation structure for a React Native application using React Navigation.
The `RootNavigation` component serves as the entry point for the app's navigation system.

## Overview

The navigation structure is built using:
- `@react-navigation/stack` for creating a stack navigator
- `@react-navigation/native` for the `NavigationContainer`

The app's navigation is divided into two main parts:
1. `TabNavigation`: The main app interface, likely containing multiple tabs
2. `AuthNavigation`: The authentication flow (login, signup, etc.)

## RootNavigation Component

The `RootNavigation` component determines which navigation flow to display based on the user's session status.

### Key Features:
- Uses a stack navigator as the root navigation structure
- Implements slide transition animations for screen changes
- Conditionally renders either `TabNavigation` or `AuthNavigation` based on the session state

### Dependencies:
- React
- React Navigation (Stack and Native)
- Custom store for user session management (`useUserStore`)

## Usage

To use this navigation setup in your React Native app:

1. Install the required dependencies:
   ```
   npm install @react-navigation/native @react-navigation/stack
   ```

2. Set up your `TabNavigation` and `AuthNavigation` components.

3. Implement the `useUserStore` for managing user sessions.

4. Use the `RootNavigation` component as the main entry point of your app.

## Customization

You can customize the navigation behavior by modifying the `screenOptions` in the `Stack.Navigator`. Current options include:
- Hidden headers
- Slide from right transition preset
- Enabled animations and gestures

