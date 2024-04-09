import "./index.scss";
import  ProfilePageTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";
import ProfilePrev from "../../components/profile/profile-prev";
import ProfileHeader from "../../components/profile/profle-header";
import ProfileFootMenu from "../../components/profile/profile-foot-menu";
import ProfileParamsList from "../../components/profile/profile-param-list";
import ProfileInputList from "../../components/profile/profile-input-list";
import Button from "../../ui/button";
import ProfilePasswordList from "../../components/profile/profile-password-list";
import ProfileForm from "../../components/profile/profile-form";
import { mockProfile } from "../../constants/mockProfile";
import { profileController } from "./controller";
import store from "../../lib/store";
import { authController } from "../auth/controller";

export class ProfilePage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({}),
        });

        if(!store.getState().userData) {
            authController.getUserInformation();
        }

        this.children.profileForm =  new ProfileForm({
            profileHeader:new ProfileHeader({
                src:"/assets/union.svg",
                name: "Имя"
            }),
            profileParamList: new ProfileParamsList({}),
            footMenu: new ProfileFootMenu({}),
        }),
        console.log(store);
       
    }

    render() {
        console.log(this);
        return this.compile(ProfilePageTemplate, {});
    }
}

export class ProfilePageChangeData extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/settings",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            }),
            profileForm: new ProfileForm({
                api: (formData: Record<string, string>) => {
                    profileController.updateProfileController(formData);
                },
                profileHeader: new ProfileHeader({
                    name: mockProfile.first_name,
                    src:"profiless"
                }),
                profileParamList: new ProfileInputList({
                    data:mockProfile,
                }),
                footMenu: new Button({
                    text: "Сохранить", 
                    type:"submit",
                    className: "profileChangeButton"
                }),
            }),
            data: mockProfile
        });
        if(!store.getState().userData) {
            authController.getUserInformation();
        }
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

export class ProfilePageChangePassword extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/settings",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            }),
            profileForm: new ProfileForm({
                api: (formData: Record<string, string>) => {
                    profileController.updatePasswordController(formData);
                },
                profileHeader: new ProfileHeader({
                    name: mockProfile.first_name,
                    src:"/assets/union.svg"
                }),
                profileParamList: new ProfilePasswordList({
                    data:mockProfile,
                }),
                footMenu: new Button({
                    text: "Сохранить", 
                    type:"submit",
                    className: "profileChangeButton"
                }),
            }),
            data: mockProfile
        });

        if(!store.getState().userData) {
            authController.getUserInformation();
        }
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}
