import { host } from "../../../constants/host";
import { METHODS, http } from "../../../lib/http";
import router from "../../../main";

export function logout() {
    const signUpOptions = {
        method: METHODS.POST,
        headers: ["Content-Type", "application/json"],
    };

    return http.post(`${host}/api/v2/auth/logout`, signUpOptions)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                router.go("/");
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
