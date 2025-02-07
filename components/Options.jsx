import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";

const Options = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="flex justify-between gap-3">
      <div className="flex max-md:flex-col gap-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Upcoming" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="cultural">Cultural</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
          </SelectContent>
        </Select>

        <Select>
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

      <div className="flex max-md:flex-col gap-3">
        <Button>
          Create Event <PlusCircle />
        </Button>
        <Button variant="destructive">Logout</Button>
      </div>
    </div>
  );
};
export default Options;
