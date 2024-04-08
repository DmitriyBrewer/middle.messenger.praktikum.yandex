// import { host } from "../../constants/host";
// import { mapDataToEntriesArray } from "../../lib/convertData";
// import { METHODS, http } from "../../lib/http";
// import router from "../../main";

// export function changeUserData(data:Record<string,string>) {
//     const signUpOptions = {
//         method: METHODS.PUT,
//         headers: ["Content-Type", "application/json"],
//         data: mapDataToEntriesArray(data)
//     };

//     return http.put(`${host}/api/v2/user/profile`, signUpOptions)
//         .then((response) => {
//             if (response.status >= 200 && response.status < 300) {
//                 // return response.json();
//                 router.back();
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


// export function changeUserPassword(data:Record<string,string>) {
//     const signUpOptions = {
//         method: METHODS.PUT,
//         headers: ["Content-Type", "application/json"],
//         data: mapDataToEntriesArray(data)
//     };

//     return http.put(`${host}/api/v2/user/password`, signUpOptions)
//         .then((response) => {
//             if (response.status >= 200 && response.status < 300) {
//                 // return response.json();
//                 router.back();
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
import BaseAPI from "../../lib/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";

class ProfileApi extends BaseAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    public updateUserProfile(data: Record<string, string>) {
        const options = {
            method: "PUT",
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data)
        };

        return this.put(`${this.baseUrl}/api/v2/user/profile`, options);
    }

    public updateUserPassword(data: Record<string, string>) {
        const options = {
            method: "PUT",
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data)
        };

        return this.put(`${this.baseUrl}/api/v2/user/password`, options);
    }
}

export default ProfileApi;
