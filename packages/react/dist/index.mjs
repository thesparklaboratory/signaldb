import { useRef as i, useMemo as s, useEffect as p, useReducer as a } from "react";
const f = (e) => e + 1, d = () => a(f, 0)[1];
function C(e) {
  function o(u, n) {
    const c = d(), t = i({
      isMounted: !0
    }), r = () => {
      t.current.stopComputation && (t.current.stopComputation(), t.current.stopComputation = void 0), t.current.stopComputation = e(() => {
        t.current.isMounted && (t.current.data = u(), c());
      });
    };
    return s(() => {
      t.current.isMounted && r();
    }, n || []), p(() => (t.current.isMounted = !0, t.current.stopComputation || r(), () => {
      t.current.isMounted = !1, t.current.stopComputation && (t.current.stopComputation(), t.current.stopComputation = void 0);
    }), []), t.current.data;
  }
  return o;
}
export {
  C as createUseReactivityHook
};
//# sourceMappingURL=index.mjs.map
