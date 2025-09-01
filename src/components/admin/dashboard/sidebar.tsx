import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Activity,
    BookOpenText,
    Home,
    Images,
    MessageCircleCode,
    ScrollText,
    SquareMenu,
    User,
} from "lucide-react";
import Image from "next/image";

import Link from "next/link"
import logo from "@/public/images/img_logo.png";
import { TooltipSidebarAdmin } from "../tool-tip-sidebar-admin";

export function SideBarAdminDashboard() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            {/* Navmain */}
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                {/* Logo Brand */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin/dashboard"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Image 
                                    src={logo}
                                    width={16}
                                    height={16}
                                    loading="lazy"
                                    alt="suzu inc"
                                    className="h-4 w-4 transition-all group-hover:scale-110"
                                />
                                <span className="sr-only">Suzu Inc</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="z-10">Suzu Inc</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Dashboard */}
                <TooltipSidebarAdmin
                    tooltipContent="Dashboard"
                    href="/admin/dashboard"
                >
                    <Home className="h-5 w-5" />
                </TooltipSidebarAdmin>

                 {/* Categories */}
                <TooltipSidebarAdmin
                    tooltipContent="Categories"
                    href="/admin/dashboard/categories"
                >
                    <SquareMenu className="h-5 w-5" />
                </TooltipSidebarAdmin>
                
                {/* Services */}
                <TooltipSidebarAdmin
                    tooltipContent="Services"
                    href="/admin/dashboard/services"
                >
                    <Images className="h-5 w-5" />
                </TooltipSidebarAdmin>
                
                {/* Bookings */}
                <TooltipSidebarAdmin
                    tooltipContent="Bookings"
                    href="/admin/dashboard/bookings"
                >
                    <SquareMenu className="h-5 w-5" />
                </TooltipSidebarAdmin>
                {/* Calendar */}
                <TooltipSidebarAdmin
                    tooltipContent="Calendar"
                    href="/admin/dashboard/calendar"
                >
                    <SquareMenu className="h-5 w-5" />
                </TooltipSidebarAdmin>

                {/* Customer */}
                <TooltipSidebarAdmin
                    tooltipContent="users"
                    href="/admin/dashboard/users"
                >
                    <User className="h-5 w-5" />
                </TooltipSidebarAdmin>
            </nav>
        </aside>
    )
}