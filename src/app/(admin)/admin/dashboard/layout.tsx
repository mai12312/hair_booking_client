import { SideBarAdminDashboard } from "@/components/admin/dashboard/sidebar";
import { HeaderAdmin } from "@/components/admin/header-admin";

import { constructMetadata } from "@/utils/metadata";
export const metadata = constructMetadata();

export default function Layout({
    children
}: {
    children:React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <HeaderAdmin/>
            <SideBarAdminDashboard/>
            <main className="sm:grid sm:flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                {children}
            </main>
        </div>
    )
}