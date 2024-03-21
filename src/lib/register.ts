// import * as partials from "./partials";
import handlebars from "handlebars";

export function registerHandlebarsPartials(partials: Record<string, string>) {
    console.log("all register");
    for (const partialName in partials) {
        if (Object.prototype.hasOwnProperty.call(partials, partialName)) {
            handlebars.registerPartial(partialName, partials[partialName]);
        }
    }
}

// export const allPartials: Record<string, string> = {
//     // Auth: partials.AuthPage,
//     Registration: partials.RegistrationPage,
//     BaseLayout: partials.BaseLayoutTemplate,
//     TextField: partials.TextField,
//     // Button: partials.Button,
//     Link: partials.Link,
//     // Form: partials.Form,
//     Title: partials.Title,
//     FieldWrapper: partials.FieldWrapper,
//     ButtonWrapper: partials.ButtonWrapper,
//     ErrorPage: partials.ErrorPage,
//     SidebarLayout: partials.SidebarLayout,
//     ChatPage: partials.ChatPage,
//     Sidebar: partials.Sidebar,
//     SearchField: partials.SearchField,
//     ChatItem: partials.ChatItem,
//     Avatar: partials.Avatar,
//     ChatTitle: partials.ChatTitle,
//     ChatWindow: partials.ChatWindow,
//     ChatMessage: partials.ChatMesssage,
//     ChatText: partials.ChatText,
//     ChatHeader: partials.ChatHeader,
//     ChatSend: partials.ChatSend,
//     ChatMenu: partials.ChatMenu,
//     ProfilePage: partials.ProfilePage,
//     ProfileParam: partials.ProfileParam,
//     ProfileChangeDataPage: partials.ProfileChangeDataPage,
//     ProfileHeader: partials.ProfileHeader,
//     ProfilePrev: partials.ProfilePrev,
//     ProfileContent: partials.ProfileContent,
//     ProfileParams: partials.ProfileParams,
//     ProfileRoot: partials.ProfileRoot,
//     // Input: partials.Input,
//     ProfileChangePasswordPage: partials.ProfileChangePasswordPage,
//     ButtonImage: partials.ButtonImage,
//     Image: partials.Image,
// };

