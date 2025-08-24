
// import { FooterUser } from "@/components/user/footer-user"
import { HeaderUser } from "@/components/user/header-user"
import { ProviderContext } from "@/slice/global/global.slice"

export default async function Layout({
    children
}: {
    children:React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:gap-4 lg:py-4 lg:px-14">
            <ProviderContext>
                <HeaderUser/>
                    {children}
                {/* <FooterUser/> */}
            </ProviderContext>
        </div>
    )
}