import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}

export const DatePicker = ({ value, onChange, disabled }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={
            cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )
          }
        >
          <CalendarIcon className="size-4 mr-2" /> 
          {value ? value.toDateString() : "Select a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto z-[999] bg-white border border-gray-200 shadow-lg rounded-lg"
        align="center"
        avoidCollisions={false}
        style={{
          maxHeight: "var(--radix-popover-content-available-height)",
          overflowY: "auto",
        }}

      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}