import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddProductPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill in the details to add a new product to your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product-name" className="text-sm font-medium">
              Product Name
            </label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="product-price" className="text-sm font-medium">
              Price
            </label>
            <Input
              id="product-price"
              type="number"
              placeholder="Enter price"
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="default">Add Product</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
