"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { useGetVolumes } from "@/hooks/dashboard/useGetVolumes";
import { useGetVolumeInfo } from "@/hooks/dashboard/useGetVolumeInfo";
import { memo } from "react";
import { useVolumeActions } from "@/hooks/dashboard/useVolumeActions";
import { nanoid } from "nanoid";
import { EmptyContentAdmin } from "@/components/empty-content-admin";
import { SpinnerLoadingAdmin } from "../spinner-loading-admin";

export const ContentAdminMainDashboard = memo(function () {
    const { setIsEditModalOpen, volumes, isPending } = useGetVolumes();
    const { setVolumeEdited } = useGetVolumeInfo();
    const openEditModal = (webtoon: Webtoon) => {
        setVolumeEdited({...webtoon, thumbnail: webtoon.thumbnail ?? ""});
        setIsEditModalOpen(true);
    };
    const { deleteVolume } = useVolumeActions();
    if(isPending) return <SpinnerLoadingAdmin/>;
    if(volumes.length == 0) return <EmptyContentAdmin message="No content"/>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="md:w-2/6">Description</TableHead>
                    <TableHead>category</TableHead>
                    <TableHead className="hidden md:table-cell">Created at</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {volumes && volumes.map((webtoon: Webtoon) => (
                    <TableRow key={nanoid()}>
                        <TableCell className="hidden sm:table-cell">
                            <Image
                                alt="Webtoon image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={webtoon?.thumbnail || "/placeholder.svg"}
                                width="64"
                            />
                        </TableCell>
                        <TableCell className="font-medium">{webtoon?.name}</TableCell>
                        <TableCell className="md:w-2/6">{webtoon?.description}</TableCell>
                        <TableCell>
                            <ul>
                                {
                                    webtoon.tag && webtoon.tag.map((item) => 
                                        <li key={nanoid()}>
                                            <div className="flex justify-center items-center h-fit w-fit gap-[0.5em] mt-1">
                                                <div className="border-2 border-[#222222] rounded-[0.5em] text-black font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-[#222222] hover:text-white duration-300">
                                                    <p>{item}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>

                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {new Date(webtoon?.created_at as string).toLocaleString()}
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
                                    <Link href={`/dashboard/${webtoon?.slug}?vid=${webtoon?.id}`}>
                                        <DropdownMenuItem>View</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem 
                                        onClick={() => openEditModal(webtoon)}
                                    >
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => deleteVolume(webtoon.id)}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
})

ContentAdminMainDashboard.displayName = "ContentAdminMainDashboard"