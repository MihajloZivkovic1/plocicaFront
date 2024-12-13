import Image from "next/image"
import { PackageOpen, Scan, Camera, Edit, Book } from 'lucide-react'
import HeroSectionImageWithReviews from "@/components/hero"
import DefaultLayout from "./dashboard/layout"
import Services from "@/components/ui/Services"
import Footer from "@/components/ui/Footer"
import TestimonialSection from "@/components/TestimonialSection"
import MemoryPlate from "@/components/MemoryPlate"

export default function Home() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-slate-50 font-sans">
        <div className="flex flex-col items-center justify-center">
          <HeroSectionImageWithReviews />

          <TestimonialSection />

          <div className="container mx-auto px-4 py-16 bg-white">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-slate-800">Jednostavan proces aktivacije i uređivanja profila</h3>
                <p className="mb-8 text-slate-600 leading-relaxed">Naš intuitivan sistem omogućava vam da lako kreirate i održavate memorijalni profil za vašu voljenu osobu. Započnite putovanje sećanja u nekoliko jednostavnih koraka.</p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4 text-primary">
                      <Scan size={40} />
                    </div>
                    <h4 className="font-serif text-lg font-semibold mb-2 text-slate-700">Skenirajte QR kod za aktivaciju</h4>
                    <p className="text-sm text-slate-500">Nekoliko jednostavnih koraka vas deli od kreiranja trajnog digitalnog spomenika.</p>
                  </div>
                  <div>
                    <div className="mb-4 text-primary">
                      <PackageOpen size={40} />
                    </div>
                    <h4 className="font-serif text-lg font-semibold mb-2 text-slate-700">Elegantno pakovanje sa QR kodom</h4>
                    <p className="text-sm text-slate-500">Primite kvalitetnu kutiju sa kodom za aktivaciju i detaljnim uputstvom za upotrebu.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <Image
                  src="/phone-qr.png"
                  alt="Nadgrobni spomenik sa QR kodom"
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          <MemoryPlate />

          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-slate-800">Uređujte profil voljene osobe u bilo kom trenutku</h3>
                <p className="mb-8 text-slate-600 leading-relaxed">Naš korisnički panel pruža vam potpunu kontrolu nad memorijalnim profilom. Jednostavno ažurirajte informacije, dodajte fotografije i podelite dragocene uspomene.</p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Edit className="mr-4 mt-1 text-primary" size={24} />
                    <div>
                      <h4 className="font-serif text-lg font-semibold mb-2 text-slate-700">Intuitivno uređivanje</h4>
                      <p className="text-sm text-slate-500">Ažurirajte informacije o profilu sa lakoćom i u nekoliko klikova.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Camera className="mr-4 mt-1 text-primary" size={24} />
                    <div>
                      <h4 className="font-serif text-lg font-semibold mb-2 text-slate-700">Galerija uspomena</h4>
                      <p className="text-sm text-slate-500">Kreirajte i organizujte foto albume da biste sačuvali dragocene trenutke.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Book className="mr-4 mt-1 text-primary" size={24} />
                    <div>
                      <h4 className="font-serif text-lg font-semibold mb-2 text-slate-700">Deljenje životnih priča</h4>
                      <p className="text-sm text-slate-500">Zapišite i podelite priče koje slave život vaše voljene osobe.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <div className="relative w-full max-w-sm">
                  <div className="absolute top-[-1.7%] left-[4.6%] right-[5.6%] bottom-[3.8%] rounded-[30px] overflow-hidden">
                    <Image
                      src="/admin-panel2.png"
                      alt="Prikaz aplikacije"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
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

          <Services />
        </div>
        <Footer />
      </div>
    </DefaultLayout>
  )
}

