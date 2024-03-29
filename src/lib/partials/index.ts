import { ButtonWrapper } from "../../components/button-wrapper";
import { FieldWrapper } from "../../components/field-wrapper";
import { BaseLayoutTemplate } from "../../layout/base-layout";
import {  SidebarLayoutTemplate } from "../../layout/sidebar-layout";
import { Avatar } from "../../ui/avatar";
import { InputTemplate } from "../../ui/input";
import { Link } from "../../ui/link";
import { Title } from "../../ui/title";

export const allPartials: Record<string, string> = {
    BaseLayout: BaseLayoutTemplate,
    Link: Link,
    Title:Title,
    FieldWrapper: FieldWrapper,
    ButtonWrapper: ButtonWrapper,
    Input: InputTemplate,
    SidebarLayout: SidebarLayoutTemplate,
    Avatar: Avatar,
};
