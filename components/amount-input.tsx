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
  const parseValue = parseFloat(value);
  const isIncome = parseValue > 0;
  const isExpense = parseValue < 0;

  const onReverseValue = () => {
    if (!value)  return;
    const newValue = (parseValue * -1);
    onChange(newValue.toString());
  }
  return (
    <div className="">hellow</div>
  );
}
 
