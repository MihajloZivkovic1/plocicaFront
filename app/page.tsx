
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
import { logout } from "./lib";

export default function Home() {

  return (
    <div>
      Home
      <div className="mt-15">
        <form
          action={async () => {
            "use server";
            await logout();

          }}
        >
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
}
