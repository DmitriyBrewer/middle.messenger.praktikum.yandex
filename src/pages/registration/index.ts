import renderTemplate from "../../lib/render";

type Data = {
    title: string;
};

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("/registration")) {
        const registrationPage = renderTemplate<Data>("Registration");
        document.querySelector(".root")!.innerHTML = registrationPage;
    }

    const registrationLink = document.querySelector("a[href='/registration']");
    if (registrationLink) {
        registrationLink.addEventListener("click", (event) => {
            event.preventDefault();
            const registrationPage = renderTemplate<Data>("Registration");
            document.querySelector(".root")!.innerHTML = registrationPage;

            window.history.pushState({}, "", "/registration");
        });
    }
});

export { default as RegistrationPage } from "./index.hbs?raw";
