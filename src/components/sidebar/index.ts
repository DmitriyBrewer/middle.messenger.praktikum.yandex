// import renderTemplate from "../../lib/render";
import "./index.scss";

// export { default as Sidebar } from "./index.hbs?raw";
import SidebarTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";
import SearchFieldComponent from "./search-field";

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

const MockChatsTemplate = `
{{#each data}}
<div class="chat-title">{{title}}</div>
{{/each}}
`;

// const MockChatsTemplates = `
// <div class="chat-title">{{title}}</div>
// `;

class MockChats extends Block {
    constructor(props) {
        super("div", props); 
    }


    render() {
        console.log(this.compile(MockChatsTemplate, {data: mockChats}));
        return this.compile(MockChatsTemplate, {data: mockChats});
    }
}


class Sidebar extends Block {
    constructor(props) {
        super("div",{
            ...props,
            events: props.events,
            search: new SearchFieldComponent({}),
            chats: new MockChats({})
        });
        // this.children.chat =  new MockChats({});
    }

    render() {
        // console.log(this);
        new MockChats({});
        // console.log(chatss);
        // console.log(this.compile(SidebarTemplate, {chatItem: "chatItem", search:this.props.search, data:mockChats, chats: this.props.chats}));
        return this.compile(SidebarTemplate, {chatItem: "chatItem", search:this.props.search, data:mockChats, chats: this.props.chats});
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
