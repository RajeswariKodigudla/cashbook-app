# 📱 Convert to Mobile App - Complete Guide

## 🎯 Best Approach: React Native with Expo

Since you already have a React app, **React Native with Expo** is the best choice:
- ✅ Reuse most of your React code
- ✅ Same backend API (no changes needed)
- ✅ Build for iOS and Android
- ✅ Easy setup and deployment

---

## 📋 Step-by-Step Setup

### **Step 1: Install Prerequisites**

```bash
# Install Node.js (if not already installed)
# Download from: https://nodejs.org/

# Install Expo CLI globally
npm install -g expo-cli

# Or use npx (recommended)
npx create-expo-app@latest
```

### **Step 2: Create New Mobile App Project**

```bash
# Navigate to your projects folder
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React

# Create new Expo app
npx create-expo-app cashbook-mobile

# Choose template: "blank" or "blank (TypeScript)"
```

### **Step 3: Install Dependencies**

```bash
cd cashbook-mobile

# Install navigation
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# Install async storage (replaces localStorage)
npm install @react-native-async-storage/async-storage

# Install HTTP client
npm install axios

# For development
npm install --save-dev @babel/core
```

---

## 🔄 Migration Strategy

### **1. Keep Backend As-Is**
✅ Your Django backend stays the same
✅ Same API endpoints
✅ Same authentication
✅ No backend changes needed!

### **2. Convert Frontend Components**

**Web (React)** → **Mobile (React Native)**

| Web Component | Mobile Equivalent |
|--------------|------------------|
| `<div>` | `<View>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<input>` | `<TextInput>` |
| `<img>` | `<Image>` |
| `<p>`, `<span>` | `<Text>` |
| `localStorage` | `AsyncStorage` |
| `fetch` | `axios` or `fetch` (same) |
| CSS styles | StyleSheet (JavaScript objects) |

---

## 📁 Project Structure

```
cashbook-mobile/
├── App.js                 # Main app entry
├── app.json               # Expo config
├── package.json
├── src/
│   ├── screens/           # Pages (was pages/)
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── IncomeScreen.js
│   │   └── ExpenseScreen.js
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation setup
│   ├── services/          # API calls (same as web)
│   │   └── api.js
│   ├── config/            # Config files
│   │   └── api.js
│   └── contexts/          # Context providers
│       └── AuthContext.js
└── assets/                # Images, fonts
```

---

## 🔧 Key Changes Needed

### **1. API Configuration** (`src/config/api.js`)

```javascript
// Same as web, but use AsyncStorage instead of localStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = __DEV__ 
  ? 'http://127.0.0.1:8000/api'  // Local dev
  : 'https://rajeswari.pythonanywhere.com/api';  // Production

export const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const setAuthToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem('authToken');
};
```

### **2. Navigation** (`src/navigation/AppNavigator.js`)

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import IncomeScreen from '../screens/IncomeScreen';
import ExpenseScreen from '../screens/ExpenseScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Income" component={IncomeScreen} />
        <Stack.Screen name="Expense" component={ExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### **3. Login Screen Example** (`src/screens/LoginScreen.js`)

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { login } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(username, password);
      await AsyncStorage.setItem('authToken', response.access);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cashbook</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

---

## 🚀 Quick Start Commands

### **1. Create Project**
```bash
npx create-expo-app cashbook-mobile
cd cashbook-mobile
```

### **2. Install Dependencies**
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install axios
```

### **3. Start Development**
```bash
# Start Expo
npx expo start

# Or use npm
npm start
```

### **4. Run on Device**
- **Android:** Press `a` in terminal or scan QR code with Expo Go app
- **iOS:** Press `i` in terminal or scan QR code with Camera app

---

## 📦 Build for Production

### **Android APK**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### **iOS IPA**
```bash
eas build --platform ios --profile preview
```

---

## ✅ Migration Checklist

### **Phase 1: Setup**
- [ ] Install Expo CLI
- [ ] Create new Expo project
- [ ] Install dependencies
- [ ] Setup navigation

### **Phase 2: Core Features**
- [ ] Convert Login screen
- [ ] Convert Home/Dashboard screen
- [ ] Convert Income screen
- [ ] Convert Expense screen
- [ ] Setup API service layer

### **Phase 3: Additional Features**
- [ ] Convert All Transactions screen
- [ ] Convert Settings screen
- [ ] Add offline support (optional)
- [ ] Add push notifications (optional)

### **Phase 4: Testing & Deployment**
- [ ] Test on Android device
- [ ] Test on iOS device (if available)
- [ ] Build APK/IPA
- [ ] Deploy to app stores

---

## 🔗 Backend Connection

**No changes needed!** Your backend stays exactly the same:

- ✅ API URL: `https://rajeswari.pythonanywhere.com/api`
- ✅ Same endpoints
- ✅ Same authentication (JWT)
- ✅ Same data format

---

## 📱 Alternative: Progressive Web App (PWA)

If you want a simpler approach, you can make your web app mobile-friendly:

1. Add PWA manifest
2. Add service worker
3. Make responsive design
4. Users can "Add to Home Screen"

**Pros:** Quick, no new codebase
**Cons:** Not a native app, limited features

---

## 🎯 Recommended Approach

**For Full Native Experience:** React Native with Expo ✅
**For Quick Mobile-Friendly:** PWA (Progressive Web App)

---

## 📚 Resources

- **Expo Docs:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/
- **React Native Docs:** https://reactnative.dev/

---

**Ready to start? Follow the steps above!** 🚀

