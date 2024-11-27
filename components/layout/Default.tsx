import { ReactNode } from "react";
import { Navbar } from "../navbar";

import { getSession, logout } from "../../lib";
import { Toaster } from "@/components/ui/toaster"

export const DefaultLayout = async ({
  children
}: {
  children: ReactNode
}) => {
  const session = await getSession();

  return <>
    <Navbar session={session} logout={logout}></Navbar>
    <div className="">

      {children}
      <Toaster />
    </div>
  </>
}
