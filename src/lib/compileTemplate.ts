import handlebars from "handlebars";

interface TemplateData {
    [key: string]: string | number | boolean; 
}

export function compiledTemplate(hbs: string, data: TemplateData): string {
    const template = handlebars.compile(hbs);
    return template(data);
}
