import handlebars from "handlebars";
import { BlockProps } from "./test/block";

// interface TemplateData {
//     [key: string]: string | number | boolean; 
// }

export function compiledTemplate(hbs: string, data: BlockProps): string {
    const template = handlebars.compile(hbs);
    return template(data);
}
