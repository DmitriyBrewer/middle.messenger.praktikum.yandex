import { host } from "../../constants/host";
import BaseAPI from "../../lib/baseApi";
import { Data, METHODS, Options } from "../../lib/http";
import store from "../../lib/store";
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
                        // router.go("/messenger");
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
                        const data = JSON.parse((response as XMLHttpRequest).responseText);
                        data.avatar = data.avatar ? data.avatar.replaceAll("/", "%2F") : null;
                        data.avatar = `https://ya-praktikum.tech/api/v2/resources/${data.avatar}`;
                        store.set("userData", data);
                        console.log(store);
                        if(router.getCurrentPathname() === "/") {
                            router.go("/messenger");
                        }
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
