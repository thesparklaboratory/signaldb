import { signal as t } from "@preact/signals-core";
import { createReactivityAdapter as o } from "signaldb";
const r = o({
  create: () => {
    const e = t(0);
    return {
      depend: () => {
        e.value;
      },
      notify: () => {
        e.value = e.peek() + 1;
      }
    };
  },
  isInScope: void 0,
  onDispose: void 0
});
export {
  r as default
};
//# sourceMappingURL=index.mjs.map
