import React from 'react';

export const ChartContainer = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const ChartTooltip = () => null;
export const ChartTooltipContent = ({ children }) => <div>{children}</div>;
export default ChartContainer;
