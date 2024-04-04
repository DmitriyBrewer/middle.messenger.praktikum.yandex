import { host } from "../../constants/host";
import { convertData } from "../../lib/convertData";
import { METHODS, http } from "../../lib/http";
import router from "../../main";

function signInUser(convertedData?:[string, unknown][]) {
    const signUpOptions = {
        method: METHODS.POST,
        headers: ["Content-Type", "application/json"],
        data: convertedData,
    };

    return http.post(`${host}/api/v2/auth/signin`, signUpOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                // return response.json();
                router.go("/messenger");
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


function getUserInfo() {
    const getUserOptions = {
        method: "GET",
    };

    return http.get(`${host}/api/v2/auth/user`, getUserOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        });
}

export const authHandler = (data:Record<string,string>) => {
    signInUser(convertData(data))
        .then(data => {
            console.log(data);
            return getUserInfo();
        })
        .then(data => {
            console.log("user", data);
        });
};
