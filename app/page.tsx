
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import HeroSectionImageWithReviews from "@/components/hero";
import IconSection2ColsGrid from "@/components/icons";
import { logout } from "../lib";
import { FrequentQuestions } from "@/components/FrequentQuestions";
import DefaultLayout from "./dashboard/layout";
import { Button } from "@/components/ui/button"
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
        {/* <FrequentQuestions /> */}
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
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Customize Your Memorial Profile</h3>
              <p className="mb-6">With our user-friendly admin panel, you have complete control over your loved one's memorial profile. Easily edit and update information, add photos, and share cherished memories.</p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Edit className="mr-2 mt-1 text-primary" />
                  <div>
                    <h4 className="font-bold">Easy Editing</h4>
                    <p className="text-sm text-muted-foreground">Update profile information with just a few clicks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Camera className="mr-2 mt-1 text-primary" />
                  <div>
                    <h4 className="font-bold">Photo Galleries</h4>
                    <p className="text-sm text-muted-foreground">Create and manage photo albums to showcase memories</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Book className="mr-2 mt-1 text-primary" />
                  <div>
                    <h4 className="font-bold">Story Sharing</h4>
                    <p className="text-sm text-muted-foreground">Write and share stories about your loved one's life</p>
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

