import "./index.scss";
import renderTemplate from "../../lib/render";

document.addEventListener("DOMContentLoaded", () => {
    const renderChatPage = () => {
        const chat = renderTemplate("ChatPage");
        document.querySelector(".root")!.innerHTML = chat;
    };

    if (window.location.pathname === "/chat") {
        renderChatPage();
    }

    const chatLink = document.querySelector("a[href='/chat']");
    if (chatLink) {
        chatLink.addEventListener("click", (event) => {
            event.preventDefault();
            renderChatPage();
            window.history.pushState({}, "", "/chat");
        });
    }
});

export { default as ChatPage } from "./index.hbs?raw";
