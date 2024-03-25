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

const MockChatsTemplate = `
<div>
{{{button}}}
</div>
`;

class MockChats extends Block {
    constructor(props) {
        super("span", props); 
        this.children.button = [];
        this.props.data.forEach(itemProps => {
            const item = new Button(itemProps);
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

const chatList = new MockChats({
    data:[{text:"sdsd"},{text:"sda"}]

});

renderComponent(".root", chatList);

