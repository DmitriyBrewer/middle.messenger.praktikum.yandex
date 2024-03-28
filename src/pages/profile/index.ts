import "./index.scss";
import  ProfilePageTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/test/block";
import ProfilePrev from "../../components/profile/profile-prev";
import ProfileHeader from "../../components/profile/profle-header";
import ProfileFootMenu from "../../components/profile/profile-foot-menu";
import ProfileParamsList from "../../components/profile/profile-param-list";
import ProfileInputList from "../../components/profile/profile-input-list";
import Button from "../../ui/button";

class ProfilePage extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

const mockProfile = {
    email:"pochta@yandex.ru",
    login:"ivanivanov",
    first_name:"Федот",
    last_name: "Тутов",
    chat_name: "feDoT",
    phone: "8 888 888 88 88"
};

export const profilePage = new ProfilePage({
    profilePrev: new ProfilePrev({
        href:"/chat",
        alt:"prev",
        src: "/assets/arrow-left.svg"
    }),
    profileHeader: new ProfileHeader({
        name: mockProfile.first_name
    }),
    profileParamList: new ProfileParamsList(mockProfile),
    footMenu: new ProfileFootMenu({}),
    data: mockProfile
});


export const profileChangeDataPage = new ProfilePage({
    profilePrev: new ProfilePrev({
        href:"/profile",
        alt:"prev",
        src: "/assets/arrow-left.svg"
    }),
    profileHeader: new ProfileHeader({
        name: mockProfile.first_name
    }),
    profileParamList: new ProfileInputList({
        data:mockProfile,
    }),
    footMenu: new Button({
        text: "Сохранить", 
        type:"buttton",
        className: "profileChangeButton"
    }),
    data: mockProfile
});
