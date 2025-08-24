
interface IInteractHttp {
    getParamsToRoute(urlPass: string, prefix: string): string;
    createUrlParamsFromRequestUrl(urlPass: string): URLSearchParams;
    getParams({
        urlPass, 
        position
    } : GetParams): string;
}

/**
 * @property { number } position -- start position: 1
 * @property { string } urlPass - url is passed to get params
 * @example
 *  urlPass: "https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname?q=value"
 *  position: 1
 *  => return: en-US
 */
type GetParams = {
    urlPass: string,
    position: number
}

class InteractHtttp implements IInteractHttp {
    /**
     * @desc get params
     * @param {string} urlPass
     * @param {prefix} urlPass
     * @returns
     */
    getParamsToRoute(urlPass: string, prefix: string) {
        const url = new URL(urlPass);
        
        // get param from url
        const indexStart = (prefix).length;
        return url.pathname.slice(indexStart);
    }

    /**
     * @desc get Url search params
     * @param {string} urlPass 
     * @returns 
     */
    createUrlParamsFromRequestUrl(urlPass: string) {
        const url = new URL(urlPass);
        return new URLSearchParams(url.search);
    }
    
    /**
     * `getParams` method is used to get params in url
     * @param {string} urlPass 
     * @returns 
     */
    getParams({
        urlPass, 
        position
    } : GetParams) {
        const url = new URL(urlPass);
        const arraySplitted = url.pathname.split("/");
        return arraySplitted[position] ?? ""
    }
}

export const interactHtttp = new InteractHtttp();