import axios, {AxiosRequestConfig} from "axios";

export function APIException(message, responseStatus, errorCode): void {
    this.message = message;
    this.stack = Error().stack;
    this.responseStatus = responseStatus;
    this.errorCode = errorCode;
    return this;
}

function handleError(error) {
    let message = "failed to call API";
    let responseStatus = null;
    let errorCode = null;
    if (error.response) {
        responseStatus = error.response.status;
        if (error.response.data) {
            if (error.response.data.message) {
                message = error.response.data.message;
            }
            if (error.response.data.errorCode) {
                errorCode = error.response.data.errorCode;
            }
        }
    }
    throw new APIException(message, responseStatus, errorCode);
}

axios.interceptors.response.use((response) => response, (error) => {
    handleError(error);
});

export function ajax<Request, Response>(url: string, method: string, request: Request): Promise<Response> {
    const config: AxiosRequestConfig = {
        method,
        url
    };

    if (method === "GET" || method === "DELETE") {
        config.params = request;
    } else if (method === "POST" || method === "PUT" || method === "PATCH") {
        config.data = request;
    }

    return axios.request(config).then((response) => response.data);
}

export function path(pattern: string, params: { [name: string]: string }): string {
    let path = pattern;
    Object.entries(params).forEach(([name, value]) => {
        path = path.replace(":" + name, value);
    });
    return path;
}