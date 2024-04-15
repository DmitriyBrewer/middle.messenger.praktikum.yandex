import { Data } from "./http";

export function mapDataToEntriesArray<T>(data: T): Data | undefined {
    if (typeof data === "object" && data !== null) {
        return Object.entries(data) as Data;
    } else {
        return undefined;
    }
}
