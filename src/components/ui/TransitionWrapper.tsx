import React, { useRef, useEffect } from 'react';

interface TransitionWrapperProps {
  children: React.ReactNode;
  show: boolean;
  duration?: number;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ 
  children, 
  show, 
  duration = 300 
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    if (show) {
      // Enter animation
      node.style.opacity = '0';
      node.style.transform = 'translateY(20px)';
      
      // Force a reflow to ensure the initial styles are applied
      node.offsetHeight;
      
      // Apply transition
      node.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
      node.style.opacity = '1';
      node.style.transform = 'translateY(0)';
    } else {
      // Exit animation
      node.style.opacity = '0';
      node.style.transform = 'translateY(-20px)';
    }
  }, [show, duration]);

  if (!show) return null;

  return (
    <div 
      ref={nodeRef} 
      style={{ 
        opacity: 0,
        transform: 'translateY(20px)',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
