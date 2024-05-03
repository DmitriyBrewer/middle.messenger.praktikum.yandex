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

    public async deleteChats() {
        return this.baseAPI.delete(`${host}/api/v2/chats`);
    }

    public async signIn() {
        return this.baseAPI.post(`${host}/api/v2/auth/signin`);
    }

    public async updateChatAvatar() {
        return this.baseAPI.put(`${host}/api/v2/chats/avatar`);
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

    it("Должен вызывать метод для DELETE запроса и обрабатывать ответ", async () => {
        const fakeResponse = {
            status: 204,
            responseText: ""
        };

        mockBaseAPI.delete = async () => fakeResponse;

        const deleteResponse = await userAPI.deleteChats();

        expect(deleteResponse).to.exist;
    });

    it("Должен вызывать метод для POST запроса и обрабатывать ответ", async () => {
        const fakeResponse = {
            status: 201,
            responseText: JSON.stringify({ token: "mockToken" })
        };

        mockBaseAPI.post = async () => fakeResponse;

        const postResponse = await userAPI.signIn();

        expect(postResponse).to.exist;
    });

    it("Должен вызывать метод для PUT запроса и обрабатывать ответ", async () => {
        const fakeResponse = {
            status: 200,
            responseText: ""
        };

        mockBaseAPI.put = async () => fakeResponse;

        const putResponse = await userAPI.updateChatAvatar();

        expect(putResponse).to.exist;
    });
});
