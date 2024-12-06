import { createReactivityAdapter as n } from "signaldb";
function a(e) {
  return n({
    create: () => {
      const t = new e.Dependency();
      return {
        depend: () => {
          e.active && t.depend();
        },
        notify: () => t.changed()
      };
    },
    isInScope: () => e.active,
    onDispose: (t) => {
      e.active && e.onInvalidate(t);
    }
  });
}
export {
  a as default
};
//# sourceMappingURL=index.mjs.map
