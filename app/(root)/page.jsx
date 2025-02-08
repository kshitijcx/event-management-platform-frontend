"use client"
import EventCard from "@/components/EventCard";
import Options from "@/components/Options";

const page = () => {
  const name = localStorage.getItem('user')
  return (
    <div>
      <h1 className="font-bold text-lg mb-3">Welcome! {name}</h1>
      <Options />
      <EventCard />
    </div>
  );
};
export default page;
