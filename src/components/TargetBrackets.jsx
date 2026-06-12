import React from 'react';

// Four amber corner brackets — used to frame cards and the target image
export default function TargetBrackets({ size = 18, color = "#f59e0b", thickness = 2, inset = -1 }) {
  const common = { position: "absolute", width: size, height: size, borderColor: color };
  const line   = `${thickness}px solid ${color}`;
  return (
    <>
      <div style={{ ...common, top: inset, left: inset,   borderTop: line, borderLeft: line }} />
      <div style={{ ...common, top: inset, right: inset,  borderTop: line, borderRight: line }} />
      <div style={{ ...common, bottom: inset, left: inset,  borderBottom: line, borderLeft: line }} />
      <div style={{ ...common, bottom: inset, right: inset, borderBottom: line, borderRight: line }} />
    </>
  );
}
