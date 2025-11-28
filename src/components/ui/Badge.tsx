import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'default' | 'active' | 'rotating' | 'idle';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
    const styles = {
        success: "bg-green-500/20 text-green-400 border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        default: "bg-gray-500/20 text-gray-400 border-gray-500/30",

        // If you want to keep your original variants:
        active: "bg-green-500/20 text-green-400 border-green-500/30",
        rotating: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        idle: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };

    return (
        <span
            className={cn(
                "px-2 py-1 rounded-full text-xs font-medium border",
                styles[variant]
            )}
        >
            {children}
        </span>
    );
};
