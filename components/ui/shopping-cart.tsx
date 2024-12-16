import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "MemoryPlate",
      description: "Metalna qr plocica.",
      price: 4950,
      quantity: 1,
      image: "/qrCode-graveyard.jpg",
    },
  ]);

  const handleQuantityChange = (id: number, newQuantity: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Number(newQuantity) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-12">
      {/* Main Content */}
      <div className="grid gap-6">
        {/* Header */}
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Vaša Korpa</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Pogledajte proizvode u vašoj korpi i nastavite sa kupovinom.
          </p>
        </div>

        {/* Cart Items */}
        <div className="border rounded-lg overflow-hidden">
          {/* Header Row (Visible on all screens) */}
          <div className="grid grid-cols-[100px_1fr_auto] items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3">
            <span className="font-medium text-sm sm:text-base">Proizvod</span>
            <span className="font-medium text-sm sm:text-base text-right">Količina</span>
          </div>

          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="border-t dark:border-gray-700 px-4 py-3 flex flex-wrap sm:grid sm:grid-cols-[100px_1fr_auto] sm:items-center gap-4"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
              />

              {/* Details */}
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-center gap-4 justify-end flex-wrap">
                <span className="font-medium text-sm sm:text-base whitespace-nowrap">
                  рсд{item.price}
                </span>
                <Select
                  defaultValue={item.quantity.toString()}
                  onValueChange={(value) => handleQuantityChange(item.id, value)}
                >
                  <SelectTrigger className="w-[60px] h-[30px] text-sm">
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <SelectItem key={qty} value={qty.toString()}>
                        {qty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Ukupna Suma</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-medium">рсд{total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Isporuka</span>
              <span className="font-medium">рсд0.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span className="m-2">Ukupno:</span>
              <span>рсд{total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
