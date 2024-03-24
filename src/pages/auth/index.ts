import TextFieldComponent from "../../components/text-field";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import  AuthTemplate  from "./index.hbs?raw";
class AuthPage extends Block {
    constructor(props) {
        super("div",props);

        this.children.login = new TextFieldComponent({
            type:"text", 
            id:"login",
            name:"login", 
            placeholder:"Логин",
            error: props.errorLogin,
            helper: "Логин",
            onChange: (value) => {
                this.setProps({buttonText: value});
            },
            blur: (value) => {
                this.validateLogin(value);
            }
        });

        this.children.password = new TextFieldComponent({
            type:"password", 
            id:"password",
            name:"password", 
            placeholder:"Пароль",
            helper: "Пароль",
            error: props.errorPassword,
            autocomplete:"current-password",
            onChange: (value) => {
                this.setProps({buttonText: value});
            },
            blur: (value) => {
                this.validatePassword(value);
            }
        }),
    


        this.children.button = new Button({
            text: props.buttonText,
            events: {
                click: event => {
                    console.log(event);
                },
            },
            disabled:true
        });
        
        this.props.button = this.children.button.props;

    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }

        // TODO поправить валидацию
        const isButtonDisabled = this.children.login.error !== "";
        this.children.button.setProps({ disabled: isButtonDisabled });

        return true;
    }

    render() {
        return this.compile(AuthTemplate, {
            button: this.button,
            login: this.login,
            password: this.password
        });
    }

    validateLogin(value) {
        if (value.trim() === "") {
            this.children.login.setProps({ error: "Поле не может быть пустым" });
        } else {
            this.children.login.setProps({ error: "" });
        }     
    }
    

    validatePassword(value) {
        if (value.length < 6) {
            this.children.password.setProps({ error: "Пароль должен содержать минимум 6 символов" });
        } else {
            this.children.password.setProps({ error: "" });
        }
    }
}

export default AuthPage;
