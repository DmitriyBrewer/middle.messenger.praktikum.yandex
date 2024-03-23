import TextFieldComponent from "../../components/text-field";
import Block from "../../lib/test/block";
import Button from "../../ui/button";
import InputComponent from "../../ui/input";
import  AuthTemplate  from "./index.hbs?raw";

// class AuthPage extends Block {
//     constructor(props) {
//         super({
//             ...props,
//             events: props.events,
//             button: new Button({
//                 type: "button",
//                 text: props.buttonText,
//             }),
//             login: new TextFieldComponent({
//                 type:"text", 
//                 id:"email",
//                 name:"email", 
//                 placeholder:"Почта",
//                 error: props.errorLogin,
//                 helper: props.helperLogin,
//                 onChange: (value) => {
//                     this.setProps({buttonText: value});
//                 },
//                 blur: (value) => {
//                     this.validateLogin(value);
//                 }
//             }),
//             password: new TextFieldComponent({
//                 type:"password", 
//                 id:"password",
//                 name:"password", 
//                 placeholder:"password",
//                 helper: props.helperPassword,
//                 error: props.errorPassword,
//                 autocomplete:"current-password",
//                 onChange: (value) => {
//                     this.setProps({buttonText: value});
//                 },
//                 blur: (value) => {
//                     this.validatePassword(value);
//                 }
//             }),
//         });
//     }

//     componentDidUpdate(oldProps, newProps) {
//         if (oldProps.errorLogin !== newProps.errorLogin) {
//             this.children.login.setProps({ error: newProps.errorLogin });
//         }
//         if (oldProps.errorPassword !== newProps.errorPassword) {
//             this.children.password.setProps({ error: newProps.errorPassword });
//         }

//         const isButtonDisabled = newProps.errorLogin !== "" || newProps.errorPassword !== "";
//         this.children.button.setProps({ disabled: isButtonDisabled });
//         console.log(isButtonDisabled);
        
//         return true;
//     }

//     render() {
//         const authForm = this.compile(AuthTemplate, {button: "{{{ button }}}", login: "{{{ login }}}", password: "{{{ password }}}"});
//         return `{{#> BaseLayout}}${authForm}{{/ BaseLayout}}`;
//     }

//     validateLogin(value) {
//         if (value.trim() === "") {
//             this.setProps({ errorLogin: "Поле не может быть пустым" });
//         } else {
//             this.setProps({ errorLogin: "" });
//         }     
//     }
    

//     validatePassword(value) {
//         if (value.length < 6) {
//             this.setProps({ errorPassword: "Пароль должен содержать минимум 6 символов" });
//         } else {
//             this.setProps({ errorPassword: "" });
//         }
//     }
// }

// class AuthPage extends Block{
//     constructor(props) {
//         super("div",props);

//         this.children.button = new Button({
//             buttonText: props.buttonText,
//             events: {
//                 click: event => {
//                     console.log(event);
//                 },
//             },
//         });
//     }

//     // componentDidUpdate(oldProps, newProps) {
//     //     if (oldProps.buttonText !== newProps.buttonText) {
//     //         this.children.button.setProps({ buttonText: newProps.buttonText });
//     //     }

//     //     return true;
//     // }

//     render() {
//         console.log(this.children.button);
//         return this.compile(AuthTemplate, {
//             button: "{{{ button }}}",
//             userName: this.props.userName,
//         });
//     }
// }


class AuthPage extends Block {
    constructor(props) {
        super("div",props);

        this.children.login = new TextFieldComponent({
            type:"text", 
            id:"email",
            name:"email", 
            placeholder:"Почта",
            error: props.errorLogin,
            helper: props.helperLogin,
            onChange: (value) => {
                console.log(value);
                this.setProps({buttonText: value});
            },
            blur: (value) => {
                // console.log("ll");
                this.validateLogin(value);
                // this.children.login.setProps({error: value});
            }
        });

        this.children.password = new TextFieldComponent({
            type:"password", 
            id:"password",
            name:"password", 
            placeholder:"password",
            helper: props.helperPassword,
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
        console.log(oldProps);
        // TODO поправить обновление пропсов
        console.log(this.children.button.props.text);
        console.log(newProps.buttonText);

        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }

        // TODO поправить валидацию
        const isButtonDisabled = this.children.login.error !== "";
        this.children.button.setProps({ disabled: isButtonDisabled });
        // console.log(isButtonDisabled);

        return true;
    }

    render() {
        console.log(this.props);
        console.log(this.children);
        return this.compile(AuthTemplate, {
            button: this.button,
            login: this.login,
            password: this.password
        });
    }

    validateLogin(value) {
        if (value.trim() === "") {
            this.children.login.setProps({ error: "Поле не может быть пустым" });
            // this.children.button.setProps({disabled: true});
        } else {
            this.children.login.setProps({ error: "" });
            // this.children.button.setProps({disabled: false});
        }     
    }
    

    validatePassword(value) {
        if (value.length < 6) {
            this.children.password.setProps({ error: "Пароль должен содержать минимум 6 символов" });
            // this.children.button.setProps({disabled: true});
        } else {
            this.children.password.setProps({ error: "" });
            // this.children.button.setProps({disabled: false});
        }
    }
}

export default AuthPage;
