import { createReactivityAdapter as r } from "signaldb";
import { createSignal as o, getOwner as a, onCleanup as n } from "solid-js";
const d = r({
  create: () => {
    const [e, t] = o(void 0, { equals: !1 });
    return {
      depend: () => {
        e();
      },
      notify: () => {
        t();
      }
    };
  },
  isInScope: () => !!a(),
  onDispose: (e) => {
    n(e);
  }
});
export {
  d as default
};
//# sourceMappingURL=index.mjs.map
