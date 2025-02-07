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

const EventCard = () => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">Christmas Gathering</CardTitle>
          <CardDescription>
            A small gathering with our community on Chirstmas Eve
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Date: {"25/12/2025"}</p>

            <div className="flex items-center gap-3">
              <p>Attendees: </p>
              <Button className="rounded-full" size="sm" variant="ghost">
                <Minus />
              </Button>{" "}
              {"35"}{" "}
              <Button className="rounded-full" size="sm" variant="ghost">
                <Plus />
              </Button>
            </div>

            <p>
              Category: {"fun"} {"party"}
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
