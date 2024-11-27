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
              MemoryPlate offers a unique way to honor and remember your loved ones. Our QR code plaques for tombstones
              create a digital memorial that brings memories to life. By simply scanning the QR code, visitors can access
              a dedicated online space filled with photos, videos, and stories celebrating the life of your departed loved one.
              This innovative solution allows you to preserve and share cherished memories for generations to come, creating
              a lasting digital legacy that goes beyond traditional memorials.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg inline-block mb-6">
              <div className="text-gray-500 text-lg line-through">5500рсд</div>
              <div className="text-4xl md:text-5xl font-bold text-black-600">
                4950рсд
              </div>
              <p className="text-sm text-black-500 mt-2">10% Discount Applied!</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-8 w-8 mb-2" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Package className="h-8 w-8 mb-2" />
                <span className="text-sm">Secure Packaging</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-8 w-8 mb-2" />
                <span className="text-sm">Easy Activation</span>
              </div>
            </div>
          </div>
          <Link href={"/order-now"} >
            <Button size="lg" className="w-full sm:w-auto">Buy now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

