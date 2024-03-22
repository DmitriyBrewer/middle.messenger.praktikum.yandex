// import renderTemplate from "../../lib/render";
import TextFieldComponent from "../../components/text-field";
import { compiledTemplate } from "../../lib/compileTemplate";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import RegistrationTemplate from "./index.hbs?raw";
// export { default as RegistrationPage } from "./index.hbs?raw";

class RegistrationPage extends Block {
    constructor(props) {
        super({
            ...props,
            events: props.events,
            button: new Button({
                type: "button",
                text: props.buttonText,
            }),
            email: new TextFieldComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                error: props.errorEmail,
                helper: "Почта",
                onChange: (value) => {},
                blur: (value) => {
                    this.validateText(value, "errorEmail");
                }
            }),
            login: new TextFieldComponent({
                type:"text", 
                id:"login",
                name:"login", 
                autocomplete:"username",
                placeholder:"Логин",
                error: props.errorLogin,
                helper: "Логин",
                onChange: (value) => {},
                blur: (value) => {
                    this.validateText(value, "errorLogin");
                }
            }),
            first_name: new TextFieldComponent({
                type:"text", 
                id:"first_name",
                name:"first_name", 
                placeholder:"Имя",
                error: props.errorName,
                helper: "Имя",
                onChange: (value) => {},
                blur: (value) => {
                    this.validateText(value, "errorName");
                }
            }),
            second_name: new TextFieldComponent({
                type:"text", 
                id:"second_name",
                name:"second_name", 
                placeholder:"Фамилия",
                error: props.errorSecondName,
                helper: "Фамилия",
                onChange: (value) => {},
                blur: (value) => {
                    this.validateText(value, "errorSecondName");
                }
            }),
            phone: new TextFieldComponent({
                type:"tel", 
                id:"phone",
                name:"phone", 
                placeholder:"Телефон",
                error: props.errorMobile,
                helper: "Телефон",
                pattern:"[+][0-9]{1} [(][0-9]{3}[)] [0-9]{3} [0-9]{2} [0-9]{2}",
                autocomplete:"usermane",
                onChange: (value) => {},
                blur: (value) => {
                    this.validateText(value, "errorMobile");
                }
            }),
            password: new TextFieldComponent({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Пароль",
                error: props.errorPassword,
                helper: "Пароль",
                autocomplete:"current-password",
                onChange: (value) => {},
                blur: (value) => {
                    this.validatePassword(value, "errorPassword");
                }
            }),
            password2: new TextFieldComponent({
                type:"password", 
                id:"password2",
                name:"password2", 
                placeholder:"Пароль ещё раз",
                error: props.errorPassword,
                helper: "Пароль ещё раз",
                autocomplete:"current-password",
                onChange: (value) => {},
                blur: (value) => {
                    this.validatePassword2(value);
                }
            }),
        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.errorEmail !== newProps.errorEmail) {
            this.children.email.setProps({ error: newProps.errorEmail });
        }

        if (oldProps.errorLogin !== newProps.errorLogin) {
            this.children.login.setProps({ error: newProps.errorLogin });
        }

        if (oldProps.errorName !== newProps.errorName) {
            this.children.first_name.setProps({ error: newProps.errorName });
        }

        if (oldProps.errorSecondName !== newProps.errorSecondName) {
            this.children.second_name.setProps({ error: newProps.errorSecondName });
        }

        if (oldProps.errorMobile !== newProps.errorMobile) {
            this.children.phone.setProps({ error: newProps.errorMobile });
        }

        if (oldProps.errorPassword !== newProps.errorPassword) {
            this.children.password.setProps({ error: newProps.errorPassword });
        }

        if (oldProps.errorPassword2 !== newProps.errorPassword2) {
            this.children.password2.setProps({ error: newProps.errorPassword2 });
        }

        const isButtonDisabled = newProps.errorEmail !== "" ||
         newProps.errorLogin !== "" ||
          newProps.errorPassword !== ""|| 
          newProps.errorSecondName !== "" ||
          newProps.errorName !== "" ||
          newProps.errorMobile !== "" || 
          newProps.errorPassword !== "" || 
          newProps.errorPassword2 !== "";

        this.children.button.setProps({ disabled: isButtonDisabled });
        
        return true;
    }

    render() {
        const authForm = compiledTemplate(RegistrationTemplate, {button:  "{{{ button }}}",email: "{{{ email }}}", login: "{{{ login }}}", first_name: "{{{ first_name }}}",second_name: "{{{ second_name }}}", phone: "{{{ phone }}}",password: "{{{ password }}}", password2: "{{{ password2 }}}"});
        return `{{#> BaseLayout}}${authForm}{{/ BaseLayout}}`;
    }

    validateText(value, atr) {
        if (value.trim() === "") {
            console.log({[atr]: "Поле не может быть пустым"});
            this.setProps({ [atr]: "Поле не может быть пустым" });
        } else {
            this.setProps({ [atr]: "" });
        }     
    }
    

    validatePassword(value, atr) {
        if (value.length < 6) {
            this.setProps({ [atr]: "Пароль должен содержать минимум 6 символов" });
        } else {
            this.setProps({ [atr]: "" });
        }
    }

    validatePassword2(value) {
        // console.log(this.children.password._element);
        if (value.length < 6) {
            this.setProps({ errorPassword2: "Пароль должен содержать минимум 6 символов" });
        } else {
            // TODO логика с значением password
            if(value === this.props.password) {
                this.setProps({ errorPassword2: "" });
            } else this.setProps({ errorPassword2: "Пароли не совпаадют" });
        }
    }
}

export default RegistrationPage;



