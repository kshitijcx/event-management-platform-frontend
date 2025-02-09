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

  const [filters, setFilters] = useState({
    category: "",
    month: "",
    time: "",
  });

  const isUpcoming = (eventDate) => new Date(eventDate) > new Date();
  const isPast = (eventDate) => new Date(eventDate) < new Date();

  const {
    data: events,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    enabled: !!userToken,
  });

  const isFilterApplied = filters.category || filters.month || filters.time;

  // Filter events based on selected criteria if filters are applied
  const filteredEvents = events?.filter((event) => {
    if (!isFilterApplied) return true; // If no filter is applied, show all events

    let matchesCategory = true;
    let matchesMonth = true;
    let matchesTime = true;

    // Filter by category
    if (filters.category) {
      matchesCategory =
        event.category.toLowerCase() === filters.category.toLowerCase();
        console.log(event.category.toLowerCase(),filters.category.toLowerCase())
    }

    // Filter by month
    if (filters.month) {
      const eventMonth = new Date(event.date).toLocaleString("default", {
        month: "long",
      });
      matchesMonth = eventMonth.toLowerCase() === filters.month.toLowerCase();
      console.log(eventMonth.toLowerCase(), filters.month.toLowerCase())
    }

    // Filter by upcoming or past
    if (filters.time === "upcoming") {
      matchesTime = isUpcoming(event.date);
    } else if (filters.time === "past") {
      matchesTime = isPast(event.date);
    }

    return matchesCategory && matchesMonth && matchesTime;
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

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
      {!loading && (
        <Options
          userType={userToken}
          filters={filters}
          updateFilters={updateFilters}
        />
      )}
      {isLoading && <Loader2 className="animate-spin mx-auto mt-32" />}
      <div className="mx-auto flex flex-wrap gap-4 mt-4 max-md:flex-col items-center">
        {!isLoading &&
          (filteredEvents?.length === 0 ? (
            <p>Nothing to show...</p>
          ) : (
            filteredEvents?.map((item) => (
              <EventCard
                key={item._id}
                item={item}
                refetch={refetch}
                userType={userToken}
              />
            ))
          ))}
      </div>
    </div>
  );
};
export default page;
