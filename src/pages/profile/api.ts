import BaseAPI from "../../lib/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";
import { METHODS, Options } from "../../lib/http";
class ProfileApi extends BaseAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        super();
        this.baseUrl = baseUrl;
    }

    public updateUserProfile(data: Record<string, string>) {
        const options: Options = {
            method: METHODS.PUT,
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data)
        };

        return this.put(`${this.baseUrl}/api/v2/user/profile`, options);
    }

    public updateUserPassword(data: Record<string, string>) {
        const options: Options = {
            method: METHODS.PUT,
            headers: ["Content-Type", "application/json"],
            data: mapDataToEntriesArray(data)
        };

        return this.put(`${this.baseUrl}/api/v2/user/password`, options);
    }

    public updateUserProfileAvatar(file: File) {
        const data = new FormData();
        data.append("avatar", file);
        
        const options: Options = {
            method: METHODS.PUT,
            data: data,
        };

        return this.put(`${this.baseUrl}/api/v2/user/profile/avatar`, options);
    }

    public logoutUserProfile() {
        const options: Options = {
            method: METHODS.POST,
            headers: ["Content-Type", "application/json"],
        };

        return this.post(`${this.baseUrl}/api/v2/auth/logout`, options);
    }
}

export default ProfileApi;
