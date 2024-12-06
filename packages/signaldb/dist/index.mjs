import { EventEmitter as Q } from "events";
import { Query as q } from "mingo";
import { updateObject as H } from "mingo/updater";
import { sort as W } from "fast-sort";
class V extends Q {
  on(e, t) {
    return super.on(e, t), this;
  }
  emit(e, ...t) {
    return super.emit(e, ...t);
  }
}
function D(n, e) {
  return new q(e).test(n);
}
function C(n, e) {
  const t = Object.assign({}, n);
  return H(t, e), t;
}
function b(n, e) {
  if (Object.is(n, e))
    return !0;
  if (n instanceof RegExp && e instanceof RegExp)
    return n.toString() === e.toString();
  if (n instanceof Date && e instanceof Date)
    return n.getTime() === e.getTime();
  if (typeof n != "object" || typeof e != "object" || n === null || e === null)
    return !1;
  const t = Object.keys(n), i = Object.keys(e);
  if (t.length !== i.length)
    return !1;
  for (let s = 0; s < t.length; s += 1) {
    const r = t[s];
    if (!i.includes(r) || !b(n[r], e[r]))
      return !1;
  }
  return !0;
}
function z() {
  return Math.floor(Math.random() * 1e17).toString(16);
}
function E(n) {
  if (typeof n == "function")
    throw new Error("Cloning functions is not supported");
  if (n === null || typeof n != "object")
    return n;
  if (n instanceof Date)
    return new Date(n.getTime());
  if (Array.isArray(n))
    return n.map((t) => E(t));
  if (n instanceof Map) {
    const t = /* @__PURE__ */ new Map();
    return n.forEach((i, s) => {
      t.set(s, E(i));
    }), t;
  }
  if (n instanceof Set) {
    const t = /* @__PURE__ */ new Set();
    return n.forEach((i) => {
      t.add(E(i));
    }), t;
  }
  if (n instanceof RegExp)
    return new RegExp(n);
  const e = {};
  for (const t in n)
    Object.hasOwnProperty.call(n, t) && (e[t] = E(n[t]));
  return e;
}
function A(n) {
  if (typeof structuredClone == "function")
    return structuredClone(n);
  /* istanbul ignore next -- @preserve */
  return E(n);
}
function w(n) {
  return typeof n == "string" ? n : typeof n == "number" || typeof n == "boolean" ? n.toString() : n instanceof Date ? n.toISOString() : JSON.stringify(n);
}
function I(n, e, t = Object.is) {
  let i = e;
  return {
    get() {
      return n && n.depend(), i;
    },
    set(r) {
      t(i, r) || (i = r, n && n.notify());
    }
  };
}
function S(n, e) {
  const t = e.split(/[.[\]]/g);
  t[0] === "" && t.shift(), t[t.length - 1] === "" && t.pop();
  let i = n;
  for (let s = 0; s < t.length; s += 1) {
    const r = t[s];
    if (i == null || r.trim() === "")
      return;
    i = i[r];
  }
  if (i !== void 0)
    return i;
}
function J(n, e) {
  return W(n).by(Object.entries(e).map(([t, i]) => ({ [i === 1 ? "asc" : "desc"]: (r) => S(r, t) })));
}
function M(n, e, t, i = !1) {
  if (n == null)
    return n;
  const s = e.split(/[.[\]]/g);
  s[0] === "" && s.shift(), s[s.length - 1] === "" && s.pop();
  const r = (a) => {
    if (s.length > 1) {
      const o = s.shift(), h = !Number.isNaN(parseInt(s[0], 10));
      a[o] === void 0 && (a[o] = h ? [] : {}), r(a[o]);
    } else {
      if (i && t === void 0) {
        delete a[s[0]];
        return;
      }
      a[s[0]] = t;
    }
  };
  return r(n), n;
}
function G(n, e) {
  if (Object.values(e).every((s) => s === 0)) {
    const s = Object.assign({}, n);
    return Object.keys(e).forEach((r) => {
      S(n, r) !== void 0 && M(s, r, void 0, !0);
    }), s;
  }
  const i = {};
  return Object.entries(e).forEach(([s, r]) => {
    const a = S(n, s);
    a !== void 0 && (a == null && r !== 1 || M(i, s, r === 1 ? a : void 0));
  }), i;
}
function U(n, e) {
  const t = /* @__PURE__ */ new Set();
  return n.filter((i) => {
    const s = typeof e == "function" ? e(i) : i[e];
    return !t.has(s) && t.add(s);
  });
}
class X {
  constructor(e) {
    this.previousItems = [], this.callbacks = {
      added: [],
      addedBefore: [],
      changed: [],
      changedField: [],
      movedBefore: [],
      removed: []
    }, this.unbindEvents = e();
  }
  call(e, ...t) {
    this.callbacks[e].forEach(({ callback: i, options: s }) => {
      (!s.skipInitial || !s.isInitial) && i(...t);
    });
  }
  hasCallbacks(e) {
    return e.some((t) => this.callbacks[t].length > 0);
  }
  isEmpty() {
    return !this.hasCallbacks([
      "added",
      "addedBefore",
      "changed",
      "changedField",
      "movedBefore",
      "removed"
    ]);
  }
  runChecks(e) {
    const t = new Map(this.previousItems.map((s, r) => [
      s.id,
      { item: s, index: r, beforeItem: this.previousItems[r + 1] || null }
    ])), i = new Map(e.map((s, r) => [
      s.id,
      { item: s, index: r, beforeItem: e[r + 1] || null }
    ]));
    this.hasCallbacks(["changed", "changedField", "movedBefore", "removed"]) && t.forEach(({ item: s, index: r, beforeItem: a }) => {
      var o;
      const h = i.get(s.id);
      h ? (this.hasCallbacks(["changed", "changedField"]) && (b(h.item, s) || (this.call("changed", h.item), this.hasCallbacks(["changedField"]) && U([
        ...Object.keys(h.item),
        ...Object.keys(s)
      ], (d) => d).forEach((d) => {
        b(h.item[d], s[d]) || this.call("changedField", h.item, d, s[d], h.item[d]);
      }))), h.index !== r && ((o = h.beforeItem) === null || o === void 0 ? void 0 : o.id) !== (a == null ? void 0 : a.id) && this.call("movedBefore", h.item, h.beforeItem)) : this.call("removed", s);
    }), this.hasCallbacks(["added", "addedBefore"]) && e.forEach((s, r) => {
      t.get(s.id) || (this.call("added", s), this.call("addedBefore", s, e[r + 1] || null));
    }), this.previousItems = e, Object.keys(this.callbacks).forEach((s) => {
      const r = s, a = this.callbacks[r];
      this.callbacks[r] = a.map((o) => Object.assign(Object.assign({}, o), { options: Object.assign(Object.assign({}, o.options), { isInitial: !1 }) }));
    });
  }
  stop() {
    this.unbindEvents();
  }
  addCallbacks(e, t = !1) {
    Object.keys(e).forEach((i) => {
      const s = i;
      this.callbacks[s].push({
        callback: e[s],
        options: { skipInitial: t, isInitial: !0 }
      });
    });
  }
  removeCallbacks(e) {
    Object.keys(e).forEach((t) => {
      const i = t, s = this.callbacks[i].findIndex(({ callback: r }) => r === e[i]);
      this.callbacks[i].splice(s, 1);
    });
  }
}
function k(n) {
  return n ? n.isInScope ? n.isInScope() : !0 : !1;
}
class Y {
  constructor(e, t) {
    this.onCleanupCallbacks = [], this.getFilteredItems = e, this.options = t || {};
  }
  addGetters(e) {
    if (!k(this.options.reactive))
      return e;
    const t = this.depend.bind(this);
    return Object.entries(e).reduce((i, [s, r]) => (Object.defineProperty(i, s, {
      get() {
        return t({
          changedField: (a) => (o, h) => {
            h !== s || o.id !== e.id || a();
          }
        }), r;
      },
      enumerable: !0,
      configurable: !0
    }), i), {});
  }
  transform(e) {
    const t = this.options.fieldTracking ? this.addGetters(e) : e;
    return this.options.transform ? this.options.transform(t) : t;
  }
  getItems() {
    const e = this.getFilteredItems(), { sort: t, skip: i, limit: s } = this.options, r = t ? J(e, t) : e, a = i ? r.slice(i) : r, o = s ? a.slice(0, s) : a, h = this.options.fields && this.options.fields.id === 0;
    return o.map((c) => this.options.fields ? Object.assign(Object.assign({}, h ? {} : { id: c.id }), G(c, this.options.fields)) : c);
  }
  depend(e) {
    if (!this.options.reactive || !k(this.options.reactive))
      return;
    const t = this.options.reactive.create();
    t.depend();
    const i = () => t.notify();
    function s(a) {
      const o = e[a];
      return (...h) => {
        if (o === !0) {
          i();
          return;
        }
        typeof o == "function" && o(i)(...h);
      };
    }
    const r = this.observeRawChanges({
      added: s("added"),
      addedBefore: s("addedBefore"),
      changed: s("changed"),
      changedField: s("changedField"),
      movedBefore: s("movedBefore"),
      removed: s("removed")
    }, !0);
    this.options.reactive.onDispose && this.options.reactive.onDispose(() => r(), t), this.onCleanup(r);
  }
  ensureObserver() {
    if (!this.observer) {
      const e = new X(() => {
        const t = () => {
          e.runChecks(this.getItems());
        }, i = this.options.bindEvents && this.options.bindEvents(t);
        return () => {
          i && i();
        };
      });
      this.onCleanup(() => e.stop()), this.observer = e;
    }
    return this.observer;
  }
  observeRawChanges(e, t = !1) {
    const i = this.ensureObserver();
    return i.addCallbacks(e, t), i.runChecks(this.getItems()), () => {
      i.removeCallbacks(e), i.isEmpty() && (i.stop(), this.observer = void 0);
    };
  }
  cleanup() {
    this.onCleanupCallbacks.forEach((e) => {
      e();
    }), this.onCleanupCallbacks = [];
  }
  onCleanup(e) {
    this.onCleanupCallbacks.push(e);
  }
  forEach(e) {
    const t = this.getItems();
    this.depend(Object.assign({ addedBefore: !0, removed: !0, movedBefore: !0 }, this.options.fieldTracking ? {} : { changed: !0 })), t.forEach((i) => {
      e(this.transform(i));
    });
  }
  map(e) {
    const t = [];
    return this.forEach((i) => {
      t.push(e(i));
    }), t;
  }
  fetch() {
    return this.map((e) => e);
  }
  count() {
    const e = this.getItems();
    return this.depend({
      added: !0,
      removed: !0
    }), e.length;
  }
  observeChanges(e, t = !1) {
    return this.observeRawChanges(Object.entries(e).reduce((i, [s, r]) => r ? Object.assign(Object.assign({}, i), { [s]: (a, o) => {
      const h = this.transform(a), c = o !== void 0, d = c && o ? this.transform(o) : null;
      return r(h, ...c ? [d] : []);
    } }) : i, {}), t);
  }
  requery() {
    this.observer && this.observer.runChecks(this.getItems());
  }
}
function Z(n, e) {
  var t = {};
  for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && e.indexOf(i) < 0 && (t[i] = n[i]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, i = Object.getOwnPropertySymbols(n); s < i.length; s++)
      e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(n, i[s]) && (t[i[s]] = n[i[s]]);
  return t;
}
function P(...n) {
  return n.length === 0 ? [] : [...new Set(n.reduce((e, t) => e.filter((i) => t.includes(i))))];
}
function ee(n, e) {
  return n.reduce((t, i) => {
    /* istanbul ignore if -- @preserve */
    if (i.getItemPositions) {
      const a = i.getItemPositions(e);
      return a == null ? t : {
        matched: !0,
        positions: t.matched ? P(t.positions, a) : a,
        optimizedSelector: t.optimizedSelector
      };
    }
    const s = i.query(e);
    if (!s.matched)
      return t;
    const r = Object.fromEntries(Object.entries(t.optimizedSelector).filter(([a]) => !s.fields.includes(a)));
    return {
      matched: !0,
      positions: [...new Set(t.matched ? P(t.positions, s.positions) : s.positions)],
      optimizedSelector: r
    };
  }, {
    matched: !1,
    positions: [],
    optimizedSelector: Object.assign({}, e)
  });
}
function $(n, e) {
  if (e == null || Object.keys(e).length <= 0)
    return { matched: !1, positions: [], optimizedSelector: e };
  const { $and: t, $or: i } = e, s = Z(e, ["$and", "$or"]), r = ee(n, s);
  let { matched: a, positions: o } = r;
  const h = r.optimizedSelector;
  if (Array.isArray(t)) {
    const c = [];
    for (const d of t) {
      const { matched: u, positions: f, optimizedSelector: l } = $(n, d);
      u ? (o = a ? P(o, f) : f, a = !0, Object.keys(l).length > 0 && c.push(l)) : c.push(d);
    }
    c.length > 0 && (h.$and = c);
  }
  if (Array.isArray(i)) {
    const c = [];
    for (const d of i) {
      const { matched: u, positions: f, optimizedSelector: l } = $(n, d);
      u ? (o = [.../* @__PURE__ */ new Set([...o, ...f])], a = !0, Object.keys(l).length > 0 && c.push(l)) : c.push(d);
    }
    c.length > 0 && (h.$or = c);
  }
  return {
    matched: a,
    positions: o || [],
    optimizedSelector: h
  };
}
function ye(n) {
  return n;
}
const F = [
  "$eq",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$in",
  "$nin",
  "$ne",
  "$exists",
  "$not",
  "$expr",
  "$jsonSchema",
  "$mod",
  "$regex",
  "$options",
  "$text",
  "$where",
  "$all",
  "$elemMatch",
  "$size",
  "$bitsAllClear",
  "$bitsAllSet",
  "$bitsAnyClear",
  "$bitsAnySet"
];
function R(n) {
  if (typeof n != "object" || n == null)
    return !1;
  const e = Object.keys(n);
  return e.length === 0 || e.some((s) => !F.includes(s)) ? !1 : e.every((s) => F.includes(s));
}
function te(n, e) {
  if (e[n] instanceof RegExp)
    return null;
  if (e[n] != null) {
    if (R(e[n])) {
      if (R(e[n]) && Array.isArray(e[n].$in) && e[n].$in.length) {
        const i = Object.assign(Object.assign({}, e), { [n]: Object.assign({}, e[n]) });
        return delete i[n].$in, Object.keys(i[n]).length === 0 && delete i[n], e[n].$in.map(w);
      }
      return null;
    }
    return [w(e[n])];
  }
  return null;
}
function K(n, e) {
  return {
    query(t) {
      const i = te(n, t);
      return i == null ? { matched: !1 } : {
        matched: !0,
        positions: i.reduce((r, a) => [...r, ...e.get(a) || []], []),
        fields: [n]
      };
    },
    rebuild() {
    }
  };
}
function ve(n) {
  const e = /* @__PURE__ */ new Map();
  return Object.assign(Object.assign({}, K(n, e)), { rebuild(t) {
    e.clear(), t.forEach((i, s) => {
      const r = w(S(i, n)), a = e.get(r) || /* @__PURE__ */ new Set();
      a.add(s), e.set(r, a);
    });
  } });
}
function N(n) {
  return n.added.length > 0 || n.modified.length > 0 || n.removed.length > 0;
}
function se(n, { added: e, modified: t, removed: i }) {
  const s = n.slice();
  return e.forEach((r) => {
    s.push(r);
  }), t.forEach((r) => {
    const a = s.findIndex(({ id: o }) => o === r.id);
    a !== -1 && (s[a] = r);
  }), i.forEach((r) => {
    const a = s.findIndex(({ id: o }) => o === r.id);
    a !== -1 && s.splice(a, 1);
  }), s;
}
class y extends V {
  static batch(e) {
    y.batchOperationInProgress = !0, y.collections.reduce((t, i) => () => i.batch(() => t()), e)(), y.batchOperationInProgress = !1;
  }
  constructor(e) {
    var t, i, s, r;
    if (super(), this.persistenceAdapter = null, this.indexProviders = [], this.indicesOutdated = !1, this.idIndex = /* @__PURE__ */ new Map(), this.batchOperationInProgress = !1, this.isDisposed = !1, this.postBatchCallbacks = /* @__PURE__ */ new Set(), y.collections.push(this), this.options = Object.assign({ memory: [] }, e), this.debugMode = (t = this.options.enableDebugMode) !== null && t !== void 0 ? t : y.debugMode, this.indexProviders = [
      K("id", this.idIndex),
      ...this.options.indices || []
    ], this.rebuildIndices(), this.isPullingSignal = I((i = this.options.reactivity) === null || i === void 0 ? void 0 : i.create(), !!(e != null && e.persistence)), this.isPushingSignal = I((s = this.options.reactivity) === null || s === void 0 ? void 0 : s.create(), !1), this.on("persistence.pullStarted", () => {
      this.isPullingSignal.set(!0);
    }), this.on("persistence.pullCompleted", () => {
      this.isPullingSignal.set(!1);
    }), this.on("persistence.pushStarted", () => {
      this.isPushingSignal.set(!0);
    }), this.on("persistence.pushCompleted", () => {
      this.isPushingSignal.set(!1);
    }), this.persistenceAdapter = (r = this.options.persistence) !== null && r !== void 0 ? r : null, this.persistenceAdapter) {
      let a = 0, o = !1;
      const h = { added: [], modified: [], removed: [] }, c = async (l) => {
        if (!this.persistenceAdapter)
          throw new Error("Persistence adapter not found");
        this.emit("persistence.pullStarted");
        const { items: p, changes: m } = l ?? await this.persistenceAdapter.load();
        if (p) {
          if (a > 0)
            return;
          this.memory().splice(0, this.memoryArray().length, ...p), this.idIndex.clear(), this.memory().map((g, v) => {
            this.idIndex.set(w(g.id), /* @__PURE__ */ new Set([v]));
          });
        } else m && (m.added.forEach((g) => {
          const v = this.memory().findIndex((x) => x.id === g.id);
          if (v >= 0) {
            this.memory().splice(v, 1, g);
            return;
          }
          this.memory().push(g);
          const O = this.memory().findIndex((x) => x === g);
          this.idIndex.set(w(g.id), /* @__PURE__ */ new Set([O]));
        }), m.modified.forEach((g) => {
          const v = this.memory().findIndex((O) => O.id === g.id);
          if (v === -1)
            throw new Error("Cannot resolve index for item");
          this.memory().splice(v, 1, g);
        }), m.removed.forEach((g) => {
          const v = this.memory().findIndex((O) => O.id === g.id);
          if (v === -1)
            throw new Error("Cannot resolve index for item");
          this.memory().splice(v, 1);
        }));
        this.rebuildIndices(), this.emit("persistence.received"), setTimeout(() => this.emit("persistence.pullCompleted"), 0);
      }, d = {
        added: [],
        modified: [],
        removed: []
      };
      let u = !1;
      const f = () => {
        if (!this.persistenceAdapter)
          throw new Error("Persistence adapter not found");
        if (a <= 0 && this.emit("persistence.pushStarted"), u || !N(d))
          return;
        u = !0, a += 1;
        const l = this.memoryArray(), p = Object.assign({}, d);
        d.added = [], d.modified = [], d.removed = [], this.persistenceAdapter.save(l, p).then(() => {
          this.emit("persistence.transmitted");
        }).catch((m) => {
          this.emit("persistence.error", m instanceof Error ? m : new Error(m));
        }).finally(() => {
          a -= 1, u = !1, f(), a <= 0 && this.emit("persistence.pushCompleted");
        });
      };
      this.on("added", (l) => {
        if (!o) {
          h.added.push(l);
          return;
        }
        d.added.push(l), f();
      }), this.on("changed", (l) => {
        if (!o) {
          h.modified.push(l);
          return;
        }
        d.modified.push(l), f();
      }), this.on("removed", (l) => {
        if (!o) {
          h.removed.push(l);
          return;
        }
        d.removed.push(l), f();
      }), this.persistenceAdapter.register((l) => c(l)).then(async () => {
        if (!this.persistenceAdapter)
          throw new Error("Persistence adapter not found");
        let l = this.memoryArray();
        for (await c(); N(h); ) {
          const p = h.added.splice(0), m = h.modified.splice(0), g = h.removed.splice(0);
          l = se(this.memoryArray(), { added: p, modified: m, removed: g }), await this.persistenceAdapter.save(l, { added: p, modified: m, removed: g }).then(() => {
            this.emit("persistence.transmitted");
          });
        }
        await c(), o = !0, setTimeout(() => this.emit("persistence.init"), 0);
      }).catch((l) => {
        this.emit("persistence.error", l instanceof Error ? l : new Error(l));
      });
    }
  }
  isPulling() {
    var e;
    return (e = this.isPullingSignal.get()) !== null && e !== void 0 ? e : !1;
  }
  isPushing() {
    var e;
    return (e = this.isPushingSignal.get()) !== null && e !== void 0 ? e : !1;
  }
  isLoading() {
    const e = this.isPulling(), t = this.isPushing();
    return e || t;
  }
  getDebugMode() {
    return this.debugMode;
  }
  setDebugMode(e) {
    this.debugMode = e;
  }
  profile(e, t) {
    if (!this.debugMode)
      return e();
    const i = performance.now(), s = e(), r = performance.now();
    return t(r - i), s;
  }
  executeInDebugMode(e) {
    if (!this.debugMode)
      return;
    const t = new Error().stack || "";
    e(t);
  }
  rebuildIndices() {
    this.indicesOutdated = !0, !this.batchOperationInProgress && this.rebuildAllIndices();
  }
  rebuildAllIndices() {
    this.idIndex.clear(), this.memory().map((e, t) => {
      this.idIndex.set(w(e.id), /* @__PURE__ */ new Set([t]));
    }), this.indexProviders.forEach((e) => e.rebuild(this.memoryArray())), this.indicesOutdated = !1;
  }
  getIndexInfo(e) {
    return e != null && Object.keys(e).length === 1 && "id" in e && typeof e.id != "object" ? {
      matched: !0,
      positions: Array.from(this.idIndex.get(w(e.id)) || []),
      optimizedSelector: {}
    } : e == null || this.indicesOutdated ? {
      matched: !1,
      positions: [],
      optimizedSelector: {}
    } : $(this.indexProviders, e);
  }
  getItemAndIndex(e) {
    const t = this.memoryArray(), i = this.getIndexInfo(e), r = (i.matched ? i.positions.map((o) => t[o]) : t).find((o) => D(o, e)), a = i.matched && i.positions.find((o) => t[o] === r) || t.findIndex((o) => o === r);
    if (r == null)
      return { item: null, index: -1 };
    if (a === -1)
      throw new Error("Cannot resolve index for item");
    return { item: r, index: a };
  }
  deleteFromIdIndex(e, t) {
    this.idIndex.delete(w(e)), this.batchOperationInProgress && this.idIndex.forEach(([i], s) => {
      i > t && this.idIndex.set(s, /* @__PURE__ */ new Set([i - 1]));
    });
  }
  memory() {
    return this.options.memory;
  }
  memoryArray() {
    return this.memory().map((e) => e);
  }
  transform(e) {
    return this.options.transform ? this.options.transform(e) : e;
  }
  getItems(e) {
    return this.profile(() => {
      const t = this.getIndexInfo(e), i = (a) => t.optimizedSelector == null || Object.keys(t.optimizedSelector).length <= 0 ? !0 : D(a, t.optimizedSelector);
      if (!t.matched)
        return this.memory().filter(i);
      const s = this.memoryArray(), r = t.positions.map((a) => s[a]);
      return this.emit("getItems", e), r.filter(i);
    }, (t) => this.executeInDebugMode((i) => this.emit("_debug.getItems", i, e, t)));
  }
  /**
   * Disposes the collection, runs the dispose method of the persistence adapter
   * and clears all internal data structures.
   */
  async dispose() {
    var e;
    !((e = this.persistenceAdapter) === null || e === void 0) && e.unregister && await this.persistenceAdapter.unregister(), this.persistenceAdapter = null, this.memory().map(() => this.memory().pop()), this.idIndex.clear(), this.indexProviders = [], this.isDisposed = !0;
  }
  find(e, t) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (e !== void 0 && (!e || typeof e != "object"))
      throw new Error("Invalid selector");
    const i = new Y(() => this.getItems(e), Object.assign(Object.assign({ reactive: this.options.reactivity }, t), { transform: this.transform.bind(this), bindEvents: (s) => {
      const r = () => {
        if (this.batchOperationInProgress) {
          this.postBatchCallbacks.add(s);
          return;
        }
        s();
      };
      return this.addListener("persistence.received", r), this.addListener("added", r), this.addListener("changed", r), this.addListener("removed", r), this.emit("observer.created", e, t), () => {
        this.removeListener("persistence.received", r), this.removeListener("added", r), this.removeListener("changed", r), this.removeListener("removed", r), this.emit("observer.disposed", e, t);
      };
    } }));
    return this.emit("find", e, t, i), this.executeInDebugMode((s) => this.emit("_debug.find", s, e, t, i)), i;
  }
  findOne(e, t) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    const s = this.find(e, Object.assign({ limit: 1 }, t)).fetch()[0] || void 0;
    return this.emit("findOne", e, t, s), this.executeInDebugMode((r) => this.emit("_debug.findOne", r, e, t, s)), s;
  }
  batch(e) {
    this.batchOperationInProgress = !0, e(), this.batchOperationInProgress = !1, this.rebuildAllIndices(), this.postBatchCallbacks.forEach((t) => t()), this.postBatchCallbacks.clear();
  }
  insert(e) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (!e)
      throw new Error("Invalid item");
    const t = Object.assign({ id: z() }, e);
    if (this.idIndex.has(w(t.id)))
      throw new Error("Item with same id already exists");
    this.memory().push(t);
    const i = this.memory().findIndex((s) => s === t);
    return this.idIndex.set(w(t.id), /* @__PURE__ */ new Set([i])), this.rebuildIndices(), this.emit("added", t), this.emit("insert", t), this.executeInDebugMode((s) => this.emit("_debug.insert", s, t)), t.id;
  }
  insertMany(e) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (!e)
      throw new Error("Invalid items");
    if (e.length === 0)
      return [];
    const t = [];
    return this.batch(() => {
      e.forEach((i) => {
        t.push(this.insert(i));
      });
    }), t;
  }
  updateOne(e, t) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (!e)
      throw new Error("Invalid selector");
    if (!t)
      throw new Error("Invalid modifier");
    const { item: i, index: s } = this.getItemAndIndex(e);
    if (i == null)
      return 0;
    const r = C(A(i), t), a = this.findOne({ id: r.id }, { reactive: !1 });
    if (!b(a, Object.assign(Object.assign({}, a), { id: r.id })))
      throw new Error("Item with same id already exists");
    return this.memory().splice(s, 1, r), this.rebuildIndices(), this.emit("changed", r, t), this.emit("updateOne", e, t), this.executeInDebugMode((o) => this.emit("_debug.updateOne", o, e, t)), 1;
  }
  updateMany(e, t) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (!e)
      throw new Error("Invalid selector");
    if (!t)
      throw new Error("Invalid modifier");
    const i = this.getItems(e), s = [];
    return i.forEach((r) => {
      const { index: a } = this.getItemAndIndex({ id: r.id });
      if (a === -1)
        throw new Error("Cannot resolve index for item");
      const o = C(A(r), t);
      this.memory().splice(a, 1, o), s.push(o);
    }), this.rebuildIndices(), s.forEach((r) => {
      this.emit("changed", r, t);
    }), this.emit("updateMany", e, t), this.executeInDebugMode((r) => this.emit("_debug.updateMany", r, e, t)), s.length;
  }
  removeOne(e) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (!e)
      throw new Error("Invalid selector");
    const { item: t, index: i } = this.getItemAndIndex(e);
    return t != null && (this.memory().splice(i, 1), this.deleteFromIdIndex(t.id, i), this.rebuildIndices(), this.emit("removed", t)), this.emit("removeOne", e), this.executeInDebugMode((s) => this.emit("_debug.removeOne", s, e)), t == null ? 0 : 1;
  }
  removeMany(e) {
    if (this.isDisposed)
      throw new Error("Collection is disposed");
    if (!e)
      throw new Error("Invalid selector");
    const t = this.getItems(e);
    return t.forEach((i) => {
      const s = this.memory().findIndex((r) => r === i);
      if (s === -1)
        throw new Error("Cannot resolve index for item");
      this.memory().splice(s, 1), this.deleteFromIdIndex(i.id, s), this.rebuildIndices();
    }), t.forEach((i) => {
      this.emit("removed", i);
    }), this.emit("removeMany", e), this.executeInDebugMode((i) => this.emit("_debug.removeMany", i, e)), t.length;
  }
}
y.collections = [];
y.debugMode = !1;
y.batchOperationInProgress = !1;
y.enableDebugMode = () => {
  y.debugMode = !0, y.collections.forEach((n) => {
    n.setDebugMode(!0);
  });
};
function we(n) {
  return n;
}
function L(n, e) {
  const { serialize: t = JSON.stringify, deserialize: i = JSON.parse } = e || {}, s = `signaldb-collection-${n}`;
  function r() {
    return i(localStorage.getItem(s) || "[]");
  }
  return {
    async load() {
      const a = r();
      return Promise.resolve({ items: a });
    },
    async save(a, { added: o, modified: h, removed: c }) {
      const d = r();
      return o.forEach((u) => {
        d.push(u);
      }), h.forEach((u) => {
        const f = d.findIndex(({ id: l }) => l === u.id);
        /* istanbul ignore if -- @preserve */
        if (f === -1)
          throw new Error(`Item with ID ${u.id} not found`);
        d[f] = u;
      }), c.forEach((u) => {
        const f = d.findIndex(({ id: l }) => l === u.id);
        /* istanbul ignore if -- @preserve */
        if (f === -1)
          throw new Error(`Item with ID ${u.id} not found`);
        d.splice(f, 1);
      }), localStorage.setItem(s, t(d)), Promise.resolve();
    },
    async register() {
      return Promise.resolve();
    }
  };
}
function ie(n, e) {
  const { serialize: t = JSON.stringify, deserialize: i = JSON.parse } = e || {};
  let s = null;
  async function r() {
    const a = await import("fs");
    if (!await a.promises.access(n).then(() => !0).catch(() => !1))
      return [];
    const h = await a.promises.readFile(n, "utf8").catch((c) => {
      /* istanbul ignore next -- @preserve */
      if (c.code === "ENOENT")
        return "[]";
      /* istanbul ignore next -- @preserve */
      throw c;
    });
    return i(h);
  }
  return {
    async register(a) {
      if (typeof window < "u")
        throw new Error("Filesystem adapter is not supported in the browser");
      const o = await import("fs");
      await o.promises.access(n).then(() => !0).catch(() => !1) || await o.promises.writeFile(n, "[]"), o.watch(n, { encoding: "utf8" }, () => {
        a();
      });
    },
    async load() {
      if (typeof window < "u")
        throw new Error("Filesystem adapter is not supported in the browser");
      return s && await s, { items: await r() };
    },
    async save(a, { added: o, modified: h, removed: c }) {
      if (typeof window < "u")
        throw new Error("Filesystem adapter is not supported in the browser");
      s && await s, s = r().then((d) => {
        const u = d.slice();
        return o.forEach((f) => {
          u.push(f);
        }), h.forEach((f) => {
          const l = u.findIndex(({ id: p }) => p === f.id);
          /* istanbul ignore if -- @preserve */
          if (l === -1)
            throw new Error(`Item with ID ${f.id} not found`);
          u[l] = f;
        }), c.forEach((f) => {
          const l = u.findIndex(({ id: p }) => p === f.id);
          /* istanbul ignore if -- @preserve */
          if (l === -1)
            throw new Error(`Item with ID ${f.id} not found`);
          u.splice(l, 1);
        }), u;
      }).then(async (d) => {
        await (await import("fs")).promises.writeFile(n, t(d));
      }).then(() => {
        s = null;
      }), await s;
    }
  };
}
function ne(n) {
  return typeof window > "u" ? ie(`persistent-collection-${n}.json`) : L(n);
}
class be extends y {
  constructor(e, t) {
    super(Object.assign({ persistence: ne(e) }, t));
  }
}
function re(n, e, t) {
  var i;
  const s = (i = t == null ? void 0 : t.cacheTimeout) !== null && i !== void 0 ? i : 0;
  let r = !1, a = null, o = null, h = null;
  return (...c) => {
    if (h == null)
      o && (clearTimeout(o), o = null), h = e(...c).then((d) => (s > 0 && (o = setTimeout(() => {
        r = !1, a = null, h = null;
      }, s)), r = !0, a = d, t != null && t.onResolve && t.onResolve(a), d));
    else if (r)
      return h;
    return n(...c);
  };
}
function oe(n, e, t) {
  var i;
  const s = (i = t == null ? void 0 : t.readPreference) !== null && i !== void 0 ? i : "secondary", r = s === "primary" ? n : e, a = s === "primary" ? e : n;
  let o = null;
  const h = re(() => r.load(), () => a.load(), {
    cacheTimeout: 100,
    onResolve: (c) => {
      var d, u, f;
      o && o(), r.save(c.items || [], {
        added: ((d = c.changes) === null || d === void 0 ? void 0 : d.added) || [],
        modified: ((u = c.changes) === null || u === void 0 ? void 0 : u.modified) || [],
        removed: ((f = c.changes) === null || f === void 0 ? void 0 : f.removed) || []
      });
    }
  });
  return {
    async register(c) {
      o = c, await Promise.all([n.register(c), e.register(c)]);
    },
    async load() {
      return h();
    },
    async save(c, d) {
      await Promise.all([
        r.save(c, d),
        a.save(c, d)
      ]);
    }
  };
}
function ae(n) {
  return {
    async register(e) {
      n.registerRemoteChange && await n.registerRemoteChange(e);
    },
    load: () => n.pull(),
    save: (e, t) => {
      if (!n.push)
        throw new Error("Pushing is not configured for this collection. Try to pass a `push` function to the collection options.");
      return n.push(t, e);
    }
  };
}
class ce extends y {
  constructor(e) {
    var t, i;
    const s = ae({
      registerRemoteChange: e.registerRemoteChange,
      pull: async () => {
        this.isPullingRemoteSignal.set(!0);
        try {
          return await e.pull();
        } finally {
          this.isPullingRemoteSignal.set(!1);
        }
      },
      push: e.push ? async (a, o) => {
        if (!e.push)
          throw new Error("Pushing is not configured for this collection. Try to pass a `push` function to the collection options.");
        this.isPushingRemoteSignal.set(!0);
        try {
          await e.push(a, o);
        } finally {
          this.isPushingRemoteSignal.set(!1);
        }
      } : void 0
    }), r = e != null && e.persistence ? oe(s, e.persistence) : s;
    super(Object.assign(Object.assign({}, e), { persistence: r })), this.isPullingRemoteSignal = I((t = e.reactivity) === null || t === void 0 ? void 0 : t.create(), !1), this.isPushingRemoteSignal = I((i = e.reactivity) === null || i === void 0 ? void 0 : i.create(), !1);
  }
  isLoading() {
    const e = this.isPullingRemoteSignal.get(), t = this.isPushingRemoteSignal.get(), i = super.isLoading();
    return e || t || i;
  }
}
class Ie extends ce {
  /**
   * @param options {Object} - Options for the collection.
   * @param options.fetchQueryItems {Function} - A function that fetches items from the server. It takes the selector as an argument and returns a promise that resolves to an object with an `items` property.
   * @param options.purgeDelay {Number} - The delay in milliseconds before purging an item from the cache.
   */
  constructor(e) {
    var t, i, s, r;
    let a;
    if (super(Object.assign(Object.assign({}, e), { pull: () => Promise.resolve({
      items: [...this.itemsCache.values()].reduce((o, h) => {
        const c = [...o];
        return h.forEach((d) => {
          const u = c.findIndex((f) => f.id === d.id);
          if (u === -1) {
            c.push(d);
            return;
          }
          c[u] = this.mergeItems(c[u], d);
        }), c;
      }, [])
    }), registerRemoteChange: async (o) => (a = o, Promise.resolve()) })), this.activeObservers = /* @__PURE__ */ new Map(), this.observerTimeouts = /* @__PURE__ */ new Map(), this.idQueryCache = /* @__PURE__ */ new Map(), this.itemsCache = /* @__PURE__ */ new Map(), this.triggerReload = null, this.reactivityAdapter = null, this.loadingSignals = /* @__PURE__ */ new Map(), this.mergeItems = (t = e.mergeItems) !== null && t !== void 0 ? t : (o, h) => Object.assign(Object.assign({}, o), h), this.purgeDelay = (i = e.purgeDelay) !== null && i !== void 0 ? i : 1e4, this.isFetchingSignal = I((s = e.reactivity) === null || s === void 0 ? void 0 : s.create(), !1), !a)
      throw new Error("No triggerRemoteChange method found. Looks like your persistence adapter was not registered");
    this.triggerReload = a, this.reactivityAdapter = (r = e.reactivity) !== null && r !== void 0 ? r : null, this.fetchQueryItems = e.fetchQueryItems, this.on("observer.created", (o) => this.handleObserverCreation(o ?? {})), this.on("observer.disposed", (o) => setTimeout(() => this.handleObserverDisposal(o ?? {}), 100)), e.registerRemoteChange && e.registerRemoteChange(() => this.forceRefetch());
  }
  /**
   * @summary Registers a query manually that items should be fetched for it
   * @param selector {Object} Selector of the query
   */
  registerQuery(e) {
    this.handleObserverCreation(e);
  }
  /**
   * @summary Unregisters a query manually that items are not fetched anymore for it
   * @param selector {Object} Selector of the query
   */
  unregisterQuery(e) {
    this.handleObserverDisposal(e);
  }
  // eslint-disable-next-line class-methods-use-this
  getKeyForSelector(e) {
    return JSON.stringify(e);
  }
  async forceRefetch() {
    return Promise.all([...this.activeObservers.values()].map(({ selector: e }) => this.fetchSelector(e))).then(() => {
    });
  }
  fetchSelector(e) {
    return this.isFetchingSignal.set(!0), this.fetchQueryItems(e).then((t) => {
      if (!t.items)
        throw new Error("AutoFetchCollection currently only works with a full item response");
      if (this.itemsCache.set(this.getKeyForSelector(e), t.items), t.items.forEach((i) => {
        var s;
        const r = (s = this.idQueryCache.get(i.id)) !== null && s !== void 0 ? s : [];
        r.push(e), this.idQueryCache.set(i.id, r);
      }), this.setLoading(e, !0), this.once("persistence.received", () => {
        this.setLoading(e, !1);
      }), !this.triggerReload)
        throw new Error("No triggerReload method found. Looks like your persistence adapter was not registered");
      this.triggerReload();
    }).catch((t) => {
      this.emit("persistence.error", t);
    }).finally(() => {
      this.isFetchingSignal.set(!1);
    });
  }
  handleObserverCreation(e) {
    var t, i;
    const s = (i = (t = this.activeObservers.get(this.getKeyForSelector(e))) === null || t === void 0 ? void 0 : t.count) !== null && i !== void 0 ? i : 0;
    this.activeObservers.set(this.getKeyForSelector(e), {
      selector: e,
      count: s + 1
    });
    const r = this.observerTimeouts.get(this.getKeyForSelector(e));
    r && clearTimeout(r), s === 0 && this.fetchSelector(e);
  }
  handleObserverDisposal(e) {
    var t, i;
    const r = ((i = (t = this.activeObservers.get(this.getKeyForSelector(e))) === null || t === void 0 ? void 0 : t.count) !== null && i !== void 0 ? i : 0) - 1;
    if (r > 0) {
      this.activeObservers.set(this.getKeyForSelector(e), {
        selector: e,
        count: r
      });
      return;
    }
    const a = this.observerTimeouts.get(this.getKeyForSelector(e));
    a && clearTimeout(a);
    const o = () => {
      if (this.activeObservers.delete(this.getKeyForSelector(e)), this.itemsCache.delete(this.getKeyForSelector(e)), !this.triggerReload)
        throw new Error("No triggerReload method found. Looks like your persistence adapter was not registered");
      this.triggerReload();
    };
    if (this.purgeDelay === 0) {
      o();
      return;
    }
    this.observerTimeouts.set(this.getKeyForSelector(e), setTimeout(o, this.purgeDelay));
  }
  ensureSignal(e) {
    if (!this.reactivityAdapter)
      throw new Error("No reactivity adapter found");
    return this.loadingSignals.has(this.getKeyForSelector(e)) || this.loadingSignals.set(this.getKeyForSelector(e), I(this.reactivityAdapter.create(), !1)), this.loadingSignals.get(this.getKeyForSelector(e));
  }
  setLoading(e, t) {
    this.ensureSignal(e).set(t);
  }
  /**
   * @summary Indicates wether a query is currently been loaded
   * @param selector {Object} Selector of the query
   * @returns The loading state
   */
  isLoading(e) {
    const t = this.isPushing();
    return e ? this.ensureSignal(e).get() || t : this.isFetchingSignal.get() || t;
  }
}
function Oe(n, e) {
  const { serialize: t = JSON.stringify, deserialize: i = JSON.parse } = e || {};
  let s = null;
  async function r() {
    const h = await (await (await navigator.storage.getDirectory()).getFileHandle(n, { create: !0 })).getFile().then((c) => c.text());
    return i(h || "[]");
  }
  return {
    async register(a) {
      await (await navigator.storage.getDirectory()).getFileHandle(n, { create: !0 }), a();
    },
    async load() {
      return s && await s, { items: await r() };
    },
    async save(a, { added: o, modified: h, removed: c }) {
      s && await s;
      const u = await (await navigator.storage.getDirectory()).getFileHandle(n, { create: !0 });
      if (o.length === 0 && h.length === 0 && c.length === 0) {
        const f = await u.createWritable();
        await f.write(t(a)), await f.close(), await s;
        return;
      }
      s = r().then((f) => {
        const l = f.slice();
        return o.forEach((p) => {
          l.push(p);
        }), h.forEach((p) => {
          const m = l.findIndex(({ id: g }) => g === p.id);
          /* istanbul ignore if -- @preserve */
          if (m === -1)
            throw new Error(`Item with ID ${p.id} not found`);
          l[m] = p;
        }), c.forEach((p) => {
          const m = l.findIndex(({ id: g }) => g === p.id);
          /* istanbul ignore if -- @preserve */
          if (m === -1)
            throw new Error(`Item with ID ${p.id} not found`);
          l.splice(m, 1);
        }), l;
      }).then(async (f) => {
        const l = await u.createWritable();
        await l.write(t(f)), await l.close();
      }).then(() => {
        s = null;
      }), await s;
    }
  };
}
function Ee(n) {
  return n;
}
function Se(n) {
  return n;
}
function de(n, e, t = {}) {
  let i, s;
  const { leading: r = !1, trailing: a = !0 } = t;
  function o(...h) {
    const c = r && !i, d = a && !i;
    return i && clearTimeout(i), i = setTimeout(() => {
      i = null, a && !c && (s = n.apply(this, h));
    }, e), c ? s = n.apply(this, h) : d || (s = null), s;
  }
  return o;
}
class he {
  constructor() {
    this.queue = [], this.pendingPromise = !1;
  }
  /**
   * Method to add a new promise to the queue and returns a promise that resolves when this task is done
   * @param task Function that returns a promise that will be added to the queue
   * @returns Promise that resolves when the task is done
   */
  add(e) {
    return new Promise((t, i) => {
      this.queue.push(() => e().then(t).catch((s) => {
        throw i(s), s;
      })), this.dequeue();
    });
  }
  /**
   * Method to check if there is a pending promise in the queue
   * @returns True if there is a pending promise, false otherwise
   */
  hasPendingPromise() {
    return this.pendingPromise;
  }
  /**
   * Method to process the queue
   */
  dequeue() {
    if (this.pendingPromise || this.queue.length === 0)
      return;
    const e = this.queue.shift();
    e && (this.pendingPromise = !0, e().then(() => {
      this.pendingPromise = !1, this.dequeue();
    }).catch(() => {
      this.pendingPromise = !1, this.dequeue();
    }));
  }
}
function j(n, e) {
  const t = [], i = [], s = [], r = new Map(n.map((o) => [o.id, o])), a = new Map(e.map((o) => [o.id, o]));
  for (const [o, h] of r) {
    const c = a.get(o);
    c ? b(c, h) || i.push(c) : s.push(h);
  }
  for (const [o, h] of a)
    r.has(o) || t.push(h);
  return { added: t, modified: i, removed: s };
}
function T(n, e) {
  if (e.items != null)
    return e.items;
  const t = n || [];
  return e.changes.added.forEach((i) => t.push(i)), e.changes.modified.forEach((i) => {
    const s = t.findIndex((r) => r.id === i.id);
    s !== -1 && (t[s] = i);
  }), e.changes.removed.forEach((i) => {
    const s = t.findIndex((r) => r.id === i.id);
    s !== -1 && t.splice(s, 1);
  }), t;
}
function _(n, e) {
  const t = new y();
  return t.batch(() => {
    n.forEach((i) => t.insert(i)), e.forEach((i) => {
      if (i.type === "remove") {
        t.removeOne({ id: i.data });
        return;
      }
      const s = { id: i.data.id }, r = t.findOne(s);
      if (i.type === "insert") {
        r ? t.updateOne(s, { $set: i.data }) : t.insert(i.data);
        return;
      }
      r ? t.updateOne(s, i.data.modifier) : t.insert(C(s, i.data.modifier));
    });
  }), t.find().fetch();
}
function B(n) {
  return n.added.length > 0 || n.modified.length > 0 || n.removed.length > 0;
}
function le(n, e) {
  return B(j(n, e));
}
async function ue({ changes: n, lastSnapshot: e, data: t, pull: i, push: s, insert: r, update: a, remove: o, batch: h }) {
  let c = t, d = e || [], u = T(e, c);
  if (n.length > 0) {
    const l = _(d, n);
    if (le(d, l)) {
      const p = _(u, n), m = j(u, p);
      B(m) && (await s(m), c = await i(), u = T(u, c)), d = l;
    }
  }
  const f = c.changes == null ? j(d, c.items) : c.changes;
  return h(() => {
    f.added.forEach((l) => r(l)), f.modified.forEach((l) => a(l.id, { $set: l })), f.removed.forEach((l) => o(l.id));
  }), u;
}
class xe {
  /**
   * @param options Collection options
   * @param options.pull Function to pull data from remote source.
   * @param options.push Function to push data to remote source.
   * @param [options.registerRemoteChange] Function to register a callback for remote changes.
   * @param [options.id] Unique identifier for this sync manager. Only nessesary if you have multiple sync managers.
   * @param [options.persistenceAdapter] Persistence adapter to use for storing changes, snapshots and sync operations.
   * @param [options.reactivity] Reactivity adapter to use for reactivity.
   * @param [options.onError] Function to handle errors that occur async during syncing.
   */
  constructor(e) {
    var t, i;
    this.collections = /* @__PURE__ */ new Map(), this.remoteChanges = [], this.syncQueues = /* @__PURE__ */ new Map(), this.isDisposed = !1, this.instanceId = z(), this.deboucedPush = de((l) => {
      this.pushChanges(l).catch(() => {
      });
    }, 100), this.options = e;
    const s = (t = this.options.id) !== null && t !== void 0 ? t : "default-sync-manager", { reactivity: r } = this.options;
    let a = () => {
    }, o = () => {
    }, h = () => {
    };
    const c = (i = e.persistenceAdapter) !== null && i !== void 0 ? i : L, d = c(`${s}-changes`, (l) => {
      a = l;
    }), u = c(`${s}-snapshots`, (l) => {
      o = l;
    }), f = c(`${s}-sync-operations`, (l) => {
      h = l;
    });
    this.changes = new y({
      persistence: d,
      reactivity: r
    }), this.snapshots = new y({
      persistence: u,
      reactivity: r
    }), this.syncOperations = new y({
      persistence: f,
      reactivity: r
    }), this.changes.on("persistence.error", (l) => a(l)), this.snapshots.on("persistence.error", (l) => o(l)), this.syncOperations.on("persistence.error", (l) => h(l)), this.persistenceReady = Promise.all([
      new Promise((l, p) => {
        this.syncOperations.once("persistence.error", p), this.syncOperations.once("persistence.init", l);
      }),
      new Promise((l, p) => {
        this.changes.once("persistence.error", p), this.changes.once("persistence.init", l);
      }),
      new Promise((l, p) => {
        this.snapshots.once("persistence.error", p), this.snapshots.once("persistence.init", l);
      })
    ]).then(() => {
    }), this.changes.setMaxListeners(1e3), this.snapshots.setMaxListeners(1e3), this.syncOperations.setMaxListeners(1e3);
  }
  getSyncQueue(e) {
    return this.syncQueues.get(e) == null && this.syncQueues.set(e, new he()), this.syncQueues.get(e);
  }
  /**
   * Clears all internal data structures
   */
  async dispose() {
    this.collections.clear(), this.syncQueues.clear(), this.remoteChanges.splice(0, this.remoteChanges.length), await Promise.all([
      this.changes.dispose(),
      this.snapshots.dispose(),
      this.syncOperations.dispose()
    ]), this.isDisposed = !0;
  }
  /**
   * Gets a collection with it's options by name
   * @param name Name of the collection
   * @throws Will throw an error if the name wasn't found
   * @returns Tuple of collection and options
   */
  getCollection(e) {
    const t = this.collections.get(e);
    if (t == null)
      throw new Error(`Collection with id '${e}' not found`);
    return t;
  }
  /**
   * Adds a collection to the sync manager.
   * @param collection Collection to add
   * @param options Options for the collection. The object needs at least a `name` property.
   * @param options.name Unique name of the collection
   */
  addCollection(e, t) {
    if (this.isDisposed)
      throw new Error("SyncManager is disposed");
    this.options.registerRemoteChange && this.options.registerRemoteChange(t, async (r) => {
      if (r == null)
        await this.sync(t.name);
      else {
        const a = Date.now(), o = this.syncOperations.insert({
          start: a,
          collectionName: t.name,
          instanceId: this.instanceId,
          status: "active"
        });
        await this.syncWithData(t.name, r).then(() => {
          this.syncOperations.removeMany({
            id: { $ne: o },
            collectionName: t.name,
            $or: [
              { end: { $lte: a } },
              { status: "active" }
            ]
          }), this.syncOperations.updateOne({ id: o }, {
            $set: { status: "done", end: Date.now() }
          });
        }).catch((h) => {
          throw this.options.onError && this.options.onError(t, h), this.syncOperations.updateOne({ id: o }, {
            $set: { status: "error", end: Date.now(), error: h.stack || h.message }
          }), h;
        });
      }
    }), this.collections.set(t.name, [e, t]);
    const i = (r) => {
      for (const a of this.remoteChanges)
        if (b(a, r))
          return !0;
      return !1;
    }, s = (r) => {
      for (let a = 0; a < this.remoteChanges.length; a += 1)
        if (b(this.remoteChanges[a], r)) {
          this.remoteChanges.splice(a, 1);
          return;
        }
    };
    e.on("added", (r) => {
      if (i({ collectionName: t.name, type: "insert", data: r })) {
        s({ collectionName: t.name, type: "insert", data: r });
        return;
      }
      this.changes.insert({
        collectionName: t.name,
        time: Date.now(),
        type: "insert",
        data: r
      }), this.schedulePush(t.name);
    }), e.on("changed", ({ id: r }, a) => {
      const o = { id: r, modifier: a };
      if (i({ collectionName: t.name, type: "update", data: o })) {
        s({ collectionName: t.name, type: "update", data: o });
        return;
      }
      this.changes.insert({
        collectionName: t.name,
        time: Date.now(),
        type: "update",
        data: o
      }), this.schedulePush(t.name);
    }), e.on("removed", ({ id: r }) => {
      if (i({ collectionName: t.name, type: "remove", data: r })) {
        s({ collectionName: t.name, type: "remove", data: r });
        return;
      }
      this.changes.insert({
        collectionName: t.name,
        time: Date.now(),
        type: "remove",
        data: r
      }), this.schedulePush(t.name);
    });
  }
  schedulePush(e) {
    this.deboucedPush(e);
  }
  /**
   * Starts the sync process for all collections
   */
  async syncAll() {
    if (this.isDisposed)
      throw new Error("SyncManager is disposed");
    const e = [];
    if (await Promise.all([...this.collections.keys()].map((t) => this.sync(t).catch((i) => {
      e.push({ id: t, error: i });
    }))), e.length > 0)
      throw new Error(`Error while syncing collections:
${e.map((t) => `${t.id}: ${t.error.message}`).join(`

`)}`);
  }
  /**
   * Checks if a collection is currently beeing synced
   * @param [name] Name of the collection. If not provided, it will check if any collection is currently beeing synced.
   * @returns True if the collection is currently beeing synced, false otherwise.
   */
  isSyncing(e) {
    return this.syncOperations.findOne(Object.assign(Object.assign({}, e ? { collectionName: e } : {}), { status: "active" }), { fields: { status: 1 } }) != null;
  }
  /**
   * Checks if the sync manager is ready to sync.
   * @returns A promise that resolves when the sync manager is ready to sync.
   */
  async isReady() {
    await this.persistenceReady;
  }
  /**
   * Starts the sync process for a collection
   * @param name Name of the collection
   * @param options Options for the sync process.
   * @param options.force If true, the sync process will be started even if there are no changes and onlyWithChanges is true.
   * @param options.onlyWithChanges If true, the sync process will only be started if there are changes.
   */
  async sync(e, t = {}) {
    if (this.isDisposed)
      throw new Error("SyncManager is disposed");
    await this.isReady();
    const s = this.getCollection(e)[1], r = this.syncOperations.find({
      collectionName: e,
      instanceId: this.instanceId,
      status: "active"
    }).count() > 0, a = Date.now();
    let o = null;
    await new Promise((c) => {
      setTimeout(c, 0);
    });
    const h = async () => {
      const c = this.syncOperations.findOne({ collectionName: e, status: "done" }, { sort: { end: -1 } });
      if (t != null && t.onlyWithChanges && this.changes.find({
        collectionName: e,
        $and: [
          { time: { $lte: a } }
        ]
      }, { sort: { time: 1 } }).count() === 0)
        return;
      r || (o = this.syncOperations.insert({
        start: a,
        collectionName: e,
        instanceId: this.instanceId,
        status: "active"
      }));
      const d = await this.options.pull(s, {
        lastFinishedSyncStart: c == null ? void 0 : c.start,
        lastFinishedSyncEnd: c == null ? void 0 : c.end
      });
      await this.syncWithData(e, d);
    };
    await (t != null && t.force ? h() : this.getSyncQueue(e).add(h)).catch((c) => {
      throw o != null && (this.options.onError && this.options.onError(s, c), this.syncOperations.updateOne({ id: o }, {
        $set: { status: "error", end: Date.now(), error: c.stack || c.message }
      })), c;
    }), o != null && (this.syncOperations.removeMany({
      id: { $ne: o },
      collectionName: e,
      $or: [
        { end: { $lte: a } },
        { status: "active" }
      ]
    }), this.syncOperations.updateOne({ id: o }, {
      $set: { status: "done", end: Date.now() }
    }));
  }
  /**
   * Starts the push process for a collection (sync process but only if there are changes)
   * @param name Name of the collection
   */
  async pushChanges(e) {
    await this.sync(e, {
      onlyWithChanges: !0
    });
  }
  async syncWithData(e, t) {
    const i = this.getCollection(e), [s, r] = i, a = Date.now(), o = this.syncOperations.findOne({ collectionName: e, status: "done" }, { sort: { end: -1 } }), h = this.snapshots.findOne({ collectionName: e }, { sort: { time: -1 } }), c = this.changes.find({
      collectionName: e,
      $and: [
        { time: { $lte: a } }
      ]
    }, { sort: { time: 1 } }).fetch();
    await ue({
      changes: c,
      lastSnapshot: h == null ? void 0 : h.items,
      data: t,
      pull: () => this.options.pull(r, {
        lastFinishedSyncStart: o == null ? void 0 : o.start,
        lastFinishedSyncEnd: o == null ? void 0 : o.end
      }),
      push: (d) => this.options.push(r, { changes: d }),
      insert: (d) => {
        if (d.id && s.findOne({ id: d.id })) {
          this.remoteChanges.push({
            collectionName: e,
            type: "update",
            data: { id: d.id, modifier: { $set: d } }
          }), s.updateOne({ id: d.id }, { $set: d });
          return;
        }
        this.remoteChanges.push({
          collectionName: e,
          type: "insert",
          data: d
        }), s.insert(d);
      },
      update: (d, u) => {
        if (d && !s.findOne({ id: d })) {
          const f = Object.assign(Object.assign({}, u.$set), { id: d });
          this.remoteChanges.push({
            collectionName: e,
            type: "insert",
            data: f
          }), s.insert(f);
          return;
        }
        this.remoteChanges.push({
          collectionName: e,
          type: "update",
          data: { id: d, modifier: u }
        }), s.updateOne({ id: d }, u);
      },
      remove: (d) => {
        this.remoteChanges.push({
          collectionName: e,
          type: "remove",
          data: d
        }), s.removeOne({ id: d });
      },
      batch: (d) => {
        s.batch(() => {
          d();
        });
      }
    }).then(async (d) => {
      this.snapshots.removeMany({ collectionName: e, time: { $lte: a } }), this.changes.removeMany({
        collectionName: e,
        id: { $in: c.map((u) => u.id) }
      }), this.snapshots.insert({
        time: a,
        collectionName: e,
        items: d
      }), await new Promise((u) => {
        setTimeout(u, 0);
      });
    }).then(() => this.sync(e, {
      force: !0,
      onlyWithChanges: !0
    }));
  }
}
export {
  Ie as AutoFetchCollection,
  y as Collection,
  be as PersistentCollection,
  ce as ReplicatedCollection,
  xe as SyncManager,
  oe as combinePersistenceAdapters,
  ie as createFilesystemAdapter,
  ve as createIndex,
  ye as createIndexProvider,
  L as createLocalStorageAdapter,
  Ee as createMemoryAdapter,
  Oe as createOPFSAdapter,
  we as createPersistenceAdapter,
  Se as createReactivityAdapter
};
//# sourceMappingURL=index.mjs.map
