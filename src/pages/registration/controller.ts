import { mapDataToEntriesArray } from "../../lib/convertData";
import RegistrationApi from "./api";

class RegistrationController {
    private registrationApi: RegistrationApi;

    constructor() {
        this.registrationApi = new RegistrationApi();
    }

    public registerUser(formData: Record<string,string>) {
        const convertedData = mapDataToEntriesArray(formData);

        this.registrationApi.signUpUser(convertedData)
            .then((data) => {
                console.log("User signed up successfully:", data);
                this.getUserInformation(); 
            })
            .catch((error) => {
                console.error("Error signing up user:", error);
            });
    }

    private getUserInformation() {
        this.registrationApi.getUserInfo()
            .then(() => {
                console.log("User information retrieved successfully");
            })
            .catch((error) => {
                console.error("Error getting user information:", error);
            });
    }
}

export const registrationController = new RegistrationController();
