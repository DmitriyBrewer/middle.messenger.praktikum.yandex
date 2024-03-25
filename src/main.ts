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
{{{button2}}}
{{{ button }}}
{{#each data}}
{{text}}
{{/each}}
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
        super("span", {...props, button: new Button({text:"default"})}); 
        this.props.items.forEach((itemProps, index) => {
            const item = new Button(itemProps);
            this.children[`item${index}`] = item; // добавляем каждый созданный Item в объект children
        });
        // this.children.button2 = new Button({
        //     text: "sfdsf",
        //     setting: {withInternalID:true}
        // });
        // this.props.button3 = this.children.button3;
        // this.props.items = new SearchFieldComponent({});
        // this.children.items = new SearchFieldComponent({});
        // this.items = [];
        // Создание и добавление дочерних компонентов Item
        // this.props.items.forEach(itemProps => {
        //     const item = new Item(itemProps);
        //     console.log(this);
        //     // this.addChild(item);
        //     // this.children.item = item;
        //     this.items.push(item);
        // });
        // this.items = [];

        // this.items.forEach(itemProps => {
        //     const item = new Button(itemProps);
        //     console.log(this);
        //     // this.addChild(item);
        //     // this.children.item = item;
        //     this.items.push(item);
        // });
        // this.props.items = props.items;
        // this.props.items.forEach((itemProps, index) => {
        //     const item = new Item({itemProps});
        //     this.children[`item${index}`] = item; // добавляем каждый созданный Item в объект children
        // });
        // this.props.items.forEach((itemProps, index) => {
        //     const item = new Button({text:"dfd"});
        //     this.children[`item${index}`] = item; // добавляем каждый созданный Item в объект children
        // });

        // this.props.items = this.children.items;
        // this.props.data = [new Button({text:"sdas"}),new Button({text:"sdas"})];
    }

    render() {      
        console.log(this);
        // console.log(this.compile(MockChatsTemplate,{}));
        // return this.compile(MockChatsTemplate, {button:this.button},);
        return this.compile(MockChatsTemplate, {data: this.props.items,button2:this.props.button2});

    }
}





const chatList = new MockChats({items:[
    { text: "Item 1" },
    { text: "Item 2" },
],
button2: new Button({text:"ssS"})
});
// const chatList = new MockChats({});

renderComponent(".root", chatList);

// profile.setProps({
//     buttonText: "Change namess"
// });
