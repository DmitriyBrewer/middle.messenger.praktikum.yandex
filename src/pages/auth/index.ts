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
        });

        // this.children.button  = new Button({text: this.props.buttonText});

        // const authController = new AuthController();
        // authController.getUser();

        // store.on(StoreEvents.Updated, () => {
        //     this.setProps(store.getState());  
        // });

        // this.children.button = new Button({text:this.props.buttonText});
        // this.setProps({buttonText:"KKK"});
        // store.on(StoreEvents.Updated, () => {
        //     const {buttonText} = store.getState();
        //     this.children.button.setProps({text:buttonText});  
        //     // this.setProps(store.getState());
        // });
        // this.props.button = this.children.button;
    }

    render() {
        console.log(store);
        console.log(this);
        return this.compile("{{#> BaseLayout}} {{{ button }}} {{{ authForm }}}{{/ BaseLayout}}", {
            // button: this.props.button
        });
    }
}
