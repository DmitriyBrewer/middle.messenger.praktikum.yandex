import { expect } from "chai";
import BaseAPI from "./baseApi";
import { METHODS } from "./http";
import { host } from "../../constants/host";

class UserAPI {
    private baseAPI: BaseAPI;

    constructor(baseAPI: BaseAPI) {
        this.baseAPI = baseAPI;
    }

    public async getUserInfo() {
        const getUserOptions = {
            method: METHODS.GET,
        };

        return this.baseAPI.get(`${host}/api/v2/auth/user`, getUserOptions);    
    }
}

describe("UserAPI", () => {
    let userAPI: UserAPI;
    let mockBaseAPI: BaseAPI;

    beforeEach(() => {
        mockBaseAPI = new BaseAPI(); 
        userAPI = new UserAPI(mockBaseAPI);
    });

    it("Должен вызывать метод getUserInfo и обрабатывать ответ", async () => {
        const fakeResponse = {
            status: 200,
            responseText: JSON.stringify({ avatar: "avatar.jpg" })
        };

        mockBaseAPI.get = async () => fakeResponse;

        const userInfoResponse = await userAPI.getUserInfo();

        expect(userInfoResponse).to.exist;
    });
});
