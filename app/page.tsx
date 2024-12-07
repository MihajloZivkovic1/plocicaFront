
import HeroSectionImageWithReviews from "@/components/hero";
import DefaultLayout from "./dashboard/layout";
import Services from "@/components/ui/Services"
import Footer from "@/components/ui/Footer"
import { PackageOpen, Scan, Camera, Edit, Book } from "lucide-react";
import Image from "next/image"
import TestimonialSection from "@/components/TestimonialSection";
import MemoryPlate from "@/components/MemoryPlate";
export default function Home() {

  return (<DefaultLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <HeroSectionImageWithReviews />

        <TestimonialSection />

        <div className="container mx-auto px-4 py-12 bg-white">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
              <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum quo fugiat sed, quia a aut itaque voluptates doloremque illo consequuntur laboriosam repellat perspiciatis quas nihil! Non sapiente aut possimus facere.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="mb-2">
                    <Scan size={48} />
                  </div>
                  <h4 className="font-bold mb-2">Skenirajte QrCode i započnite aktivaciju profila</h4>
                  <p className="text-sm text-muted-foreground">Par koraka vas deli od aktivacije i uredjivanja profila vaseg pokojnika</p>
                </div>
                <div>
                  <div className="mb-2">
                    <PackageOpen size={48} />
                  </div>
                  <h4 className="font-bold mb-2">Qr kod stiže u kvalitetnoj kutiji</h4>
                  <p className="text-sm text-muted-foreground">Kvalitetna kutija na kojoj se nalazi kod za aktivaciju kao i uputsvo za upotrebu</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Image
                src="/phone-qr.png"
                alt="Gravestone with QR"
                width={500}
                height={300}
                layout="responsive"
                className="rounded-lg"
              />
            </div>

          </div>
        </div>
        <MemoryPlate />

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col justify-center mb-20">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Uredjujte profil pokojnika u bilo kom momentu</h3>
              <p className="mb-6">Pomoću našeg administratorskog panela prilagođenom korisniku, imate potpunu kontrolu nad memorijalnim profilom svoje voljene osobe. Jednostavno uređujte i ažurirajte podatke, dodajte fotografije i delite drage uspomene.</p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Edit className="mr-2 mt-1 text-primary" />
                  <div>
                    <h4 className="font-bold">Lako uredjivanje</h4>
                    <p className="text-sm text-muted-foreground">Ažurirajte informacije o profilu sa samo nekoliko klikova</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Camera className="mr-2 mt-1 text-primary" />
                  <div>
                    <h4 className="font-bold">Galerija Slika</h4>
                    <p className="text-sm text-muted-foreground">Kreirajte foto albume i upravljajte njima da biste prikazali uspomene</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Book className="mr-2 mt-1 text-primary" />
                  <div>
                    <h4 className="font-bold">Deljenje zanimljivih prica pokojnika</h4>
                    <p className="text-sm text-muted-foreground">Pišite i delite priče o životu vase voljene osobe</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-full max-w-sm">
                {/* App Screenshot */}
                <div className="absolute top-[-1.7%] left-[4.6%] right-[5.6%] bottom-[3.8%] rounded-[30px] overflow-hidden">
                  <Image
                    src="/admin-panel2.png"
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
        <Services />

      </div>
      <Footer />
    </div>
  </DefaultLayout>);
}

