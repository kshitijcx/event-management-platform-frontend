"use client";
import EventCard from "@/components/EventCard";
import Options from "@/components/Options";
import useStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getEvents() {
  const resp = await fetch("http://localhost:8000/api/events/all");
  if (!resp.ok) {
    console.log(error);
  }
  const data = await resp.json();
  return data;
}

const page = () => {
  const { userToken, userName } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    enabled: !!userToken,
  });

  useEffect(() => {
    const getUserToken = () => {
      if (userToken) {
        setLoading(false);
      } else {
        setLoading(false);
      }
      if (!userToken && !loading) {
        setLoading(false);
        router.push("/user");
      }
    };
    getUserToken();
  }, [loading, userToken]);

  if (loading) {
    return <Loader2 className="animate-spin mx-auto mt-32" />;
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-lg mb-3">
        Welcome! {userName ? userName : "Guest"}
      </h1>
      {!loading && <Options userType={userToken} />}
      {isLoading && <Loader2 className="animate-spin mx-auto mt-32" />}
      <div className="mx-auto flex flex-wrap gap-4 mt-4 max-md:flex-col items-center">
        {!isLoading &&
          data?.map((item) => (
            <EventCard
              key={item._id}
              item={item}
              refetch={refetch}
              userType={userToken}
            />
          ))}
      </div>
    </div>
  );
};
export default page;
