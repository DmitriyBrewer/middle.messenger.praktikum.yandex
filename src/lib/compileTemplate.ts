import handlebars from "handlebars";
import { BlockProps } from "./block";

export function compiledTemplate(hbs: string, data: BlockProps): string {
    const template = handlebars.compile(hbs);
    return template(data);
}
