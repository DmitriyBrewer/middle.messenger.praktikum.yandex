export const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

function queryStringify(data: Data): string {
    const queryString = data.reduce((result, [key, value], index) =>
        `${result}${key}=${value}${index < data.length - 1 ? "&" : ""}`,
    "?"
    );

    return queryString;
}

type Header = [string, string] | Record<string, string>
export type Data = Header[]
  
export type Options = {
    method?: string,
    data?: Data,
    timeout?: number,
    headers?: Header,
    repeat?: number,
    body?: any
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
        console.log(options);
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
        console.log(options);
        const currentOption = options? options : {headers:{}, method:undefined, data:undefined, body:undefined};
        const {headers = {}, method, data, body} = currentOption;
        console.log(body);

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

            // if (isGet && !data) {
            //     xhr.send();
            // } 
            if (isGet && !data) {
                xhr.send();
            } 
            // else if(body) {
            //     console.log(body);
            //     console.log("typeof body === string");
            //     xhr.send(body);
            // }
            else if (data instanceof FormData) {
                xhr.send(data);
            }  else {
                if(body) {
                    // const dataToSend = new URLSearchParams(body);
                    // console.log(dataToSend);
                    xhr.send([body]);
                } else {
                    const dataToSend = new URLSearchParams();
                    data && data.forEach((header: Header) => {
                        dataToSend.append(header[0], header[1]);
                    });
                    console.log(dataToSend);
                    xhr.send(dataToSend);
                }
            }
        });
    };
}


export const http = new HTTPTransport();
