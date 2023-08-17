import React from 'react';
import './Checkbox.css';

type CheckboxProps = {
  id?: string;
  label?: string;
  checked: boolean;
  labelClickable?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLabelClick?: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, labelClickable, onChange, onLabelClick }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(e);
  };

  return (
    <div className="checkboxWrapper">
      <div className="checkboxContainer" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          id={id}
          className="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <span className="checkboxIcon"></span>
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className={`checkboxLabel${labelClickable ? ' clickable' : ''}`} 
          onClick={labelClickable ? onLabelClick : undefined}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
