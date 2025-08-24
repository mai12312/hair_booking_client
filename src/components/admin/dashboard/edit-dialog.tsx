"use client"
import { Button } from "@/components/ui/button";
import { memo, useCallback, useEffect, useState } from "react";
import Select, { ActionMeta, GroupBase, MultiValue, PropsValue } from 'react-select'
import { useGetVolumes } from "@/hooks/dashboard/useGetVolumes";
import { useGetVolumeInfo } from "@/hooks/dashboard/useGetVolumeInfo";
import { TSelectOptions } from "./add-dialog";
import { useVolumeActions } from "@/hooks/dashboard/useVolumeActions";
import { AddThumnailVolumeAdmin } from "./add-thumbail-volume-admin";
import { ImageCustom } from "@/components/wrapper-image";

export const EditWebtoonModal = memo(({
  options
}: {
  options: readonly (TSelectOptions | GroupBase<TSelectOptions>)[]
}) => {
  const { 
    volumeEdited, setVolumeEdited,
    tag, setTag,
    name, setName,
    description, setDescription,
    thumbnailUrl, setThumbnailUrl
  } = useGetVolumeInfo();

  const { editVolume } = useVolumeActions();
  const [isChangeThumbnail, setIsChangeThumbnail] = useState(false);
  
  useEffect(() => {
    if(volumeEdited) {
      setName(volumeEdited?.name ?? "")
      setDescription(volumeEdited?.description ?? "")
      setTag(volumeEdited?.tag ?? []);
      setThumbnailUrl(volumeEdited.thumbnail ?? "")
    }
  }, [])

  const {
    isEditModalOpen,
    setIsEditModalOpen,
    isLoading
  } = useGetVolumes();
  
  /*
    close the edit modal
   */
  const closeEditModal = useCallback(() => {
    setVolumeEdited(null);
    setIsEditModalOpen(false);
  }, [ isEditModalOpen ]);

  /**
   * @desc handle select change events
   * @param choice 
   * @param action 
   */
  const selectCategories = (choice: MultiValue<TSelectOptions>, action: ActionMeta<TSelectOptions>) => {
    if(choice) {
      const values = choice.map((tag) => tag.value);
      console.log("values:", values);
      setTag(values)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">Edit Webtoon</h2>
        <div>
          <input
            type="text"
            placeholder="Webtoon Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={e => setName(e.target.value)}
            value={name}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={e => setDescription(e.target.value)}
            required
            value={description}
          />
          <div className="mb-4">
            <Select 
              options={options} 
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              value={
                tag.map((item) => ({
                  label: item,
                  value: item,
                }))
              }
              onChange={selectCategories}
            />
          </div>
          {
            (volumeEdited?.thumbnail && volumeEdited?.thumbnail.length > 0 && !isChangeThumbnail) ?  (
              <>
                <ImageCustom
                  src={
                    (thumbnailUrl && thumbnailUrl.length > 0) 
                    ? thumbnailUrl
                    : undefined // if thumbnail is undefined, element will use the "default" image
                  } 
                  className=""
                />
                <Button
                  type="submit"
                  className="mt-1 bg-gray-500 hover:bg-gray-700 active:bg-gray-700 h-8"
                  onClick={() => setIsChangeThumbnail(true)}
                >
                  change
                </Button>
              </>
            ) : (
              <AddThumnailVolumeAdmin
                className="is-many-uppy-dashboards aspect-auto" 
                pathFileProps={{
                  path: `${volumeEdited?.id ?? ""}`,
                  encryptPrefixLast: `_vid`
                }}
              />
            )
          }
          <div className="flex justify-end pt-4">
            <Button 
              onClick={closeEditModal} 
              className="mr-2" 
              type="button"
            >
              Cancel
            </Button>

            <Button 
              type="submit" 
              disabled={isLoading}
              onClick={() => editVolume()}
            >
              {isLoading ? "Updating..." : "Edit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
})

EditWebtoonModal.displayName = "EditWebtoonModal";