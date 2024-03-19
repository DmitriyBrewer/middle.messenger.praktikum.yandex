import "./index.scss";
import renderComponent from "./lib/renderComponent";
import ButtonComponent from "./ui/button/index";

const button = new ButtonComponent({
    type: "submit",
    text: "Вход",
    className: "fullWidth button"
});

renderComponent(".root", button.render());
