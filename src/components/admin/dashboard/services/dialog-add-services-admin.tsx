"use client"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useGetServices } from "@/hooks/useGetServices"
import { useGetCategories } from "@/hooks/useGetCategories"
import { MediaHairBooking } from "@/components/media-hair-booking/media-hair-booking"

import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { LoadingAdmin } from "@/components/admin/loading-admin"
import { toast } from "react-toastify"
import { getApiBackend } from "@/utils/env.util"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { getDateNowWithLocalTimezone } from "@/utils/format-date"

export function DialogAddServicesAdmin() {
    const {services, setServices}= useGetServices();
    const { categories } = useGetCategories();
    const [name, setName] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const {auth} = useAuthAdmin();
    const [image, setImage] = useState<string>("");
    const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

    const handleCreateServices = () => {
        setLoading(true);
        fetch(`${getApiBackend()}/api/services`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${auth?.accessToken ?? ""}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                image,
                description,
                duration,
                price,
                categoryId,
            }),
        })
        .then(res => res.json())
        .then((data: DataResponse<Service>) => {
            if(data["status"] == 201) {
                const newService:Service = {
                    name,
                    image: image,
                    createdAt: String(getDateNowWithLocalTimezone()),
                    updatedAt: String(getDateNowWithLocalTimezone()),
                    id: data?.datas?.id,
                    categoryId,
                    adminId: auth?.admin?.id || 0,
                    duration,
                    price,
                    description,
                    status: "pending"
                }
                setServices([...services, newService]);
                toast.success("Tạo dịch vụ thành công!", {
                    position: "bottom-right"
                });
            } else {
                toast.error("Tạo dịch vụ thất bại!", {
                    position: "bottom-right"
                });
            }
            setLoading(false);
        }).catch((error) => {
            toast.error("Tạo dịch vụ thất bại!", {
                position: "bottom-right"
            });
            setLoading(false);
        });
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Thêm dịch vụ
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Service</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                <div className="w-full h-auto aspect-square border border-dashed border-gray-300 rounded flex items-center justify-center bg-white">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">No image</span>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setMediaDialogOpen(true)}
                                >
                                    Chọn ảnh từ Media
                                </Button>
                                <MediaHairBooking
                                    open={mediaDialogOpen}
                                    onOpenChange={setMediaDialogOpen}
                                    onSelect={(imgUrl) => setImage(imgUrl)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Tên
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                className="col-span-3 focus:placeholder:placeholder-shown:text-black"
                                placeholder="name ..."
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <select
                                id="category"
                                value={categoryId}
                                className="col-span-3 border rounded px-2 py-1"
                                onChange={e => setCategoryId(Number(e.target.value))}
                            >
                                <option value={0} disabled>
                                    -- Chọn danh mục --
                                </option>
                                {categories && categories.map((cat: Category) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                className="col-span-3"
                                placeholder="description ..."
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                                Duration
                            </Label>
                            <Input
                                id="duration"
                                value={duration}
                                type="number"
                                className="col-span-3"
                                placeholder="duration (minutes) ..."
                                onChange={e => setDuration(Number(e.target.value))}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                value={price}
                                type="number"
                                className="col-span-3"
                                placeholder="price ..."
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={handleCreateServices}
                            >
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            { loading && <LoadingAdmin/> }
        </div>
    )
}