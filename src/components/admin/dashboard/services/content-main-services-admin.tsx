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
import { nanoid } from "nanoid"
import { useState } from "react"
import { toast } from "react-toastify"
import { SpinnerLoadingAdmin } from "@/components/admin/spinner-loading-admin"
import { EmptyContentAdmin } from "@/components/empty-content-admin"
import { DialogEditServicesAdmin } from "./dialog-edit-services-admin"
import { useGetServices } from "@/hooks/useGetServices"
import Image from "next/image"
import { formatDateByMomentjs } from "@/utils/format-date"
import { useFunctions } from "@/hooks/useFunctions"
import { getApiBackend } from "@/utils/env.util"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export function ContentMainServicesAdmin() {
    const {services, setServices, pending} = useGetServices();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteService, setDeleteService] = useState<Service | null>(null);
    const { formatPrice } = useFunctions();
    const {auth} = useAuthAdmin();

    if(services.length == 0 && !pending) return <EmptyContentAdmin message="Empty services!"/>;
    else if(services.length == 0 && pending) return <SpinnerLoadingAdmin/>;

    const handleClickEdit = (service: Service) => {
        setSelectedService(service);
        setEditDialogOpen(true);
    }

    const handleClickDelete = (service: Service) => {
        setDeleteService(service);
        setShowDeleteDialog(true);
    }

    // Separated function to check if a service has bookings
    const checkServicesHaveBookings = async (serviceId: number) => {
        try {
            const res = await fetch(`${getApiBackend()}/api/services/${serviceId}/booking-details`, {
                headers: {
                    "Authorization": `Bearer ${auth?.accessToken ?? ""}`
                }
            });
            const bookingsData = await res.json();
            const bookings = bookingsData?.datas?.bookings || bookingsData;
            if (bookings && Array.isArray(bookings) && bookings.length > 0) {
                return true;
            }
        } catch (err) {
            toast.error("Xóa dịch vụ thất bại! Vui lòng thử lại!");
            return true;
        }
        return false;
    }

    const handleConfirmDelete = async () => {
        if (!deleteService) return;
        // Check if service has bookings before deleting
        const hasBooking = await checkServicesHaveBookings(deleteService.id);
        if (hasBooking) {
            toast.error("Không thể xóa dịch vụ vì có lịch đặt!", {
                position: "bottom-right"
            });
            setShowDeleteDialog(false);
            setDeleteService(null);
            return;
        }

        fetch(`${getApiBackend()}/api/services/${deleteService.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${auth?.accessToken ?? ""}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data["status"] == 201) {
                const newServices: ServiceList = [];
                services.map((service: Service) => {
                    if(service.id !== deleteService.id) {
                        newServices.push(service);
                    }
                })
                setServices([...newServices]);

                toast.success("Xóa dịch vụ thành công!", {
                    position: "bottom-right"
                });
            } else {
                toast.error("Xóa dịch vụ thất bại! Vui lòng thử lại!", {
                    position: "bottom-right"
                });
            }
            setShowDeleteDialog(false);
            setDeleteService(null);
        })
        .catch((err) => {
            toast.error("Xóa dịch vụ thất bại! Vui lòng thử lại!", {
                position: "bottom-right"
            });
            setShowDeleteDialog(false);
            setDeleteService(null);
        });
    }

    return (
        <>
            <Table className="overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Thời gian trung bình (phút)</TableHead>
                        <TableHead>Giá tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Ngày tạo
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Ngày cập nhật
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                            {/* Remove old DialogEditServicesAdmin here */}
                            {selectedService && (
                                <DialogEditServicesAdmin
                                    service={selectedService}
                                    isOpen={editDialogOpen}
                                    setOpen={setEditDialogOpen}
                                />
                            )}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service: Service) => (
                        <TableRow key={nanoid()}>
                            <TableCell className="font-medium">
                                <Image
                                    alt="service image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src={service?.image || ""}
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                {service.name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {service.description ?? ""}
                            </TableCell>
                            <TableCell className="font-medium">
                                {service.duration ?? ""}
                            </TableCell>
                            <TableCell className="font-medium">
                                {formatPrice(service.price ?? 0)}
                            </TableCell>
                            <TableCell className="font-medium">
                                {service.status ?? "pending"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {formatDateByMomentjs(service.createdAt ?? "")}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {formatDateByMomentjs(service.updatedAt ?? "")}
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
                                            onClick={() => handleClickEdit(service)}
                                        >
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={() => handleClickDelete(service)}
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
                        <DialogTitle>Bạn có muốn xóa dịch vụ không?</DialogTitle>
                    </DialogHeader>
                    <div>
                        <p>Tên dịch vụ: {deleteService?.name}</p>
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
            {selectedService && (
                <DialogEditServicesAdmin
                    service={selectedService}
                    isOpen={editDialogOpen}
                    setOpen={setEditDialogOpen}
                />
            )}
        </>
    )
}