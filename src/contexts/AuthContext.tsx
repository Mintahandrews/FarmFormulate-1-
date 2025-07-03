import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from '../hooks/useTranslation';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
} | null;

type AuthContextType = {
  currentUser: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Mock authentication functions - in a real app, these would connect to your auth service
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would validate credentials with your backend
    if (!email || !password) {
      throw new Error(t('invalidCredentials') || 'Invalid email or password');
    }
    
    // Set a mock user
    setCurrentUser({
      uid: 'mock-user-id',
      email,
      displayName: email.split('@')[0],
      photoURL: null
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would create a new user in your backend
    if (!email || !password || !name) {
      throw new Error(t('missingFields') || 'Please fill in all fields');
    }
    
    // Set a mock user
    setCurrentUser({
      uid: 'mock-user-id',
      email,
      displayName: name,
      photoURL: null
    });
  };

  const logout = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentUser(null);
  };

  const resetPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email) {
      throw new Error(t('emailRequired') || 'Email is required');
    }
    
    // In a real app, you would send a password reset email
    return;
  };

  const updateEmail = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!currentUser) {
      throw new Error(t('notAuthenticated') || 'Not authenticated');
    }
    
    setCurrentUser({
      ...currentUser,
      email
    });
  };

  const updatePassword = async (password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!currentUser) {
      throw new Error(t('notAuthenticated') || 'Not authenticated');
    }
    
    // In a real app, you would update the password in your backend
    return;
  };

  const updateProfile = async (displayName: string, photoURL?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!currentUser) {
      throw new Error(t('notAuthenticated') || 'Not authenticated');
    }
    
    setCurrentUser({
      ...currentUser,
      displayName,
      photoURL: photoURL || currentUser.photoURL
    });
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, you would check for an existing session
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Update local storage when user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
