import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart, Church } from 'lucide-react';

export default function HeroSectionImageWithReviews() {
  return (
    <>
      <div className="container py-24  p-5">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              MemoryPlate: Poštujte njihovo nasledje
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Napravite trajne digitalne spomenike za svoje najmilije pomoću naših inovativnih pločica sa QR kodom
            </p>
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link href="/order-now">
                <Button size="lg">Poruči odmah </Button>
              </Link>
            </div>

            <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
              <div className="py-5">
                <div className="flex space-x-1">
                  {heart}
                  {heart}
                  {heart}
                  {heart}
                  {heart}
                </div>
                <p className="mt-3 text-sm">
                  <span className="font-bold">4.9</span> /5 - više od 500+ porodica
                </p>
                <div className="mt-5">
                  <p className="text-sm italic">
                    &quot;MemoryPlate nam je pomogao da napravimo prelepu uspomenu&quot;
                  </p>
                  <p className="text-xs mt-1">- Porodica Jovanovic</p>
                </div>
              </div>

              <div className="py-5">
                <div className="flex items-center space-x-2">
                  <Church />
                  <span className="font-semibold text-sm">Certified Partner</span>
                </div>
                <p className="mt-3 text-sm">
                  Imamo poverenje u vise od 100 pogrebnih preduzeća.
                </p>
                <div className="mt-5">
                  <p className="text-sm">
                    Čuvamo uspomene od 2024 godine.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative ms-4 mr-5 flex justify-center">
            <div className="relative w-full max-w-sm ">
              {/* App Screenshot */}
              <div className="absolute top-[2.3%] left-[4.6%] right-[4.6%] bottom-[3.8%] rounded-[30px] overflow-hidden">
                <Image
                  src="/main-page-screen.png"
                  alt="App Screenshot"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {/* Phone Frame */}
              <div className="relative z-10">
                <Image
                  src="/phone-frame.png"
                  alt="Phone Frame"
                  width={444}
                  height={779}
                  layout="responsive"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const heart = (
  <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
);
