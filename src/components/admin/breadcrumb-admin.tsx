"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation'

export function BreadcrumbAdmin() {
    // const params = useParams()
    // const { slug, volumn } = params
    const  pathname = usePathname();
    // console.log("pathname: ", pathname);
    const breadcrumbItems = pathname.split('/').filter(Boolean);
    // console.log("BREADCRUMB: ", breadcrumbItems);

    const link = (breadcrumbItems: Array<string>, index: number) => {
        let linkNow = `/${breadcrumbItems[index]}`;
        for(let i = 0; i < index; i++) {
            linkNow = `/${breadcrumbItems[i]}` + linkNow;
        }
        // console.log("link: ", linkNow);
        return linkNow;
    }

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {
                    breadcrumbItems.map((item, index) => (
                       <div key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={link(breadcrumbItems, index)}>{item}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index != breadcrumbItems.length - 1 &&
                                <BreadcrumbSeparator />
                            }
                       </div>
                    ))
                }

            </BreadcrumbList>
        </Breadcrumb>
    )
}