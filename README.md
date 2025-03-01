# Czep Builds Portfolio Website

A modern, responsive portfolio website for czepbuilds.com built with React, TypeScript, and Firebase.

## Project Structure

- `frontend/`: React + TypeScript application
- `functions/`: Firebase Cloud Functions (for future use)
- `firebase.json` & `.firebaserc`: Firebase configuration

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)

## Getting Started

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/czepbuilds-portfolio.git
   cd czepbuilds-portfolio
   ```

2. Install dependencies:
   ```
   cd frontend
   npm install
   ```

### Development

To run the development server:

```
cd frontend
npm run dev
```

This will start the development server at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production build:

```
cd frontend
npm run build
```

This will generate optimized files in the `frontend/dist` directory.

### Deployment

1. Login to Firebase (if not already logged in):
   ```
   firebase login
   ```

2. Initialize Firebase (if not already initialized):
   ```
   firebase init
   ```

3. Deploy to Firebase Hosting:
   ```
   firebase deploy --only hosting
   ```

## Future Enhancements

- Add Firebase Authentication for admin access
- Implement a CMS for managing portfolio projects
- Add contact form functionality using Firebase Cloud Functions
- Integrate analytics to track user engagement

## Technologies Used

- React
- TypeScript
- Vite (for fast development and optimized builds)
- Firebase Hosting
- Firebase Cloud Functions (planned)

## License

MIT
