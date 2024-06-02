"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { EditIcon, MoreHorizontalIcon } from "lucide-react";
import { useEffect } from "react";

interface IActionsProps {
  id: string;
  s
}

const Actions: React.FunctionComponent<IActionsProps> = ({ id }: IActionsProps) => {
  const { isOpen, onOpen } = useOpenAccount();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreHorizontalIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={false}
            onClick={() => onOpen(id)}
          > 
            <EditIcon className="size-4 mr-2"/> Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
