"use client"

import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { AddUserModal } from "@/components/admin/dashboard/users/add-user"
import { EditUserModal } from "@/components/admin/dashboard/users/edit-user"

export default function Page() {
    const [isModalOpen, setIsAddModalOpen] = useState(false)
    const openModal = () => setIsAddModalOpen(true)
    const closeModal = () => setIsAddModalOpen(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const openEditModal = (user: any) => {
        setUser(user)
        setIsEditModalOpen(true)
    }
    const closeEditModal = () => setIsEditModalOpen(false)
    const [flag, setFlag] = useState(false)
    const [users, setUsers] = useState<any>([])
    const [user, setUser] = useState<any>(null)
    const setFlagRefresh = () => setFlag(!flag)
    useEffect(() => {
        async function getData() {
            const res = await fetch(
                `/api/auth`, {
                method: "GET",
            },
            );
            const user = await fetch(
                `/api/user`, {
                method: "GET",
            },
            );

            const users = await user.json()

            if (users?.data) {
                setUsers(users?.data)
            }
        }
        getData()
    }, [flag])

    const deteleUser = async (id: string) => {
        setFlag(!flag)
    }
    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    {/* <Button size="sm" className="h-8 gap-1" >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Import CSV</span>
                    </Button> */}
                    <Button size="sm" className="h-8 gap-1" onClick={openModal} >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Users</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] sm:table-cell">
                                        <span className="sr-only">Id</span>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead>email</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead className="hidden md:table-cell">Created at</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users && users?.map((user: any) => (
                                    <TableRow key={user?.id}>
                                        <TableCell className="font-medium">
                                            {/* {user?.id} */}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.user_name}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.user_role}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {user?.user_email}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {user?.user_phone}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {new Date(user?.created_at as string).toLocaleString()}
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
                                                    {/* <Link href={`/dashboard/user}`}>
                                                        <DropdownMenuItem>View</DropdownMenuItem>
                                                    </Link> */}
                                                    <DropdownMenuItem onClick={() => openEditModal(user)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => deteleUser(user?.user_id)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            {/* Showing <strong>1-10</strong> of <strong>{webtoons?.length}</strong> webtoons */}
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
            {isModalOpen && <AddUserModal onClose={closeModal} setFlagRefresh={setFlagRefresh} />}
            {isEditModalOpen && <EditUserModal onClose={closeEditModal} setFlagRefresh={setFlagRefresh} user={user} />}

        </Tabs>
    )
}