import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="">
      <UserButton afterSignOutUrl="/"/>
      <h1>This is an authenticate route</h1>
    </div>
  );
}
