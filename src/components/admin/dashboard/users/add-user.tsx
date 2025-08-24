"use client"
import { Button } from "@/components/ui/button";
import { slugify } from "@/utils/slugify";
import { useParams } from "next/navigation";
import { use, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";


const AddUserModal = ({ onClose, setFlagRefresh }:
    { onClose: () => void, setFlagRefresh: () => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const HandleAddUser = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (password == confirmPassword) {
            setLoading(true);
           
            toast.success("Thêm user thành công")
            onClose()
            setFlagRefresh()
            setLoading(false);
        }
        else {
            toast.error('Sai mật khẩu')
        }
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl mb-4">Add User</h2>
                <form>
                    <input type="text" placeholder="Email" className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <div className="flex justify-end pt-4">
                        <Button onClick={onClose} className="mr-2" type="button">Cancel</Button>
                        <Button type="submit" onClick={HandleAddUser} disabled={loading}>{loading ? "Uploading..." : "Add"}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { AddUserModal };