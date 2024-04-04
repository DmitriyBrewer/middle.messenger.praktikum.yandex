import { host } from "../../constants/host";
import { convertData } from "../../lib/convertData";
import { METHODS, http } from "../../lib/http";
import router from "../../main";

export type RegistrationForm = {
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
}

export function signUpUser(convertedData?:[string, unknown][]) {
    const signUpOptions = {
        method: METHODS.POST,
        headers: [["Content-Type", "application/json"]],
        data: convertedData,
    };

    return http.post(`${host}/api/v2/auth/signup`, signUpOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export function getUserInfo() {
    const getUserOptions = {
        method: "GET",
    };

    return http.get(`${host}/api/v2/auth/user`, getUserOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                // return response.json();
                router.go("/messenger");
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        });
}

export const registrationHandler = (data:Record<string,string>) => {
    signUpUser(convertData(data))
        .then(data => {
            console.log(data);
            return getUserInfo();
        })
        .then(data => {
            console.log("user", data);
        });
};
