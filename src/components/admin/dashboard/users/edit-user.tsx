"use client"
import { Button } from "@/components/ui/button";
import { slugify } from "@/utils/slugify";
import { useParams } from "next/navigation";
import { use, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";


const EditUserModal = ({ onClose, setFlagRefresh ,user }:
    { onClose: () => void, setFlagRefresh: () => void , user:any}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string | null>(user?.user_name);
    const [phone, setPhone] = useState<string | null>(user?.user_phone);
    const HandleAddUser = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        
        toast.success("Sửa user thành công")
        onClose()
        setFlagRefresh()
        setLoading(false);
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl mb-4">Edit User</h2>
                <form>
                    <input type="text" placeholder="Name" className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={(e) => setName(e.target.value)} value={name!} required />
                    <input type="text" placeholder="Phone Number" className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={(e) => setPhone(e.target.value)} value={phone!} required />
                    <div className="flex justify-end pt-4">
                        <Button onClick={onClose} className="mr-2" type="button">Cancel</Button>
                        <Button type="submit" onClick={HandleAddUser} disabled={loading}>{loading ? "Uploading..." : "Edit"}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { EditUserModal };