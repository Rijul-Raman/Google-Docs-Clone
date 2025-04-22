import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { TextEditor } from "./components/TextEditor"
import { LandingPage } from "./components/LandingPage"
import { SignIn, SignUp, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react"

// Protected route component to ensure authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <SignedIn>
                <LandingPage />
              </SignedIn>
              <SignedOut>
                <div className="auth-container">
                  <h1>Google Docs Clone</h1>
                  <div className="auth-box">
                    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
                  </div>
                </div>
              </SignedOut>
            </>
          } />
          <Route path="/sign-up" element={
            <div className="auth-container">
              <h1>Google Docs Clone</h1>
              <div className="auth-box">
                <SignUp path="/sign-up" routing="path" signInUrl="/" />
              </div>
            </div>
          } />
          <Route path="/documents/:id" element={
            <ProtectedRoute>
              <TextEditor />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
