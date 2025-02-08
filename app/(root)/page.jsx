"use client";
import EventCard from "@/components/EventCard";
import Options from "@/components/Options";
import useStore from "@/store/userStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { userToken,userName } = useStore();
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
      <h1 className="font-bold text-lg mb-3">Welcome! {userName}</h1>
      <Options />
      <EventCard />
    </div>
  );
};
export default page;
