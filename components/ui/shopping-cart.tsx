
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function ShoppingCart() {
  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Vaša Korpa</h1>
          <p className="text-gray-500 dark:text-gray-400">Pogledajte proizvod u vašoj korpi i nastavite sa kupovinom.</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3">
              <span className="font-medium">Proizvod</span>
              <span className="font-medium">Cena</span>
              <span className="font-medium text-right">Količina</span>
            </div>
            <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 px-4 py-3 border-t dark:border-gray-700">
              <Image
                src="/qrCode-graveyard.jpg"
                alt="Product Image"
                width={100}
                height={100}
                className="rounded-md object-cover"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-medium">MemoryPlate</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Metalna qr plocica.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="font-medium">рсд4950</span>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Ukupna Suma</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-medium">4950.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Isporuka</span>
              <span className="font-medium">0.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Ukupno</span>
              <span>4950.00</span>
            </div>
          </CardContent>

        </Card>
      </div>
    </div>
  )
}
