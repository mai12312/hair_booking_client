import Image from "next/image";
import logo from "@/public/images/img_logo.png";
import Link from "next/link";
import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from "../ui/tooltip";

export function LogoMenuUser() {
    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Image
                                src={logo}
                                width={24}
                                height={24}
                                className=""
                                alt="Suzu Inc"
                                loading="lazy"
                            />
                            <span className="sr-only">Suzu Inc</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="z-10">Suzu Inc</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}