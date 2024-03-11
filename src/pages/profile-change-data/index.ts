import "./index.scss";
import renderTemplate from "../../lib/render";

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("/profile/change")) {
        const profile = renderTemplate("ProfileChangeDataPage");
        document.querySelector(".root")!.innerHTML = profile;
    }

    const chatLink = document.querySelector("a[href='/profile/change']");
    if (chatLink) {
        chatLink.addEventListener("click", (event) => {
            event.preventDefault();
            const profilePage = renderTemplate("ProfileChangeDataPage");
            document.querySelector(".root")!.innerHTML = profilePage;

            window.history.pushState({}, "", "/profile/change");
        });
    }
});

export { default as ProfileChangeDataPage } from "./index.hbs?raw";
