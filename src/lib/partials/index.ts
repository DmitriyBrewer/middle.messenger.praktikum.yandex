import { ButtonWrapper } from "../../components/button-wrapper";
// import { ChatTitle } from "../../components/chat-title";
import { ChatWindow } from "../../components/chat-window";
// import { ChatHeader } from "../../components/chat-window/chat-header";
// import { ChatMenu } from "../../components/chat-window/chat-menu";
import { ChatMesssage } from "../../components/chat-window/chat-message";
// import { ChatText } from "../../components/chat-window/chat-text";
import { FieldWrapper } from "../../components/field-wrapper";
import { ProfileContent } from "../../components/profile/profile-content";
import { ProfileParam } from "../../components/profile/profile-param";
import { ProfileParams } from "../../components/profile/profile-params";
import { ProfilePrev } from "../../components/profile/profile-prev";
import { ProfileRoot } from "../../components/profile/profile-root";
import { ProfileHeader } from "../../components/profile/profle-header";
// import { SearchField } from "../../components/sidebar/search-field";
// import { ChatItem } from "../../components/sidebar/sidebar-item";
// import { TextField } from "../../components/text-field";
import { BaseLayoutTemplate } from "../../layout/base-layout";
import {  SidebarLayoutTemplate } from "../../layout/sidebar-layout";
import { ChatPage } from "../../pages/chat";
import { ErrorPage } from "../../pages/error-page";
import { ProfilePage } from "../../pages/profile";
import { ProfileChangeDataPage } from "../../pages/profile-change-data";
import { ProfileChangePasswordPage } from "../../pages/profile-change-password";
import { RegistrationPage } from "../../pages/registration";
import { Avatar } from "../../ui/avatar";
import { FormTemplate } from "../../ui/form";
import { InputTemplate } from "../../ui/input";
import { Link } from "../../ui/link";
import { Title } from "../../ui/title";


export const allPartials: Record<string, string> = {
    BaseLayout: BaseLayoutTemplate,
    Form: FormTemplate,
    Link: Link,
    Title:Title,
    FieldWrapper: FieldWrapper,
    ButtonWrapper: ButtonWrapper,
    Input: InputTemplate,
    SidebarLayout: SidebarLayoutTemplate,
    Avatar: Avatar,
};
