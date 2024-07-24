import React from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string | undefined ) => void;
  disabled?: boolean;
  placeholder?: string;
}
 
export const AmountInput = ({
  value,
  onChange,
  disabled,
  placeholder
}: AmountInputProps) => {
  return (
    <div className="">hellow</div>
  );
}
 
