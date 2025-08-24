import { cn } from "@/utils/ui.util";

/**
 * @desc spinner is used to loading
 * @info this element is seft defined
 * @param {string} className 
 * @returns 
 */
export function SpinnerLoading({
    className
}:{
    className?: string
}) {
    return (
        <div className={cn("flex items-center justify-center mt-5", className)}>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    )
}

