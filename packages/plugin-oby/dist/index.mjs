import { createReactivityAdapter as Et } from "signaldb";
const xe = Symbol("Cached"), ce = Symbol("Observable"), Ge = Symbol("Observable.Boolean"), $e = Symbol("Observable.Frozen"), Te = Symbol("Observable.Readable"), Be = Symbol("Observable.Writable"), ne = Symbol("Store"), je = Symbol("Store.Keys"), We = Symbol("Store.Observable"), de = Symbol("Store.Target"), Pe = Symbol("Store.Values"), Ie = Symbol("Store.Untracked"), H = Symbol("Suspense"), Xe = Symbol("Uncached"), Ne = Symbol("Untracked"), Ze = Symbol("Untracked.Unwrapped"), wt = (e) => Q(e) ? e : [e], Ot = (e) => e instanceof Error ? e : typeof e == "string" ? new Error(e) : new Error("Unknown error"), { is: G } = Object, { isArray: Q } = Array, yt = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let s = 0, n = e.length; s < n; s++) {
    const r = e[s], i = t[s];
    if (!G(r, i))
      return !1;
  }
  return !0;
}, _ = (e) => typeof e == "function", Le = (e) => e !== null && typeof e == "object", _t = (e) => typeof e == "symbol", Ce = () => {
}, ke = () => !1;
function Rt() {
  if (arguments.length)
    throw new Error("A readonly Observable can not be updated");
  return this;
}
function mt() {
  if (arguments.length)
    throw new Error("A readonly Observable can not be updated");
  return this.get();
}
function Mt(e) {
  return arguments.length ? _(e) ? this.C(e) : this.set(e) : this.get();
}
const C = (e) => {
  const t = Rt.bind(e);
  return t[ce] = !0, t[$e] = !0, t;
}, F = (e) => {
  const t = mt.bind(e);
  return t[ce] = !0, t[Te] = e, t;
}, et = (e) => {
  const t = Mt.bind(e);
  return t[ce] = !0, t[Be] = e, t;
}, Je = 0, Ae = 1, be = 2, ge = 3, tt = C(!1), xt = C(!0), Ke = new Proxy({}, new Proxy({}, { get() {
  throw new Error("Unavailable value");
} })), st = function() {
}, Re = (e, t) => {
  if (e instanceof Array)
    for (let s = 0, n = e.length; s < n; s++)
      t(e[s]);
  else e && t(e);
}, fe = (e, t) => {
  if (e instanceof Array)
    for (let s = e.length - 1; s >= 0; s--)
      t(e[s]);
  else e && t(e);
}, ue = (e, t, s) => {
  const n = e[t];
  n instanceof Array ? n.push(s) : n ? e[t] = [n, s] : e[t] = s;
}, q = (e, t, s) => {
  const n = e[t];
  if (n instanceof Set)
    n.add(s);
  else if (n) {
    if (s !== n) {
      const r = /* @__PURE__ */ new Set();
      r.add(n), r.add(s), e[t] = r;
    }
  } else
    e[t] = s;
}, J = (e, t, s) => {
  const n = e[t];
  n instanceof Set ? n.delete(s) : n === s && (e[t] = void 0);
}, re = (e, t) => {
  if (e instanceof Set)
    for (const s of e)
      t(s);
  else e && t(e);
}, Tt = (e) => e.call(e), me = (e) => e.Q(!0);
class le {
  constructor() {
    this.disposed = !1, this.B = void 0, this.S = void 0, this.D = void 0, this.K = void 0, this.T = void 0, this.U = void 0;
  }
  /* API */
  catch(t, s) {
    var r;
    const { S: n } = this;
    if (n)
      return n(t), !0;
    if ((r = this.parent) != null && r.catch(t, !0))
      return !0;
    if (s)
      return !1;
    throw t;
  }
  Q(t) {
    fe(this.D, me), fe(this.K, me), fe(this.U, me), fe(this.B, Tt), this.B = void 0, this.disposed = t, this.S = void 0, this.K = void 0, this.U = void 0;
  }
  get(t) {
    var s;
    return (s = this.context) == null ? void 0 : s[t];
  }
  E(t, s, n) {
    const r = g, i = Y;
    Fe(s), Se(n);
    try {
      return t();
    } catch (o) {
      return this.catch(Ot(o), !1), Ke;
    } finally {
      Fe(r), Se(i);
    }
  }
}
class nt extends le {
  constructor() {
    super(...arguments), this.context = {};
  }
}
let W, rt = new nt(), Y, g = rt;
const Ye = (e) => W = e, Se = (e) => Y = e, Fe = (e) => g = e;
let ae = 0, Ve = Ce;
const Bt = async (e) => {
  ae || Ye(new Promise((t) => Ve = t));
  try {
    return ae += 1, await e();
  } finally {
    ae -= 1, ae || (Ye(void 0), Ve());
  }
}, it = (e) => _(e) && Ge in e, ie = (e) => {
  var t, s;
  return _(e) && ($e in e || !!((s = (t = e[Te]) == null ? void 0 : t.parent) != null && s.disposed));
}, Ue = (e) => _(e) && (Ne in e || Ze in e);
let Pt = class {
  constructor() {
    this.A1 = [], this.M = 0, this.A2 = !1, this.N = () => {
      if (!this.A2 && !this.M && this.A1.length)
        try {
          for (this.A2 = !0; ; ) {
            const t = this.A1;
            if (!t.length)
              break;
            this.A1 = [];
            for (let s = 0, n = t.length; s < n; s++)
              t[s].C();
          }
        } finally {
          this.A2 = !1;
        }
    }, this.E = (t) => {
      this.M += 1, t(), this.M -= 1, this.N();
    }, this.F = (t) => {
      this.A1.push(t);
    };
  }
};
const te = new Pt();
class N {
  /* CONSTRUCTOR */
  constructor(t, s, n) {
    this.K = /* @__PURE__ */ new Set(), this.value = t, n && (this.parent = n), (s == null ? void 0 : s.equals) !== void 0 && (this.equals = s.equals || ke);
  }
  /* API */
  get() {
    var t, s;
    return (t = this.parent) != null && t.disposed || ((s = this.parent) == null || s.C(), Y == null || Y.A.L(this)), this.value;
  }
  set(t) {
    const s = this.equals || G;
    return (this.value === st || !s(t, this.value)) && (this.value = t, te.M += 1, this.I(ge), te.M -= 1, te.N()), t;
  }
  I(t) {
    for (const s of this.K)
      (s.J !== Ae || s.A.has(this)) && (s.sync ? (s.J = Math.max(s.J, t), te.F(s)) : s.I(t));
  }
  C(t) {
    const s = t(this.value);
    return this.set(s);
  }
}
class It {
  /* CONSTRUCTOR */
  constructor(t) {
    this.observer = t, this.A = [], this.P = 0;
  }
  /* API */
  Q(t) {
    if (t) {
      const { observer: s, A: n } = this;
      for (let r = 0; r < n.length; r++)
        n[r].K.delete(s);
    }
    this.P = 0;
  }
  R() {
    const { observer: t, A: s, P: n } = this, r = s.length;
    if (n < r) {
      for (let i = n; i < r; i++)
        s[i].K.delete(t);
      s.length = n;
    }
  }
  empty() {
    return !this.A.length;
  }
  has(t) {
    const s = this.A.indexOf(t);
    return s >= 0 && s < this.P;
  }
  L(t) {
    const { observer: s, A: n, P: r } = this, i = n.length;
    if (i > 0) {
      if (n[r] === t) {
        this.P += 1;
        return;
      }
      const o = n.indexOf(t);
      if (o >= 0 && o < r)
        return;
      r < i - 1 ? this.R() : r === i - 1 && n[r].K.delete(s);
    }
    t.K.add(s), n[this.P++] = t, r === 128 && (s.A = new Nt(s, n));
  }
  C() {
    var s;
    const { A: t } = this;
    for (let n = 0, r = t.length; n < r; n++)
      (s = t[n].parent) == null || s.C();
  }
}
class Nt {
  /* CONSTRUCTOR */
  constructor(t, s) {
    this.observer = t, this.A = new Set(s);
  }
  /* API */
  Q(t) {
    for (const s of this.A)
      s.K.delete(this.observer);
  }
  R() {
  }
  empty() {
    return !this.A.size;
  }
  has(t) {
    return this.A.has(t);
  }
  L(t) {
    const { observer: s, A: n } = this, r = n.size;
    t.K.add(s);
    const i = n.size;
    r !== i && n.add(t);
  }
  C() {
    var t;
    for (const s of this.A)
      (t = s.parent) == null || t.C();
  }
}
class ve extends le {
  /* CONSTRUCTOR */
  constructor() {
    super(), this.parent = g, this.context = g.context, this.J = ge, this.A = new It(this), g !== rt && ue(this.parent, "K", this);
  }
  /* API */
  Q(t) {
    this.A.Q(t), super.Q(t);
  }
  H(t) {
    this.Q(!1), this.J = Ae;
    try {
      return this.E(t, this, this);
    } finally {
      this.A.R();
    }
  }
  run() {
    throw new Error("Abstract method");
  }
  I(t) {
    throw new Error("Abstract method");
  }
  C() {
    this.disposed || (this.J === be && this.A.C(), this.J === ge ? (this.J = Ae, this.run(), this.J === Ae ? this.J = Je : this.C()) : this.J = Je);
  }
}
class Lt extends ve {
  /* CONSTRUCTOR */
  constructor(t, s) {
    super(), this.fn = t, this.observable = new N(st, s, this), (s == null ? void 0 : s.sync) === !0 && (this.sync = !0, this.C());
  }
  /* API */
  run() {
    const t = super.H(this.fn);
    !this.disposed && this.A.empty() && (this.disposed = !0), t !== Ke && this.observable.set(t);
  }
  I(t) {
    const s = this.J;
    s >= t || (this.J = t, s !== be && this.observable.I(be));
  }
}
const L = (e, t) => {
  if (ie(e))
    return e;
  if (Ue(e))
    return C(e());
  {
    const s = new Lt(e, t);
    return F(s.observable);
  }
}, De = (e) => {
  if (_(e)) {
    if (ie(e) || Ue(e))
      return !!e();
    if (it(e))
      return e;
    {
      const t = L(() => !!e());
      return t[Ge] = !0, t;
    }
  } else
    return !!e;
}, D = (e) => {
  ue(g, "B", e);
};
class Ct extends le {
  /* CONSTRUCTOR */
  constructor(t) {
    super(), this.parent = g, this.context = { ...g.context, ...t }, ue(this.parent, "D", this);
  }
  /* API */
  E(t) {
    return super.E(t, this, void 0);
  }
}
function Kt(e, t) {
  return _t(e) ? g.context[e] : new Ct(e).E(t || Ce);
}
const Ut = () => {
  const e = new N(!1);
  return D(() => e.set(!0)), F(e);
};
class vt {
  constructor() {
    this.A1 = [], this.A2 = !1, this.A3 = !1, this.N = () => {
      if (!this.A2 && this.A1.length)
        try {
          for (this.A2 = !0; ; ) {
            const t = this.A1;
            if (!t.length)
              break;
            this.A1 = [];
            for (let s = 0, n = t.length; s < n; s++)
              t[s].C();
          }
        } finally {
          this.A2 = !1;
        }
    }, this.queue = () => {
      this.A3 || (this.A3 = !0, this.resolve());
    }, this.resolve = () => {
      queueMicrotask(() => {
        queueMicrotask(() => {
          W ? W.finally(this.resolve) : (this.A3 = !1, this.N());
        });
      });
    }, this.F = (t) => {
      this.A1.push(t), this.queue();
    };
  }
}
const pe = new vt();
class ot extends ve {
  /* CONSTRUCTOR */
  constructor(t, s) {
    if (super(), this.fn = t, (s == null ? void 0 : s.suspense) !== !1) {
      const n = this.get(H);
      n && (this.suspense = n);
    }
    (s == null ? void 0 : s.sync) === !0 && (this.sync = !0), (s == null ? void 0 : s.sync) === "init" ? (this.init = !0, this.C()) : this.F();
  }
  /* API */
  run() {
    const t = super.H(this.fn);
    _(t) && ue(this, "B", t);
  }
  F() {
    var t;
    (t = this.suspense) != null && t.suspended || (this.sync ? this.C() : pe.F(this));
  }
  I(t) {
    const s = this.J;
    s >= t || (this.J = t, (!this.sync || s !== 2 && s !== 3) && this.F());
  }
  C() {
    var t;
    (t = this.suspense) != null && t.suspended || super.C();
  }
}
const we = (e, t) => {
  const s = new ot(e, t);
  return () => s.Q(!0);
};
function O(e) {
  if (_(e))
    return Ze in e ? O(e()) : Ne in e ? C(O(e())) : ce in e ? e : L(() => O(e()));
  if (e instanceof Array) {
    const t = new Array(e.length);
    for (let s = 0, n = t.length; s < n; s++)
      t[s] = O(e[s]);
    return t;
  } else
    return e;
}
class Oe extends le {
  /* CONSTRUCTOR */
  constructor(t) {
    super(), this.parent = g, this.context = g.context, t && this.get(H) && (this.A0 = !0, q(this.parent, "T", this));
  }
  /* API */
  Q(t) {
    this.A0 && J(this.parent, "T", this), super.Q(t);
  }
  E(t) {
    const s = () => this.Q(!0), n = () => t(s);
    return super.E(n, this, void 0);
  }
}
const Dt = C(-1);
let Qt = class extends Oe {
};
class qt {
  /* CONSTRUCTOR */
  constructor(t) {
    this.parent = g, this.suspense = g.get(H), this.A5 = /* @__PURE__ */ new Map(), this.A6 = !1, this.A7 = 0, this.A8 = 0, this.A9 = 0, this.cleanup = () => {
      if (!this.A7 || this.A7 === this.A8)
        return;
      const { A5: s, A6: n } = this;
      s.size && (this.A9 ? s.forEach((r, i) => {
        r.A6 !== n && (r.Q(!0), s.delete(i));
      }) : (this.A5.forEach((r) => {
        r.Q(!0);
      }), this.A5 = /* @__PURE__ */ new Map()));
    }, this.Q = () => {
      this.suspense && J(this.parent, "T", this.T), this.A7 = this.A5.size, this.A8 = 0, this.A9 = 0, this.cleanup();
    }, this.AA = () => {
      this.A6 = !this.A6, this.A8 = 0, this.A9 = 0;
    }, this.O = (s) => {
      this.A9 = s.length, this.cleanup(), this.A7 = this.A9, this.A8 = 0;
    }, this.map = (s) => {
      var A;
      this.AA();
      const { A5: n, A6: r, fn: i, AB: o } = this, u = new Array(s.length);
      let c = !0, h = !0, l = 0;
      for (let f = 0, S = s.length; f < S; f++) {
        const d = s[f], b = n.get(d);
        if (b && b.A6 !== r)
          h = !1, l += 1, b.A6 = r, (A = b.index) == null || A.set(f), u[f] = b.G;
        else {
          c = !1;
          const p = new Qt(!1);
          b && D(() => p.Q(!0)), p.E(() => {
            let y = Dt;
            o && (p.index = new N(f), y = F(p.index));
            const j = u[f] = O(i(d, y));
            p.A6 = r, p.G = j, b || n.set(d, p);
          });
        }
      }
      return this.A8 = l, this.O(s), c && (u[xe] = !0), h && (u[Xe] = !0), u;
    }, this.T = () => Array.from(this.A5.values()), this.fn = t, this.AB = t.length > 1, this.suspense && q(this.parent, "T", this.T);
  }
}
const Qe = (e) => _(e) && ce in e;
function X(e, t = !0) {
  return (t ? _ : Qe)(e) ? e() : e;
}
class ct extends le {
  /* CONSTRUCTOR */
  constructor() {
    var t;
    super(), this.parent = g, this.context = { ...g.context, [H]: this }, ue(this.parent, "U", this), this.suspended = ((t = g.get(H)) == null ? void 0 : t.suspended) || 0;
  }
  /* API */
  A4(t) {
    var c;
    if (!this.suspended && !t)
      return;
    const s = this.suspended, n = s + (t ? 1 : -1);
    if (this.suspended = n, !!s == !!n)
      return;
    (c = this.observable) == null || c.set(!!n);
    const r = (h) => {
      Re(h.D, r), Re(h.K, i), Re(h.U, u), re(h.T, o);
    }, i = (h) => {
      h instanceof ot && (h.J === be || h.J === ge) && (h.init ? h.C() : h.F()), r(h);
    }, o = (h) => {
      _(h) ? h().forEach(r) : r(h);
    }, u = (h) => {
      h.A4(t);
    };
    r(this);
  }
  E(t) {
    return super.E(t, this, void 0);
  }
}
const ut = (e, t) => {
  const s = new ct(), n = De(e);
  return we(() => s.A4(X(n)), { sync: !0 }), s.E(t);
}, Jt = C(-1);
class Yt extends Oe {
}
class Ft {
  /* CONSTRUCTOR */
  constructor(t, s) {
    this.parent = g, this.suspense = g.get(H), this.A5 = /* @__PURE__ */ new Map(), this.AC = [], this.AD = 0, this.cleanup = () => {
      let n = 0, r = Math.max(0, this.pooled ? this.AD - this.AC.length : 0);
      this.A5.forEach((i) => {
        var o;
        r > 0 && n++ < r ? ((o = i.suspended) == null || o.set(!0), this.AC.push(i)) : i.Q(!0);
      });
    }, this.Q = () => {
      this.suspense && J(this.parent, "T", this.T), this.A5.forEach((n) => {
        n.Q(!0);
      }), this.AC.forEach((n) => {
        n.Q(!0);
      });
    }, this.map = (n) => {
      var d, b, p, y, j, he;
      const { A5: r, fn: i, AB: o } = this, u = /* @__PURE__ */ new Map(), c = new Array(n.length), h = this.AC, l = this.pooled;
      let A = !0, f = !0, S = [];
      if (r.size)
        for (let M = 0, E = n.length; M < E; M++) {
          const x = n[M], T = r.get(x);
          T ? (f = !1, r.delete(x), u.set(x, T), (d = T.index) == null || d.set(M), c[M] = T.G) : S.push(M);
        }
      else
        S = new Array(c.length);
      e: for (let M = 0, E = S.length; M < E; M++) {
        const x = S[M] || M, T = n[x], V = u.has(T);
        if (!V)
          for (const [k, z] of r.entries()) {
            r.delete(k), u.set(T, z), (b = z.index) == null || b.set(x), (p = z.value) == null || p.set(T), c[x] = z.G;
            continue e;
          }
        A = !1;
        let R;
        l && h.length ? (R = h.pop(), (y = R.index) == null || y.set(x), (j = R.value) == null || j.set(T), (he = R.suspended) == null || he.set(!1), c[x] = R.G) : (R = new Yt(!1), R.E(() => {
          let k = Jt;
          o && (R.index = new N(x), k = F(R.index));
          const z = R.value = new N(T), _e = l ? new N(!1) : void 0, qe = L(() => X(z.get())), pt = c[x] = _e ? ut(() => _e.get(), () => O(i(qe, k))) : O(i(qe, k));
          R.value = z, R.G = pt, R.suspended = _e;
        })), V ? D(() => R.Q(!0)) : u.set(T, R);
      }
      return this.AD = Math.max(this.AD, c.length), this.cleanup(), this.A5 = u, A && (c[xe] = !0), f && (c[Xe] = !0), c;
    }, this.T = () => [...this.A5.values(), ...this.AC.values()], this.fn = t, this.AB = t.length > 1, this.pooled = s, this.suspense && q(this.parent, "T", this.T);
  }
}
const B = (e) => Le(e) && ne in e;
function K(e) {
  if (_(e)) {
    const t = Y;
    if (t)
      try {
        return Se(void 0), e();
      } finally {
        Se(t);
      }
    else
      return e();
  } else
    return e;
}
function Vt(e, t, s = [], n) {
  if (Q(e) && !B(e)) {
    const r = !!(n != null && n.unkeyed);
    return C(K(() => e.length ? e.map((i, o) => O(t(r && !Qe(i) ? C(i) : i, o))) : O(s)));
  } else {
    const { Q: r, map: i } = n != null && n.unkeyed ? new Ft(t, !!n.pooled) : new qt(t);
    D(r);
    const o = L(() => X(e) ?? [], {
      equals: (u, c) => !!u && !!c && !u.length && !c.length && !B(u) && !B(c)
    });
    return L(() => {
      const u = o();
      return B(u) && u[Pe], K(() => {
        const c = i(u);
        return c != null && c.length ? c : O(s);
      });
    }, {
      equals: (u, c) => Q(u) && !!u[xe] && Q(c) && yt(u, c)
    });
  }
}
const lt = (e) => (K(e), e), Me = (e, t, s) => {
  for (let n = 0, r = t.length; n < r; n++) {
    const i = t[n];
    if (i.length === 1)
      return i[0];
    if (G(i[0], e))
      return i[1];
  }
  return s;
};
function ht(e, t, s) {
  if (_(e) && !ie(e) && !Ue(e)) {
    if (it(e))
      return L(() => O(Me(e(), t, s)));
    const r = lt(L(() => Me(e(), t, s)));
    return ie(r) ? C(O(r())) : L(() => O(X(r)));
  } else {
    const r = Me(X(e), t, s);
    return C(O(r));
  }
}
const ft = (e, t, s) => {
  const n = De(e);
  return ht(n, [[!0, t], [s]]);
};
function zt(e, t, s) {
  return ft(e, t, s);
}
const at = () => !!W || pe.A3 || pe.A2 || te.A2;
function At(e, t) {
  return et(new N(e, t));
}
const dt = () => {
  const e = g instanceof nt, t = g instanceof Oe, s = g instanceof ct, n = g instanceof ve;
  return { isSuperRoot: e, isRoot: t, isSuspense: s, isComputation: n };
}, Ht = (e) => _(e) && Be in e, Gt = (e) => _(e) ? e[Te] || e[Be] || Ke : e, $t = (e) => Ht(e) ? F(Gt(e)) : e, jt = (e) => new Oe(!0).E(e);
class Wt extends Map {
  constructor() {
    super(...arguments), this.disposed = !1;
  }
}
class Xt extends N {
  constructor() {
    super(...arguments), this.AE = 1;
  }
  /* API */
  call() {
    this.AF.disposed || (this.AE -= 1, !this.AE && this.AF.delete(this.AG));
  }
}
const Zt = (e) => {
  if (e = lt(L(e)), ie(e)) {
    const r = K(e);
    return (i) => i === r ? xt : tt;
  }
  let t = new Wt(), s = K(e);
  return we(() => {
    var o, u;
    const r = s, i = e();
    G(r, i) || (s = i, (o = t.get(r)) == null || o.set(!1), (u = t.get(i)) == null || u.set(!0));
  }, { suspense: !1, sync: !0 }), D(() => {
    t.disposed = !0;
  }), (r) => {
    let i = t.get(r);
    return i ? i.AE += 1 : (i = new Xt(r === s), i.AF = t, i.AG = r, t.set(r, i)), D(i), F(i);
  };
};
class U extends Map {
  AH(t, s) {
    return super.set(t, s), s;
  }
}
class ye {
  constructor() {
    this.AE = 0;
  }
  listen() {
    this.AE += 1, D(this);
  }
  call() {
    this.AE -= 1, !this.AE && this.Q();
  }
  Q() {
  }
}
class kt extends ye {
  constructor(t, s) {
    super(), this.parent = t, this.observable = s;
  }
  Q() {
    this.parent.keys = void 0;
  }
}
class es extends ye {
  constructor(t, s) {
    super(), this.parent = t, this.observable = s;
  }
  Q() {
    this.parent.values = void 0;
  }
}
class ts extends ye {
  constructor(t, s, n) {
    super(), this.parent = t, this.key = s, this.observable = n;
  }
  Q() {
    var t;
    (t = this.parent.has) == null || t.delete(this.key);
  }
}
class ss extends ye {
  constructor(t, s, n, r) {
    super(), this.parent = t, this.key = s, this.observable = n, this.AI = r;
  }
  Q() {
    var t;
    (t = this.parent.AJ) == null || t.delete(this.key);
  }
}
const m = {
  /* VARIABLES */
  AK: 0,
  AL: /* @__PURE__ */ new Set(),
  AM: /* @__PURE__ */ new Set(),
  /* API */
  AN: () => {
    const { AL: e, AM: t } = m, s = /* @__PURE__ */ new Set(), n = (r) => {
      s.has(r) || (s.add(r), re(r.AO, n), re(r.AP, (i) => {
        e.add(i);
      }));
    };
    return t.forEach(n), () => {
      e.forEach((r) => {
        r();
      });
    };
  },
  V: (e) => {
    m.AM.add(e), I.F();
  },
  reset: () => {
    m.AL = /* @__PURE__ */ new Set(), m.AM = /* @__PURE__ */ new Set();
  }
}, w = {
  /* VARIABLES */
  AK: 0,
  AM: /* @__PURE__ */ new Map(),
  /* API */
  AN: () => {
    const { AM: e } = w;
    return () => {
      e.forEach((t, s) => {
        const n = Array.from(t);
        re(s.AQ, (r) => {
          r(n);
        });
      });
    };
  },
  V: (e, t) => {
    const s = w.AM.get(e) || /* @__PURE__ */ new Set();
    s.add(t), w.AM.set(e, s), I.F();
  },
  AR: (e, t, s) => {
    if (t.AO) {
      const n = /* @__PURE__ */ new Set(), r = (i) => {
        n.has(i) || (n.add(i), re(i.AO, (o) => {
          o.AO || w.V(o, i.store), r(o);
        }));
      };
      r(e || t);
    } else {
      const n = (e == null ? void 0 : e.store) || K(() => t.store[s]);
      w.V(t, n);
    }
  },
  reset: () => {
    w.AM = /* @__PURE__ */ new Map();
  }
}, I = {
  /* VARIABLES */
  AK: !1,
  /* API */
  N: () => {
    const e = m.AN(), t = w.AN();
    I.reset(), e(), t();
  },
  AS: () => {
    at() ? W ? W.finally(I.AS) : setTimeout(I.AS, 0) : I.N();
  },
  reset: () => {
    I.AK = !1, m.reset(), w.reset();
  },
  F: () => {
    I.AK || (I.AK = !0, queueMicrotask(I.AS));
  }
}, Z = /* @__PURE__ */ new WeakMap(), ns = /* @__PURE__ */ new Set([ne, je, We, de, Pe]), rs = /* @__PURE__ */ new Set(["__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "prototype", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toSource", "toString", "valueOf"]), bt = {
  /* API */
  get: (e, t) => {
    var c, h;
    if (ns.has(t)) {
      if (t === ne)
        return !0;
      if (t === de)
        return e;
      if (t === je) {
        if (ee()) {
          const l = P(e);
          l.keys || (l.keys = ze(l)), l.keys.listen(), l.keys.observable.get();
        }
        return;
      }
      if (t === Pe) {
        if (ee()) {
          const l = P(e);
          l.values || (l.values = os(l)), l.values.listen(), l.values.observable.get();
        }
        return;
      }
      if (t === We)
        return (l) => {
          var y;
          l = typeof l == "number" ? String(l) : l;
          const A = P(e), f = (y = A.AT) == null ? void 0 : y.get(l);
          if (f)
            return f.bind(A.store);
          A.AJ || (A.AJ = new U());
          const S = e[l], d = A.AJ.get(l) || A.AJ.AH(l, He(A, l, S)), b = A.equals ? { equals: A.equals } : void 0;
          return d.observable || (d.observable = oe(A, S, b)), F(d.observable);
        };
    }
    if (rs.has(t))
      return e[t];
    const s = P(e), n = (c = s.AT) == null ? void 0 : c.get(t), r = n || e[t];
    s.AJ || (s.AJ = new U());
    const i = ee(), o = se(r), u = i || o ? s.AJ.get(t) || s.AJ.AH(t, He(s, t, r)) : void 0;
    if (u != null && u.AI && q(u.AI, "AO", s), u && i) {
      const l = s.equals ? { equals: s.equals } : void 0;
      u.listen(), u.observable || (u.observable = oe(s, r, l)), u.observable.get();
    }
    return n ? n.call(s.store) : typeof r == "function" && r === Array.prototype[t] ? function() {
      return r.apply(s.store, arguments);
    } : ((h = u == null ? void 0 : u.AI) == null ? void 0 : h.store) || r;
  },
  set: (e, t, s) => {
    var i, o, u, c, h, l, A, f, S, d;
    s = v(s);
    const n = P(e), r = (i = n.AU) == null ? void 0 : i.get(t);
    if (r)
      r.call(n.store, s);
    else {
      const b = Q(e), p = e[t], y = !!p || t in e, j = n.equals || G;
      if (y && j(s, p) && (t !== "length" || !b))
        return !0;
      const he = b && e.length;
      e[t] = s;
      const M = b && e.length;
      b && t !== "length" && he !== M && ((c = (u = (o = n.AJ) == null ? void 0 : o.get("length")) == null ? void 0 : u.observable) == null || c.set(M)), (h = n.values) == null || h.observable.set(0), y || ((l = n.keys) == null || l.observable.set(0), (f = (A = n.has) == null ? void 0 : A.get(t)) == null || f.observable.set(!0));
      const E = (S = n.AJ) == null ? void 0 : S.get(t);
      if (E != null && E.AI && J(E.AI, "AO", n), E && ((d = E.observable) == null || d.set(s), E.AI = se(s) ? Z.get(s) || Ee(s, t, n) : void 0), E != null && E.AI && q(E.AI, "AO", n), w.AK && w.AR(E == null ? void 0 : E.AI, n, t), m.AK && m.V(n), b && t === "length") {
        const x = Number(p), T = Number(s);
        for (let V = T; V < x; V++)
          V in e || bt.deleteProperty(e, `${V}`, !0);
      }
    }
    return !0;
  },
  deleteProperty: (e, t, s) => {
    var u, c, h, l, A, f, S, d;
    const n = t in e;
    if (!s && !n)
      return !0;
    if (!Reflect.deleteProperty(e, t))
      return !1;
    const i = P(e);
    (u = i.AT) == null || u.delete(t), (c = i.AU) == null || c.delete(t), (h = i.keys) == null || h.observable.set(0), (l = i.values) == null || l.observable.set(0), (f = (A = i.has) == null ? void 0 : A.get(t)) == null || f.observable.set(!1);
    const o = (S = i.AJ) == null ? void 0 : S.get(t);
    return w.AK && w.AR(o == null ? void 0 : o.AI, i, t), o != null && o.AI && J(o.AI, "AO", i), o && ((d = o.observable) == null || d.set(void 0), o.AI = void 0), m.AK && m.V(i), !0;
  },
  defineProperty: (e, t, s) => {
    var h, l, A, f, S, d, b, p;
    const n = P(e), r = n.equals || G, i = t in e, o = Reflect.getOwnPropertyDescriptor(e, t);
    if ("value" in s && B(s.value) && (s = { ...s, value: v(s.value) }), o && fs(o, s, r))
      return !0;
    if (!Reflect.defineProperty(e, t, s))
      return !1;
    s.get ? s.get && (n.AT || (n.AT = new U()), n.AT.set(t, s.get)) : (h = n.AT) == null || h.delete(t), s.set ? s.set && (n.AU || (n.AU = new U()), n.AU.set(t, s.set)) : (l = n.AU) == null || l.delete(t), i !== !!s.enumerable && ((A = n.keys) == null || A.observable.set(0)), (S = (f = n.has) == null ? void 0 : f.get(t)) == null || S.observable.set(!0);
    const c = (d = n.AJ) == null ? void 0 : d.get(t);
    if (w.AK && w.AR(c == null ? void 0 : c.AI, n, t), c != null && c.AI && J(c.AI, "AO", n), c)
      if ("get" in s)
        (b = c.observable) == null || b.set(s.get), c.AI = void 0;
      else {
        const y = s.value;
        (p = c.observable) == null || p.set(y), c.AI = se(y) ? Z.get(y) || Ee(y, t, n) : void 0;
      }
    return c != null && c.AI && q(c.AI, "AO", n), w.AK && w.AR(c == null ? void 0 : c.AI, n, t), m.AK && m.V(n), !0;
  },
  has: (e, t) => {
    if (t === ne || t === de)
      return !0;
    const s = t in e;
    if (ee()) {
      const n = P(e);
      n.has || (n.has = new U());
      const r = n.has.get(t) || n.has.AH(t, cs(n, t, s));
      r.listen(), r.observable.get();
    }
    return s;
  },
  ownKeys: (e) => {
    const t = Reflect.ownKeys(e);
    if (ee()) {
      const s = P(e);
      s.keys || (s.keys = ze(s)), s.keys.listen(), s.keys.observable.get();
    }
    return t;
  }
}, is = {
  /* API */
  has: (e, t) => t === Ie ? !0 : t in e
}, Ee = (e, t, s, n) => {
  if (B(e))
    return P(v(e));
  const r = as(e, t, s) ? e : new Proxy(e, bt), i = us(e), o = { AO: s, store: r };
  if (i) {
    const { AT: u, AU: c } = i;
    u && (o.AT = u), c && (o.AU = c);
  }
  return n === !1 ? o.equals = ke : n ? o.equals = n : s != null && s.equals && (o.equals = s.equals), Z.set(e, o), o;
}, P = (e) => {
  const t = Z.get(e);
  if (!t)
    throw new Error("Impossible");
  return t;
}, gt = (e) => P(v(e)), ze = (e) => {
  const t = oe(e, 0, { equals: !1 });
  return new kt(e, t);
}, os = (e) => {
  const t = oe(e, 0, { equals: !1 });
  return new es(e, t);
}, cs = (e, t, s) => {
  const n = oe(e, s);
  return new ts(e, t, n);
}, oe = (e, t, s) => new N(t, s), He = (e, t, s) => {
  const r = se(s) ? Z.get(s) || Ee(s, t, e) : void 0, i = new ss(e, t, void 0, r);
  return e.AJ || (e.AJ = new U()), e.AJ.set(t, i), i;
}, us = (e) => {
  if (Q(e))
    return;
  let t, s;
  const n = Object.keys(e);
  for (let r = 0, i = n.length; r < i; r++) {
    const o = n[r], u = Object.getOwnPropertyDescriptor(e, o);
    if (!u)
      continue;
    const { get: c, set: h } = u;
    c && (t || (t = new U()), t.set(o, c)), h && (s || (s = new U()), s.set(o, h)), c && !h && (s || (s = new U()), s.set(o, As));
  }
  if (!(!t && !s))
    return { AT: t, AU: s };
}, ls = (e, t) => B(e) ? e : (Z.get(e) || Ee(e, void 0, void 0, t == null ? void 0 : t.equals)).store, v = (e) => B(e) ? e[de] : e, hs = (e) => !Le(e) || St(e) ? e : new Proxy(e, is), fs = (e, t, s) => !!e.configurable == !!t.configurable && !!e.enumerable == !!t.enumerable && !!e.writable == !!t.writable && s(e.value, t.value) && e.get === t.get && e.set === t.set, as = (e, t, s) => {
  if (Object.isFrozen(e))
    return !0;
  if (!s || t === void 0)
    return !1;
  const n = $.unwrap(s.store), r = Reflect.getOwnPropertyDescriptor(n, t);
  return !(r != null && r.configurable || r != null && r.writable);
}, ee = () => !!Y, se = (e) => {
  if (e === null || typeof e != "object")
    return !1;
  if (ne in e)
    return !0;
  if (Ie in e)
    return !1;
  if (Q(e))
    return !0;
  const t = Object.getPrototypeOf(e);
  return t === null ? !0 : Object.getPrototypeOf(t) === null;
}, St = (e) => e === null || typeof e != "object" ? !1 : Ie in e, As = () => {
  throw new TypeError("Cannot set property value of #<Object> which has only a getter");
}, $ = (e, t) => !Le(e) || St(e) ? e : ls(e, t);
$.on = (e, t) => {
  const s = B(e) ? [e] : wt(e), n = s.filter(_), r = s.filter(B).map(gt);
  m.AK += 1;
  const i = n.map((o) => {
    let u = !1;
    return we(() => {
      u && (m.AL.add(t), I.F()), u = !0, o();
    }, { suspense: !1, sync: !0 });
  });
  return r.forEach((o) => {
    q(o, "AP", t);
  }), () => {
    m.AK -= 1, i.forEach((o) => {
      o();
    }), r.forEach((o) => {
      J(o, "AP", t);
    });
  };
};
$._onRoots = (e, t) => {
  if (!B(e))
    return Ce;
  const s = gt(e);
  if (s.AO)
    throw new Error("Only top-level stores are supported");
  return w.AK += 1, q(s, "AQ", t), () => {
    w.AK -= 1, J(s, "AQ", t);
  };
};
$.reconcile = /* @__PURE__ */ (() => {
  const e = (r) => Q(r) ? 1 : se(r) ? 2 : 0, t = (r, i) => {
    const o = v(r), u = v(i);
    s(r, i);
    const c = e(o), h = e(u);
    return (c === 1 || h === 1) && (r.length = i.length), r;
  }, s = (r, i) => {
    const o = v(r), u = v(i), c = Object.keys(o), h = Object.keys(u);
    for (let l = 0, A = h.length; l < A; l++) {
      const f = h[l], S = o[f], d = u[f];
      if (G(S, d))
        S === void 0 && !(f in o) && (r[f] = void 0);
      else {
        const b = e(S), p = e(d);
        b && b === p ? (s(r[f], d), b === 1 && (r[f].length = d.length)) : r[f] = d;
      }
    }
    for (let l = 0, A = c.length; l < A; l++) {
      const f = c[l];
      f in u || delete r[f];
    }
    return r;
  };
  return (r, i) => K(() => t(r, i));
})();
$.untrack = (e) => hs(e);
$.unwrap = (e) => v(e);
const ds = () => {
  const e = g.get(H);
  if (!e)
    return tt;
  const t = e.observable || (e.observable = new N(!!e.suspended));
  return F(t);
}, bs = () => {
  pe.N();
}, gs = (e, t) => {
  const s = At();
  return L(() => {
    const n = s();
    return n ? O(t({ error: n, reset: () => s(void 0) })) : (g.S = s, O(e));
  });
};
function Ss(e) {
  const t = _(e) ? (...s) => K(() => e(...s)) : () => e;
  return t[Ne] = !0, t;
}
const ps = () => {
  const e = g, t = Y;
  return (s) => e.E(() => s(), e, t);
};
function a(e, t) {
  return et(new N(e, t));
}
a.batch = Bt;
a.boolean = De;
a.cleanup = D;
a.context = Kt;
a.disposed = Ut;
a.effect = we;
a.for = Vt;
a.get = X;
a.if = zt;
a.isBatching = at;
a.isObservable = Qe;
a.isStore = B;
a.memo = L;
a.observable = At;
a.owner = dt;
a.readonly = $t;
a.resolve = O;
a.root = jt;
a.selector = Zt;
a.store = $;
a.suspended = ds;
a.suspense = ut;
a.switch = ht;
a.ternary = ft;
a.tick = bs;
a.tryCatch = gs;
a.untrack = K;
a.untracked = Ss;
a.with = ps;
const ys = Et({
  create: () => {
    const e = a(0);
    return {
      depend: () => {
        e();
      },
      notify: () => {
        e(K(() => e() + 1));
      }
    };
  },
  isInScope: () => !!dt(),
  onDispose: (e) => {
    D(e);
  }
});
export {
  ys as default
};
//# sourceMappingURL=index.mjs.map
