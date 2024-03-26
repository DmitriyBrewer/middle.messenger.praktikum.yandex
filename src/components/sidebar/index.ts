// import renderTemplate from "../../lib/render";
import "./index.scss";

// export { default as Sidebar } from "./index.hbs?raw";
import SidebarTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";
import SearchFieldComponent from "./search-field";
import Button from "../../ui/button";
import ChatItem from "./sidebar-item";

// const MockChatsTemplate = `
// <div class="chat-item">
//     <div class="chat-title">{{title}}</div>
//     <div class="chat-message">{{message}}</div>
//     <div class="chat-time">{{time}}</div>
//     <div class="chat-counter">{{counter}}</div>
// </div>
// `;

// const MockChatsTemplate = `
// {{#each data}}
// <div class="chat-title">{{title}}</div>
// {{/each}}
// `;

class ChatList extends Block {
    constructor(props) {
        super("span", props); 
        this.children.list = [];
        this.props.data.forEach(itemProps => {
            const item = new ChatItem(itemProps);
            this.children.list.push(item);
        });
        this.props.list = this.children.list;

    }

    render() {    
        return this.compile("{{{list}}}", {});
    }
}
class Sidebar extends Block {
    constructor(props) {
        super("div",{
            ...props,
            events: props.events,
            search: new SearchFieldComponent({}),
            chats: new ChatList({
                data:props.data
            })
        });        
    }

    render() {
        console.log(this);
        return this.compile(SidebarTemplate, {});
    }

}

export default Sidebar;



// document.addEventListener("DOMContentLoaded", () => {
//     if (window.location.href.includes("/chat")) {
//         renderTemplate("Sidebar", {
//             data: {
//                 chats: mockChats,
//             },
//         });
//         const chat = renderTemplate("ChatPage", {
//             data: {
//                 chats: mockChats,
//             },
//         });
//         document.querySelector(".root")!.innerHTML = chat;
//     }
// });
