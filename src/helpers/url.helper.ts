
export class UrlHelper {
    private methodProcess: UrlParamMethod;
    constructor(method: UrlParamMethod) {
        this.methodProcess = method;
    }
    setMethod(methodProcess: UrlParamMethod) {
        this.methodProcess = methodProcess;
    }

    getMethod() {
        return this.methodProcess;
    }

    process(url: string) {
        return this.methodProcess.process(url);
    }
}

/**
 * Get url parameters is default value
 */
class GetUrlParam implements UrlParamMethod {
    process(url: string): string {
        const urlParams = new URL(url);
        return urlParams.pathname;
    };
}

export class GetUrlSearchParam implements UrlParamMethod {
    process(url: string): Array<string> {
        const urlParams = new URLSearchParams(url);
        return urlParams.getAll(url);
    };
}

interface UrlParamMethod {
    process: (url: string) => string | string[];
}

export const urlHelper = new UrlHelper(new GetUrlParam());
