import "./index.scss";
import   NewUserTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../lib/block";

class NewUser extends Block {
    constructor(props:BlockProps) {
        super("form", props); 
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                this.handleFormData((formDataObject) => {
                    (props as {api: (arg:Record<string, string>)=>void}).api(formDataObject);
                    (props as {hideBlock:()=>void}).hideBlock();
                });
            }
        };
    }

 

    render() {
        return this.compile(NewUserTemplate, {});
    }
}

export default NewUser;
