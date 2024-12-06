import { shallowRef as t, triggerRef as o, onScopeDispose as r } from "vue";
import { createReactivityAdapter as a } from "signaldb";
const s = a({
  create: () => {
    const e = t(0);
    return {
      depend: () => {
        e.value;
      },
      notify: () => {
        o(e);
      }
    };
  },
  onDispose: (e) => {
    r(e, !0);
  }
});
export {
  s as default
};
//# sourceMappingURL=index.mjs.map
