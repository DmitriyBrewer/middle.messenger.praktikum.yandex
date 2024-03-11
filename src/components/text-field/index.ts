import "./index.scss";

document.querySelectorAll(".textField").forEach((textField: Element) => {
    const input: HTMLInputElement | null = textField.querySelector(".input");
    const label: HTMLElement | null = textField.querySelector(".label");
    const errorMessage: HTMLElement | null =
        textField.querySelector(".error-message");

    if (input && label && errorMessage) {
        input.addEventListener("focus", () => {
            if (label) {
                label.classList.add("active");
            }
        });

        input.addEventListener("blur", () => {
            if (input.value === "") {
                if (label) {
                    label.classList.remove("active");
                }
            }
        });

        input.addEventListener("input", () => {
            if (input.validity.valid) {
                input.style.color = "";
                if (errorMessage) {
                    errorMessage.style.display = "none";
                }
            } else {
                input.style.color = "#ff0000";
                if (errorMessage) {
                    errorMessage.style.display = "block";
                    errorMessage.textContent = input.validationMessage;
                }
            }
        });
    }
});

export { default as TextField } from "./index.hbs?raw";
