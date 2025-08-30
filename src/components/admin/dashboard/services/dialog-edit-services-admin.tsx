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

export function DialogEditServicesAdmin({
    id, 
    serviceName
}: { 
    id: string, 
    serviceName: string
}) {
    const {
        categories, 
        setCategories, 
        isShowEditDialog, 
        setShowEditDialog
    } = useGetCategories();

    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isShowEditDialog) {
            setName(serviceName)
        }
    }, [serviceName]);

    const handleCreateCategories = (name: string) => {
        setLoading(true);

        /**
         * Update the service
         */
        fetch(`/api/categories/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
        .then(res => res.json())
        .then((data) => {
            // success
            if(data["status"] == 201) {
                const newCategories: CategoryList = [];
                categories.map((service: Category) =>{
                    if(service.id !== Number(id)) {
                        newCategories.push(service);
                    }
                })
                setCategories([...newCategories, data["data"]]);

                toast.success("Update the service successfully!", {
                    position: "bottom-right"
                });
            // false
            } else {
                toast.error("Update error! Please try again!", {
                    position: "bottom-right"
                });
            }
            setLoading(false);
        })
    }

    
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
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={() => handleCreateCategories(name)}
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
