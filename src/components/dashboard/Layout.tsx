import React from 'react';
import { Activity, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-accent" size={24} />
            <span className="text-xl font-bold text-accent">ResQ</span>
          </div>
          <button
            onClick={handleSignOut}
            className="btn btn-outline flex items-center gap-2"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};