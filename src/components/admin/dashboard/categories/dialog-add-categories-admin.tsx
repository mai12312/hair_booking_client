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
import { useGetCategories } from "@/hooks/useGetCategories"

import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { LoadingAdmin } from "@/components/admin/loading-admin"
import { toast } from "react-toastify"
import { getApiBackend } from "@/utils/env.util"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { getDateNowWithLocalTimezone } from "@/utils/format-date"

export function DialogAddCategoriesAdmin() {
    const {categories, setCategories}= useGetCategories();
    const [name, setName] = useState<string>("");
    const [displayOrder, setDisplayOrder] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const {auth} = useAuthAdmin();

    const handleCreateCategories = (name: string, displayOrder: number) => {
        setLoading(true);
        fetch(`${getApiBackend()}/api/service-categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.accessToken ?? ""}`
            },
            body: JSON.stringify({ name, displayOrder }),
        })
        .then(res => res.json())
        .then((data: DataResponse<{id: number}>) => {
            console.log("data create category: ", data);
            if(data["status"] == 201) {
                const newCategory:Category = {
                    name,
                    displayOrder,
                    createdAt: String(getDateNowWithLocalTimezone()),
                    updatedAt: String(getDateNowWithLocalTimezone()),
                    id: data?.datas?.id,
                    adminId: auth?.admin?.id || 0,
                    status: 0
                }
                setCategories([...categories, newCategory]);
                toast.success("Tạo danh mục thành công!", {
                    position: "bottom-right"
                });
            } else {
                toast.error("Tạo danh mục thất bại!", {
                    position: "bottom-right"
                });
            }
            setLoading(false);
        }).catch((error) => {
            toast.error("Tạo danh mục thất bại!", {
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
                            Add category
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Category</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                className="col-span-3 focus:placeholder:placeholder-shown:text-black"
                                placeholder="name ..."
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Order
                            </Label>
                            <Input
                                id="order"
                                value={displayOrder}
                                type="number"
                                className="col-span-3 focus:placeholder:placeholder-shown:text-black"
                                placeholder="order ..."
                                onChange={e => setDisplayOrder(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={() => handleCreateCategories(name, displayOrder)}
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
