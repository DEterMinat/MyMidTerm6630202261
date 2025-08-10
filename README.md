# Midterm Exam - Internet Programming
## Student: Tanakit

This project contains the preparation materials for the Internet Programming midterm exam.

## Project Structure
```
MyMidTerm6630202261/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen
│   │   ├── explore.tsx        # Explore screen 
│   │   └── inventory.tsx      # Product inventory screen
│   └── _layout.tsx
├── BACKEND/
│   ├── server.js              # Express.js backend server
│   └── package.json           # Backend dependencies
├── Tanakit_namecard.json   # User profile JSON
├── Tanakit_inventory.json  # Products inventory JSON
└── README.md
```

## Part A: Theory & Concepts

### 1. Framework
A framework is a pre-written code structure that provides a foundation and guidelines for building applications.

### 2. React Native vs Flutter
| Feature | React Native | Flutter |
|---------|-------------|---------|
| Language | JavaScript/TypeScript | Dart |
| Platforms | iOS, Android, Web | iOS, Android, Web, Desktop |
| Performance | Good | Excellent |
| Learning Curve | Easier (familiar JS) | Steeper (new language) |

### 3. Frontend vs Backend
- **Frontend**: User interface (HTML, CSS, React Native components)
- **Backend**: Server logic (Node.js, Express.js, databases)

### 4. JSON Files Created
- `Tanakit_namecard.json` - User profile information
- `Tanakit_inventory.json` - Product inventory with 3 items

## Part B: Practical Commands & Backend

### Running the React Native App
```bash
# Install dependencies
npm install

# For Linux server (if expo command not found):
# Method 1: Install Expo CLI globally
npm install -g @expo/cli

# Method 2: Use npx (recommended)
npx @expo/cli start --web --port 30019

# Method 3: Use our custom scripts
npm run dev          # Uses npx with port 30019
npm run web-npx      # Uses npx with default port

# Run on different platforms (if expo is installed)
npm run android    # Android emulator
npm run ios        # iOS simulator  
npm run web        # Web browser

# Alternative: Use bash script
chmod +x start-web.sh
./start-web.sh
```

### Backend Server
```bash
# Navigate to backend folder
cd BACKEND

# Install backend dependencies
npm install

# Start the Express.js server
npm start
```

The backend server runs on `http://nindam.ddns.net:9678` with endpoints:
- `GET /` - Welcome message
- `GET /api/products` - Fetch products from JSON
- `GET /api/namecard` - Fetch user profile

## Part C: Frontend React Native Code Fix

### Key imports needed:
```typescript
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
```

### Fetch implementation:
```typescript
const response = await fetch('http://nindam.ddns.net:9678/api/products');
```

### FlatList keyExtractor:
```typescript
<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={renderProduct}
/>
```

## Part D: CSS & Styling

### Button Styles
```typescript
backgroundColor: '#007AFF'  // Sets button background color
borderRadius: 12           // Rounds button corners
```

### Shadow Properties for Cards
```typescript
shadowColor: '#000'        // Shadow color
shadowOffset: {            // Shadow position
  width: 0,
  height: 2,
}
shadowOpacity: 0.1        // Shadow transparency
shadowRadius: 4           // Shadow blur radius
elevation: 3              // Android shadow depth
```

### Header Styling
```typescript
backgroundColor: '#007AFF'     // Header background color
borderBottomWidth: 1          // Bottom border thickness
borderBottomColor: '#e0e0e0'  // Bottom border color
```

## Exam Preparation Checklist

### Before Exam:
- [ ] Upload JSON files to `/var/www/html/` on cloud server
- [ ] Replace `localhost:3000` with actual server IP and port
- [ ] Test API endpoints with Postman
- [ ] Verify React Native app connects to backend
- [ ] Practice common fixes (imports, fetch, keyExtractor)

### During Exam:
- [ ] Replace "Nindam" with your actual name in all files
- [ ] Update server URL in fetch calls
- [ ] Check all required imports (useState, useEffect, ActivityIndicator)
- [ ] Verify FlatList keyExtractor uses correct property
- [ ] Test backend API responses

## Important Notes

1. **JSON File Naming**: Use your actual student ID (replace Tanakit)
2. **Server URL**: Replace `http://nindam.ddns.net:9678` with exam server details
3. **Cloud Path**: Ensure JSON files are accessible at `/var/www/html/`
4. **Testing**: Use Postman to verify backend APIs before frontend integration

## Common Fixes for Part C

### Missing Imports Fix:
```typescript
// Add these imports
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
```

### Fetch URL Fix:
```typescript
// Replace this:
fetch('http://__________________:_____/api/products')
// With your server details:
fetch('http://nindam.ddns.net:9678/api/products')
```

### Property Reference Fixes:
- Use `item.imageUrl` not `item.image`
- Use `item.category` not `item.type`
- Use `item.id` for keyExtractor

Good luck with your exam! 🚀