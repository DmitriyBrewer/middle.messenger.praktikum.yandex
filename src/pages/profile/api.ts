import BaseAPI from "../../lib/baseApi";
import { mapDataToEntriesArray } from "../../lib/convertData";
import { METHODS } from "../../lib/http";

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
}

export default ProfileApi;
