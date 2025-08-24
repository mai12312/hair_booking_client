
// "use client"
import { NavigationMenuUser } from "@/components/user/navigation-menu-user";
// import { SearchHeaderUser } from "@/components/user/search-header-user";
import { LogoMenuUser } from "@/components/user/logo-menu-user";
import { NavMobileUser } from "./nav-mobile-user";

export async function HeaderUser() {

    return (
        <div className="flex justify-between border-b-[1px] border-orange-100 py-4 px-4">
            <LogoMenuUser />
            <NavigationMenuUser />
            {/* <div className="flex justify-between gap-4 items-center">
                <SearchHeaderUser />
                {
                    session?.user?.id && <ButtonNotificationUser notiNumber={noti} />
                }
                <AvatarMenuUser session={session as Session} />
                <NavMobileUser />
            </div> */}
        </div>
    )
}