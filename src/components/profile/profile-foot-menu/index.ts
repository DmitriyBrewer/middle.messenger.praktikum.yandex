import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import LinkComponent from "../../../ui/link";
import { logout } from "./api";
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
                    logout();
                    console.log("logout");}}
            }),
        });
    }

    render() {
        return this.compile(ProfileFootMenuTemplate, {});
    }
}

export default ProfileFootMenu;
