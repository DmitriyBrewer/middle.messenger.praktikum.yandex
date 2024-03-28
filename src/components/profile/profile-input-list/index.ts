import "./index.scss";
import Block, { BlockProps } from "../../../lib/block";
import InputComponent from "../../../ui/input";
import  ProfileInputParamTemplate from "./index.hbs?raw";
import { conditions } from "../../../constants/conditions";
import { validationField } from "../../../lib/validations/isValidLogin";

class ProfileInputParam extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            input: new InputComponent({...props}),
        });
    }
    render() {
        return this.compile(ProfileInputParamTemplate, {param: this.props.helper});
    }
}
// TODO обновить инпуты
class ProfileInputList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.children.list = [
            new ProfileInputParam({
                type:"text", 
                id:"email",
                name:"email", 
                placeholder:"Почта",
                helper: "Почта",
                className: "changeProfileInput",
                isRequired:true,
                blur: (value:string) => {
                }
            }),
            new ProfileInputParam({
                type:"text", 
                id:"login",
                name:"login", 
                placeholder:"Логин",
                helper: "Логин",
                autocomplete: "username",
                className: "changeProfileInput",
                isRequired: true,
                pattern: conditions.login.pattern,
                blur: (value:string) => {}
            }),
            new ProfileInputParam({
                type:"text", 
                id:"first_name",
                name:"first_name", 
                placeholder:"Имя",
                helper: "Имя",
                className: "changeProfileInput",
                isRequired: true,
                pattern: conditions.name.pattern,
                blur: (value:string) => {
                    // const isValid = validationField(value, conditions.login.pattern);
                    // const errorText = isValid ? "" : conditions.login.errorText;
                    // TODO найти children по id
                    // (this.children.login as Block).setProps({error:errorText});
                }
            }),
            new ProfileInputParam({
                type:"text", 
                id:"second_name",
                name:"second_name", 
                placeholder:"Фамилия",
                helper: "Фамилия",
                className: "changeProfileInput",
                isRequired: true,
                pattern: conditions.name.pattern,
                blur: (value:string) => { }
            }),
            new ProfileInputParam({
                type:"text", 
                id:"chat_name",
                name:"chat_name", 
                placeholder:"Имя в чате",
                helper: "Имя в чате",
                className: "changeProfileInput",
                isRequired: true,
                pattern: conditions.name.pattern,
                blur: (value:string) => { }
            }),
            new ProfileInputParam({
                type:"tel", 
                id:"phone",
                name:"phone", 
                placeholder:"Телефон",
                helper: "Телефон",
                className: "changeProfileInput",
                isRequired: true,
                pattern: conditions.phone.pattern,
                blur: (value:string) => { }
            }),
            
        ];

        this.props.list = this.children.list;
        this.props.className = "profileParams";
    }

    render() {    
        return this.compile("{{{ list }}}", {});
    }
}

export default ProfileInputList;
