import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  error: null
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("AuthProvider: Initializing...");
    
    // Function to safely get the session
    const getInitialSession = async () => {
      try {
        console.log("AuthProvider: Retrieving session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("AuthProvider: Error retrieving session", error);
          setError(error);
          setLoading(false);
          return;
        }
        
        console.log("AuthProvider: Session retrieved", data?.session ? "with session" : "without session");
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (err) {
        console.error("AuthProvider: Unexpected error during getSession", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    try {
      console.log("AuthProvider: Setting up auth state listener");
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("AuthProvider: Auth state changed", event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        console.log("AuthProvider: Cleaning up subscription");
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error("AuthProvider: Error setting up auth listener", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, []);

  // Log state when it changes
  useEffect(() => {
    console.log("AuthProvider state:", { 
      isLoading: loading, 
      hasSession: !!session, 
      hasUser: !!user, 
      hasError: !!error 
    });
  }, [loading, session, user, error]);

  // Provide a fallback UI if there's an authentication error, but still render children
  return (
    <AuthContext.Provider value={{ session, user, loading, error }}>
      {error && (
        <div style={{ padding: '10px', margin: '10px', background: '#fff3f3', color: '#d00', border: '1px solid #fcc' }}>
          <p>Auth Warning: {error.message}</p>
          <small>The application will continue to work, but some features may be limited.</small>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};