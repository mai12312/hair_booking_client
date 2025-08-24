
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link, Menu } from "lucide-react"
export async function NavMobileUser() {
  return (
    <Menubar className="block lg:hidden">
      <MenubarMenu>
        <MenubarTrigger><Menu /></MenubarTrigger>
        <MenubarContent>
          <MenubarSeparator />
          <Link href="/bookings">
            <MenubarItem>Bookings</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
