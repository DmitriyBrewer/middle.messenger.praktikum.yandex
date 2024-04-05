import TextFieldComponent from "../../components/text-field";
import { allPartials } from "../../lib/partials";
import { registerHandlebarsPartials } from "../../lib/register";
import Block, {  BlockProps } from "../../lib/block";
import Button from "../../ui/button";
import AuthTemplate from "./index.hbs?raw";
import { validationField } from "../../lib/validations/isValidLogin";
import { conditions } from "../../constants/conditions";
import LinkComponent from "../../ui/link";
import store from "../../lib/store";
import { authController } from "./controller";

registerHandlebarsPartials(allPartials);

class TestController {
    public getUser() {
        setTimeout(()=>{
            store.set("text", "updateProps1");
        },1000);


        setTimeout(()=>{
            store.set("text", "updateProps2");
        },2000);
    }
} 

export const testController = new TestController();

class Auth extends Block {
    constructor(props:BlockProps) {
        super("div", {
            ...props,
            error:false,
            events:{
                submit: (event: Event) => {
                    event.preventDefault();
                    this.handleFormData((formDataObject) => {
                        console.log("Данные формы:", formDataObject);
                        authController.getUser(formDataObject);
                    });
                }
            },
            login: new TextFieldComponent({
                type: "text",
                id: "login",
                name: "login",
                placeholder: "Логин",
                helper: "Логин",
                autocomplete: "username",
                pattern:conditions.login.pattern,
                isRequired:true,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.login.pattern);
                    const errorText = isValid ? "" : conditions.login.errorText;
                    (this.children.login as Block).setProps({error:errorText});
                }
            }),
            password: new TextFieldComponent({
                type: "password",
                id: "password",
                name: "password",
                placeholder: "Пароль",
                helper: "Пароль",
                autocomplete: "current-password",
                pattern: conditions.password.pattern,
                isRequired:true,
                error:props.errorPassword,
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.password.pattern);
                    const errorText = isValid ? "" : conditions.password.errorText;
                    (this.children.password as Block).setProps({error:errorText});
                }
            }),
            button: new Button({
                type: "submit",
                text: "Вход",
            }),
            link: new LinkComponent({
                href:"/sign-up",
                text:"Нет аккаунта?",
                isRouter: true
            })
        });
    }

    render() {
        return this.compile(AuthTemplate, {});
    }
}


export default class AuthPage extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            authForm: new Auth({}),
            // button: new Button({text:"hello"})
        });

        testController.getUser();

        this.children.button = new Button({text:"hello"});
        // store.on(StoreEvent.Updated, () => {
        //     this.children.button.setProps({text: store.getState().buttonText});  
        // });
        // this.props.button = this.children.button;
    }

    // public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    //     if(oldProps.text!==newProps.text) {
    //         this.children.button.setProps({text: store.getState().text});  
    //     }
    //     return true;
    // }

    render() {
        console.log(store);
        console.log(this);
        return this.compile("{{#> BaseLayout}} {{{ button }}} {{{ authForm }}}{{/ BaseLayout}}", {
            button: this.props.button
        });
    }
}
