import Block from "./block";

function renderComponent(query:string, block:Block) {
    const root = document.querySelector(query);
  
    root && root.appendChild(block.getContent());
  
    return root;
}

export default renderComponent;
