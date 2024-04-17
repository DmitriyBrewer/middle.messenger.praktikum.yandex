import "./index.scss";
import Block, { BlockChildren, BlockProps } from "../../../lib/block";
import { conditions } from "../../../constants/conditions";
import ProfileInputParam from "../profile-input-param";
import { validationField } from "../../../lib/validations/isValidLogin";
import isEqual from "../../../lib/isEqual";
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
                    const isValid = validationField(value, conditions.email.pattern);
                    const errorText = isValid ? "" : conditions.email.errorText;
                    ((this.children as BlockChildren<Block[]>).list[0] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
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
                blur: (value:string) => {
                    const isValid = validationField(value, conditions.login.pattern);
                    const errorText = isValid ? "" : conditions.login.errorText;
                    ((this.children as BlockChildren<Block[]>).list[1] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
                }
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
                    const isValid = validationField(value, conditions.name.pattern);
                    const errorText = isValid ? "" : conditions.name.errorText;
                    ((this.children as BlockChildren<Block[]>).list[2] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
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
                blur: (value:string) => { 
                    const isValid = validationField(value, conditions.name.pattern);
                    const errorText = isValid ? "" : conditions.name.errorText;
                    ((this.children as BlockChildren<Block[]>).list[3] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
                }
            }),
            new ProfileInputParam({
                type:"text", 
                id:"display_name",
                name:"display_name", 
                placeholder:"Имя в чате",
                helper: "Имя в чате",
                className: "changeProfileInput",
                isRequired: true,
                pattern: conditions.name.pattern,
                blur: (value:string) => { 
                    const isValid = validationField(value, conditions.name.pattern);
                    const errorText = isValid ? "" : conditions.name.errorText;
                    ((this.children as BlockChildren<Block[]>).list[4] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
                }
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
                blur: (value:string) => { 
                    const isValid = validationField(value, conditions.phone.pattern);
                    const errorText = isValid ? "" : conditions.phone.errorText;
                    ((this.children as BlockChildren<Block[]>).list[5] as Block).setProps({error:errorText});
                    this.setProps({error:errorText});
                }
            }),
            
        ];

        this.props.list = this.children.list;
        this.props.className = "profileParams";
    }

    componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if (!isEqual(oldProps,newProps)) {
            if (newProps.list && Array.isArray(newProps.list)) {
                (this.children.list as Block).setProps(newProps);
            }
        }
        return true;
    }

    render() {    
        return this.compile("{{{ list }}}", {});
    }
}

export default ProfileInputList;
