import Block, { BlockProps } from "../../../lib/block";
import { profileController } from "../../../pages/profile/controller";
import Button from "../../../ui/button";
import LinkComponent from "../../../ui/link";
import ProfileFootMenuTemplate from "./index.hbs?raw";
class ProfileFootMenu extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            linkChange: new LinkComponent({
                href:"/change",
                text:"Изменить данные",
                isRouter:true,
            }),
            linkPasswordChange: new LinkComponent({
                href:"/password",
                text:"Изменить пароль",
                isRouter:true
            }),
            logout: new Button({
                type:"button", 
                text:"Выйти",
                className:"profile__logout",
                events: {click: ()=>{
                    profileController.logoutController();
                }}
            }),
        });
    }

    render() {
        return this.compile(ProfileFootMenuTemplate, {});
    }
}

export default ProfileFootMenu;
