"use client"

import { PathFilePropsOptions } from "@/components/admin/volume-detail/upload-uppy-volume-detail";
import { processSlug } from "@/utils/slugify";
import { Meta, UppyFile } from "@uppy/core";

export const usePathFileUppy = () => {

    const pathFileOnlyName = (prefix: string, fileName: string) => {
        if (fileName.length > 0) {
            const position = fileName.indexOf(".", -1);
            const fileNameSliced = fileName.substring(0, position);
            // console.log("fileNameSliced::", fileNameSliced);

            const ext = fileName.substring(position).toLowerCase();
            // console.log("extentions::", ext);

            const fileNamelast = processSlug(fileNameSliced) + ext;

            return `${prefix}/${fileNamelast}`
        }
        return "";
    }

    const pathFile = (folder?: string, file?: UppyFile<Meta, Record<string, never>>, pathFileProps?: PathFilePropsOptions) => {
        let pathFile = "";
        if (file && file.name) {
            const position = file.name.indexOf(".", -1);
            const fileNameSliced = file.name.substring(0, position);
            // console.log("fileNameSliced::", fileNameSliced);

            const ext = file.name.substring(position).toLowerCase();
            // console.log("extentions::", ext);

            const fileName = processSlug(fileNameSliced) + ext;

            if (folder) {
                pathFile = `${folder}/${fileName}`
            } else if (pathFileProps) {
                pathFile = `${pathFileProps?.path ?? ""}/${fileNameSliced}${pathFileProps?.encryptPrefixLast ?? ""}${ext}`
            } else {
                pathFile = fileName;
            }
        }
        return pathFile;
    }

    return {
        pathFile,
        pathFileOnlyName
    }
}

