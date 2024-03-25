function renderComponent(query:string, block) {
    const root = document.querySelector(query);
  
    root.appendChild(block.getContent());
  
    // block.dispatchComponentDidMount();
  
    return root;
}

export default renderComponent;
