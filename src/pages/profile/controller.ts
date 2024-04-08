import { host } from "../../constants/host";
import store from "../../lib/store";
import ProfileApi from "./api";

class ProfileController {
    private profileApi: ProfileApi;

    constructor() {
        this.profileApi = new ProfileApi(host);
    }

    public updateProfileController(data: Record<string, string>) {
        this.profileApi.updateUserProfile(data).then((res) => {
            console.log(res);
            store.set("userData", res);
        })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    }

    public updatePasswordController(data: Record<string, string>) {
        this.profileApi.updateUserPassword(data).then((res) => {
            console.log(res);
            // Можно добавить дополнительную логику при успешном обновлении пароля
        })
            .catch((error) => {
                console.error("Error updating password:", error);
            });
    }
}

export const profileController = new ProfileController();
