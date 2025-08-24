import { ChangeEvent, forwardRef } from "react"

type Props = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export const InputUploadFile = forwardRef((
    props: Props, 
    ref: React.ForwardedRef<HTMLInputElement>
) => {

    return (
        <div className="flex justify-center relative items-center">
            <div className="absolute  opacity-60 inset-0 z-0" />
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        File Upload!
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Reaction Status Icon</p>
                </div>
                <div className="mt-8 space-y-3">
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img 
                                        className="has-mask h-36 object-center" 
                                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" 
                                        alt="freepik image" 
                                    />
                                </div>
                                <p className="pointer-none text-gray-500 ">
                                    <span className="text-sm">Drag and drop</span> 
                                    files here 
                                    <br /> or 
                                    <span className="text-blue-600 hover:underline">select a file</span> 
                                    from your computer
                                </p>
                            </div>
                            <input 
                                type="file" 
                                className="hidden" 
                                ref={ref} 
                                {...props}
                            />
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
)
InputUploadFile.displayName = "InputUploadFile"