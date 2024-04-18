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
            .then(() => {
                this.getUserInformation(); 
            })
            .catch((error) => {
                console.error("Error signing up user:", error);
            });
    }

    private getUserInformation() {
        this.registrationApi.getUserInfo()
            .then(() => {
            })
            .catch((error) => {
                console.error("Error getting user information:", error);
            });
    }
}

export const registrationController = new RegistrationController();
