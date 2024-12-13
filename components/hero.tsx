import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart, Church } from 'lucide-react';

export default function HeroSectionImageWithReviews() {
  return (
    <div className="container py-24 p-5">
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="font-serif scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-800 mb-6">
            MemoryPlate: Poštujte njihovo nasleđe
          </h1>
          <p className="mt-3 text-xl text-slate-600 leading-relaxed">
            Kreirajte trajne digitalne spomenike za svoje najmilije pomoću naših inovativnih pločica sa QR kodom
          </p>
          <div className="mt-8 grid gap-3 w-full sm:inline-flex">
            <Link href="/order-now">
              <Button size="lg" className="font-semibold">Poručite odmah</Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-8">
            <div className="py-5">
              <div className="flex space-x-1">
                {heart}
                {heart}
                {heart}
                {heart}
                {heart}
              </div>
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-bold">4.9</span> /5 - više od 500+ porodica
              </p>
              <div className="mt-5">
                <p className="text-sm italic text-slate-600">
                  &quot;MemoryPlate nam je pomogao da napravimo prelepu uspomenu&quot;
                </p>
                <p className="text-xs mt-1 text-slate-500">- Porodica Jovanović</p>
              </div>
            </div>

            <div className="py-5">
              <div className="flex items-center space-x-2">
                <Church className="text-primary" />
                <span className="font-semibold text-sm text-slate-700">Sertifikovani partner</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Imamo poverenje više od 100 pogrebnih preduzeća.
              </p>
              <div className="mt-5">
                <p className="text-sm text-slate-600">
                  Čuvamo uspomene od 2024. godine.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative ms-4 mr-5 flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* App Screenshot */}
            <div className="absolute top-[2.3%] left-[4.6%] right-[4.6%] bottom-[3.8%] rounded-[30px] overflow-hidden">
              <Image
                src="/main-page-screen.png"
                alt="Prikaz aplikacije MemoryPlate"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            {/* Phone Frame */}
            <div className="relative z-10">
              <Image
                src="/phone-frame.png"
                alt="Okvir telefona"
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
  );
}

const heart = (
  <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
);

