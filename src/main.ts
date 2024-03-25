import SearchFieldComponent from "./components/sidebar/search-field";
import "./index.scss";
import { allPartials } from "./lib/partials";
import { registerHandlebarsPartials } from "./lib/register";
import renderComponent from "./lib/renderComponent";
import Block from "./lib/test/block";
import AuthPage from "./pages/auth";
import ChatPage from "./pages/chat";
import RegistrationPage from "./pages/registration";
import Button from "./ui/button";

registerHandlebarsPartials(allPartials);

// const profile = new AuthPage({
//     buttonText: "Вход",
// });

// const registration = new RegistrationPage({
//     buttonText: "Регистрация"
// });

// const chat = new ChatPage({
// });


// const mockChats = [
//     {
//         title: "Chat1",
//         message: "Last message 1s",
//         time: "10:30",
//         counter: 4,
//     },
//     {
//         title: "Chat2",
//         message: "Last message 2",
//         time: "11:45",
//         counter: 2,
//     },
// ];

// const MockChatsTemplate = `
// {{#each data}}
// <div class="chat-title">{{title}}</div>
// {{/each}}
// `;

// const MockChatsTemplate = `
// {{#each data}}
// {{{ item }}}
// {{/each}}
// `;

// const itemTemplate ="<div>{{title}}</div>";

// class Item extends Block {
//     constructor(props) {
//         super("div", props); 
//     }

//     render() {      
//         return this.compile(itemTemplate, {title: "s"});
//     }
// }
// class MockChats extends Block {
//     constructor(props) {
//         super("div", {...props, item:new Item({})}); 
//     }


//     render() {      
//         return this.compile(MockChatsTemplate, {});
//     }
// }

// const chatList = new MockChats({});

const mockChats = {
    items: [
        { text: "Item 1" },
        { text: "Item 2" },
    ]
};

const itemTemplate ="<div>{{title}}</div>";

// const MockChatsTemplate = `
// <div>
// {{#each items}}
//     {{> itemTemplate}}
// {{/each}}
// </div>
// `;

const MockChatsTemplate = `
<div>
{{{button}}}
</div>
`;

// class Item extends Block {
//     constructor(props) {
//         super("div", props); 
//     }

//     render() {      
//         console.log(this.compile(itemTemplate, this.props));
//         return this.compile(itemTemplate, this.props);
//     }
// }

class MockChats extends Block {
    constructor(props) {
        super("span", props); 
        this.children.button = [new Button({text:"lll"}),new Button({text:"rtrtS"})];
        this.props.button = this.children.button;
    }

    render() {    
        console.log(this);  
        console.log(this.children.button); 
        return this.compile(MockChatsTemplate, {});

    }
}





const chatList = new MockChats({
//     button:[
//     { text: "Item 1" },
//     { text: "Item 2" },
// ],
    // button: new Button({text:"ssS"})
});
// const chatList = new MockChats({});

renderComponent(".root", chatList);

// profile.setProps({
//     buttonText: "Change namess"
// });
