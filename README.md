# TaskMaster - React Native Task Manager App

A modern, feature-rich Task Management mobile application built with **React Native** for the Kadel Labs Trainee Software Engineer (Android) position.

![TaskMaster](https://via.placeholder.com/800x400/6C63FF/FFFFFF?text=TaskMaster)

## ✨ Features

- ✅ Fetch tasks from REST API (JSONPlaceholder)
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Local persistence using AsyncStorage
- ✅ Task filtering (All / Active / Completed)
- ✅ Priority levels with color coding (High, Medium, Low)
- ✅ Beautiful Task Cards with completion toggle
- ✅ Detailed Task View with Edit & Delete
- ✅ Profile Screen with statistics and progress
- ✅ Clean, modern UI with smooth navigation
- ✅ Responsive and user-friendly design

## 🛠️ Tech Stack

- **React Native** (v0.85)
- **React Navigation** (Native Stack)
- **AsyncStorage** - Local data persistence
- **JavaScript (ES6+)**
- **REST API Integration** (`fetch`)
- **Android Studio + Emulator**

## 📁 Project Structure
TaskMaster/
├── android/                  # Android native code
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── AddTaskScreen.js
│   │   ├── TaskDetailScreen.js
│   │   └── ProfileScreen.js
│   ├── components/
│   │   └── TaskCard.js
│   ├── api/
│   │   └── taskApi.js
│   └── utils/
│       └── storage.js
├── App.js
├── package.json
└── README.md
text## 🚀 Quick Start

### Prerequisites

- Node.js (LTS version)
- Android Studio with SDK (API 34 recommended)
- Android Emulator or physical device
- Java JDK 17+

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd TaskMaster

Install dependencies

Bashnpm install

Install AsyncStorage (Important)

Bashnpm install @react-native-async-storage/async-storage@2.2.0

Clean Android build

Bashcd android
.\gradlew clean
cd ..

Start Metro Bundler

Bashnpx react-native start --reset-cache

Run on Android (in a new terminal)

Bashnpx react-native run-android
📱 App Screens

Home — Task list with filters and stats
Add Task — Create new tasks with priority
Task Detail — View, edit, and delete tasks
Profile — User stats, completion rate, and settings

🎯 What This Project Demonstrates

REST API integration and JSON handling
State management and data persistence
Navigation between multiple screens
Clean component architecture
Responsive and accessible UI/UX
Error handling and loading states
Git-friendly project structure

🔧 Future Enhancements (Planned)

Dark/Light theme toggle
Push notifications
Due dates and reminders
Search functionality
Task categories
Backend integration (Firebase / Node.js)