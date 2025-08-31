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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useGetServices } from "@/hooks/useGetServices"
import { useGetCategories } from "@/hooks/useGetCategories"
import { useState, useEffect } from "react"
import { LoadingAdmin } from "@/components/admin/loading-admin"
import { toast } from "react-toastify"
import { getApiBackend } from "@/utils/env.util"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { getDateNowWithLocalTimezone } from "@/utils/format-date"
import { MediaHairBooking } from "@/components/media-hair-booking/media-hair-booking"

export function DialogEditServicesAdmin({
    service,
    isOpen,
    setOpen
}: {
    service: Service,
    isOpen: boolean,
    setOpen: (open: boolean) => void
}) {
    const { services, setServices } = useGetServices();
    const { categories } = useGetCategories();
    const { auth } = useAuthAdmin();

    const [name, setName] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("pending");
    const [image, setImage] = useState<string>("");
    const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && service) {
            setName(service.name ?? "");
            setCategoryId(service.categoryId ?? 0);
            setDuration(service.duration ?? 0);
            setPrice(service.price ?? 0);
            setDescription(service.description ?? "");
            setStatus(service.status ?? "pending");
            setImage(service.image ?? "");
        }
    }, [isOpen, service]);

    const handleUpdateService = () => {
        setLoading(true);
        fetch(`${getApiBackend()}/api/services/${service.id}`, {
            method: "PATCH",
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
                status
            }),
        })
        .then(res => res.json())
        .then((data: DataResponse<Service>) => {
            if(data["status"] == 200) {
                const updatedService: Service = {
                    ...service,
                    name,
                    image,
                    description,
                    duration,
                    price,
                    categoryId,
                    status,
                    updatedAt: String(getDateNowWithLocalTimezone())
                }
                setServices([
                    ...services.filter(s => s.id !== updatedService.id),
                    updatedService
                ]);
                toast.success("Cập nhật dịch vụ thành công!", {
                    position: "bottom-right"
                });
                setOpen(false);
            } else {
                toast.error("Cập nhật dịch vụ thất bại!", {
                    position: "bottom-right"
                });
            }
            setLoading(false);
        }).catch(() => {
            toast.error("Cập nhật dịch vụ thất bại!", {
                position: "bottom-right"
            });
            setLoading(false);
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Service</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            className="col-span-3"
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <select
                            id="status"
                            value={status}
                            className="col-span-3 border rounded px-2 py-1"
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            onClick={handleUpdateService}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
                {loading && <LoadingAdmin />}
            </DialogContent>
        </Dialog>
    )
}
