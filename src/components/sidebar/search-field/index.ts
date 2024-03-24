import "./index.scss";

// export { default as SearchField } from "./index.hbs?raw";
import SearchFieldTemplate from "./index.hbs?raw";
import Block from "../../../lib/test/block";
import InputComponent from "../../../ui/input";
class SearchFieldComponent extends Block {
    constructor(props) {
        super("div",{...props,
            events: {
                submit:(e)=>{
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
