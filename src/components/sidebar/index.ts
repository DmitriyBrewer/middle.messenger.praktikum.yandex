// import renderTemplate from "../../lib/render";
import "./index.scss";

// export { default as Sidebar } from "./index.hbs?raw";
import SidebarTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";
import SearchFieldComponent from "./search-field";
import Button from "../../ui/button";

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

const MockChatsTemplate = `
<div>
{{{button}}}
</div>
`;

class ChatList extends Block {
    constructor(props) {
        super("span", {...props}); 
        this.children.button = [];
        this.props.data.forEach(itemProps => {
            const item = new Button({...itemProps,
                events: {click:()=>item.setProps({text:"s", disabled:true})}
            });
            this.children.button.push(item);
        });
        this.props.button = this.children.button;
    }

    render() {    
        console.log(this);  
        console.log(this.children.button); 
        return this.compile(MockChatsTemplate, {});
    }
}

const chatList = new ChatList({
    data:[{text:"sdsd",events: {
        click:(e)=>{
            // this.setProps({text:"s"});
            console.log("click1");}
    }},{text:"sda",events: {
        click:(e)=>{
            console.log("click2");}
    }}]
});

// console.log(chatList);

class Sidebar extends Block {
    constructor(props) {
        super("div",{
            ...props,
            events: props.events,
            search: new SearchFieldComponent({}),
            chats: new ChatList({
                data:[{text:"sdsd",events: {
                    click:(e)=>{
                        console.log("click1");}
                }},{text:"sda",events: {
                    click:(e)=>{
                        console.log("click2");}
                }}]
            })
        });
        
        
        // this.children.chat =  new MockChats({});
    }

    render() {
        // const chatList = new ChatList({
        //     data:[{text:"sdsd",events: {
        //         click:(e)=>{
        //             // this.setProps({text:"s"});
        //             console.log("click1");}
        //     }},{text:"sda",events: {
        //         click:(e)=>{
        //             console.log("click2");}
        //     }}]
        // });

        // console.log(chatList);
        // console.log(this);
        // console.log(chatss);
        // console.log(this.compile(SidebarTemplate, {chatItem: "chatItem", search:this.props.search, data:mockChats, chats: this.props.chats}));
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
