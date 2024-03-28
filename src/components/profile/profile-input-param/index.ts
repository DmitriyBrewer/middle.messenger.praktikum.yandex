import Block, { BlockProps } from "../../../lib/block";
import InputComponent from "../../../ui/input";
import  ProfileInputParamTemplate from "./index.hbs?raw";

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

export default ProfileInputParam;
