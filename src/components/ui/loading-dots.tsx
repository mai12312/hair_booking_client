export function LoadingDots() {
    return (
       <div className="h-[1000px] flex justify-center items-center">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" />
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]" />
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]" />
            </div>
       </div>
    )
}