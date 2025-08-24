
import { ProviderContext } from "@/slice/global/global.slice"

export default async function Layout({
    children
}: {
    children:React.ReactNode
}) {
    return (
        <div className="">
            <ProviderContext>
                {children}
            </ProviderContext>
        </div>
    )
}