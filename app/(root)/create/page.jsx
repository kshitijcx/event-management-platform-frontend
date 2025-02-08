"use client";
import CreateEvent from "@/components/CreateEvent";
import useStore from "@/store/userStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Create = () => {
  const { userId, userToken } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserToken = () => {
      if (!loading && !userToken) {
        setLoading(false);
        router.push("/user");
      }
      if (userToken) {
        setLoading(false);
      }
    };
    getUserToken();
  }, [loading, userToken]);

  if (loading) {
    return <Loader2 className="animate-spin mx-auto mt-32" />;
  }
  return (
    <div className="p-6">
      <CreateEvent />
    </div>
  );
};
export default Create;
