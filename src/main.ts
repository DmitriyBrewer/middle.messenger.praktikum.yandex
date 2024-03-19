import "./index.scss";
import ButtonComponent from "./ui/button/index";

const button = new ButtonComponent({
    type: "submit",
    text: "Вход",
    className: "fullWidth button"
});

function render(query: string, component: string) {
    const element = document.querySelector(query);
    if (element) {
        element.innerHTML = component;
    } else {
        console.error(`Element with query '${query}' not found`);
    }
}

render(".root", button.render());
