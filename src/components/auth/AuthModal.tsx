import React, { useState } from 'react';
import { X, Square } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSuccess = () => {
    if (isLogin) {
      onClose();
    } else {
      setSuccess('Registration successful! Please check your email to verify your account.');
    }
  };

  const handleError = (message: string) => {
    setError(message);
    setSuccess('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="terminal-card w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-background border border-accent/20 rounded-full flex items-center justify-center text-accent hover:text-accent/80 hover:border-accent transition-colors"
        >
          <X size={16} />
        </button>
        
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Square className="text-accent w-16 h-16 rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Square className="text-accent w-8 h-8" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-accent glow-text mb-2">
          Access Terminal
        </h2>
        <p className="text-center text-accent/60 mb-8 font-mono text-sm">
          Initialize authentication sequence
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-md mb-6 text-sm">
            {success}
          </div>
        )}

        <div className="flex gap-8 mb-8">
          <button
            className={`flex-1 pb-2 border-b-2 transition-colors font-mono ${
              isLogin ? 'border-accent text-accent' : 'border-accent/20 text-accent/40'
            }`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccess('');
            }}
          >
            Sign In
          </button>
          <button
            className={`flex-1 pb-2 border-b-2 transition-colors font-mono ${
              !isLogin ? 'border-accent text-accent' : 'border-accent/20 text-accent/40'
            }`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccess('');
            }}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <LoginForm onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onError={handleError} />
        )}
      </div>
    </div>
  );
};