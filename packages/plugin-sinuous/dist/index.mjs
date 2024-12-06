import { observable as o, api as t } from "sinuous";
import { createReactivityAdapter as a } from "signaldb";
const r = a({
  create: () => {
    const e = o(0);
    return {
      depend: () => {
        e();
      },
      notify: () => {
        e(t.sample(() => e()) + 1);
      }
    };
  },
  isInScope: void 0,
  onDispose: (e) => {
    t.cleanup(e);
  }
});
export {
  r as default
};
//# sourceMappingURL=index.mjs.map
