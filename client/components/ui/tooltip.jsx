import React from 'react';

export const TooltipProvider = ({ children }) => <>{children}</>;

export const Tooltip = ({ children }) => <>{children}</>;

export const TooltipTrigger = ({ children, asChild }) => {
  return asChild ? React.cloneElement(children) : <span>{children}</span>;
};

export const TooltipContent = ({ children }) => (
  <div className="rounded-md border bg-card px-2 py-1 text-xs shadow">{children}</div>
);

export default Tooltip;
