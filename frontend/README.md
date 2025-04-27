# CzepBuilds Portfolio Frontend

## Project Overview
This is the frontend for the CzepBuilds portfolio website, built with React, TypeScript, and Vite.

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Shared UI components
│   ├── features/        # Feature-specific code
│   │   └── vpd-calculator/  # VPD Calculator feature
│   │       ├── components/  # React components
│   │       ├── styles/      # CSS styles
│   │       ├── utils/       # Utility functions
│   │       └── index.ts     # Feature exports
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components
│   ├── parallax-design/ # Parallax UI components
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
└── vite.config.ts       # Vite configuration
```

## Features
- **Parallax Home Page**: Interactive project showcase with parallax scrolling
- **VPD Calculator**: Vapor Pressure Deficit calculator for controlled environment agriculture
- **Media Showcase**: Gallery of media items
- **Project Pages**: Detailed pages for various projects

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Feature Development Guidelines

### Adding New Features
New features should be organized in their own directory under `src/features/` with the following structure:

```
features/
└── feature-name/
    ├── components/      # React components
    ├── styles/          # CSS styles
    ├── utils/           # Utility functions
    ├── hooks/           # Feature-specific hooks (if needed)
    ├── types/           # TypeScript types (if needed)
    ├── README.md        # Feature documentation
    └── index.ts         # Exports
```

### Code Style Guidelines
- Use functional components with hooks
- Follow TypeScript best practices
- Keep components small and focused
- Use CSS modules or scoped CSS

## Deployment
The site is deployed through Firebase Hosting.

```bash
# Deploy to Firebase
npm run deploy
```
