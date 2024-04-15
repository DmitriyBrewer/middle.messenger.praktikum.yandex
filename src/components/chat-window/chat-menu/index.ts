import "./index.scss";
import  ChatMenuTemplate from "./index.hbs?raw";

import Block, { BlockProps } from "../../../lib/block";

class ChatMenu extends Block {
    constructor(props: BlockProps) {
        super("div", props);
    }

    render() {
        return this.compile(ChatMenuTemplate, {});
    }

    show() {
        const modalElement = this.getContent();
        if (modalElement.style.display === "") {
            modalElement.style.display = "block";
        } else if (modalElement.style.display === "none") {
            modalElement.style.display = "block";
        } else { modalElement.style.display = "none";}
    }

    hide() {
        const modalElement = this.getContent();
        modalElement.style.display = "none";
    }

    handleDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!this.element!.contains(target)) {
            this.hide();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick);
    }

    
}

export default ChatMenu;
