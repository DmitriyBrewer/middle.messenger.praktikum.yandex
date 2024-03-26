import "./index.scss";
import  ProfilePageTemplate from "./index.hbs?raw";
import Block from "../../lib/test/block";
import ProfileParam from "../../components/profile/profile-param";
import ProfilePrev from "../../components/profile/profile-prev";
import ProfileHeader from "../../components/profile/profle-header";
import Button from "../../ui/button";
import LinkComponent from "../../ui/link";

const mockProfile = {
    email:"pochta@yandex.ru",
    login:"ivanivanov",
    first_name:"Федот",
    last_name: "Тутов",
    chat_name: "feDoT",
    phone: "8 888 888 88 88"
};
class ProfileParamsList extends Block {
    constructor(props) {
        super("span", props); 
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


const ProfileFootMenuTemplate = `
<div class="profileParams">
<div class="profileParam">
{{{ linkChange }}}
</div>
<div class="profileParam">
    {{{ linkPasswordChange }}}
</div>
<div class="profile__buttonWrapper">
{{{ logout }}}
</div>
</div>`;
class ProfileFootMenu extends Block {
    constructor(props) {
        super("div",{...props,
            linkChange: new LinkComponent({
                href:"/profile/change",
                text:"Изменить данные"
            }),
            linkPasswordChange: new LinkComponent({
                href:"/profile/change/password",
                text:"Изменить пароль"
            }),
            logout: new Button({
                type:"button", 
                text:"Выйти",
                className:"profile__logout"
            }),
        });
    }

    render() {
        return this.compile(ProfileFootMenuTemplate, {});
    }
}

class ProfilePage extends Block {
    constructor(props) {
        super("div",{...props,
            profilePrev: new ProfilePrev({
                href:"/chat",
                alt:"prev",
                src: "/assets/arrow-left.svg"
            }),
            profileHeader: new ProfileHeader({
                name: mockProfile.first_name
            }),
            profileParamList: new ProfileParamsList({
                data:mockProfile,
            }),
            footMenu: new ProfileFootMenu({})

        });
    }

    render() {
        return this.compile(ProfilePageTemplate, {});
    }
}

export default ProfilePage;
