"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    // DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useGetCategories } from "@/hooks/useGetCategories"
import { nanoid } from "nanoid"
import { useState } from "react"
import { toast } from "react-toastify"
import { SpinnerLoadingAdmin } from "@/components/admin/spinner-loading-admin"
import { EmptyContentAdmin } from "@/components/empty-content-admin"
import { DialogEditCategoriesAdmin } from "./dialog-edit-categories-admin"
import { formatDateByMomentjs } from "@/utils/format-date"
import { getApiBackend } from "@/utils/env.util"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ContentMainCategoriesAdmin() {
    const {categories, setCategories, pending, setShowEditDialog} = useGetCategories();
    const [category, setCategory] = useState<Category>({
        id: 0,
        name: "",
        displayOrder: 0,
        status: 0
    });
    const {auth} = useAuthAdmin();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

    if(!categories || categories.length == 0 && !pending) return <EmptyContentAdmin message="Empty categories!"/>;
    else if(categories.length == 0 && pending) return <SpinnerLoadingAdmin/>;

    const handleClickEdit = (category: Category) => {
        setCategory(category);
        setShowEditDialog(true);
    }

    const handleClickDelete = (category: Category) => {
        setDeleteCategory(category);
        setShowDeleteDialog(true);
    }
    // Get services by categoryId
    const getServiceByCategoryId = async (categoryId: number) => {
        const res = await fetch(`${getApiBackend()}/api/service-categories/${categoryId}/services`, {
            headers: {
                "Authorization": `Bearer ${auth?.accessToken ?? ""}`
            }
        });
        const data: DataResponse<{services: Service}> = await res.json();
        if(data && data.status == 200) {
            const services = data.datas.services ?? [];
            return services;
        }
        return [];
    }
    // check if services have bookings
    const checkServicesHaveBookings = async (services: Service[]) => {
        for (const service of services) {
            const resBooking = await fetch(`${getApiBackend()}/api/services/${service.id}/booking-details`, {
                headers: {
                    "Authorization": `Bearer ${auth?.accessToken ?? ""}`
                }
            });
            const data: DataResponse<{bookings: Booking[]}> = await resBooking.json();
            if(data && data.status == 200) {
                const bookings = data.datas.bookings ?? [];
                if (bookings && Array.isArray(bookings) && bookings.length > 0) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    const handleConfirmDelete = async () => {
        if (!deleteCategory) return;
        // Check if category has services
        const services = await getServiceByCategoryId(deleteCategory.id);
        if (services && Array.isArray(services) && services.length > 0) {
            const hasBooking = await checkServicesHaveBookings(services);
            if (hasBooking) {
                toast.error("Không thể xóa danh mục vì có lịch đặt!");
                setShowDeleteDialog(false);
                setDeleteCategory(null);
                return;
            }
        }

        // Proceed to delete
        fetch(`${getApiBackend()}/api/service-categories/${deleteCategory.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${auth?.accessToken ?? ""}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data["status"] == 201) {
                const newCategories: CategoryList = [];
                categories.map((category: Category) => {
                    if(category.id !== deleteCategory.id) {
                        newCategories.push(category);
                    }
                })
                setCategories([...newCategories]);
                toast.success("Delete the category successfully!", {
                    position: "bottom-right"
                });
            } else {
                toast.error("Xóa danh mục thất bại", {
                    position: "bottom-right"
                });
            }
            setShowDeleteDialog(false);
            setDeleteCategory(null);
        })
        .catch(() => {
            toast.error("Xóa danh mục thất bại", {
                position: "bottom-right"
            });
            setShowDeleteDialog(false);
            setDeleteCategory(null);
        });
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Order
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            created_date
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            update date
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                            <DialogEditCategoriesAdmin
                                category={category}
                            />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category: Category) => (
                        <TableRow key={nanoid()}>
                            <TableCell className="font-medium">
                                {category.name}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {category.displayOrder ?? 0}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {category.status == 0 ? "Không hiển thị": "Hiển thị"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {formatDateByMomentjs(category.createdAt ?? "")}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {formatDateByMomentjs(category.updatedAt ?? "")}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem 
                                            onClick = {(e) => handleClickEdit(category)}
                                        >
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={e => handleClickDelete(category)}
                                        >Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Confirm Delete Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bạn có muốn xóa danh mục không?</DialogTitle>
                    </DialogHeader>
                    <div>
                        <p>Tên danh mục: {deleteCategory?.name}</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Hủy
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}