"use client"

import { HTTPAPI } from "@/types/http-api"

export const useFetchApi = () => {
    /**
     * status code of fetch api when fetching is successful
     */
    const STATUS_FETCH = "201";
    /**
     * type successful when fetching is implemented
     * @param {any} params - data is returned
     */
    type SUCCESS_FETCH = (params?: any) => void;
    /**
     * type error when fetching is implemented
     * @param {any} params - data is returned
     */
    type ERROR_FETCH = (params?: any) => void;
    /**
     * OPTION_HTTP_FETCH is used when fetching is implemented
     */
    type OPTION_HTTP_FETCH ={
        method?: "GET" | "POST" | "PUT" | "DELETE",
        headers?: Record<string, string>,
        body?: any
    }
    /**
     * `handleFetchApi` handle fetch api
     * @param {string} api
     * @param {OPTION_HTTP_FETCH} options - this options is used to fetch api
     * @param {SUCCESS_FETCH} callback - this function is called when fetch sussessfully 
     * @param {ERROR_FETCH} catchError - this function is called to catch exception when fetching is failed
     */
    const handleFetchApi = (
        api: string,
        callback: SUCCESS_FETCH,
        catchError: ERROR_FETCH,
        options: OPTION_HTTP_FETCH = {
            method: "GET"
        }
    ) => {
        fetch(api, options)
            .then(res => res.json())
            .then(data => {
                if(data["status"] == STATUS_FETCH) {
                    successFetch(data, callback)
                } else {
                    errorFetch(catchError)
                }
            })
            .catch((_) => catchError())
    }
    /**
     * `successFetch` get data is returned when fetch
     * @param data - data is responsed
     * @param callback - callback function to handle success fetching
     */
    function successFetch<T>(data: Partial<HTTPAPI.Response<T>>, callback: SUCCESS_FETCH) {
        callback(data)
    }
    /**
     * `errorFetch` get data is returned when fetch
     * @param catchError - callback function to handle error fetching
     */
    function errorFetch(catchError: ERROR_FETCH) {
        catchError()
    }
    
    return {
        handleFetchApi
    }
    
}