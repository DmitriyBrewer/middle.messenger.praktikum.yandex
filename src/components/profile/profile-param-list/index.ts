import Block, { BlockProps } from "../../../lib/test/block";
import ProfileParam from "../profile-param";

class ProfileParamsList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.children.list = [
            new ProfileParam({param:"email",value:props.email}),
            new ProfileParam({param:"login",value:props.login}),
            new ProfileParam({param:"first_name",value:props.first_name}),
            new ProfileParam({param:"last_name",value:props.last_name}),
            new ProfileParam({param:"chat_name",value:props.chat_name}),
            new ProfileParam({param:"phone",value:props.phone}),
        ];

        this.props.list = this.children.list;
        this.props.className = "profileParams";
    }

    render() {    
        return this.compile("{{{ list }}}", {});
    }
}

export default ProfileParamsList;
