import { Button } from "@/components/ui/button";
import Link from "next/link";

const RootAuthPage = () => {
  return (
    <div className="flex flex-col gap-4 w-80 p-6 border border-neutral-400 rounded-2xl">
      <Button asChild>
        <Link href="/user/sign-in">Continue as Event Manager</Link>
      </Button>
      <Button asChild>
        <Link href="/">Continue as Guest</Link>
      </Button>
    </div>
  );
};
export default RootAuthPage;
