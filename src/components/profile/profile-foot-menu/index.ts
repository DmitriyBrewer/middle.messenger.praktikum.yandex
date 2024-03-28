import Block, { BlockProps } from "../../../lib/block";
import Button from "../../../ui/button";
import LinkComponent from "../../../ui/link";
import ProfileFootMenuTemplate from "./index.hbs?raw";

class ProfileFootMenu extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            linkChange: new LinkComponent({
                href:"/profile/change",
                text:"Изменить данные"
            }),
            linkPasswordChange: new LinkComponent({
                href:"/profile/change/password",
                text:"Изменить пароль"
            }),
            logout: new Button({
                type:"button", 
                text:"Выйти",
                className:"profile__logout"
            }),
        });
    }

    render() {
        return this.compile(ProfileFootMenuTemplate, {});
    }
}

export default ProfileFootMenu;
