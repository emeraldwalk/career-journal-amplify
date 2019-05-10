import React, { useEffect, useRef, useState } from 'react';

export interface TextEditProps {
  display: (value: string) => string,
  onChange: (value: string) => void,
  value: string
};

const TextEdit: React.SFC<TextEditProps> = ({
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
        className="c_text-edit c_text-edit--edit"
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
        className="c_text-edit c_text-edit--view"
        onClick={() => setInEdit(true)}
      >{display(value)}</span>
  );
};

export default TextEdit;