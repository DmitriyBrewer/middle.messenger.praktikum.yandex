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

    show() {
        const modalElement = this.getContent();
        if (modalElement.style.display === "none") {
            modalElement.style.display = "block"; // При первом нажатии меняем на block
        } else {
            modalElement.style.display = "none"; // При повторном нажатии меняем на none
        }
    }

    hide() {
        const modalElement = this.getContent();
        modalElement.style.display = "none";
    }

    handleDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!this.element.contains(target)) {
            this.hide();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick);
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

// class ChatMenu extends Block {
//     constructor(props: BlockProps) {
//         super("div", props);
//         this.element.style.display = "none"; // Начальное состояние - none

//         this.handleDocumentClick = this.handleDocumentClick.bind(this);
//         document.addEventListener("click", this.handleDocumentClick);

//         this.isVisible = false; // Флаг для отслеживания видимости меню
//     }

//     render() {
//         return this.compile(ChatMenuTemplate, {});
//     }

//     toggleVisibility() {
//         const modalElement = this.getContent();
//         modalElement.style.display = this.isVisible ? "none" : "block";
//         this.isVisible = !this.isVisible;
//     }

//     handleDocumentClick(event: MouseEvent) {
//         const target = event.target as HTMLElement;
//         if (!this.element.contains(target)) {
//             this.hide();
//         }
//     }

//     show() {
//         if (this.isVisible) {
//             this.hide(); // Если уже отображено, скрываем
//         } else {
//             this.toggleVisibility();
//         }
//     }

//     hide() {
//         if (this.isVisible) {
//             this.toggleVisibility();
//         }
//     }

//     componentWillUnmount() {
//         document.removeEventListener("click", this.handleDocumentClick);
//     }
// }

export default ChatMenu;
