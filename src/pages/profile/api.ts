import BaseAPI from "../../lib/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";
import { METHODS } from "../../lib/http";

// class ProfileApi extends BaseAPI {
//     private baseUrl: string;

//     constructor(baseUrl: string) {
//         super();
//         this.baseUrl = baseUrl;
//     }

//     public updateUserProfile(data: Record<string, string>) {
//         const options = {
//             method: METHODS.PUT,
//             headers: ["Content-Type", "application/json"],
//             data: mapDataToEntriesArray(data)
//         };

//         return this.put(`${this.baseUrl}/api/v2/user/profile`, options);
//     }

//     public updateUserPassword(data: Record<string, string>) {
//         const options = {
//             method: METHODS.PUT,
//             headers: ["Content-Type", "application/json"],
//             data: mapDataToEntriesArray(data)
//         };

//         return this.put(`${this.baseUrl}/api/v2/user/password`, options);
//     }
// }

// export default ProfileApi;
class ProfileApi extends BaseAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    public updateUserProfile(data: Record<string, string>) {
        const options = {
            method: METHODS.PUT,
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data)
        };

        return this.put(`${this.baseUrl}/api/v2/user/profile`, options);
    }

    public updateUserPassword(data: Record<string, string>) {
        const options = {
            method: METHODS.PUT,
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data)
        };

        return this.put(`${this.baseUrl}/api/v2/user/password`, options);
    }

    public updateUserProfileAvatar(file: File) {
        const data = new FormData();
        data.append("avatar", file);
        
        const options = {
            method: METHODS.PUT,
            data,
        };

        return this.put(`${this.baseUrl}/api/v2/user/profile/avatar`, options);
    }

    public logoutUserProfile() {
        const options = {
            method: METHODS.POST,
            headers: ["Content-Type", "application/json"],
            data: ""
        };

        return this.post(`${this.baseUrl}/api/v2/auth/logout`, options);
    }
}

export default ProfileApi;
