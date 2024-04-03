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

const mockProfile = {
    email:"pochta@yandex.ru",
    login:"ivanivanov",
    first_name:"Федот",
    last_name: "Тутов",
    display_name: "feDoT",
    phone: "8 888 888 88 88"
};
export class ProfilePage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/chat",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            }),
            profileForm: new ProfileForm({
                profileHeader: new ProfileHeader({
                    name: mockProfile.first_name
                }),
                profileParamList: new ProfileParamsList(mockProfile),
                footMenu: new ProfileFootMenu({}),
            }),
            data: mockProfile
        });
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

export class ProfilePageChangeData extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/profile",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            }),
            profileForm: new ProfileForm({
                profileHeader: new ProfileHeader({
                    name: mockProfile.first_name
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
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

export class ProfilePageChangePassword extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/profile",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            }),
            profileForm: new ProfileForm({
                profileHeader: new ProfileHeader({
                    name: mockProfile.first_name
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
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}
