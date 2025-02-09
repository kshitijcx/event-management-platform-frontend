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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useStore from "@/store/userStore";
import Link from "next/link";

import { io } from "socket.io-client";
import _ from "lodash";

const socket = io("http://localhost:8000");

const EventCard = ({ item, refetch }) => {
  const { userId } = useStore();

  const debounceUpdate = _.debounce((eventId, inc) => {
    if (inc) {
      socket.emit("inc", eventId);
    } else {
      socket.emit("dec", eventId);
    }
  }, 500);

  const handleInc = () => {
    debounceUpdate(item._id, true);
  };
  const handleDec = () => {
    debounceUpdate(item._id, false);
  };

  useEffect(() => {
    socket.on("attendeeCountUpdated", () => {
      refetch();
    });

    return () => {
      socket.off("attendeeCountUpdated");
    };
  }, [item._id]);

  const handleDelete = async (id, postUserId) => {
    const data = { userId: userId, postUserId: postUserId };
    const resp = await fetch(`http://localhost:8000/api/events/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resp.ok) {
      console.log(resp);
    } else {
      refetch();
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Date: {format(item.date, "dd-MM-yyyy")}</p>

            <div className="flex items-center gap-2">
              <p>Attendees: </p>
              <Button
                className="rounded-full"
                size="sm"
                variant="ghost"
                onClick={handleDec}
                disabled={item.attendees === 0 || userId !== item.userId}
              >
                <Minus />
              </Button>
              <p>
                {item.attendees}/{item.attendeesLimit}
              </p>
              <Button
                className="rounded-full"
                size="sm"
                variant="ghost"
                onClick={handleInc}
                disabled={
                  item.attendees === item.attendeesLimit || userId !== item.userId
                }
              >
                <Plus />
              </Button>
            </div>

            <p>Category: {item.category}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="destructive"
            className="w-16"
            disabled={item.userId !== userId}
            onClick={() => handleDelete(item._id, item.userId)}
          >
            Delete
          </Button>
          <Button className="w-16" disabled={item.userId !== userId}>
            <Link href={`/edit/${item._id}`}>Edit</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default EventCard;
