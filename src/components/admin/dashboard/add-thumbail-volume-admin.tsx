
"use client"
import { PathFilePropsOptions, UploadFileVolumnDetailAdmin } from "@/components/admin/volume-detail/upload-uppy-volume-detail";
import { useGetVolumeInfo } from "@/hooks/dashboard/useGetVolumeInfo";
import { useUploadUppy } from "@/hooks/useUploadUppy";
import { useEffect } from "react";

export function AddThumnailVolumeAdmin({
    className, 
    type,
    folder,
    pathFileProps,
} : {
    className?: string, 
    type?: "image" | "video" | "audio",
    folder?: string,
    pathFileProps?: PathFilePropsOptions
}) {
    const { setThumbnailUrl } = useGetVolumeInfo();
    const { url } = useUploadUppy();

    useEffect(() => {
        setThumbnailUrl(url);
    }, [url])

    return (
        <UploadFileVolumnDetailAdmin
            STORAGE_BUCKET_NAME="webtoon"
            dashboardStyle="aspect-auto sm:h-[200px]"
            className={className}
            type={type ?? 'image'}
            folder={folder}
            pathFileProps={pathFileProps}
        />
    )
}