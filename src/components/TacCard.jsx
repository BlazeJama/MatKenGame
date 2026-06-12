import React from 'react';
import TargetBrackets from './TargetBrackets';

// Dark translucent card with amber border and corner brackets
export default function TacCard({ children, className = "", style: extraStyle = {}, ...rest }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: "rgba(26,39,68,0.45)",
        border: "1px solid rgba(245,158,11,0.18)",
        borderRadius: 2,
        ...extraStyle,
      }}
      {...rest}
    >
      <TargetBrackets size={14} thickness={2} inset={-1} />
      {children}
    </div>
  );
}
