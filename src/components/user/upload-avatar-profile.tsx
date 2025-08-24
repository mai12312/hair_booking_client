"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useGetAuth } from "@/hooks/user/auth/useGetAuth"
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UploadAvatarProfile() {
    const {username, userAvatar, userId} = useGetAuth();
    const [url, setUrl] = useState<string | null>(userAvatar || null)
    const [file, setFile] = useState<string | null>(null)
    const [buttonChange, setButtonChange] = useState<boolean | null>(false)

    function uploadAvatar(e: any) {
        setFile(e.target.files?.[0])
        setUrl(URL.createObjectURL((e.target.files?.[0])))
        setButtonChange(true)
    }
    async function saveAvatar() {
        if (file) {
            const filePath = username;
            toast.success("Cập nhật thành công");
            window.location.reload();
            toast.error("Cập nhật thất bại");
            setButtonChange(false)
        }
    }
    function removeAvatar() {
        setUrl(userAvatar)
        setFile(null)
        setButtonChange(false)
    }

    return (
        <div className="flex items-center gap-5">
            <Image
                src={url??`https://github.com/shadcn.png`}
                alt="Current Avatar"
                className="w-20 h-20 rounded-full"
                onClick={removeAvatar}
                width={200}
                height={200}
            />
            <div>
                {
                    buttonChange ? (
                        <Button className="bg-pink-600 text-white px-4 py-2 rounded-md" onClick={async () => saveAvatar()} type="button">
                            Lưu ảnh
                        </Button>
                    ) :
                        (
                            <Input type="file" onChange={uploadAvatar} className="bg-pink-600 text-white px-4 py-2 rounded-md">
                            </Input>
                        )
                }

                <p className="text-xs text-gray-500 mt-1">jpg, jpeg, gif, png &lt;2MB</p>
            </div>
        </div>
    )
}