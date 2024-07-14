import { SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
}

const DatePicker = ({ value, onChange, disabled }: Props) => {
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
           
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}