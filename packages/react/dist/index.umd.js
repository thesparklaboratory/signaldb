(function(n,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.SignalDB={},n.React))})(this,function(n,e){"use strict";const r=o=>o+1,i=()=>e.useReducer(r,0)[1];function s(o){function c(p,f){const d=i(),t=e.useRef({isMounted:!0}),u=()=>{t.current.stopComputation&&(t.current.stopComputation(),t.current.stopComputation=void 0),t.current.stopComputation=o(()=>{t.current.isMounted&&(t.current.data=p(),d())})};return e.useMemo(()=>{t.current.isMounted&&u()},f||[]),e.useEffect(()=>(t.current.isMounted=!0,t.current.stopComputation||u(),()=>{t.current.isMounted=!1,t.current.stopComputation&&(t.current.stopComputation(),t.current.stopComputation=void 0)}),[]),t.current.data}return c}n.createUseReactivityHook=s,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=index.umd.js.map