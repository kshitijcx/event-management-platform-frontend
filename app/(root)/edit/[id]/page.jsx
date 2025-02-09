"use client";
import CreateEvent from "@/components/CreateEvent";
import EditEvent from "@/components/EditEvent";
import useStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";

async function fetchEvent(id) {
  const resp = await fetch(`http://localhost:8000/api/events/${id}`);
  const data = await resp.json();
  return data;
}

const Edit = ({ params }) => {
  const { userId, userToken } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  const { data, error, isLoading } = useQuery({
    queryKey: ["EventToEdit"],
    queryFn: () => fetchEvent(id),
  });

  useEffect(() => {
    const getUserToken = () => {
      if (!loading && !userToken) {
        setLoading(false);
        router.push("/user");
      }
      if (userToken) {
        if (userToken === "guest") {
          router.push("/");
        }
        setLoading(false);
      } else {
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
      {isLoading && <Loader2 className="animate-spin mx-auto mt-32" />}
      {!isLoading && <EditEvent userId={userId} event={data} />}
    </div>
  );
};
export default Edit;
