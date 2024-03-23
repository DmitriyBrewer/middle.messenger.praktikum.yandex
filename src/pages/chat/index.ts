import "./index.scss";
import Block from "../../lib/test/block";
// export { default as ChatPage } from "./index.hbs?raw";
import ChatTemplate from "./index.hbs?raw";
import { compiledTemplate } from "../../lib/compileTemplate";

class ChatPage extends Block {
    constructor(props) {
        super({
            ...props,
            events: props.events,
        });
    }

    render() {
        // const authForm = compiledTemplate(RegistrationTemplate, {button:  "{{{ button }}}",email: "{{{ email }}}", login: "{{{ login }}}", first_name: "{{{ first_name }}}",second_name: "{{{ second_name }}}", phone: "{{{ phone }}}",password: "{{{ password }}}", password2: "{{{ password2 }}}"});
        return compiledTemplate(ChatTemplate, {});
    }

}

export default ChatPage;
