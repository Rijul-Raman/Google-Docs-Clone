import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import Clerk publishable key from environment variables
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder_key';

// To avoid breaking the app during development, provide a placeholder
if (!publishableKey || publishableKey === 'pk_test_placeholder_key') {
  console.warn('No Clerk publishable key found. Using development mode.');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
