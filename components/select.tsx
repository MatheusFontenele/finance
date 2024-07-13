"use client"
import { useMemo } from "react";
import { SingleValue } from "react-select"
import CreateAbleSelect  from "react-select/creatable"

type props = {
  onChange: (value?: string) => void;
  onCreate: (name: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string; 
}

export const Select = ({
  onChange,
  onCreate,
  options = [],
  value,
  disabled,
  placeholder
}: props) => {
  const onSelect = (
    option: SingleValue<{label: string, value: string}> 
  ) => {
    onChange(option?.value)
  }
  const formatedValue = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])
  return (
    <CreateAbleSelect 
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "E2E8F0",
          ":hover": {
            borderColor: "E2E8F0"
          }
        })
      }}
      value={formatedValue}
      options={options}
      onChange={onSelect}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  )
}