import Block from "./test/block";

function renderComponent(query:string, block:Block) {
    const root = document.querySelector(query);
  
    root && root.appendChild(block.getContent());
  
    block.dispatchComponentDidMount();
  
    return root;
}

export default renderComponent;
