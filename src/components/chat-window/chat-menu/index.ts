// TODO пока не используется , в дальнейшем будет задействован
import "./index.scss";
import  ChatMenuTemplate from "./index.hbs?raw";

import Block, { BlockProps } from "../../../lib/block";

class ChatMenu extends Block {
    constructor(props: BlockProps) {
        super("div", props);
        // this.element.classList.add("chatMenu");
        // this.element.addEventListener("click", this.handleMenuClick.bind(this));
    }

    render() {
        return this.compile(ChatMenuTemplate, {});
    }

    // handleMenuClick(event: Event) {
    //     event.preventDefault();
    //     const target = event.target as HTMLElement;
    //     if (target.id === "addObject" || target.id === "deleteObject") {
    //         const modal = new Modal({ content: target.id === "addObject" ? "Добавление объекта" : "Удаление объекта" });
    //         modal.show();
    //     }
    // }
}

export default ChatMenu;
