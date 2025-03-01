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
   git clone git@github.com:alectime/czepbuilds.git
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

### Manual Deployment

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

### Automated Deployment with GitHub Actions

This repository is configured with GitHub Actions for continuous deployment to Firebase Hosting. When you push changes to the `main` branch, the following happens automatically:

1. GitHub Actions workflow is triggered
2. The React app is built
3. The built files are deployed to Firebase Hosting

To set up automated deployment:

1. Complete the setup steps in the [Firebase GitHub Setup Guide](./firebase-github-setup.md)
2. Add the required secrets to your GitHub repository
3. Push changes to the `main` branch

To manually run the deployment workflow:
- Go to the "Actions" tab in GitHub
- Select the "Deploy to Firebase Hosting" workflow
- Click "Run workflow"

## Firebase Setup Helper

To help with setting up Firebase for this project, a helper script is included:

```
node firebase-init.js
```

This interactive script will guide you through:
- Installing the Firebase CLI
- Logging in to Firebase
- Creating or selecting a Firebase project
- Setting up Firebase Hosting
- Initializing Firebase Functions (optional)
- Generating a CI token for GitHub Actions

## GitHub Repository

This project is hosted on GitHub at: https://github.com/alectime/czepbuilds

To contribute to this repository:

```
# Clone the repository
git clone git@github.com:alectime/czepbuilds.git

# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Make your changes and commit them
git add .
git commit -m "Description of your changes"

# Push your branch to GitHub
git push origin feature/your-feature-name

# Create a pull request on GitHub
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
