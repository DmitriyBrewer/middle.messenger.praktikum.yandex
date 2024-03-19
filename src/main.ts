import renderTemplate from "./lib/render";
import "./index.scss";
// import Button from "./lib/test/Button";
import button from "./ui/button/index";

type AuthData = {
    title: string;
};

const authPage = renderTemplate<AuthData>("Auth");

console.log(button);

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div class='root'>
//    ${authPage}
//   </div>
// `;
