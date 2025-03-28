import React from 'react';
import { X } from 'lucide-react';
import AuthForm from './AuthForm';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess?: () => void;
  onModeChange?: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  mode, 
  onClose, 
  onSuccess,
  onModeChange 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <AuthForm 
          mode={mode} 
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
          onModeChange={onModeChange}
        />
      </div>
    </div>
  );
};

export default AuthModal;