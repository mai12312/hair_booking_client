export function LoadingBook() {
    return (
       <div className="h-[1000px]">
           <div className="relative w-[200px] h-[140px]"> 
                <div className="absolute bottom-2 w-[120px] top-[80%] left-1 rotate-[-6deg] shadow-[0_16px_12px_rgba(39,94,254,0.28)]" /> 
                <div className="absolute bottom-2 w-[120px] top-[80%] right-1 rotate-[6deg] shadow-[0_16px_12px_rgba(39,94,254,0.28)]" /> 
                <div className="relative z-10 w-full h-full perspective-[600px] rounded-[13px] shadow-[0_4px_6px_rgba(39,94,254,0.28)] bg-gradient-to-tr from-[#23C4F8] to-[#275EFE]"> 
                    <ul className="relative m-0 p-0 list-none"> 
                        <li className="absolute top-[10px] left-[10px] origin-right text-[rgba(255,255,255,0.36)] rotate-y-0 opacity-1" /> 
                        <li className="absolute top-[10px] left-[10px] origin-right text-[rgba(255,255,255,0.52)] rotate-y-[180deg] opacity-0 animation-name[page-2]" /> 
                        <li className="absolute top-[10px] left-[10px] origin-right text-[rgba(255,255,255,0.52)] rotate-y-[180deg] opacity-0 animation-name[page-3]" /> 
                        <li className="absolute top-[10px] left-[10px] origin-right text-[rgba(255,255,255,0.52)] rotate-y-[180deg] opacity-0 animation-name[page-4]" /> 
                        <li className="absolute top-[10px] left-[10px] origin-right text-[rgba(255,255,255,0.52)] rotate-y-[180deg] opacity-0 animation-name[page-5]"> 
                            <svg className="block w-[90px] h-[120px]" />
                        </li>
                    </ul>
                </div>
                <span className="block mt-5 text-center text-[#6C7486]" /> 
            </div>
       </div>
    )
}