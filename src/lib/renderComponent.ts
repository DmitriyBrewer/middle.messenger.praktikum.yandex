function renderComponent(query:string, block) {
    const root = document.querySelector(query);
  
    root.appendChild(block.getContent());

    console.log(root?.firstChild);
  
    block.dispatchComponentDidMount();
  
    return root;
}

export default renderComponent;
