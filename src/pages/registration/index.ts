import TextFieldComponent from "../../components/text-field";
import Block, { BlockProps } from "../../lib/block";
import Button from "../../ui/button";
import RegistrationTemplate from "./index.hbs?raw";
class RegistrationPage extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
           
            email: new TextFieldComponent({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                helper: "Почта",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validateText(value, "errorEmail");
                }
            }),
            login: new TextFieldComponent({
                type:"text", 
                id:"login",
                name:"login", 
                autocomplete:"username",
                placeholder:"Логин",
                helper: "Логин",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validateText(value, "errorLogin");
                }
            }),
            first_name: new TextFieldComponent({
                type:"text", 
                id:"first_name",
                name:"first_name", 
                placeholder:"Имя",
                helper: "Имя",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validateText(value, "errorName");
                }
            }),
            second_name: new TextFieldComponent({
                type:"text", 
                id:"second_name",
                name:"second_name", 
                placeholder:"Фамилия",
                helper: "Фамилия",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validateText(value, "errorSecondName");
                }
            }),
            phone: new TextFieldComponent({
                type:"tel", 
                id:"phone",
                name:"phone", 
                placeholder:"Телефон",
                helper: "Телефон",
                pattern:"[+][0-9]{1} [(][0-9]{3}[)] [0-9]{3} [0-9]{2} [0-9]{2}",
                autocomplete:"usermane",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validateText(value, "errorMobile");
                }
            }),
            password: new TextFieldComponent({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Пароль",
                helper: "Пароль",
                autocomplete:"current-password",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validatePassword(value, "errorPassword");
                }
            }),
            password2: new TextFieldComponent({
                type:"password", 
                id:"password2",
                name:"password2", 
                placeholder:"Пароль ещё раз",
                helper: "Пароль ещё раз",
                autocomplete:"current-password",
                onChange: (value:string) => {console.log(value);},
                blur: (value:string) => {
                    this.validatePassword2(value);
                }
            }),
            button: new Button({
                type: "button",
                text: props.buttonText,
                disabled: true
            }),
        });
    }

    componentDidUpdate(oldProps:BlockProps, newProps:BlockProps) {
        if (oldProps.errorEmail !== newProps.errorEmail) {
            // TODO исправить валидацию
            // this.children.email.setProps({ error: newProps.errorEmail });
        }

        if (oldProps.errorLogin !== newProps.errorLogin) {
            // this.children.login.setProps({ error: newProps.errorLogin });
        }


        if (oldProps.errorName !== newProps.errorName) {
            // this.children.first_name.setProps({ error: newProps.errorName });
        }

        if (oldProps.errorSecondName !== newProps.errorSecondName) {
            // this.children.second_name.setProps({ error: newProps.errorSecondName });
        }

        if (oldProps.errorMobile !== newProps.errorMobile) {
            // this.children.phone.setProps({ error: newProps.errorMobile });
        }

        if (oldProps.errorPassword !== newProps.errorPassword) {
            // this.children.password.setProps({ error: newProps.errorPassword });
        }

        if (oldProps.errorPassword2 !== newProps.errorPassword2) {
            // this.children.password2.setProps({ error: newProps.errorPassword2 });
        }

        //   TODO удалить если не нужно
        // const isButtonDisabled = newProps.errorEmail !== "" ||
        //      newProps.errorLogin !== "" ||
        //       newProps.errorPassword !== ""|| 
        //       newProps.errorSecondName !== "" ||
        //       newProps.errorName !== "" ||
        //       newProps.errorMobile !== "" || 
        //       newProps.errorPassword !== "" || 
        //       newProps.errorPassword2 !== "";

        //   TODO исправить
        // this.children.button.setProps({ disabled: isButtonDisabled });
        
        return true;
    }

    render() {
        return this.compile(RegistrationTemplate, {});
    }

    // TODO все валидации вынести в 1 функцию
    validateText(value:string, atr:string) {
        if (value.trim() === "") {
            this.setProps({ [atr]: "Поле не может быть пустым" });
        } else {
            this.setProps({ [atr]: "" });
        }     
    }
    

    validatePassword(value:string, atr:string) {
        if (value.length < 6) {
            this.setProps({ [atr]: "Пароль должен содержать минимум 6 символов" });
        } else {
            this.setProps({ [atr]: "" });
        }
    }

    validatePassword2(value:string) {
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

export const registrationPage = new RegistrationPage({
    buttonText: "Регистрация"
});




