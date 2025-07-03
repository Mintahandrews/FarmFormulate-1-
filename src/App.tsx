import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import Analytics from './pages/Analytics';
import Help from './pages/Help';
import { Header } from './components/Header';
import { useLanguageChangeListener } from './hooks/useLanguageChangeListener';
import { useTranslation } from './hooks/useTranslation';
import './index.css';

// Main App Wrapper with Router
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

// Main App Content with Routes
function AppContent() {
  const { loading, currentUser } = useAuth();
  const { t } = useTranslation();
  
  // This will force a re-render when language changes
  useLanguageChangeListener();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header is now self-contained and will only show on authenticated routes */}
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/app" /> : <LoginPage />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/app" /> : <SignupPage />} />
          
          {/* Protected Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/forms" element={
            <ProtectedRoute>
              <Forms />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={currentUser ? "/app" : "/"} replace />} />
        </Routes>
      </main>
      
      {/* Global loading indicator */}
      <div id="loading-indicator" className="fixed top-4 right-4 z-50 hidden">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span className="text-sm font-medium">{t('loading')}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
