import Block from "./block";

function renderComponent(query:string, block:Block) {
    const root = document.querySelector(query);
  
    root && root.appendChild(block.getContent());

    // TODO удалить елси не нужно
    // block.dispatchComponentDidMount();
  
    return root;
}

export default renderComponent;
