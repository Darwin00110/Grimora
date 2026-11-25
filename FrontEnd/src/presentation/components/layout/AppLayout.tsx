import React from 'react';
import { GameHeader } from './GameHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, showHeader = true }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg-dark)',
        position: 'relative',
      }}
    >
      {/* Background stars */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: i % 5 === 0 ? 3 : 2,
              height: i % 5 === 0 ? 3 : 2,
              background: '#FFFFFF',
              opacity: 0.1 + Math.random() * 0.3,
              animation: `stars-twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {showHeader && <GameHeader />}

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: showHeader ? 72 : 0,
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
  );
};
