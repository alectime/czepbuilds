# CzepBuilds Portfolio

A modern portfolio website showcasing various projects and applications, including interactive features like the VPD Calculator for controlled environment agriculture.

## Project Structure

```
czepbuilds-portfolio/
├── frontend/           # React frontend application
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── components/     # Shared UI components
│   │   ├── features/       # Feature-specific code
│   │   │   └── vpd-calculator/ # VPD Calculator feature
│   │   ├── pages/          # Page components
│   │   └── styles/         # Global styles
│   └── package.json      # Frontend dependencies
├── functions/          # Firebase Cloud Functions
└── firebase.json       # Firebase configuration
```

## Features

- **Responsive Design**: Optimized for mobile and desktop
- **Interactive Project Showcase**: Using parallax scrolling effects
- **VPD Calculator**: Tool for controlled environment agriculture
- **Media Gallery**: Showcase of various media items
- **Firebase Integration**: For hosting and backend functions

## Technology Stack

- **Frontend**: React, TypeScript, Vite, CSS
- **Backend**: Firebase (Hosting, Functions, Firestore)
- **CI/CD**: Firebase deployment

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Firebase CLI

### Setup

1. Clone the repository
```bash
git clone [repository-url]
cd czepbuilds-portfolio
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install function dependencies
cd ../functions
npm install
```

3. Run the development server
```bash
# In the frontend directory
npm run dev
```

### Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy
```

## Feature Development

New features should follow the established pattern of organization:

1. Create a new feature directory in `frontend/src/features/`
2. Use the modular structure with components, styles, and utilities
3. Export the feature through an index file
4. Document the feature in a README.md file

## License

[MIT License](LICENSE)
