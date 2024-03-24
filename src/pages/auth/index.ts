import TextFieldComponent from "../../components/text-field";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import  AuthTemplate  from "./index.hbs?raw";
class AuthPage extends Block {
    constructor(props) {
        super("div",{...props,
            login:new TextFieldComponent({
                type:"text", 
                id:"login",
                name:"login", 
                placeholder:"Логин",
                helper: "Логин",
                autocomplete: "username",
                onChange: (value) => {
                    this.setProps({buttonText: value});

                },
                blur: (value) => {
                    this.validateLogin(value);
                }
            }),
            password: new TextFieldComponent({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Пароль",
                helper: "Пароль",
                autocomplete:"current-password",
                pattern: "(?=^.{8,40}$)(?=.*[A-Z])(?=.*\\d).*",
                onChange: (value) => {
                    this.setProps({buttonText: value});
                },
                blur: (value) => {
                    this.validatePassword(value);
                }
            }),
            button: new Button({
                type:"button",
                text: props.buttonText,
                events: {
                    click: event => {
                        console.log(event);
                    },
                },
                disabled: true
            })
        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }

        const isButtonDisabled = newProps.errorLogin !== "" || newProps.errorPassword !== "";
        this.children.button.setProps({disabled: isButtonDisabled});
        this.children.password.setProps({error: newProps.errorPassword});
        this.children.login.setProps({error: newProps.errorLogin});

        return true;
    }

    render() {
        return this.compile(AuthTemplate, {
            button: this.props.button,
            login: this.props.login,
            password: this.props.password
        });
    }

    validateLogin(value) {
        if (value.trim() === "") {
            this.setProps({ errorLogin: "Поле не может быть пустым" });
        } else {
            this.setProps({ errorLogin: "" });
        }     
    }
    

    validatePassword(value) {
        if (value.length < 6) {
            this.setProps({ errorPassword: "Пароль должен содержать минимум 6 символов" });
        } else {
            this.setProps({ errorPassword: "" });
        }
    }
}

export default AuthPage;
