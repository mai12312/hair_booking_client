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

export function ContentMainServicesAdmin() {
    const {services, setServices, pending, setShowEditDialog} = useGetServices();
    const [service, setService] = useState<{id: string, name: string}>({
        id: "",
        name: ""
    });
    const { formatPrice } = useFunctions();

    if(services.length == 0 && !pending) return <EmptyContentAdmin message="Empty services!"/>;
    else if(services.length == 0 && pending) return <SpinnerLoadingAdmin/>;
    
    const handleClickEdit = (id: string, name: string) => {
        setService({id, name});
        setShowEditDialog(true);
    }

    const handleClickDelete = (id: number) => {
        fetch(`/api/services/${id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
            if(data["status"] == 201) {
                const newServices: ServiceList = [];
                services.map((service: Service) => {
                    if(service.id !== id) {
                        newServices.push(service);
                    }
                })
                setServices([...newServices]);

                toast.success("Delete the service successfully!", {
                    position: "bottom-right"
                });
            } else {
                toast.error("Delete error! Please try again!", {
                    position: "bottom-right"
                });
            }
        })
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
                            <DialogEditServicesAdmin
                                id={service.id}
                                serviceName={service.name}
                            />
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
                                            onClick = {(e) => handleClickEdit(String(service.id), service.name)}
                                        >
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={e => handleClickDelete(service.id)}
                                        >Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
        </>
    )
}