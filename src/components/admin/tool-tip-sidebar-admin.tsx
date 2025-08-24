import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export function TooltipSidebarAdmin({ 
    children, 
    tooltipContent,
    href
} : { 
    children: React.ReactNode, 
    tooltipContent: string,
    href: string  // URL to navigate to when tooltip is triggered
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        {children}
                        <span className="sr-only">{tooltipContent}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{tooltipContent}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}