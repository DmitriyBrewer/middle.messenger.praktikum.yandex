// import { authHandler } from "./api";

// class AuthController {
//     public getUser(data:Record<string, string>) {
//         authHandler(data);
//     }
// } 

// export const authController = new AuthController();
import { mapDataToEntriesArray } from "../../lib/convertData";
import AuthApi from "./api";

class AuthController {
    private authApi: AuthApi;

    constructor() {
        this.authApi = new AuthApi();
    }

    public async signInUser(formData: Record<string, string>) {
        const convertedData = mapDataToEntriesArray(formData);

        try {
            await this.authApi.signInUser(convertedData);
            console.log("User signed in successfully");
            this.getUserInformation();
        } catch (error) {
            console.error("Error signing in user:", error);
        }
    }

    private async getUserInformation() {
        try {
            const userInfo = await this.authApi.getUserInfo();
            console.log("User information retrieved successfully:", userInfo);
        } catch (error) {
            console.error("Error getting user information:", error);
        }
    }
}

export const authController = new AuthController();
