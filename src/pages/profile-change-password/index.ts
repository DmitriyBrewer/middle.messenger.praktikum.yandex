import "./index.scss";
import renderTemplate from "../../lib/render";

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("/profile/change/password")) {
        const profile = renderTemplate("ProfileChangePasswordPage");
        document.querySelector(".root")!.innerHTML = profile;
    }

    const chatLink = document.querySelector(
        "a[href='/profile/change/password']"
    );
    if (chatLink) {
        chatLink.addEventListener("click", (event) => {
            event.preventDefault();
            const profilePage = renderTemplate("ProfileChangePasswordPage");
            document.querySelector(".root")!.innerHTML = profilePage;

            window.history.pushState({}, "", "/profile/change/password");
        });
    }
});

export { default as ProfileChangePasswordPage } from "./index.hbs?raw";
