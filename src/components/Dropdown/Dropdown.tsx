import React from 'react';

export interface DropdownProps {
  el: React.ComponentType,
  label: string,
  onChange: (value: string) => void,
  selected: string,
  items: { display: string, value: string }[]
};

const Dropdown: React.SFC<DropdownProps> = ({
  el: El,
  label,
  onChange,
  selected,
  items
}) => (
  <El>
    <label>{label}</label>
    <select
      className="c_dropdown"
      onChange={event => onChange(event.currentTarget.value)}
      value={selected}>
      <option value="">--</option>
      {
        items.map(({ display, value }) => (
          <option key={value} value={value}>{display}</option>
        ))
      }
    </select>
  </El>
);

export default Dropdown;