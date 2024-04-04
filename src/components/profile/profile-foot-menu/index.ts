import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import LinkComponent from "../../../ui/link";
import ProfileFootMenuTemplate from "./index.hbs?raw";
class ProfileFootMenu extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            linkChange: new LinkComponent({
                href:"/settings/change",
                text:"Изменить данные",
                isRouter:true
            }),
            linkPasswordChange: new LinkComponent({
                href:"/settings/password",
                text:"Изменить пароль",
                isRouter:true
            }),
            logout: new Button({
                type:"button", 
                text:"Выйти",
                className:"profile__logout",
            }),
        });
    }

    render() {
        return this.compile(ProfileFootMenuTemplate, {});
    }
}

export default ProfileFootMenu;
