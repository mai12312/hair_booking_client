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

import { useEffect, useState } from "react"
import { LoadingAdmin } from "@/components/admin/loading-admin"
import { toast } from "react-toastify"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { getApiBackend } from "@/utils/env.util"
import { getDateNowWithLocalTimezone } from "@/utils/format-date"

export function DialogEditCategoriesAdmin({
   category
}: { 
    category: Category
}) {
    const {
        categories, 
        setCategories, 
        isShowEditDialog, 
        setShowEditDialog
    } = useGetCategories();
    const {auth} = useAuthAdmin();

    const [name, setName] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [displayOrder, setDisplayOrder] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isShowEditDialog) {
            setName(category?.name ?? "");
            setStatus(category?.status ?? 0);
            setDisplayOrder(category?.displayOrder ?? 0);
        }
    }, [category?.name, category?.displayOrder, isShowEditDialog]);

    const handleCreateCategories = (name: string, displayOrder: number) => {
        setLoading(true);

        /**
         * Update the category
         */
        fetch(`${getApiBackend()}/api/service-categories/${category.id ?? 0}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.accessToken ?? ""}`
            },
            body: JSON.stringify({ name, displayOrder, status })
        })
        .then(res => res.json())
        .then((data) => {
            // success
            console.log("data update category: ", data);
            if(data["status"] == 200) {
                const updatedCategory: Category = {
                    id: category.id ?? 0,
                    name,
                    displayOrder,
                    createdAt: String(getDateNowWithLocalTimezone()),
                    updatedAt: String(getDateNowWithLocalTimezone()),
                    status
                }
                const newCategories: CategoryList = [];
                categories.map((category: Category) =>{
                    if(category.id !== updatedCategory.id) {
                        newCategories.push(category);
                    }
                })
                setCategories([...newCategories, updatedCategory]);

                toast.success("Cập nhật danh mục thành công!", {
                    position: "bottom-right"
                });
            // false
            } else {
                toast.error("Cập nhật danh mục thất bại! Vui lòng thử lại!", {
                    position: "bottom-right"
                });
            }
            setLoading(false);
        })
        .catch((error) => {
            toast.error("Cập nhật danh mục thất bại! Vui lòng thử lại!", {
                position: "bottom-right"
            });
            setLoading(false);
        });
    }

    console.log("category status: ", category);
    return (
        <div>
            <Dialog open={isShowEditDialog} onOpenChange={() => setShowEditDialog(false)}>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="order" className="text-right">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={status}
                                className="col-span-3 border rounded px-2 py-1"
                                onChange={e => setStatus(Number(e.target.value))}
                            >
                                <option value="" disabled hidden>
                                    -- Chọn trạng thái --
                                </option>
                                <option value={0}>Không hiển thị</option>
                                <option value={1}>Hiển thị</option>
                            </select>
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
