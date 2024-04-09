import Block, { BlockProps } from "../../../lib/block";
import ProfileParam from "../profile-param";

class ProfileParamsList extends Block {
    constructor(props:BlockProps) {
        super("span", props); 
        this.props.className = "profileParams";
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.first_name!==newProps.first_name ) {
            this.children.list = [
                new ProfileParam({param:"email",value:this.props.email}),
                new ProfileParam({param:"login",value:this.props.login}),
                new ProfileParam({param:"first_name",value:this.props.first_name}),
                new ProfileParam({param:"second_name",value:this.props.second_name}),
                new ProfileParam({param:"display_name",value:this.props.display_name}),
                new ProfileParam({param:"phone",value:this.props.phone}),
            ];
        }
        return true;
    }

    render() {    
        return this.compile("{{{ list }}}", {});
    }
}

export default ProfileParamsList;
