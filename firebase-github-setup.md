# Setting Up Firebase with GitHub Actions

This document explains how to set up Firebase authentication for the GitHub Actions workflow in this repository.

## Prerequisites

1. You have a Firebase project created at [Firebase Console](https://console.firebase.google.com/).
2. You have GitHub repository permissions to add secrets.

## Setup Steps

### Option 1: Using Firebase Service Account (Recommended)

1. Navigate to your [Firebase Console](https://console.firebase.google.com/) and select your project.

2. Go to Project Settings > Service Accounts.

3. Click "Generate new private key" for Firebase Admin SDK. This will download a JSON file.

4. Go to your GitHub repository > Settings > Secrets and variables > Actions.

5. Add a new repository secret:
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: *Paste the entire content of the downloaded JSON file*

### Option 2: Using Firebase CI Token (Alternative)

1. Generate a Firebase CI token using the Firebase CLI:
   ```
   firebase login:ci
   ```
   
2. Follow the authentication flow in your browser.

3. Copy the token displayed in your terminal.

4. Go to your GitHub repository > Settings > Secrets and variables > Actions.

5. Add a new repository secret:
   - Name: `FIREBASE_TOKEN`
   - Value: *Paste the token you copied*

6. Update the GitHub Actions workflow file (`.github/workflows/firebase-deploy.yml`) to use the token instead of the service account:

   ```yaml
   - name: Deploy to Firebase Hosting
     uses: FirebaseExtended/action-hosting-deploy@v0
     with:
       repoToken: '${{ secrets.GITHUB_TOKEN }}'
       firebaseToken: '${{ secrets.FIREBASE_TOKEN }}'
       projectId: czepbuilds-portfolio
       channelId: live
   ```

## Verifying the Setup

After adding the secret and pushing changes to your repository:

1. Go to the "Actions" tab in your GitHub repository.
2. You should see the workflow running when you push to the main branch.
3. If successful, your site will be deployed to Firebase Hosting automatically.

## Troubleshooting

- If you see authentication errors, verify that your secret is correct and properly formatted.
- Make sure your Firebase project ID in the workflow file matches your actual Firebase project.
- Check that you have the correct permissions in your Firebase project. 