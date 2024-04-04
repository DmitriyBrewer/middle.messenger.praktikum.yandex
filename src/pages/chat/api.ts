import { host } from "../../constants/host";
import { convertData } from "../../lib/convertData";
import { METHODS, http } from "../../lib/http";

export function getAllChats() {
    const getUserOptions = {
        method: "GET",
    };

    return http.get(`${host}/api/v2/chats`, getUserOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response.response);
                return response;
                // return response.json();
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        });
}


export function addChats(data:Record<string,string>) {
    const signUpOptions = {
        method: METHODS.POST,
        headers: ["Content-Type", "application/json"],
        data: convertData(data),
    };

    return http.post(`${host}/api/v2/chats`, signUpOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
                // router.go("/messenger");
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
