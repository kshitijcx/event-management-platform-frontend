import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";

const EventCard = ({item}) => {

  const [attendees,setAttendees] = useState(0);

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <CardDescription>
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Date: {format(item.date,"dd-MM-yyyy")}</p>

            <div className="flex items-center gap-2">
              <p>Attendees: </p>
              <Button className="rounded-full" size="sm" variant="ghost">
                <Minus />
              </Button>
              <p>{attendees}/{item.attendeesLimit}</p>
              <Button className="rounded-full" size="sm" variant="ghost">
                <Plus />
              </Button>
            </div>

            <p>
              Category: {item.category}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" className="w-16">
            Delete
          </Button>
          <Button className="w-16">Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default EventCard;
