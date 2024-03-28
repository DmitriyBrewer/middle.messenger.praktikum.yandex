import "./index.scss";
import Block, { BlockProps } from "../../../lib/block";
import ProfileInputParam from "../profile-input-param";
import { conditions } from "../../../constants/conditions";

// TODO обновить инпуты
class ProfilePasswordList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.children.list = [
            new ProfileInputParam({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Старый пароль",
                helper: "Старый пароль",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                isRequired: true,
                className: "changeProfileInput",
                blur: (value:string) => {
                    console.log(value);
                }
            }),
            new ProfileInputParam({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Новый пароль",
                helper: "Новый пароль",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                isRequired: true,
                className: "changeProfileInput",
                blur: (value:string) => {
                    console.log(value);
                }
            }),
            new ProfileInputParam({
                type:"password", 
                id:"password",
                name:"password", 
                placeholder:"Повторите новый пароль",
                helper: "Повторите новый пароль",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                isRequired: true,
                className: "changeProfileInput",
                blur: (value:string) => {
                    console.log(value);
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

export default ProfilePasswordList;
