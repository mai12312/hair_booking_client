import { cn } from "@/utils/ui.util";

/*
    Example:
    export function EmptyExample() {
        return (
            <EmptyWrapper>
                <EmptyItem>
                    <EmptyParagraph>Hello</EmptyParagraph>
                </EmptyItem>
            </EmptyWrapper>
        )
    }
*/

export function EmptyItem ({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={cn("", className)}>
            {children}
        </div>
    )
}

export function EmptyParagraph({children, className}: {children: React.ReactNode; className?: string}) {
    return (
        <p className={cn("text-base", className)}>
            {children}
        </p>
    )
}

export function EmptyWrapper({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={cn("flex p-4 items-center justify-center", className)}>
            {children}
        </div>
    )
}