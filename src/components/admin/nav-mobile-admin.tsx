import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Activity,
    Home,
    Images,
    LineChart,
    MessageCircleCode,
    Package,
    Package2,
    PanelLeft,
    ScrollText,
    ShoppingCart,
    User,
    Users2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Nav for mobile in "header-admin" component with admin permissions 
 */
export function NavMobileAdmin() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Suzu Group</span>
                    </Link>
                    {/* Dashboard */}
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    {/* Banners */}
                    <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                        <Images className="h-5 w-5" />
                        Products
                    </Link>
                    {/* Categories */}
                    <Link
                        href="/dashboard/categories"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Users2 className="h-5 w-5" />
                        Categories
                    </Link>
                    {/* User */}
                    <Link
                        href="/dashboard/users"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <User className="h-5 w-5" />
                        Users
                    </Link>
                    {/* Logs */}
                    <Link
                        href="/dashboard/logs"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <ScrollText className="h-5 w-5" />
                        Logs
                    </Link>
                    {/* Comments */}
                    <Link
                        href="/dashboard/comments"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <MessageCircleCode className="h-5 w-5" />
                        Comments
                    </Link>
                    {/* Analytics */}
                    <Link
                        href="/dashboard/analytics"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Activity className="h-5 w-5" />
                        Analytics
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}