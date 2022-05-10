import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

const Input = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} {...rest} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
