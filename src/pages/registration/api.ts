import { host } from "../../constants/host";
import BaseAPI from "../../lib/baseApi";
import { Data, METHODS, Options } from "../../lib/http";
import router from "../../main";

export type RegistrationForm = {
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
}
class RegistrationApi extends BaseAPI {
    signUpUser(convertedData?: Data) {
        const signUpOptions: Options = {
            method: METHODS.POST,
            headers: ["Content-Type", "application/json"],
            data: convertedData,
        };

        return this.post(`${host}/api/v2/auth/signup`, signUpOptions)
            .then((response: unknown) => {
                if (response instanceof XMLHttpRequest) {
                    if (response.status >= 200 && response.status < 300) {
                        const jsonData = JSON.parse(response.responseText);
                        return jsonData;
                    } else {
                        throw new Error("Request failed with status: " + response.status);
                    }
                } else {
                    throw new Error("Invalid response type");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });    
    }

    getUserInfo() {
        const getUserOptions = {
            method: METHODS.GET,
        };

        return this.get(`${host}/api/v2/auth/user`, getUserOptions)
            .then((response: unknown) => {
                if (response instanceof XMLHttpRequest) {
                    if ((response as XMLHttpRequest).status >= 200 && (response as XMLHttpRequest).status < 300) {
                        router.go("/messenger");
                    } else {
                        throw new Error("Request failed with status: " + (response as XMLHttpRequest).status);
                    }
                } else {
                    throw new Error("Invalid response type");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

export default RegistrationApi;
