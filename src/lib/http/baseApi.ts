import { HTTPTransport, Options } from "./http";

class BaseAPI {
    protected http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    get(url: string, options?: Options) {
        return this.http.get(url, options);
    }

    post(url: string, options?: Options) {
        return this.http.post(url, options);
    }

    put(url: string, options?: Options) {
        return this.http.put(url, options);
    }

    delete(url: string, options?: Options) {
        return this.http.delete(url, options);
    }
}

export default BaseAPI;
