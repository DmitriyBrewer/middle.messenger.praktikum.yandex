import "./index.scss";

import SearchFieldTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/test/block";
import InputComponent from "../../../ui/input";
class SearchFieldComponent extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            events: {
                submit:(e:Event)=>{
                    e.preventDefault();}
            },
            input: new InputComponent({
                type:props.type,
                id:props.id,
                name: props.name,
                placeholder:  props.placeholder,
                isRequired: props.isRequired,
                className:  "search",
                autocomplete:  props.autocomplete,
                pattern:  props.pattern,
                dir:  props.dir,
                onChange: props.onChange,
                blur: props.blur,
            })
        });
    }

    render() { 
        return this.compile(SearchFieldTemplate,{});
    } 
}

export default SearchFieldComponent;
