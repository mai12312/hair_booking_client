export declare module HTTPAPI {
    declare module RequestJSON {
        type Payload = Record<string, string | boolean>
    }
    
    /**
     * @desc Search parameters of the volume detail page
     * @file [src/app/(admin)/dashboard/[slug]/[volumn]]/
     */
    export type SearchParamsVolumDetailPage = {
        vid: string,
        vcid: string
    }

    export type Response<T> = {
        status: string, 
        message?: string, 
        datas: T
    }
}