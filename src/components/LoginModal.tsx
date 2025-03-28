import React, { useState, useEffect } from 'react';
import AuthModal from './auth/AuthModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const LoginModal = ({ isOpen, onClose, initialMode = 'signin' }: LoginModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Update mode when initialMode changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  return (
    <AuthModal
      isOpen={isOpen}
      mode={mode}
      onClose={onClose}
      onSuccess={onClose}
      onModeChange={setMode}
    />
  );
};

export default LoginModal;