import ProfileFootMenu from "./components/profile/profile-foot-menu";
import ProfileInputList from "./components/profile/profile-input-list";
import ProfileParam from "./components/profile/profile-param";
import ProfileParamsList from "./components/profile/profile-param-list";
import ProfilePrev from "./components/profile/profile-prev";
import ProfileHeader from "./components/profile/profle-header";
import SearchFieldComponent from "./components/sidebar/search-field";
import "./index.scss";
import { allPartials } from "./lib/partials";
import { registerHandlebarsPartials } from "./lib/register";
import renderComponent from "./lib/renderComponent";
import Block from "./lib/test/block";
import AuthPage from "./pages/auth";
import ChatPage from "./pages/chat";
import ErrorPage from "./pages/error-page";
import ProfilePage from "./pages/profile";
import RegistrationPage from "./pages/registration";
import Button from "./ui/button";

registerHandlebarsPartials(allPartials);

// const profile = new AuthPage({
//     buttonText: "Вход",
// });

// const registration = new RegistrationPage({
//     buttonText: "Регистрация"
// });

const chat = new ChatPage({
});

const errorPage500 = new ErrorPage({
    title:"500",
    subtitle:"Мы уже фиксим"
});

const errorPage404 = new ErrorPage({
    title:"404",
    subtitle:"Не туда попали"
});


const mockProfile = {
    email:"pochta@yandex.ru",
    login:"ivanivanov",
    first_name:"Федот",
    last_name: "Тутов",
    chat_name: "feDoT",
    phone: "8 888 888 88 88"
};

const profile = new ProfilePage({
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
    footMenu: new ProfileFootMenu({}),
    data: mockProfile
});

const profileChangeData = new ProfilePage({
    profilePrev: new ProfilePrev({
        href:"/profile",
        alt:"prev",
        src: "/assets/arrow-left.svg"
    }),
    profileHeader: new ProfileHeader({
        name: mockProfile.first_name
    }),
    profileParamList: new ProfileInputList({
        data:mockProfile,
    }),
    footMenu: new Button({
        text: "Сохранить", 
        type:"buttton",
        className: "profileChangeButton"
    }),
    data: mockProfile
});

// const MockChatsTemplate = `
// <div>
// {{{button}}}
// </div>
// `;

// class MockChats extends Block {
//     constructor(props) {
//         super("span", {...props}); 
//         this.children.button = [];
//         this.props.data.forEach(itemProps => {
//             const item = new Button({...itemProps,
//                 events: {click:()=>item.setProps({text:"s", disabled:true})}
//             });
//             this.children.button.push(item);
//         });
//         this.props.button = this.children.button;
//     }

//     render() {    
//         console.log(this);  
//         console.log(this.children.button); 
//         return this.compile(MockChatsTemplate, {});
//     }
// }

// const chatList = new MockChats({
//     data:[{text:"sdsd",events: {
//         click:(e)=>{
//             // this.setProps({text:"s"});
//             console.log("click1");}
//     }},{text:"sda",events: {
//         click:(e)=>{
//             console.log("click2");}
//     }}]
// });

renderComponent(".root", profileChangeData);

