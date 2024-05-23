"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-query";

export default function Home() {
  const { data: accounts, isLoading } = useGetAccounts();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      home page
    </div>
  );
}
