import "./index.scss";
import Block, { BlockChildren, BlockProps } from "../../../lib/block";
import ProfileInputParam from "../profile-input-param";
import { conditions } from "../../../constants/conditions";
import { validationField } from "../../../lib/validations/isValidLogin";
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
                    this.setProps({oldPassword:value});
                    const isValid = validationField(value, conditions.password.pattern);
                    const errorText = isValid ? "" : conditions.password.errorText;
                    ((this.children as BlockChildren<Block[]>).list[0] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
                }
            }),
            new ProfileInputParam({
                type:"password", 
                id:"newPassword",
                name:"password", 
                placeholder:"Новый пароль",
                helper: "Новый пароль",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                isRequired: true,
                className: "changeProfileInput",
                blur: (value:string) => {
                    this.setProps({passwordValue:value});
                    const isValid = validationField(value, conditions.password.pattern) && value !== this.props.oldPassword;
                    const errorText = isValid ? "" : conditions.password.errorText;
                    ((this.children as BlockChildren<Block[]>).list[1] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
                }
            }),
            new ProfileInputParam({
                type:"password", 
                id:"repeatPassword",
                name:"password", 
                placeholder:"Повторите новый пароль",
                helper: "Повторите новый пароль",
                autocomplete:"current-password",
                pattern: conditions.password.pattern,
                isRequired: true,
                className: "changeProfileInput",
                blur: (value:string) => {
                    const passwordValue = this.props.passwordValue;
                    const errorText = value === passwordValue ? "" : "Пароли не совпадают";
                    ((this.children as BlockChildren<Block[]>).list[2] as Block).setProps({error:errorText});
                }
            }),
        ];

        this.props.list = this.children.list;
        this.props.className = "profileParams";
    }

    render() {    
        console.log(this);
        return this.compile("{{{ list }}}", {});
    }
}

export default ProfilePasswordList;
