import { signal as e, untracked as r } from "@angular/core";
import { createReactivityAdapter as a } from "signaldb";
const o = a({
  create: () => {
    const t = e(0);
    return {
      depend: () => {
        t();
      },
      notify: () => {
        t.set(r(() => t() + 1));
      }
    };
  }
});
export {
  o as default
};
//# sourceMappingURL=index.mjs.map
