import React, { useEffect, useRef, useState } from 'react';
import { classes } from '../../util/common';

/**
 * Sanitize display text.
 */
function displaySanitize(
  value: string,
  display: (value: string) => React.ReactNode
) {
  const displayValue = display(value);

  if(displayValue === '') {
    return <span>&nbsp;</span>;
  }

  return displayValue;
}

export interface TextEditProps {
  className?: string,
  display: (value: string) => React.ReactNode,
  onChange: (value: string) => void,
  value: string
};

const TextEdit: React.SFC<TextEditProps> = ({
  className,
  display,
  onChange,
  value: valueRaw
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inEdit, setInEdit] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [value, setValue] = useState(valueRaw);

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, [inEdit]);

  return (
    inEdit
      ? <input
        className={classes('c_text-edit', 'c_text-edit--edit', className)}
        onBlur={() => {
          setInEdit(false);
          if(isDirty) {
            onChange(value);
          }
          setIsDirty(false);
        }}
        onChange={event => {
          setIsDirty(true);
          setValue(event.currentTarget.value);
        }}
        ref={inputRef}
        type="text"
        value={value}
        />
      : <span
        className={classes('c_text-edit', 'c_text-edit--view', className)}
        onClick={() => setInEdit(true)}
      >{displaySanitize(value, display)}</span>
  );
};

export default TextEdit;