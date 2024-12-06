import t from "s-js";
import { createReactivityAdapter as r } from "signaldb";
const i = r({
  create: () => {
    const e = t.data(!0);
    return {
      depend: () => {
        e();
      },
      notify: () => {
        e(!0);
      }
    };
  },
  isInScope: void 0,
  onDispose: (e) => {
    t.cleanup(e);
  }
});
export {
  i as default
};
//# sourceMappingURL=index.mjs.map
