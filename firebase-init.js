/**
 * Firebase Project Initialization Helper
 * 
 * This script helps with initializing a Firebase project in a step-by-step manner.
 * Run this script with Node.js:
 * 
 * npm install -g firebase-tools
 * node firebase-init.js
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeCommand = (command) => {
  try {
    console.log(`Executing: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
};

const steps = [
  {
    title: 'Step 1: Ensure Firebase CLI is installed',
    action: () => {
      console.log('Checking Firebase CLI installation...');
      try {
        execSync('firebase --version', { encoding: 'utf8' });
        console.log('Firebase CLI is installed.');
        return true;
      } catch (error) {
        console.log('Firebase CLI is not installed. Please install it with:');
        console.log('npm install -g firebase-tools');
        return false;
      }
    }
  },
  {
    title: 'Step 2: Login to Firebase',
    action: () => {
      console.log('Logging in to Firebase...');
      return executeCommand('firebase login');
    }
  },
  {
    title: 'Step 3: Initialize Firebase project',
    action: () => {
      return new Promise((resolve) => {
        rl.question('Do you want to initialize a new Firebase project or use an existing one? (new/existing): ', (answer) => {
          if (answer.toLowerCase() === 'new') {
            console.log('Initializing new Firebase project...');
            rl.question('Enter your new project ID (e.g., czepbuilds-portfolio): ', (projectId) => {
              executeCommand(`firebase projects:create ${projectId}`);
              executeCommand(`firebase use ${projectId}`);
              resolve(true);
            });
          } else {
            console.log('Using existing Firebase project...');
            executeCommand('firebase projects:list');
            rl.question('Enter your existing project ID: ', (projectId) => {
              executeCommand(`firebase use ${projectId}`);
              resolve(true);
            });
          }
        });
      });
    }
  },
  {
    title: 'Step 4: Initialize Firebase hosting',
    action: () => {
      console.log('Initializing Firebase hosting...');
      console.log('Note: When prompted, select the following options:');
      console.log('- Select "Hosting: Configure files for Firebase Hosting..."');
      console.log('- Public directory: frontend/dist');
      console.log('- Configure as a single-page app: Yes');
      console.log('- Set up automatic builds and deploys with GitHub: No (we\'ll use our own GitHub Actions)');
      return executeCommand('firebase init hosting');
    }
  },
  {
    title: 'Step 5: Initialize Firebase functions (optional)',
    action: () => {
      return new Promise((resolve) => {
        rl.question('Do you want to set up Firebase Functions? (y/n): ', (answer) => {
          if (answer.toLowerCase() === 'y') {
            console.log('Initializing Firebase functions...');
            console.log('Note: When prompted, select the following options:');
            console.log('- Language: TypeScript');
            console.log('- ESLint: Yes');
            console.log('- Install dependencies: Yes');
            executeCommand('firebase init functions');
          }
          resolve(true);
        });
      });
    }
  },
  {
    title: 'Step 6: Generate Firebase CI token',
    action: () => {
      console.log('Generating Firebase CI token for GitHub Actions...');
      console.log('Copy the token that appears and add it as a GitHub secret.');
      return executeCommand('firebase login:ci');
    }
  }
];

async function runSteps() {
  console.log('Firebase Project Initialization Helper');
  console.log('=====================================');
  
  for (let i = 0; i < steps.length; i++) {
    console.log(`\n${steps[i].title}`);
    console.log('-'.repeat(steps[i].title.length));
    
    const result = await steps[i].action();
    
    if (!result) {
      console.log(`\nFailed at step ${i + 1}. Please fix the issue and run the script again.`);
      break;
    }
    
    if (i < steps.length - 1) {
      await new Promise((resolve) => {
        rl.question('\nPress Enter to continue to the next step...', () => {
          resolve();
        });
      });
    }
  }
  
  console.log('\nFirebase initialization complete!');
  console.log('Don\'t forget to check out firebase-github-setup.md for instructions on setting up GitHub Actions.');
  rl.close();
}

runSteps(); 