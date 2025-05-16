import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ItemCard({ image, name, onDelete }) {
  return (
    <Card className="w-[300px] shadow-md rounded-2xl mb-3">
      <CardHeader className="p-4">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4">
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
        <Button variant="destructive" onClick={onDelete}>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}
