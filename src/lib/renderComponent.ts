function renderComponent(query: string, component: string) {
    const element = document.querySelector(query);
    if (element) {
        element.innerHTML = component;
    } else {
        console.error(`Элемент с запросом '${query}' не найден`);
    }
}

export default renderComponent;
