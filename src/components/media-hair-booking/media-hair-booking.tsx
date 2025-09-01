import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UploadCloud } from "lucide-react";
import { getApiBackend } from "@/utils/env.util";
import { toast } from "react-toastify";

export interface MediaHairBookingProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (imageUrl: string) => void;
}

export function MediaHairBooking({ open, onOpenChange, onSelect }: MediaHairBookingProps) {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [tab, setTab] = useState("media");
    const [uploadPreview, setUploadPreview] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    // fetch all media
    const fetchImages = () => {
        setLoading(true);
        fetch(`${getApiBackend()}/api/media`)
            .then(res => res.json())
            .then(data => {
                setImages(data?.images || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (open) {
            fetchImages();
            setSelected("");
            setTab("media");
        }
    }, [open]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadPreview(URL.createObjectURL(file));
        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await fetch(`${getApiBackend()}/api/media/upload`, {
                method: "POST",
                body: formData,
            });
            const data: DataResponse<{ imageUrl: string }> = await res.json();
            const imageUrl = data?.datas?.imageUrl ?? "";
            if(data.status === 201 && imageUrl) {
                toast.success("Upload hình ảnh thành công!")
                setImages(prev => [imageUrl, ...prev]);
                setTab("media");
                setSelected(imageUrl); // Optionally auto-select the new image
            } else {
                toast.error("Upload hình ảnh thất bại!")
            }
        } finally {
            setUploading(false);
            setUploadPreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleConfirm = () => {
        if (selected) {
            onSelect(selected);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Chọn ảnh từ Media</DialogTitle>
                </DialogHeader>
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="media">Thư viện ảnh</TabsTrigger>
                        <TabsTrigger value="upload">Tải ảnh lên</TabsTrigger>
                    </TabsList>
                    <TabsContent value="media">
                        <div className="grid grid-cols-3 gap-4 py-2 max-h-96 overflow-y-auto">
                            {loading && <div>Loading...</div>}
                            {!loading && images.length === 0 && <div className="col-span-3 text-center text-gray-400">No images</div>}
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`border rounded p-1 ${selected === img ? "ring-2 ring-blue-400" : "hover:ring-2 ring-blue-200"}`}
                                    onClick={() => setSelected(img)}
                                >
                                    <img src={img} alt="media" className="w-full h-24 object-cover rounded" />
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => onOpenChange(false)}
                            >
                                Đóng
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                disabled={!selected}
                                onClick={handleConfirm}
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="upload">
                        <div className="flex flex-col items-center gap-4 py-4 w-full">
                            <label
                                htmlFor="media-upload"
                                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer h-48 bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                                <span className="text-gray-600 font-medium">Upload or drag and drop your images</span>
                                <span className="text-xs text-gray-400 mt-1 text-center">
                                    (Hình ảnh được hỗ trợ- .jpeg, .png, and .gif. File size limit is 1 MB.)
                                </span>
                                <input
                                    id="media-upload"
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleUpload}
                                    disabled={uploading}
                                    className="hidden"
                                    name="image"
                                />
                            </label>
                            {uploadPreview && (
                                <div className="w-32 h-32 border rounded flex items-center justify-center bg-white">
                                    <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover rounded" />
                                </div>
                            )}
                            {uploading && <span className="text-sm text-gray-500">Đang tải ảnh lên...</span>}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
