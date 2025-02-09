import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Options = ({ userType, filters, updateFilters }) => {
  const { category, month, time } = filters;

  const handleFilterChange = (e, filterType) => {
    const updatedFilters = { ...filters };
    updatedFilters[filterType] = e;
    updateFilters(updatedFilters);
    console.log(e);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex justify-between gap-3">
      <div className="flex max-md:flex-col gap-3">
        <Select
          onValueChange={(e) => handleFilterChange(e, "time")}
          value={time}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Upcoming" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(e) => handleFilterChange(e, "category")}
          value={category}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Cultural">Cultural</SelectItem>
            <SelectItem value="Fitness">Fitness</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(e) => handleFilterChange(e, "month")}
          value={month}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {userType !== "guest" && (
        <div className="flex max-md:flex-col gap-3">
          <Button asChild>
            <Link href="/create">
              Create Event <PlusCircle />
            </Link>
          </Button>
          <Button variant="destructive">Logout</Button>
        </div>
      )}
    </div>
  );
};
export default Options;
