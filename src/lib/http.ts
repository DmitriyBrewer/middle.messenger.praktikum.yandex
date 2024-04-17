export const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

function queryStringify(data: Data): string {
    let headers: Header[];
    if (Array.isArray(data)) {
        headers = data;
    } else {
        headers = Array.from(data.entries()).map(([key, value]) => [key, String(value)]);
    }

    const queryString = headers.reduce((result, header, index) => {
        if (Array.isArray(header)) {
            const [key, value] = header;
            return `${result}${key}=${value}${index < headers.length - 1 ? "&" : ""}`;
        } else {
            const key = Object.keys(header)[0];
            const value = header[key];
            return `${result}${key}=${value}${index < headers.length - 1 ? "&" : ""}`;
        }
    }, "?");

    return queryString;
}

type Header = [string, string] | Record<string, string> 
export type Data = Header[] | FormData
  
export type Options = {
    method?: string,
    data?: Data,
    timeout?: number,
    headers?: Header,
    repeat?: number,
    body?: Record<string,number | number[]>
  }
  
type HTTPMethod = (url: string, options?: Options, timeout?: number) => Promise<unknown>;

export class HTTPTransport {
    get: HTTPMethod = (url, options) => {
        let currentUrl = url;
        const currentOption = options? options : {method: METHODS.GET};
        const { data, timeout } = currentOption;
        if (data) {
            currentUrl = queryStringify(data);
        }
        return this.request(currentUrl, { ...options, method: METHODS.GET }, timeout);
    };

    post: HTTPMethod = (url, options) => {
        const currentOption = options? options : {method: METHODS.POST};
        const {  timeout } = currentOption;
        return this.request(url, {...options, method: METHODS.POST}, timeout);
    };

    put: HTTPMethod = (url, options) => {
        const currentOption = options? options : {method: METHODS.PUT};
        const {  timeout } = currentOption;
        return this.request(url, {...options,body: options?.body, method: METHODS.PUT}, timeout);
    };

    delete: HTTPMethod = (url, options) => { 
        const currentOption = options? options : {method: METHODS.DELETE};
        const {  timeout } = currentOption;
        return this.request(url, {...options, method: METHODS.DELETE}, timeout);
    };

    request: HTTPMethod = (url, options, timeout = 2500) => {
        const currentOption = options? options : {headers:{}, method:undefined, data:undefined, body:undefined};
        const {headers = {}, method, data, body} = currentOption;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject("Метод отсутствует");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method, 
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.entries(headers).forEach(([key, value]: [string, unknown]) => {
                if (typeof value === "string") {
                    xhr.setRequestHeader(key, value as string);
                }
            });
            
            xhr.onload = function() {
                resolve(xhr);
            };
            
            xhr.onabort = reject;
            xhr.onerror = reject;
            
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;

            if (isGet && !data) {
                xhr.send();
            } 
     
            else if (data instanceof FormData) {
                xhr.send(data);
            }  else {
                if(body) {
                    xhr.send(JSON.stringify(body));
                } else {
                    const dataToSend = new URLSearchParams();
                    data && data.forEach((header: Header) => {
                        dataToSend.append(header[0], header[1]);
                    });
                    xhr.send(dataToSend);
                }
            }
        });
    };
}


export const http = new HTTPTransport();
