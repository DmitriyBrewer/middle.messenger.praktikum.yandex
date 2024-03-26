import "./index.scss";
import Block from "../../../lib/test/block";
import InputComponent from "../../../ui/input";
import  ProfileInputParamTemplate from "./index.hbs?raw";

class ProfileInputParam extends Block {
    constructor(props) {
        super("div",{...props,
            input: new InputComponent({...props}),
        });
    }
    render() {
        return this.compile(ProfileInputParamTemplate, {param: this.props.helper});
    }
}

// TODO разбить input на компоненты 
class ProfileInputList extends Block {
    constructor(props) {
        super("span", props); 
        this.children.list = [
            new ProfileInputParam({
                type:"text", 
                id:"login",
                name:"login", 
                placeholder:"Логин",
                helper: "Логин",
                autocomplete: "username",
                className: "changeProfileInput",
                onChange: (value) => {
                    this.setProps({buttonText: value});
    
                },
                blur: (value) => {
                    this.validateLogin(value);
                }
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
