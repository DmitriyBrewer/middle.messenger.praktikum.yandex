// import renderTemplate from "../../lib/render";
import "./index.scss";

// export { default as Sidebar } from "./index.hbs?raw";
import SidebarTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";
import SearchFieldComponent from "./search-field";
import Button from "../../ui/button";
import ChatItem from "./sidebar-item";

const mockChats = [
    {
        title: "Chat1",
        message: "Last message 1s",
        time: "10:30",
        counter: 4,
    },
    {
        title: "Chat2",
        message: "Last message 2",
        time: "11:45",
        counter: 2,
    },
    {
        title: "Chat3",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat4",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat5",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat6",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat7",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat8",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat9",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat10",
        message: "Last message 3",
        time: "13:15",
        counter: 0,
    },
    {
        title: "Chat11",
        message: "Last message 3",
        time: "13:15",
        counter: 5,
    },
    {
        title: "Chat12",
        message: "Last message 3",
        time: "Пн",
        counter: 4,
    },
];

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
        super("span", {...props}); 
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
                data:mockChats
            })
        });
        
    }

    render() {
        return this.compile(SidebarTemplate, {chatItem: "chatItem", search:this.props.search});
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
