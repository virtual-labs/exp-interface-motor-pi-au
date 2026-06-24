var ue = Object.defineProperty;
var fe = (t, n, e) =>
  n in t
    ? ue(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var hn = (t, n, e) => (fe(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var he = { value: () => {} };
function Wt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new mt(e);
}
function mt(t) {
  this._ = t;
}
function de(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
mt.prototype = Wt.prototype = {
  constructor: mt,
  on: function (t, n) {
    var e = this._,
      r = de(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = pe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = dn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = dn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new mt(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function pe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function dn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = he), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Bt = "http://www.w3.org/1999/xhtml";
const pn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Bt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Nt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    pn.hasOwnProperty(n) ? { space: pn[n], local: t } : t
  );
}
function ge(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Bt && n.documentElement.namespaceURI === Bt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ye(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Tn(t) {
  var n = Nt(t);
  return (n.local ? ye : ge)(n);
}
function me() {}
function Zt(t) {
  return t == null
    ? me
    : function () {
        return this.querySelector(t);
      };
}
function _e(t) {
  typeof t != "function" && (t = Zt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new b(r, this._parents);
}
function xe(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ve() {
  return [];
}
function Sn(t) {
  return t == null
    ? ve
    : function () {
        return this.querySelectorAll(t);
      };
}
function we(t) {
  return function () {
    return xe(t.apply(this, arguments));
  };
}
function be(t) {
  typeof t == "function" ? (t = we(t)) : (t = Sn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new b(r, i);
}
function Rn(t) {
  return function () {
    return this.matches(t);
  };
}
function On(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Ee = Array.prototype.find;
function Ce(t) {
  return function () {
    return Ee.call(this.children, t);
  };
}
function $e() {
  return this.firstElementChild;
}
function Ne(t) {
  return this.select(t == null ? $e : Ce(typeof t == "function" ? t : On(t)));
}
var Ie = Array.prototype.filter;
function Pe() {
  return Array.from(this.children);
}
function Ae(t) {
  return function () {
    return Ie.call(this.children, t);
  };
}
function ke(t) {
  return this.selectAll(
    t == null ? Pe : Ae(typeof t == "function" ? t : On(t))
  );
}
function Me(t) {
  typeof t != "function" && (t = Rn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new b(r, this._parents);
}
function Ln(t) {
  return new Array(t.length);
}
function Te() {
  return new b(this._enter || this._groups.map(Ln), this._parents);
}
function vt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
vt.prototype = {
  constructor: vt,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function Se(t) {
  return function () {
    return t;
  };
}
function Re(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new vt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Oe(t, n, e, r, i, o, s) {
  var c,
    a,
    l = new Map(),
    u = n.length,
    h = o.length,
    f = new Array(u),
    p;
  for (c = 0; c < u; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      l.has(p) ? (i[c] = a) : l.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new vt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Le(t) {
  return t.__data__;
}
function De(t, n) {
  if (!arguments.length) return Array.from(this, Le);
  var e = n ? Oe : Re,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Se(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      l = 0;
    l < o;
    ++l
  ) {
    var u = r[l],
      h = i[l],
      f = h.length,
      p = Ge(t.call(u, u && u.__data__, l, r)),
      y = p.length,
      m = (c[l] = new Array(y)),
      $ = (s[l] = new Array(y)),
      z = (a[l] = new Array(f));
    e(u, h, m, $, z, p, n);
    for (var P = 0, A = 0, d, g; P < y; ++P)
      if ((d = m[P])) {
        for (P >= A && (A = P + 1); !(g = $[A]) && ++A < y; );
        d._next = g || null;
      }
  }
  return (s = new b(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ge(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Be() {
  return new b(this._exit || this._groups.map(Ln), this._parents);
}
function Xe(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function He(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, y = 0;
      y < h;
      ++y
    )
      (p = l[y] || u[y]) && (f[y] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new b(c, this._parents);
}
function Fe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function qe(t) {
  t || (t = Ve);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
      u < c;
      ++u
    )
      (l = s[u]) && (a[u] = l);
    a.sort(n);
  }
  return new b(i, this._parents).order();
}
function Ve(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Ye() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function ze() {
  return Array.from(this);
}
function Ue() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ke() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function We() {
  return !this.node();
}
function Ze(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Qe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Je(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function je(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function tr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function nr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function er(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function rr(t, n) {
  var e = Nt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Je
        : Qe
      : typeof n == "function"
      ? e.local
        ? er
        : nr
      : e.local
      ? tr
      : je)(e, n)
  );
}
function Dn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function ir(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function or(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function sr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function cr(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? ir : typeof n == "function" ? sr : or)(t, n, e ?? "")
      )
    : Z(this.node(), t);
}
function Z(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Dn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function ar(t) {
  return function () {
    delete this[t];
  };
}
function lr(t, n) {
  return function () {
    this[t] = n;
  };
}
function ur(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function fr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? ar : typeof n == "function" ? ur : lr)(t, n))
    : this.node()[t];
}
function Gn(t) {
  return t.trim().split(/^|\s+/);
}
function Qt(t) {
  return t.classList || new Bn(t);
}
function Bn(t) {
  (this._node = t), (this._names = Gn(t.getAttribute("class") || ""));
}
Bn.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function Xn(t, n) {
  for (var e = Qt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Hn(t, n) {
  for (var e = Qt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function hr(t) {
  return function () {
    Xn(this, t);
  };
}
function dr(t) {
  return function () {
    Hn(this, t);
  };
}
function pr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Xn : Hn)(this, t);
  };
}
function gr(t, n) {
  var e = Gn(t + "");
  if (arguments.length < 2) {
    for (var r = Qt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? pr : n ? hr : dr)(e, n));
}
function yr() {
  this.textContent = "";
}
function mr(t) {
  return function () {
    this.textContent = t;
  };
}
function _r(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function xr(t) {
  return arguments.length
    ? this.each(t == null ? yr : (typeof t == "function" ? _r : mr)(t))
    : this.node().textContent;
}
function vr() {
  this.innerHTML = "";
}
function wr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function br(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Er(t) {
  return arguments.length
    ? this.each(t == null ? vr : (typeof t == "function" ? br : wr)(t))
    : this.node().innerHTML;
}
function Cr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function $r() {
  return this.each(Cr);
}
function Nr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ir() {
  return this.each(Nr);
}
function Pr(t) {
  var n = typeof t == "function" ? t : Tn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Ar() {
  return null;
}
function kr(t, n) {
  var e = typeof t == "function" ? t : Tn(t),
    r = n == null ? Ar : typeof n == "function" ? n : Zt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Mr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Tr() {
  return this.each(Mr);
}
function Sr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Rr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Or(t) {
  return this.select(t ? Rr : Sr);
}
function Lr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Dr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Gr(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function Br(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function Xr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Dr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function Hr(t, n, e) {
  var r = Gr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, l = c.length, u; a < l; ++a)
        for (i = 0, u = c[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? Xr : Br, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Fn(t, n, e) {
  var r = Dn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Fr(t, n) {
  return function () {
    return Fn(this, t, n);
  };
}
function qr(t, n) {
  return function () {
    return Fn(this, t, n.apply(this, arguments));
  };
}
function Vr(t, n) {
  return this.each((typeof n == "function" ? qr : Fr)(t, n));
}
function* Yr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var qn = [null];
function b(t, n) {
  (this._groups = t), (this._parents = n);
}
function ct() {
  return new b([[document.documentElement]], qn);
}
function zr() {
  return this;
}
b.prototype = ct.prototype = {
  constructor: b,
  select: _e,
  selectAll: be,
  selectChild: Ne,
  selectChildren: ke,
  filter: Me,
  data: De,
  enter: Te,
  exit: Be,
  join: Xe,
  merge: He,
  selection: zr,
  order: Fe,
  sort: qe,
  call: Ye,
  nodes: ze,
  node: Ue,
  size: Ke,
  empty: We,
  each: Ze,
  attr: rr,
  style: cr,
  property: fr,
  classed: gr,
  text: xr,
  html: Er,
  raise: $r,
  lower: Ir,
  append: Pr,
  insert: kr,
  remove: Tr,
  clone: Or,
  datum: Lr,
  on: Hr,
  dispatch: Vr,
  [Symbol.iterator]: Yr,
};
function M(t) {
  return typeof t == "string"
    ? new b([[document.querySelector(t)]], [document.documentElement])
    : new b([[t]], qn);
}
function Ur(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function gn(t, n) {
  if (((t = Ur(t)), n === void 0 && (n = t.currentTarget), n)) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return (
        (r.x = t.clientX),
        (r.y = t.clientY),
        (r = r.matrixTransform(n.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [
        t.clientX - i.left - n.clientLeft,
        t.clientY - i.top - n.clientTop,
      ];
    }
  }
  return [t.pageX, t.pageY];
}
const Kr = { passive: !1 },
  et = { capture: !0, passive: !1 };
function Rt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Wr(t) {
  var n = t.document.documentElement,
    e = M(t).on("dragstart.drag", K, et);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, et)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Zr(t, n) {
  var e = t.document.documentElement,
    r = M(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, et),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Xt(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: a,
    dy: l,
    dispatch: u,
  }
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
Xt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Qr(t) {
  return !t.ctrlKey && !t.button;
}
function Jr() {
  return this.parentNode;
}
function jr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function ti() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ni() {
  var t = Qr,
    n = Jr,
    e = jr,
    r = ti,
    i = {},
    o = Wt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", $)
      .on("touchmove.drag", z, Kr)
      .on("touchend.drag touchcancel.drag", P)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var _ = A(this, n.call(this, d, g), d, g, "mouse");
      _ &&
        (M(d.view).on("mousemove.drag", y, et).on("mouseup.drag", m, et),
        Wr(d.view),
        Rt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        _("start", d));
    }
  }
  function y(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        _ = d.clientY - a;
      l = g * g + _ * _ > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    M(d.view).on("mousemove.drag mouseup.drag", null),
      Zr(d.view, l),
      K(d),
      i.mouse("end", d);
  }
  function $(d, g) {
    if (t.call(this, d, g)) {
      var _ = d.changedTouches,
        x = n.call(this, d, g),
        E = _.length,
        D,
        U;
      for (D = 0; D < E; ++D)
        (U = A(this, x, d, g, _[D].identifier, _[D])) &&
          (Rt(d), U("start", d, _[D]));
    }
  }
  function z(d) {
    var g = d.changedTouches,
      _ = g.length,
      x,
      E;
    for (x = 0; x < _; ++x)
      (E = i[g[x].identifier]) && (K(d), E("drag", d, g[x]));
  }
  function P(d) {
    var g = d.changedTouches,
      _ = g.length,
      x,
      E;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        x = 0;
      x < _;
      ++x
    )
      (E = i[g[x].identifier]) && (Rt(d), E("end", d, g[x]));
  }
  function A(d, g, _, x, E, D) {
    var U = o.copy(),
      k = gn(D || _, g),
      an,
      ln,
      lt;
    if (
      (lt = e.call(
        d,
        new Xt("beforestart", {
          sourceEvent: _,
          target: f,
          identifier: E,
          active: s,
          x: k[0],
          y: k[1],
          dx: 0,
          dy: 0,
          dispatch: U,
        }),
        x
      )) != null
    )
      return (
        (an = lt.x - k[0] || 0),
        (ln = lt.y - k[1] || 0),
        function ae(Tt, un, le) {
          var fn = k,
            St;
          switch (Tt) {
            case "start":
              (i[E] = ae), (St = s++);
              break;
            case "end":
              delete i[E], --s;
            case "drag":
              (k = gn(le || un, g)), (St = s);
              break;
          }
          U.call(
            Tt,
            d,
            new Xt(Tt, {
              sourceEvent: un,
              subject: lt,
              target: f,
              identifier: E,
              active: St,
              x: k[0] + an,
              y: k[1] + ln,
              dx: k[0] - fn[0],
              dy: k[1] - fn[1],
              dispatch: U,
            }),
            x
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ut(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ut(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ut(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ut(!!d)), f)
        : r;
    }),
    (f.on = function () {
      var d = o.on.apply(o, arguments);
      return d === o ? f : d;
    }),
    (f.clickDistance = function (d) {
      return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
    }),
    f
  );
}
function Jt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Vn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function at() {}
var rt = 0.7,
  wt = 1 / rt,
  W = "\\s*([+-]?\\d+)\\s*",
  it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  T = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  ei = /^#([0-9a-f]{3,8})$/,
  ri = new RegExp(`^rgb\\(${W},${W},${W}\\)$`),
  ii = new RegExp(`^rgb\\(${T},${T},${T}\\)$`),
  oi = new RegExp(`^rgba\\(${W},${W},${W},${it}\\)$`),
  si = new RegExp(`^rgba\\(${T},${T},${T},${it}\\)$`),
  ci = new RegExp(`^hsl\\(${it},${T},${T}\\)$`),
  ai = new RegExp(`^hsla\\(${it},${T},${T},${it}\\)$`),
  yn = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Jt(at, ot, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: mn,
  formatHex: mn,
  formatHex8: li,
  formatHsl: ui,
  formatRgb: _n,
  toString: _n,
});
function mn() {
  return this.rgb().formatHex();
}
function li() {
  return this.rgb().formatHex8();
}
function ui() {
  return Yn(this).formatHsl();
}
function _n() {
  return this.rgb().formatRgb();
}
function ot(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = ei.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? xn(n)
          : e === 3
          ? new v(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ft(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ft(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ri.exec(t))
      ? new v(n[1], n[2], n[3], 1)
      : (n = ii.exec(t))
      ? new v((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = oi.exec(t))
      ? ft(n[1], n[2], n[3], n[4])
      : (n = si.exec(t))
      ? ft((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ci.exec(t))
      ? bn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = ai.exec(t))
      ? bn(n[1], n[2] / 100, n[3] / 100, n[4])
      : yn.hasOwnProperty(t)
      ? xn(yn[t])
      : t === "transparent"
      ? new v(NaN, NaN, NaN, 0)
      : null
  );
}
function xn(t) {
  return new v((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ft(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new v(t, n, e, r);
}
function fi(t) {
  return (
    t instanceof at || (t = ot(t)),
    t ? ((t = t.rgb()), new v(t.r, t.g, t.b, t.opacity)) : new v()
  );
}
function Ht(t, n, e, r) {
  return arguments.length === 1 ? fi(t) : new v(t, n, e, r ?? 1);
}
function v(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Jt(
  v,
  Ht,
  Vn(at, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new v(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new v(V(this.r), V(this.g), V(this.b), bt(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: vn,
    formatHex: vn,
    formatHex8: hi,
    formatRgb: wn,
    toString: wn,
  })
);
function vn() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function hi() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function wn() {
  const t = bt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${V(this.r)}, ${V(this.g)}, ${V(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function bt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function V(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return (t = V(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function bn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new N(t, n, e, r)
  );
}
function Yn(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof at || (t = ot(t)), !t)) return new N();
  if (t instanceof N) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new N(s, c, a, t.opacity)
  );
}
function di(t, n, e, r) {
  return arguments.length === 1 ? Yn(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Jt(
  N,
  di,
  Vn(at, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new v(
        Ot(t >= 240 ? t - 240 : t + 120, i, r),
        Ot(t, i, r),
        Ot(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(En(this.h), ht(this.s), ht(this.l), bt(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = bt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${En(this.h)}, ${
        ht(this.s) * 100
      }%, ${ht(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function En(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ht(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ot(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const zn = (t) => () => t;
function pi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function gi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function yi(t) {
  return (t = +t) == 1
    ? Un
    : function (n, e) {
        return e - n ? gi(n, e, t) : zn(isNaN(n) ? e : n);
      };
}
function Un(t, n) {
  var e = n - t;
  return e ? pi(t, e) : zn(isNaN(t) ? n : t);
}
const Cn = (function t(n) {
  var e = yi(n);
  function r(i, o) {
    var s = e((i = Ht(i)).r, (o = Ht(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Un(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function G(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Ft = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Lt = new RegExp(Ft.source, "g");
function mi(t) {
  return function () {
    return t;
  };
}
function _i(t) {
  return function (n) {
    return t(n) + "";
  };
}
function xi(t, n) {
  var e = (Ft.lastIndex = Lt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Ft.exec(t)) && (i = Lt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: G(r, i) })),
      (e = Lt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? _i(a[0].x)
        : mi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var $n = 180 / Math.PI,
  qt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Kn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * $n,
      skewX: Math.atan(a) * $n,
      scaleX: s,
      scaleY: c,
    }
  );
}
var dt;
function vi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? qt : Kn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function wi(t) {
  return t == null ||
    (dt || (dt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    dt.setAttribute("transform", t),
    !(t = dt.transform.baseVal.consolidate()))
    ? qt
    : ((t = t.matrix), Kn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Wn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, y) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      y.push({ i: m - 4, x: G(l, h) }, { i: m - 2, x: G(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: G(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: G(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, y) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      y.push({ i: m - 4, x: G(l, h) }, { i: m - 2, x: G(u, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (l, u) {
    var h = [],
      f = [];
    return (
      (l = t(l)),
      (u = t(u)),
      o(l.translateX, l.translateY, u.translateX, u.translateY, h, f),
      s(l.rotate, u.rotate, h, f),
      c(l.skewX, u.skewX, h, f),
      a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f),
      (l = u = null),
      function (p) {
        for (var y = -1, m = f.length, $; ++y < m; ) h[($ = f[y]).i] = $.x(p);
        return h.join("");
      }
    );
  };
}
var bi = Wn(vi, "px, ", "px)", "deg)"),
  Ei = Wn(wi, ", ", ")", ")"),
  Q = 0,
  j = 0,
  J = 0,
  Zn = 1e3,
  Et,
  tt,
  Ct = 0,
  Y = 0,
  It = 0,
  st = typeof performance == "object" && performance.now ? performance : Date,
  Qn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function jt() {
  return Y || (Qn(Ci), (Y = st.now() + It));
}
function Ci() {
  Y = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = Jn.prototype = {
  constructor: $t,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? jt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        tt !== this &&
        (tt ? (tt._next = this) : (Et = this), (tt = this)),
      (this._call = t),
      (this._time = e),
      Vt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Vt());
  },
};
function Jn(t, n, e) {
  var r = new $t();
  return r.restart(t, n, e), r;
}
function $i() {
  jt(), ++Q;
  for (var t = Et, n; t; )
    (n = Y - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Q;
}
function Nn() {
  (Y = (Ct = st.now()) + It), (Q = j = 0);
  try {
    $i();
  } finally {
    (Q = 0), Ii(), (Y = 0);
  }
}
function Ni() {
  var t = st.now(),
    n = t - Ct;
  n > Zn && ((It -= n), (Ct = t));
}
function Ii() {
  for (var t, n = Et, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Et = e)));
  (tt = t), Vt(r);
}
function Vt(t) {
  if (!Q) {
    j && (j = clearTimeout(j));
    var n = t - Y;
    n > 24
      ? (t < 1 / 0 && (j = setTimeout(Nn, t - st.now() - It)),
        J && (J = clearInterval(J)))
      : (J || ((Ct = st.now()), (J = setInterval(Ni, Zn))), (Q = 1), Qn(Nn));
  }
}
function In(t, n, e) {
  var r = new $t();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var Pi = Wt("start", "end", "cancel", "interrupt"),
  Ai = [],
  jn = 0,
  Pn = 1,
  Yt = 2,
  _t = 3,
  An = 4,
  zt = 5,
  xt = 6;
function Pt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  ki(t, e, {
    name: n,
    index: r,
    group: i,
    on: Pi,
    tween: Ai,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: jn,
  });
}
function tn(t, n) {
  var e = I(t, n);
  if (e.state > jn) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = I(t, n);
  if (e.state > _t) throw new Error("too late; already running");
  return e;
}
function I(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function ki(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Jn(o, 0, e.time));
  function o(l) {
    (e.state = Pn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== Pn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === _t) return In(s);
        p.state === An
          ? ((p.state = xt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = xt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (In(function () {
        e.state === _t &&
          ((e.state = An), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Yt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Yt)
    ) {
      for (
        e.state = _t, i = new Array((f = e.tween.length)), u = 0, h = -1;
        u < f;
        ++u
      )
        (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(l) {
    for (
      var u =
          l < e.duration
            ? e.ease.call(null, l / e.duration)
            : (e.timer.restart(a), (e.state = zt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === zt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = xt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Mi(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > Yt && r.state < zt),
        (r.state = xt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ti(t) {
  return this.each(function () {
    Mi(this, t);
  });
}
function Si(t, n) {
  var e, r;
  return function () {
    var i = R(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ri(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = R(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === l && i.push(c);
    }
    o.tween = i;
  };
}
function Oi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = I(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Si : Ri)(e, t, n));
}
function nn(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = R(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return I(i, r).value[n];
    }
  );
}
function te(t, n) {
  var e;
  return (
    typeof n == "number"
      ? G
      : n instanceof ot
      ? Cn
      : (e = ot(n))
      ? ((n = e), Cn)
      : xi
  )(t, n);
}
function Li(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Di(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Bi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Xi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Hi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Fi(t, n) {
  var e = Nt(t),
    r = e === "transform" ? Ei : te;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Hi : Xi)(e, r, nn(this, "attr." + t, n))
      : n == null
      ? (e.local ? Di : Li)(e)
      : (e.local ? Bi : Gi)(e, r, n)
  );
}
function qi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Vi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Yi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Vi(t, o)), e;
  }
  return (i._value = n), i;
}
function zi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && qi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ui(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Nt(t);
  return this.tween(e, (r.local ? Yi : zi)(r, n));
}
function Ki(t, n) {
  return function () {
    tn(this, t).delay = +n.apply(this, arguments);
  };
}
function Wi(t, n) {
  return (
    (n = +n),
    function () {
      tn(this, t).delay = n;
    }
  );
}
function Zi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Ki : Wi)(n, t))
    : I(this.node(), n).delay;
}
function Qi(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function Ji(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function ji(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Qi : Ji)(n, t))
    : I(this.node(), n).duration;
}
function to(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function no(t) {
  var n = this._id;
  return arguments.length ? this.each(to(n, t)) : I(this.node(), n).ease;
}
function eo(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function ro(t) {
  if (typeof t != "function") throw new Error();
  return this.each(eo(this._id, t));
}
function io(t) {
  typeof t != "function" && (t = Rn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new L(r, this._parents, this._name, this._id);
}
function oo(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], l = e[c], u = a.length, h = (s[c] = new Array(u)), f, p = 0;
      p < u;
      ++p
    )
      (f = a[p] || l[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new L(s, this._parents, this._name, this._id);
}
function so(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function co(t, n, e) {
  var r,
    i,
    o = so(n) ? tn : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function ao(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? I(this.node(), e).on.on(t)
    : this.each(co(e, t, n));
}
function lo(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function uo() {
  return this.on("end.remove", lo(this._id));
}
function fo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Zt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, h, f = 0;
      f < a;
      ++f
    )
      (u = c[f]) &&
        (h = t.call(u, u.__data__, f, c)) &&
        ("__data__" in u && (h.__data__ = u.__data__),
        (l[f] = h),
        Pt(l[f], n, e, f, l, I(u, e)));
  return new L(o, this._parents, n, e);
}
function ho(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Sn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            y = I(u, e),
            m = 0,
            $ = f.length;
          m < $;
          ++m
        )
          (p = f[m]) && Pt(p, n, e, m, f, y);
        o.push(f), s.push(u);
      }
  return new L(o, s, n, e);
}
var po = ct.prototype.constructor;
function go() {
  return new po(this._groups, this._parents);
}
function yo(t, n) {
  var e, r, i;
  return function () {
    var o = Z(this, t),
      s = (this.style.removeProperty(t), Z(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function ne(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function mo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Z(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function _o(t, n, e) {
  var r, i, o;
  return function () {
    var s = Z(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Z(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function xo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = R(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = ne(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function vo(t, n, e) {
  var r = (t += "") == "transform" ? bi : te;
  return n == null
    ? this.styleTween(t, yo(t, r)).on("end.style." + t, ne(t))
    : typeof n == "function"
    ? this.styleTween(t, _o(t, r, nn(this, "style." + t, n))).each(
        xo(this._id, t)
      )
    : this.styleTween(t, mo(t, r, n), e).on("end.style." + t, null);
}
function wo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function bo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && wo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Eo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, bo(t, n, e ?? ""));
}
function Co(t) {
  return function () {
    this.textContent = t;
  };
}
function $o(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function No(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? $o(nn(this, "text", t))
      : Co(t == null ? "" : t + "")
  );
}
function Io(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Po(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Io(i)), n;
  }
  return (r._value = t), r;
}
function Ao(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Po(t));
}
function ko() {
  for (
    var t = this._name,
      n = this._id,
      e = ee(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = I(a, n);
        Pt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new L(r, this._parents, t, e);
}
function Mo() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var l = R(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var To = 0;
function L(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function ee() {
  return ++To;
}
var O = ct.prototype;
L.prototype = {
  constructor: L,
  select: fo,
  selectAll: ho,
  selectChild: O.selectChild,
  selectChildren: O.selectChildren,
  filter: io,
  merge: oo,
  selection: go,
  transition: ko,
  call: O.call,
  nodes: O.nodes,
  node: O.node,
  size: O.size,
  empty: O.empty,
  each: O.each,
  on: ao,
  attr: Fi,
  attrTween: Ui,
  style: vo,
  styleTween: Eo,
  text: No,
  textTween: Ao,
  remove: uo,
  tween: Oi,
  delay: Zi,
  duration: ji,
  ease: no,
  easeVarying: ro,
  end: Mo,
  [Symbol.iterator]: O[Symbol.iterator],
};
function So(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ro = { time: null, delay: 0, duration: 250, ease: So };
function Oo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Lo(t) {
  var n, e;
  t instanceof L
    ? ((n = t._id), (t = t._name))
    : ((n = ee()), ((e = Ro).time = jt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Pt(a, t, n, l, s, e || Oo(a, n));
  return new L(r, this._parents, t, n);
}
ct.prototype.interrupt = Ti;
ct.prototype.transition = Lo;
const Ut = Math.PI,
  Kt = 2 * Ut,
  H = 1e-6,
  Do = Kt - H;
function re(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Go(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return re;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Bo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? re : Go(n));
  }
  moveTo(n, e) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(n, e, r, i, o, s) {
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      l = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > H)
      if (!(Math.abs(h * a - l * u) > H) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          y = i - c,
          m = a * a + l * l,
          $ = p * p + y * y,
          z = Math.sqrt(m),
          P = Math.sqrt(f),
          A = o * Math.tan((Ut - Math.acos((m + f - $) / (2 * z * P))) / 2),
          d = A / P,
          g = A / z;
        Math.abs(d - 1) > H && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * y)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * l)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      l = n + c,
      u = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > H || Math.abs(this._y1 - u) > H) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Kt) + Kt),
        f > Do
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > H &&
            this._append`A${r},${r},0,${+(f >= Ut)},${h},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Xo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Ho(t, n) {
  return fetch(t, n).then(Xo);
}
function Fo(t) {
  return (n, e) => Ho(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const qo = Fo("application/xml");
function nt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
nt.prototype = {
  constructor: nt,
  scale: function (t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new nt(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
nt.prototype;
class At {
  constructor(n, e, r, i, o, s, c) {
    hn(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (M("#" + this.id).node() != null) return;
    const n = await qo(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(M(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          ni()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    M(this).raise().classed("active", !0);
  }
  dragended(n) {
    M(this).classed("active", !1);
  }
}
const kt = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
    "_x30_.1.0.220.2.3-0",
    "_x30_.1.0.221.0.5.13-6",
    "_x30_.1.0.224.0.10_1_-3",
    "_x30_.1.0.223.0.0.1.12-2",
    "_x30_.1.0.224.0.10-7",
    "_x30_.1.0.226.0.1",
    "_x30_.1.0.227.1",
  ],
  B = {
    "connector0pin-0": "3.3v",
    "connector1pin-1": "GPIO 2",
    "connector2pin-3": "GPIO 3",
    "connector3pin-7": "GPIO 4",
    "connector4pin-4": "GND",
    "connector5pin-1": "GPIO 17",
    "connector6pin-1": "GPIO 27",
    "connector7pin-3": "GPIO 22",
    "connector8pin-0": "3.3v",
    "connector9pin-3": "GPIO 10",
    "connector10pin-2": "GPIO 9",
    "connector11pin-1": "GPIO 11",
    "connector12pin-7": "GND",
    "connector13pin-5": "RESERVED",
    "connector14pin-6": "GPIO 5",
    "connector15pin-5": "GPIO 6",
    "connector16pin-4": "GPIO 13",
    "connector17pin-2": "GPIO 19",
    "connector18pin-2": "GPIO 26",
    "connector19pin-1": "GND",
    "connector20pin-7": "GPIO 21",
    "connector21pin-2": "GPIO 20",
    "connector22pin-4": "GPIO 16",
    "connector23pin-1": "GND",
    "connector24pin-6": "GPIO 12",
    "connector25pin-5": "GND",
    "connector26pin-7": "RESERVED",
    "connector27pin-8": "GPIO 7",
    "connector28pin-5": "GPIO 8",
    "connector29pin-9": "GPIO 25",
    "connector30pin-2": "GND",
    "connector31pin-7": "GPIO 24",
    "connector32pin-3": "GPIO 23",
    "connector33pin-6": "GND",
    "connector34pin-4": "GPIO 18",
    "connector35pin-7": "UART 0 RX",
    "connector36pin-9": "UART 0 TX",
    "connector37pin-7": "GND",
    "connector38pin-2": "5V PWR",
    "connector39pin-2": "5V PWR",
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  ie = [
    "relayPin1",
    "relayPin2",
    "relayPin3",
    "relayConnector1",
    "relayConnector2",
    "relayConnector3",
  ],
  pt = {
    relayPin1: "VCC pin of Relay",
    relayPin2: "GND pin of Relay",
    relayPin3: "Input Pin of Relay",
    relayConnector1: "NC pin of Relay",
    relayConnector2: "COM pin of Relay",
    relayConnector3: "NO pin of Relay",
  },
  oe = ["m1", "m2"],
  gt = { m1: "-ve terminal of motor", m2: "+ve terminal of motor" },
  se = ["batteryP", "batteryN"],
  yt = {
    batteryP: "+ve terminal of Battery",
    batteryN: "-ve terminal of Battery",
  },
  Vo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = [
      "GPIO",
      "GND",
      "relayPin2",
      "relayPin3",
      "relayConnector1",
      "relayConnector2",
      "relayConnector3",
      "3.3v",
      "batteryP",
      "batteryN",
      "m1",
      "m2",
    ];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          console.log("found", r.connector), e++;
          return;
        }
        if (B[r.connector] == "GND" || B[r.connector] == "3.3v") {
          console.log("found", r.connector), e++;
          return;
        }
        kt[r.connector] && B[r.connector].includes("GPIO") && e++;
      }),
      e == 10
    );
  };
class Yo {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 == 0) {
      let n = document.createElement("li");
      const e = B[this.connections[this.connections.length - 2].connector]
          ? `${
              B[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : yt[this.connections[this.connections.length - 2].connector]
          ? yt[this.connections[this.connections.length - 2].connector]
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = B[this.connections[this.connections.length - 1].connector]
          ? `${
              B[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : yt[this.connections[this.connections.length - 1].connector]
          ? yt[this.connections[this.connections.length - 1].connector]
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      } : ${e} to ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class zo {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const w = M("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Uo = new At("raspberry", w, "images/pi3dirk.svg", 1, !1),
  Ko = new At("relay", w, "images/relay.svg", 0.3, !1, 300, 35),
  Wo = new At("dc_motor", w, "images/motor.svg", 1, !1, 500, 300),
  Zo = new At("batterComponent", w, "images/battery.svg", 0.2, !1, 300, 300),
  en = w.append("g").attr("id", "pathsGroup"),
  Mt = {
    rasberryPi:
      "Raspberry Pi: Controls the relay module using GPIO 21 to switch the relay on/off, enabling or disabling the motor circuit powered by the battery. Connects 3.3V and GND to power the relay.",
    relayContainer:
      "Relay: Acts as a switch controlled by the Raspberry Pi. Connect 3.3V and GND from the Pi to VCC and GND, GPIO 21 to IN, the battery’s positive to COM, and the motor’s positive to NO.",
    motor:
      "DC Motor: Rotates when powered by the battery through the relay. Connect its positive terminal to the relay’s NO (Normally Open) and its negative terminal to the battery’s negative.",
    battery:
      "Battery: Provides power (e.g., 9V) to the DC motor. Connect its positive terminal to the relay’s COM (Common) and its negative to the motor’s negative terminal.",
  },
  rn = document.getElementById("rasberryPi"),
  on = document.getElementById("relayContainer"),
  sn = document.getElementById("motor"),
  cn = document.getElementById("battery"),
  S = document.getElementById("componentDescription"),
  ce = document.getElementById("displayInfo"),
  Qo = document.getElementById("codeSubmit"),
  Jo = document.getElementById("info"),
  jo = document.getElementById("list"),
  ts = document.getElementById("undoButton");
rn.addEventListener("click", async () => await Uo.load());
on.addEventListener("click", () => Ko.load());
sn.addEventListener("click", () => Wo.load());
cn.addEventListener("click", () => Zo.load());
rn.addEventListener("mouseover", () => {
  (S.textContent = Mt.rasberryPi), (S.style.display = "block");
});
on.addEventListener("mouseover", () => {
  (S.textContent = Mt.relayContainer), (S.style.display = "block");
});
sn.addEventListener("mouseover", () => {
  (S.textContent = Mt.motor), (S.style.display = "block");
});
cn.addEventListener("mouseover", () => {
  (S.textContent = Mt.battery), (S.style.display = "block");
});
[rn, on, sn, cn].forEach((t) => {
  t.addEventListener("mouseout", () => {
    (S.textContent = "Hover over a component to see its description."),
      (S.style.display = "none");
  });
});
let Dt = !1;
Jo.addEventListener("click", () => {
  (Dt = !Dt), (jo.style.display = Dt ? "block" : "none");
});
const ns = () => {
    w.select("#motorMessageText").remove(),
      w
        .append("text")
        .attr("id", "motorMessageText")
        .attr("x", 500)
        .attr("y", 550)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "14px")
        .attr("font-family", "sans-serif")
        .text("Success! Circuit completed, motor is rotating.")
        .style("background-color", "green")
        .call((t) => {
          const n = t.node().getBBox();
          w.insert("rect", "#motorMessageText")
            .attr("x", n.x - 5)
            .attr("y", n.y - 2)
            .attr("width", n.width + 10)
            .attr("height", n.height + 4)
            .attr("fill", "green");
        });
  },
  es = (t) => {
    M(t).classed("rotate", !0), ns();
  },
  Gt = (t) =>
    kt.includes(t.srcElement.id) ||
    oe.includes(t.srcElement.id) ||
    ie.includes(t.srcElement.id) ||
    se.includes(t.srcElement.id),
  kn = (t, n) => {
    en.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  };
let C;
const X = new Yo("connectionLog"),
  Mn = new zo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let F = 0;
const rs = (t) => {
    en.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  is = () => {
    if (C) {
      en
        .selectAll(`path[id^="path${F}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (C = null),
        (F = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (X.connections.length > 0) {
      const n = X.connections[X.connections.length - 1].lineID;
      rs(n),
        X.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
ts.addEventListener("click", () => {
  X.undoLastConnection(), is();
});
w.on("dblclick", (t) => {
  if (Gt(t) && !C) {
    (C = new Bo()),
      C.moveTo(t.offsetX, t.offsetY),
      X.addConnection({
        lineID: `path${F}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      w.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Gt(t)) {
    C &&
      (C.lineTo(t.offsetX, t.offsetY),
      kn(C.toString(), `path${F}`),
      console.log("Path segment added"));
    return;
  }
  if (Gt(t) && C) {
    C.lineTo(t.offsetX, t.offsetY),
      kn(C.toString(), `path${F}`),
      X.addConnection({
        lineID: `path${F}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      F++,
      w.style("cursor", "default"),
      (C = null),
      console.log("Path completed");
    return;
  }
});
w.on("mouseover", (t) => {
  kt.includes(t.srcElement.id) && (ce.innerHTML = B[t.srcElement.id]);
});
w.on("mouseout", (t) => {
  (kt.includes(t.srcElement.id) ||
    ie.includes(t.srcElement.id) ||
    oe.includes(t.srcElement.id) ||
    se.includes(t.srcElement.id)) &&
    (ce.innerHTML = "CONNECTOR INFO");
});
Qo.addEventListener("click", () => {
  const t = Vo(X.getConnectionLog());
  t === !0
    ? (es("#rotor"), document.querySelector("#my-drawer-4").click())
    : t.error
    ? Mn.throw("Error", t.error)
    : Mn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
