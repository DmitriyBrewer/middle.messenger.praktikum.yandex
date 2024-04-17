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
import { profileController } from "./controller";
import { authController } from "../auth/controller";
import isEqual from "../../lib/isEqual";
export class ProfilePage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/messenger",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            })
        });

        authController.getUserInformation();
        this.children.profilePrev = new ProfilePrev({
            href:"/messenger",
            alt:"prev",
            src: "/assets/arrow-left.svg"
        }),

        this.children.profileHeader = new ProfileHeader({}),

        this.children.profileForm =  new ProfileForm({
            profileParamList: new ProfileParamsList({}),
            footMenu: new ProfileFootMenu({}),
        });  
        
        this.setProps(props);    
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(!isEqual(oldProps, newProps)) {
            (this.children.profileHeader as Block).setProps(newProps);
        }
        return true;
    }

    render() {
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
        });

        this.children.profileForm =  new ProfileForm({
            api: (formData: Record<string, string>) => {
                profileController.updateProfileController(formData);
            },
            profileParamList: new ProfileInputList({}),
            footMenu: new Button({
                text: "Сохранить", 
                type:"submit",
                className: "profileChangeButton"
            }),
        });
        this.setProps(props);

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
        });

        this.children.profileForm= new ProfileForm({
            api: (formData: Record<string, string>) => {
                profileController.updatePasswordController(formData);
            },
            profileParamList: new ProfilePasswordList({}),
            footMenu: new Button({
                text: "Сохранить", 
                type:"submit",
                className: "profileChangeButton"
            }),
        });

        this.setProps(props);
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}
