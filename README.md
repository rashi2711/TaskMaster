# TaskMaster - React Native Task Manager App

A modern, feature-rich **Task Management** mobile application built with **React Native** for the **Kadel Labs Trainee Software Engineer (Android)** position.

![TaskMaster Banner](https://via.placeholder.com/800x400/6C63FF/FFFFFF?text=TaskMaster)

## ✨ Features

- ✅ Fetch tasks from public REST API (JSONPlaceholder)
- ✅ Full **CRUD** operations (Create, Read, Update, Delete)
- ✅ Local data persistence using **AsyncStorage**
- ✅ Smart task filtering (All / Active / Completed)
- ✅ Priority levels with color coding (High, Medium, Low)
- ✅ Beautiful interactive Task Cards with toggle completion
- ✅ Detailed Task View with Edit and Delete options
- ✅ Profile Screen with statistics and completion progress
- ✅ Clean, modern UI with smooth navigation
- ✅ Fully responsive and user-friendly design

## 🛠️ Tech Stack

- **React Native** v0.85
- **React Navigation** (Native Stack Navigator)
- **@react-native-async-storage/async-storage** (v2.2.0)
- **JavaScript (ES6+)**
- **REST API Integration** using `fetch`
- **Android Studio** + Emulator

## 📁 Project Structure

```bash
TaskMaster/
├── android/                    # Android native files
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
🚀 Quick Start
Prerequisites

Node.js (LTS version)
Android Studio with SDK (API 34 or higher recommended)
Android Emulator or physical device connected
Java JDK 17+

Installation & Setup

Clone the repositoryBashgit clone https://github.com/rashi2711/TaskMaster.git
cd TaskMaster
Install dependenciesBashnpm install
Install compatible AsyncStorageBashnpm install @react-native-async-storage/async-storage@2.2.0
Clean Android buildBashcd android
.\gradlew clean
cd ..
Start Metro Bundler (keep this terminal running)Bashnpx react-native start --reset-cache
Run the app on Android (open a new terminal)Bashnpx react-native run-android

📱 App Screens

Home — Task list with stats, filters, and Floating Action Button
Add Task — Create new tasks with title, description & priority
Task Detail — View full details, edit, and delete tasks
Profile — User stats, completion rate, streak & settings

🎯 What This Project Demonstrates

REST API integration and JSON data handling
State management and persistent storage
Multi-screen navigation using React Navigation
Clean, modular and scalable component architecture
Modern mobile UI/UX principles
Proper error handling and loading states
Professional project structure suitable for production

🔧 Future Enhancements (Planned)

Dark / Light theme toggle
Push notifications for task reminders
Due dates and calendar integration
Search and sort functionality
Task categories / labels
Backend integration (Firebase or custom API)
