
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
export default function Home() {

  return (<DefaultLayout>
    <div>
      <div className="flex flex-col items-center justify-center">
        <HeroSectionImageWithReviews />
        <IconSection2ColsGrid></IconSection2ColsGrid>
        <FrequentQuestions></FrequentQuestions>
      </div>


    </div>
  </DefaultLayout>);
}

