export function LoadingAdmin () {
    return (
       <div className="fixed top-0 left-0 right-0 bottom-0 z-10">
           <div className="fixed top-0 left-0 right-0 bottom-0 m-auto z-10 bg-black opacity-20"></div>
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 m-auto flex items-center align-middle">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                    <span className="absolute z-30 !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>
       </div>
    )
}