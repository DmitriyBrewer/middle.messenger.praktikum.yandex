/* eslint-disable */
// @ts-ignore не получается корректно типизировать не теряя логики обновления 

import { State } from "./hoc";

export function merge(lhs: State, rhs: State): State {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as State, rhs[p] as State);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}
