import "./index.scss";
import  ErrorPageTemplate  from "./index.hbs?raw";
import Block from "../../lib/test/block";

class ErrorPage extends Block {
    constructor(props) {
        super("div",props);
    }

    render() {
        return this.compile(ErrorPageTemplate, {
            title: this.props.title,
            subtitle: this.props.subtitle
        });
    }

}

export default ErrorPage;

// document.addEventListener("DOMContentLoaded", () => {
//     if (window.location.href.includes("/500")) {
//         const page500 = renderTemplate("ErrorPage", {
//             data: { title: "500", subtitle: "Мы уже фиксим" },
//         });
//         document.querySelector(".root")!.innerHTML = page500;
//     }

//     const page500link = document.querySelector("a[href='/500']");
//     if (page500link) {
//         page500link.addEventListener("click", (event) => {
//             event.preventDefault();
//             const page500 = renderTemplate("ErrorPage", {
//                 data: { title: "500", subtitle: "Мы уже фиксим" },
//             });
//             document.querySelector(".root")!.innerHTML = page500;

//             window.history.pushState({}, "", "/500");
//         });
//     }

//     if (window.location.href.includes("/404")) {
//         const page400 = renderTemplate("ErrorPage", {
//             data: { title: "404", subtitle: "Не туда попали" },
//         });
//         document.querySelector(".root")!.innerHTML = page400;
//     }

//     const page400link = document.querySelector("a[href='/400']");
//     if (page400link) {
//         page400link.addEventListener("click", (event) => {
//             event.preventDefault();
//             const page400 = renderTemplate("ErrorPage", {
//                 data: { title: "400", subtitle: "Не туда попали" },
//             });
//             document.querySelector(".root")!.innerHTML = page400;

//             window.history.pushState({}, "", "/400");
//         });
//     }
// });

// export { default as ErrorPage } from "./index.hbs?raw";
