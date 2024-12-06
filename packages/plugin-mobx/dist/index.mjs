import { observable as t, runInAction as n, onBecomeUnobserved as r } from "mobx";
import { createReactivityAdapter as c } from "signaldb";
const p = c({
  create: () => {
    const e = t({ count: 0 });
    return {
      depend: () => {
        e.count;
      },
      notify: () => {
        n(() => {
          e.count += 1;
        });
      },
      raw: e
    };
  },
  isInScope: void 0,
  onDispose(e, { raw: o }) {
    r(o, "count", e);
  }
});
export {
  p as default
};
//# sourceMappingURL=index.mjs.map
