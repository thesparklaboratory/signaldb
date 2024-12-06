import { signal as t } from "usignal";
import { createReactivityAdapter as i } from "signaldb";
const r = i({
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
