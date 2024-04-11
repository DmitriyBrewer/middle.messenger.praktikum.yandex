import { host } from "../../constants/host";
import store from "../../lib/store";
import router from "../../main";
import ProfileApi from "./api";

// class ProfileController {
//     private profileApi: ProfileApi;

//     constructor() {
//         this.profileApi = new ProfileApi(host);
//     }

//     public updateProfileController(data: Record<string, string>) {
//         this.profileApi.updateUserProfile(data).then((res) => {
//             console.log(res);
//             store.set("userData", res);
//         })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//             });
//     }

//     public updatePasswordController(data: Record<string, string>) {
//         this.profileApi.updateUserPassword(data).then((res) => {
//             console.log(res);
//             // TODO Можно добавить дополнительную логику при успешном обновлении пароля
//         })
//             .catch((error) => {
//                 console.error("Error updating password:", error);
//             });
//     }
// }

// export const profileController = new ProfileController();
class ProfileController {
    private profileApi: ProfileApi;

    constructor() {
        this.profileApi = new ProfileApi(host);
    }

    public updateProfileController(data: Record<string, string>) {
        this.profileApi.updateUserProfile(data).then((res) => {
            console.log(res);
            // store.set("userData", res);
            store.set("userData",JSON.parse((res as XMLHttpRequest).responseText));
        })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    }

    public updatePasswordController(data: Record<string, string>) {
        this.profileApi.updateUserPassword(data).then((res) => {
            console.log(res);
            // TODO Можно добавить дополнительную логику при успешном обновлении пароля
        })
            .catch((error) => {
                console.error("Error updating password:", error);
            });
    }

    public updateAvatarController(file: File) {
        this.profileApi.updateUserProfileAvatar(file).then((res) => {
            JSON.parse((res as XMLHttpRequest).responseText);
            store.set("userData",JSON.parse((res as XMLHttpRequest).responseText));
        })
            .catch((error) => {
                console.error("Error updating avatar:", error);
            });
    }

    public logoutController() {
        this.profileApi.logoutUserProfile().then((res) => {
            // JSON.parse((res as XMLHttpRequest).responseText);
            // store.set("userData",JSON.parse((res as XMLHttpRequest).responseText));
            router.go("/");
        })
            .catch((error) => {
                console.error("Error logout:", error);
            });
    }
}

export const profileController = new ProfileController();
