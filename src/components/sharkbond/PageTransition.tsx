'use client';

import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  return (
    <div key={pageKey}>
      {children}
    </div>
  );
};

export default PageTransition;
