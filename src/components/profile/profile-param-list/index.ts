import Block, { BlockProps } from "../../../lib/test/block";
import ProfileParam from "../profile-param";

class ProfileParamsList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        // TODO решить пробелму типизации
        this.children.list = [
            new ProfileParam({param:"email",value:props.data.email}),
            new ProfileParam({param:"login",value:props.data.login}),
            new ProfileParam({param:"first_name",value:props.data.first_name}),
            new ProfileParam({param:"last_name",value:props.data.last_name}),
            new ProfileParam({param:"chat_name",value:props.data.chat_name}),
            new ProfileParam({param:"phone",value:props.data.phone}),
        ];

        this.props.list = this.children.list;
        this.props.className = "profileParams";
    }

    render() {    
        return this.compile("{{{ list }}}", {});
    }
}

export default ProfileParamsList;
