"use client"
import { Button } from "@/components/ui/button";
import Select, { ActionMeta, GroupBase, MultiValue } from 'react-select'
import { useGetVolumes } from "@/hooks/dashboard/useGetVolumes";
import { useVolumeActions } from "@/hooks/dashboard/useVolumeActions";
import { useGetVolumeInfo } from "@/hooks/dashboard/useGetVolumeInfo";
import Image from "next/image";

export type TSelectOptions = { label: string, value: string }

/*
    tag = [value, value]
*/

const AddWebtoonModal = ({
    options
}: {
    options: readonly (TSelectOptions | GroupBase<TSelectOptions>)[]
}) => {

    const { addVolume } = useVolumeActions();
    const {
        setIsAddModalOpen,
        isLoading
    } = useGetVolumes();
    const { setTag, setDescription, setName, setFile ,setThumbnailUrl, thumbnailUrl ,file } = useGetVolumeInfo();

    const closeAddModal = () => setIsAddModalOpen(false);

    /**
     * @desc handle select change events
     * @param choice 
     * @param action 
     */
    const handleSelect = (choice: MultiValue<TSelectOptions>, action: ActionMeta<TSelectOptions>) => {
        if (choice) {
            const values = choice.map((tag) => tag?.value);
            setTag(values)
        }
    }

    const uploadThumbnail = (e:any) =>{
        setFile(e.target.value);
        setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl mb-4">Add Volume</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Webtoon Name"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <div className="mb-4">
                        <Select
                            options={options}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSelect}
                        />
                    </div>

                    {/* <label className="block mb-2 font-medium text-gray-700">
                        Preview URL
                    </label> */}
                    {/* <input
                        type="file"
                        placeholder="file"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        onChange={e =>uploadThumbnail(e)} // Update this to handle the preview URL
                        required
                    />
                    {thumbnailUrl && 
                    <Image src={thumbnailUrl} width={100} height={100} alt={""}></Image>} */}
                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={closeAddModal}
                            className="mr-2"
                            type="button"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            onClick={addVolume}
                            disabled={isLoading}
                        >
                            {isLoading ? "Uploading..." : "Add"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AddWebtoonModal };