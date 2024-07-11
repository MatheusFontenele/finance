"use client"
import CreateAbleSelect  from "react-select/creatable"

type props = {
  onChange: (value: string) => void;
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
  return <CreateAbleSelect
  />
}