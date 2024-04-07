// import { host } from "../../constants/host";
// import { mapDataToEntriesArray } from "../../lib/convertData";
// import { METHODS, http } from "../../lib/http";
// import router from "../../main";

// function signInUser(convertedData?:[string, unknown][]) {
//     const signUpOptions = {
//         method: METHODS.POST,
//         headers: ["Content-Type", "application/json"],
//         data: convertedData,
//     };

//     return http.post(`${host}/api/v2/auth/signin`, signUpOptions)
//         .then((response) => {
//             if (response.status >= 200 && response.status < 300) {
//                 // return response.json();
//                 router.go("/messenger");
//             } else {
//                 throw new Error("Request failed with status: " + response.status);
//             }
//         })
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// }


// function getUserInfo() {
//     const getUserOptions = {
//         method: "GET",
//     };

//     return http.get(`${host}/api/v2/auth/user`, getUserOptions)
//         .then((response) => {
//             if (response.status >= 200 && response.status < 300) {
//                 return response.json();
//             } else {
//                 throw new Error("Request failed with status: " + response.status);
//             }
//         });
// }

// export const authHandler = (data:Record<string,string>) => {
//     signInUser(mapDataToEntriesArray(data))
//         .then(data => {
//             console.log(data);
//             return getUserInfo();
//         })
//         .then(data => {
//             console.log("user", data);
//         });
// };

import { host } from "../../constants/host";
import BaseAPI from "../../lib/baseApi";
import { Data, METHODS, Options } from "../../lib/http";
import router from "../../main";

class AuthApi extends BaseAPI {
    signInUser(convertedData?: Data) {
        const signUpOptions: Options = {
            method: METHODS.POST,
            headers: ["Content-Type", "application/json"],
            data: convertedData,
        };

        return this.post(`${host}/api/v2/auth/signin`, signUpOptions)
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

    getUserInfo() {
        const getUserOptions = {
            method:METHODS.GET,
        };

        return this.get(`${host}/api/v2/auth/user`, getUserOptions)
            .then((response: unknown) => {
                if (response instanceof XMLHttpRequest) {
                    if ((response as XMLHttpRequest).status >= 200 && (response as XMLHttpRequest).status < 300) {
                        return JSON.parse((response as XMLHttpRequest).responseText);
                    } else {
                        throw new Error("Request failed with status: " + (response as XMLHttpRequest).status);
                    }
                } else {
                    throw new Error("Invalid response type");
                }
            });
    }
}

export default AuthApi;
