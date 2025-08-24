
import { BreadcrumbAdmin } from "@/components/admin/breadcrumb-admin";
// import { SearchAdmin } from "@/components/admin/search-admin";
import { NavMobileAdmin } from "@/components/admin/nav-mobile-admin";
import { DropdownMenuAdmin } from "@/components/admin/dropdown-menu-admin";

export function HeaderAdmin() {
    return (
        <header className="sticky justify-between top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <NavMobileAdmin/>
            <BreadcrumbAdmin/>
            {/* <SearchAdmin/> */}
            <DropdownMenuAdmin/>
        </header>
    )
}