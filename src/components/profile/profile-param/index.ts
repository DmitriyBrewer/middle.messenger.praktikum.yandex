import "./index.scss";

import  ProfileParamTemplate from "./index.hbs?raw";
import Block, { BlockProps } from "../../../lib/test/block";
class ProfileParam extends Block {
    constructor(props:BlockProps) {
        super("div",props);
    }
    render() {
        console.log(this.props);
        return this.compile(ProfileParamTemplate, {param:this.props.param, value: this.props.value});
    }
}

export default ProfileParam;
