import { signal as t, peek as o, getScope as i, onDispose as p } from "@maverick-js/signals";
import { createReactivityAdapter as r } from "signaldb";
const c = r({
  create: () => {
    const e = t(0);
    return {
      depend: () => {
        e();
      },
      notify: () => {
        e.set(o(() => e() + 1));
      }
    };
  },
  isInScope: () => !!i(),
  onDispose: (e) => p(e)
});
export {
  c as default
};
//# sourceMappingURL=index.mjs.map
