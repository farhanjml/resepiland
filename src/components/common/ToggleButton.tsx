import React from 'react';
import { Check, Plus, Loader2 } from 'lucide-react';

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  activeClassName?: string;
  inactiveClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isToggled,
  onToggle,
  activeClassName = 'bg-green-100 text-green-600 hover:bg-green-200',
  inactiveClassName = 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={disabled || isLoading}
      className={`p-1 rounded-full transition-colors ${
        isToggled ? activeClassName : inactiveClassName
      } ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-pressed={isToggled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isToggled ? (
        <Check className="w-5 h-5" />
      ) : (
        <Plus className="w-5 h-5" />
      )}
    </button>
  );
};

export default ToggleButton;