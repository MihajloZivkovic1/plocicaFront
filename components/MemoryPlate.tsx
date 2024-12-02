import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Package, Truck, Zap } from 'lucide-react'
import Link from "next/link"
export default function MemoryPlate() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 order-2 lg:order-1">
          <div className="relative w-full">
            <Image
              src="/digital-qr-grave.jpg"
              alt="Gravestone with QR code"
              width={500}
              height={300}
              layout="responsive"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex-1 order-1 lg:order-2">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Kreirajte uspomene za vaše najdraže</h3>
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">MemoryPlate</h2>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              MemoryPlate nudi jedinstven način odavanja počasti i pamćenja svojih najmilijih. Naše QR Kod pločice za nadgrobne споменике
              kreiraju digitalni spomenik koji oživljava uspomene. Posetioci mogu da pristupe jednostavnim skeniranjem QR Koda
              online stranici ispunjenoj fotografijama, video zapisima i pričama koje slave život vaše voljene osobe koje je preminula.
              Ovo Inovativno rešenje vam omogućava da sačuvate i delite negovane uspomene za generacije koje dolaze, stvarajuci
              trajno digitalno nasledje koje prevazilazi tradicionalne memorijale.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg inline-block mb-6">
              <div className="text-gray-500 text-lg line-through">5500рсд</div>
              <div className="text-4xl md:text-5xl font-bold text-black-600">
                4950рсд
              </div>
              <p className="text-sm text-black-500 mt-2">10% Popusta!</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-8 w-8 mb-2" />
                <span className="text-sm">Besplatna Dostava</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Package className="h-8 w-8 mb-2" />
                <span className="text-sm">Sigurno Pakovanje</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-8 w-8 mb-2" />
                <span className="text-sm">Laka Aktivacija</span>
              </div>
            </div>
          </div>
          <Link href={"/order-now"} >
            <Button size="lg" className="w-full sm:w-auto">Kupi Odmah</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

