import handlebars from "handlebars";
import { allPartials } from "./register";

interface TemplateData<T> {
    data: T;
}

const compiledTemplates: Record<string, Handlebars.TemplateDelegate> = {};

for (const key in allPartials) {
    compiledTemplates[key] = handlebars.compile(allPartials[key]);
}

function renderTemplate<T>(key: string, data?: TemplateData<T>): string {
    if (compiledTemplates[key]) {
        const template = compiledTemplates[key];
        return template(data);
    } else {
        throw new Error(`Шаблон '${key}' не найден`);
    }
}

export default renderTemplate;
