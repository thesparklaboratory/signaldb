import { reactive as t, onCleanup as o } from "@reactively/core";
import { createReactivityAdapter as r } from "signaldb";
const p = r({
  create: () => {
    const e = t(0);
    return {
      depend: () => {
        e.get();
      },
      notify: () => {
        e.set(e.value + 1);
      }
    };
  },
  isInScope: void 0,
  onDispose: (e) => {
    o(e);
  }
});
export {
  p as default
};
//# sourceMappingURL=index.mjs.map
