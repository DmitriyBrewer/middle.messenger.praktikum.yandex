import "./index.scss";
import   ModalTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";

class Modal extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
    }

    render() {
        return this.compile(ModalTemplate, {
            content: this.props.content
        });
    }

    show() {
        console.log("ol");
        const modalElement = this.getContent();
        console.log(modalElement);
        modalElement.style.display = "block";
    }
}

export default Modal;
