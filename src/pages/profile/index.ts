import "./index.scss";
import renderTemplate from "../../lib/render";

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("/profile")) {
        const profile = renderTemplate("ProfilePage");
        document.querySelector(".root")!.innerHTML = profile;
    }

    const chatLink = document.querySelector("a[href='/profile']");
    if (chatLink) {
        chatLink.addEventListener("click", (event) => {
            event.preventDefault();
            const profilePage = renderTemplate("ProfilePage");
            document.querySelector(".root")!.innerHTML = profilePage;

            window.history.pushState({}, "", "/profile");
        });
    }
});

export { default as ProfilePage } from "./index.hbs?raw";
