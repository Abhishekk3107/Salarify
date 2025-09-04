import React from 'react';

export const RadioGroup = ({ children, value, onValueChange, className }) => (
  <div className={className} role="radiogroup" aria-label="Radio Group">
    {React.Children.map(children, (child) => {
      return React.cloneElement(child, { name: 'radio-group', onChange: (e) => onValueChange(e.target.value), checked: child.props.value === value });
    })}
  </div>
);

export const RadioGroupItem = ({ value, id, checked, onChange }) => (
  <input type="radio" id={id} value={value} checked={checked} onChange={onChange} className="h-4 w-4" />
);

export default RadioGroup;
