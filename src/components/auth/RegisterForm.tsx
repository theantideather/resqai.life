import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      onSuccess?.();
    } catch (error: any) {
      onError?.(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-accent/80 text-sm font-mono mb-2 block">Email</label>
        <div className="relative">
          <input
            type="email"
            className="input font-mono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-accent/40" size={18} />
        </div>
      </div>

      <div>
        <label className="text-accent/80 text-sm font-mono mb-2 block">Password</label>
        <div className="relative">
          <input
            type="password"
            className="input font-mono"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            minLength={6}
          />
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-accent/40" size={18} />
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-full font-mono"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-background/20 border-t-background animate-spin rounded-full"></span>
            Processing...
          </span>
        ) : (
          'Create Account →'
        )}
      </button>
    </form>
  );
};