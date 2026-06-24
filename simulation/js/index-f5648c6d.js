var ne = Object.defineProperty;
var ee = (t, n, e) =>
  n in t
    ? ne(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var on = (t, n, e) => (ee(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var re = { value: () => {} };
function zt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new yt(e);
}
function yt(t) {
  this._ = t;
}
function ie(t, n) {
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
yt.prototype = zt.prototype = {
  constructor: yt,
  on: function (t, n) {
    var e = this._,
      r = ie(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = oe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = sn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = sn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new yt(t);
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
function oe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function sn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = re), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Ot = "http://www.w3.org/1999/xhtml";
const cn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ot,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Ct(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    cn.hasOwnProperty(n) ? { space: cn[n], local: t } : t
  );
}
function se(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Ot && n.documentElement.namespaceURI === Ot
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ce(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Nn(t) {
  var n = Ct(t);
  return (n.local ? ce : se)(n);
}
function ae() {}
function Ut(t) {
  return t == null
    ? ae
    : function () {
        return this.querySelector(t);
      };
}
function le(t) {
  typeof t != "function" && (t = Ut(t));
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
function ue(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function fe() {
  return [];
}
function Pn(t) {
  return t == null
    ? fe
    : function () {
        return this.querySelectorAll(t);
      };
}
function he(t) {
  return function () {
    return ue(t.apply(this, arguments));
  };
}
function de(t) {
  typeof t == "function" ? (t = he(t)) : (t = Pn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new b(r, i);
}
function An(t) {
  return function () {
    return this.matches(t);
  };
}
function kn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var pe = Array.prototype.find;
function ge(t) {
  return function () {
    return pe.call(this.children, t);
  };
}
function ye() {
  return this.firstElementChild;
}
function me(t) {
  return this.select(t == null ? ye : ge(typeof t == "function" ? t : kn(t)));
}
var _e = Array.prototype.filter;
function ve() {
  return Array.from(this.children);
}
function we(t) {
  return function () {
    return _e.call(this.children, t);
  };
}
function xe(t) {
  return this.selectAll(
    t == null ? ve : we(typeof t == "function" ? t : kn(t))
  );
}
function be(t) {
  typeof t != "function" && (t = An(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new b(r, this._parents);
}
function Tn(t) {
  return new Array(t.length);
}
function Ee() {
  return new b(this._enter || this._groups.map(Tn), this._parents);
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
function $e(t) {
  return function () {
    return t;
  };
}
function Ce(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new vt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ie(t, n, e, r, i, o, s) {
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
function Ne(t) {
  return t.__data__;
}
function Pe(t, n) {
  if (!arguments.length) return Array.from(this, Ne);
  var e = n ? Ie : Ce,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = $e(t));
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
      p = Ae(t.call(u, u && u.__data__, l, r)),
      y = p.length,
      m = (c[l] = new Array(y)),
      $ = (s[l] = new Array(y)),
      V = (a[l] = new Array(f));
    e(u, h, m, $, V, p, n);
    for (var P = 0, A = 0, d, g; P < y; ++P)
      if ((d = m[P])) {
        for (P >= A && (A = P + 1); !(g = $[A]) && ++A < y; );
        d._next = g || null;
      }
  }
  return (s = new b(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ae(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ke() {
  return new b(this._exit || this._groups.map(Tn), this._parents);
}
function Te(t, n, e) {
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
function Se(t) {
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
function Me() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Re(t) {
  t || (t = Le);
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
function Le(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Oe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function De() {
  return Array.from(this);
}
function Ge() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Be() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Xe() {
  return !this.node();
}
function He(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function qe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Fe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ye(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Ve(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function ze(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ue(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ke(t, n) {
  var e = Ct(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Fe
        : qe
      : typeof n == "function"
      ? e.local
        ? Ue
        : ze
      : e.local
      ? Ve
      : Ye)(e, n)
  );
}
function Sn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function We(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Ze(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Qe(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Je(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? We : typeof n == "function" ? Qe : Ze)(t, n, e ?? "")
      )
    : W(this.node(), t);
}
function W(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Sn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function je(t) {
  return function () {
    delete this[t];
  };
}
function tr(t, n) {
  return function () {
    this[t] = n;
  };
}
function nr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function er(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? je : typeof n == "function" ? nr : tr)(t, n))
    : this.node()[t];
}
function Mn(t) {
  return t.trim().split(/^|\s+/);
}
function Kt(t) {
  return t.classList || new Rn(t);
}
function Rn(t) {
  (this._node = t), (this._names = Mn(t.getAttribute("class") || ""));
}
Rn.prototype = {
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
function Ln(t, n) {
  for (var e = Kt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function On(t, n) {
  for (var e = Kt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function rr(t) {
  return function () {
    Ln(this, t);
  };
}
function ir(t) {
  return function () {
    On(this, t);
  };
}
function or(t, n) {
  return function () {
    (n.apply(this, arguments) ? Ln : On)(this, t);
  };
}
function sr(t, n) {
  var e = Mn(t + "");
  if (arguments.length < 2) {
    for (var r = Kt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? or : n ? rr : ir)(e, n));
}
function cr() {
  this.textContent = "";
}
function ar(t) {
  return function () {
    this.textContent = t;
  };
}
function lr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function ur(t) {
  return arguments.length
    ? this.each(t == null ? cr : (typeof t == "function" ? lr : ar)(t))
    : this.node().textContent;
}
function fr() {
  this.innerHTML = "";
}
function hr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function dr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function pr(t) {
  return arguments.length
    ? this.each(t == null ? fr : (typeof t == "function" ? dr : hr)(t))
    : this.node().innerHTML;
}
function gr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yr() {
  return this.each(gr);
}
function mr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _r() {
  return this.each(mr);
}
function vr(t) {
  var n = typeof t == "function" ? t : Nn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function wr() {
  return null;
}
function xr(t, n) {
  var e = typeof t == "function" ? t : Nn(t),
    r = n == null ? wr : typeof n == "function" ? n : Ut(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function br() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Er() {
  return this.each(br);
}
function $r() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Cr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Ir(t) {
  return this.select(t ? Cr : $r);
}
function Nr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Pr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Ar(t) {
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
function kr(t) {
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
function Tr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Pr(n);
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
function Sr(t, n, e) {
  var r = Ar(t + ""),
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
  for (c = n ? Tr : kr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Dn(t, n, e) {
  var r = Sn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Mr(t, n) {
  return function () {
    return Dn(this, t, n);
  };
}
function Rr(t, n) {
  return function () {
    return Dn(this, t, n.apply(this, arguments));
  };
}
function Lr(t, n) {
  return this.each((typeof n == "function" ? Rr : Mr)(t, n));
}
function* Or() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Gn = [null];
function b(t, n) {
  (this._groups = t), (this._parents = n);
}
function st() {
  return new b([[document.documentElement]], Gn);
}
function Dr() {
  return this;
}
b.prototype = st.prototype = {
  constructor: b,
  select: le,
  selectAll: de,
  selectChild: me,
  selectChildren: xe,
  filter: be,
  data: Pe,
  enter: Ee,
  exit: ke,
  join: Te,
  merge: Se,
  selection: Dr,
  order: Me,
  sort: Re,
  call: Oe,
  nodes: De,
  node: Ge,
  size: Be,
  empty: Xe,
  each: He,
  attr: Ke,
  style: Je,
  property: er,
  classed: sr,
  text: ur,
  html: pr,
  raise: yr,
  lower: _r,
  append: vr,
  insert: xr,
  remove: Er,
  clone: Ir,
  datum: Nr,
  on: Sr,
  dispatch: Lr,
  [Symbol.iterator]: Or,
};
function S(t) {
  return typeof t == "string"
    ? new b([[document.querySelector(t)]], [document.documentElement])
    : new b([[t]], Gn);
}
function Gr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function an(t, n) {
  if (((t = Gr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Br = { passive: !1 },
  nt = { capture: !0, passive: !1 };
function St(t) {
  t.stopImmediatePropagation();
}
function U(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Xr(t) {
  var n = t.document.documentElement,
    e = S(t).on("dragstart.drag", U, nt);
  "onselectstart" in n
    ? e.on("selectstart.drag", U, nt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Hr(t, n) {
  var e = t.document.documentElement,
    r = S(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", U, nt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const lt = (t) => () => t;
function Dt(
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
Dt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function qr(t) {
  return !t.ctrlKey && !t.button;
}
function Fr() {
  return this.parentNode;
}
function Yr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Vr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zr() {
  var t = qr,
    n = Fr,
    e = Yr,
    r = Vr,
    i = {},
    o = zt("start", "drag", "end"),
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
      .on("touchmove.drag", V, Br)
      .on("touchend.drag touchcancel.drag", P)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var _ = A(this, n.call(this, d, g), d, g, "mouse");
      _ &&
        (S(d.view).on("mousemove.drag", y, nt).on("mouseup.drag", m, nt),
        Xr(d.view),
        St(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        _("start", d));
    }
  }
  function y(d) {
    if ((U(d), !l)) {
      var g = d.clientX - c,
        _ = d.clientY - a;
      l = g * g + _ * _ > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    S(d.view).on("mousemove.drag mouseup.drag", null),
      Hr(d.view, l),
      U(d),
      i.mouse("end", d);
  }
  function $(d, g) {
    if (t.call(this, d, g)) {
      var _ = d.changedTouches,
        v = n.call(this, d, g),
        E = _.length,
        G,
        z;
      for (G = 0; G < E; ++G)
        (z = A(this, v, d, g, _[G].identifier, _[G])) &&
          (St(d), z("start", d, _[G]));
    }
  }
  function V(d) {
    var g = d.changedTouches,
      _ = g.length,
      v,
      E;
    for (v = 0; v < _; ++v)
      (E = i[g[v].identifier]) && (U(d), E("drag", d, g[v]));
  }
  function P(d) {
    var g = d.changedTouches,
      _ = g.length,
      v,
      E;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        v = 0;
      v < _;
      ++v
    )
      (E = i[g[v].identifier]) && (St(d), E("end", d, g[v]));
  }
  function A(d, g, _, v, E, G) {
    var z = o.copy(),
      k = an(G || _, g),
      tn,
      nn,
      at;
    if (
      (at = e.call(
        d,
        new Dt("beforestart", {
          sourceEvent: _,
          target: f,
          identifier: E,
          active: s,
          x: k[0],
          y: k[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        v
      )) != null
    )
      return (
        (tn = at.x - k[0] || 0),
        (nn = at.y - k[1] || 0),
        function jn(kt, en, te) {
          var rn = k,
            Tt;
          switch (kt) {
            case "start":
              (i[E] = jn), (Tt = s++);
              break;
            case "end":
              delete i[E], --s;
            case "drag":
              (k = an(te || en, g)), (Tt = s);
              break;
          }
          z.call(
            kt,
            d,
            new Dt(kt, {
              sourceEvent: en,
              subject: at,
              target: f,
              identifier: E,
              active: Tt,
              x: k[0] + tn,
              y: k[1] + nn,
              dx: k[0] - rn[0],
              dy: k[1] - rn[1],
              dispatch: z,
            }),
            v
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : lt(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : lt(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : lt(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : lt(!!d)), f)
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
function Wt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Bn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function ct() {}
var et = 0.7,
  wt = 1 / et,
  K = "\\s*([+-]?\\d+)\\s*",
  rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  M = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Ur = /^#([0-9a-f]{3,8})$/,
  Kr = new RegExp(`^rgb\\(${K},${K},${K}\\)$`),
  Wr = new RegExp(`^rgb\\(${M},${M},${M}\\)$`),
  Zr = new RegExp(`^rgba\\(${K},${K},${K},${rt}\\)$`),
  Qr = new RegExp(`^rgba\\(${M},${M},${M},${rt}\\)$`),
  Jr = new RegExp(`^hsl\\(${rt},${M},${M}\\)$`),
  jr = new RegExp(`^hsla\\(${rt},${M},${M},${rt}\\)$`),
  ln = {
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
Wt(ct, it, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: un,
  formatHex: un,
  formatHex8: ti,
  formatHsl: ni,
  formatRgb: fn,
  toString: fn,
});
function un() {
  return this.rgb().formatHex();
}
function ti() {
  return this.rgb().formatHex8();
}
function ni() {
  return Xn(this).formatHsl();
}
function fn() {
  return this.rgb().formatRgb();
}
function it(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Ur.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? hn(n)
          : e === 3
          ? new x(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ut(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ut(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = Kr.exec(t))
      ? new x(n[1], n[2], n[3], 1)
      : (n = Wr.exec(t))
      ? new x((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Zr.exec(t))
      ? ut(n[1], n[2], n[3], n[4])
      : (n = Qr.exec(t))
      ? ut((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Jr.exec(t))
      ? gn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = jr.exec(t))
      ? gn(n[1], n[2] / 100, n[3] / 100, n[4])
      : ln.hasOwnProperty(t)
      ? hn(ln[t])
      : t === "transparent"
      ? new x(NaN, NaN, NaN, 0)
      : null
  );
}
function hn(t) {
  return new x((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ut(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new x(t, n, e, r);
}
function ei(t) {
  return (
    t instanceof ct || (t = it(t)),
    t ? ((t = t.rgb()), new x(t.r, t.g, t.b, t.opacity)) : new x()
  );
}
function Gt(t, n, e, r) {
  return arguments.length === 1 ? ei(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Wt(
  x,
  Gt,
  Bn(ct, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? et : Math.pow(et, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new x(F(this.r), F(this.g), F(this.b), xt(this.opacity));
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
    hex: dn,
    formatHex: dn,
    formatHex8: ri,
    formatRgb: pn,
    toString: pn,
  })
);
function dn() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}`;
}
function ri() {
  return `#${q(this.r)}${q(this.g)}${q(this.b)}${q(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function pn() {
  const t = xt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${F(this.r)}, ${F(this.g)}, ${F(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function xt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function F(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function q(t) {
  return (t = F(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function gn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new C(t, n, e, r)
  );
}
function Xn(t) {
  if (t instanceof C) return new C(t.h, t.s, t.l, t.opacity);
  if ((t instanceof ct || (t = it(t)), !t)) return new C();
  if (t instanceof C) return t;
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
    new C(s, c, a, t.opacity)
  );
}
function ii(t, n, e, r) {
  return arguments.length === 1 ? Xn(t) : new C(t, n, e, r ?? 1);
}
function C(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Wt(
  C,
  ii,
  Bn(ct, {
    brighter(t) {
      return (
        (t = t == null ? wt : Math.pow(wt, t)),
        new C(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? et : Math.pow(et, t)),
        new C(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new x(
        Mt(t >= 240 ? t - 240 : t + 120, i, r),
        Mt(t, i, r),
        Mt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new C(yn(this.h), ft(this.s), ft(this.l), xt(this.opacity));
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
      const t = xt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${yn(this.h)}, ${
        ft(this.s) * 100
      }%, ${ft(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function yn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ft(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Mt(t, n, e) {
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
const Hn = (t) => () => t;
function oi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function si(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function ci(t) {
  return (t = +t) == 1
    ? qn
    : function (n, e) {
        return e - n ? si(n, e, t) : Hn(isNaN(n) ? e : n);
      };
}
function qn(t, n) {
  var e = n - t;
  return e ? oi(t, e) : Hn(isNaN(t) ? n : t);
}
const mn = (function t(n) {
  var e = ci(n);
  function r(i, o) {
    var s = e((i = Gt(i)).r, (o = Gt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = qn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function B(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Bt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Rt = new RegExp(Bt.source, "g");
function ai(t) {
  return function () {
    return t;
  };
}
function li(t) {
  return function (n) {
    return t(n) + "";
  };
}
function ui(t, n) {
  var e = (Bt.lastIndex = Rt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Bt.exec(t)) && (i = Rt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: B(r, i) })),
      (e = Rt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? li(a[0].x)
        : ai(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var _n = 180 / Math.PI,
  Xt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Fn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * _n,
      skewX: Math.atan(a) * _n,
      scaleX: s,
      scaleY: c,
    }
  );
}
var ht;
function fi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Xt : Fn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function hi(t) {
  return t == null ||
    (ht || (ht = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    ht.setAttribute("transform", t),
    !(t = ht.transform.baseVal.consolidate()))
    ? Xt
    : ((t = t.matrix), Fn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Yn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, y) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      y.push({ i: m - 4, x: B(l, h) }, { i: m - 2, x: B(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: B(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: B(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, y) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      y.push({ i: m - 4, x: B(l, h) }, { i: m - 2, x: B(u, f) });
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
var di = Yn(fi, "px, ", "px)", "deg)"),
  pi = Yn(hi, ", ", ")", ")"),
  Z = 0,
  J = 0,
  Q = 0,
  Vn = 1e3,
  bt,
  j,
  Et = 0,
  Y = 0,
  It = 0,
  ot = typeof performance == "object" && performance.now ? performance : Date,
  zn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Zt() {
  return Y || (zn(gi), (Y = ot.now() + It));
}
function gi() {
  Y = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = Un.prototype = {
  constructor: $t,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Zt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        j !== this &&
        (j ? (j._next = this) : (bt = this), (j = this)),
      (this._call = t),
      (this._time = e),
      Ht();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ht());
  },
};
function Un(t, n, e) {
  var r = new $t();
  return r.restart(t, n, e), r;
}
function yi() {
  Zt(), ++Z;
  for (var t = bt, n; t; )
    (n = Y - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Z;
}
function vn() {
  (Y = (Et = ot.now()) + It), (Z = J = 0);
  try {
    yi();
  } finally {
    (Z = 0), _i(), (Y = 0);
  }
}
function mi() {
  var t = ot.now(),
    n = t - Et;
  n > Vn && ((It -= n), (Et = t));
}
function _i() {
  for (var t, n = bt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (bt = e)));
  (j = t), Ht(r);
}
function Ht(t) {
  if (!Z) {
    J && (J = clearTimeout(J));
    var n = t - Y;
    n > 24
      ? (t < 1 / 0 && (J = setTimeout(vn, t - ot.now() - It)),
        Q && (Q = clearInterval(Q)))
      : (Q || ((Et = ot.now()), (Q = setInterval(mi, Vn))), (Z = 1), zn(vn));
  }
}
function wn(t, n, e) {
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
var vi = zt("start", "end", "cancel", "interrupt"),
  wi = [],
  Kn = 0,
  xn = 1,
  qt = 2,
  mt = 3,
  bn = 4,
  Ft = 5,
  _t = 6;
function Nt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  xi(t, e, {
    name: n,
    index: r,
    group: i,
    on: vi,
    tween: wi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Kn,
  });
}
function Qt(t, n) {
  var e = N(t, n);
  if (e.state > Kn) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = N(t, n);
  if (e.state > mt) throw new Error("too late; already running");
  return e;
}
function N(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function xi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Un(o, 0, e.time));
  function o(l) {
    (e.state = xn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== xn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === mt) return wn(s);
        p.state === bn
          ? ((p.state = _t),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = _t),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (wn(function () {
        e.state === mt &&
          ((e.state = bn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = qt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === qt)
    ) {
      for (
        e.state = mt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = Ft), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ft && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = _t), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function bi(t, n) {
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
      (i = r.state > qt && r.state < Ft),
        (r.state = _t),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ei(t) {
  return this.each(function () {
    bi(this, t);
  });
}
function $i(t, n) {
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
function Ci(t, n, e) {
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
function Ii(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = N(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? $i : Ci)(e, t, n));
}
function Jt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = R(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return N(i, r).value[n];
    }
  );
}
function Wn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? B
      : n instanceof it
      ? mn
      : (e = it(n))
      ? ((n = e), mn)
      : ui
  )(t, n);
}
function Ni(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Pi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ai(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ki(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ti(t, n, e) {
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
function Si(t, n, e) {
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
function Mi(t, n) {
  var e = Ct(t),
    r = e === "transform" ? pi : Wn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Si : Ti)(e, r, Jt(this, "attr." + t, n))
      : n == null
      ? (e.local ? Pi : Ni)(e)
      : (e.local ? ki : Ai)(e, r, n)
  );
}
function Ri(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Li(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Oi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Li(t, o)), e;
  }
  return (i._value = n), i;
}
function Di(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Ri(t, o)), e;
  }
  return (i._value = n), i;
}
function Gi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Ct(t);
  return this.tween(e, (r.local ? Oi : Di)(r, n));
}
function Bi(t, n) {
  return function () {
    Qt(this, t).delay = +n.apply(this, arguments);
  };
}
function Xi(t, n) {
  return (
    (n = +n),
    function () {
      Qt(this, t).delay = n;
    }
  );
}
function Hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Bi : Xi)(n, t))
    : N(this.node(), n).delay;
}
function qi(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function Fi(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function Yi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? qi : Fi)(n, t))
    : N(this.node(), n).duration;
}
function Vi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function zi(t) {
  var n = this._id;
  return arguments.length ? this.each(Vi(n, t)) : N(this.node(), n).ease;
}
function Ui(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function Ki(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ui(this._id, t));
}
function Wi(t) {
  typeof t != "function" && (t = An(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new D(r, this._parents, this._name, this._id);
}
function Zi(t) {
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
  return new D(s, this._parents, this._name, this._id);
}
function Qi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Ji(t, n, e) {
  var r,
    i,
    o = Qi(n) ? Qt : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function ji(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? N(this.node(), e).on.on(t)
    : this.each(Ji(e, t, n));
}
function to(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function no() {
  return this.on("end.remove", to(this._id));
}
function eo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Ut(t));
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
        Nt(l[f], n, e, f, l, N(u, e)));
  return new D(o, this._parents, n, e);
}
function ro(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Pn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            y = N(u, e),
            m = 0,
            $ = f.length;
          m < $;
          ++m
        )
          (p = f[m]) && Nt(p, n, e, m, f, y);
        o.push(f), s.push(u);
      }
  return new D(o, s, n, e);
}
var io = st.prototype.constructor;
function oo() {
  return new io(this._groups, this._parents);
}
function so(t, n) {
  var e, r, i;
  return function () {
    var o = W(this, t),
      s = (this.style.removeProperty(t), W(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Zn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function co(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = W(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ao(t, n, e) {
  var r, i, o;
  return function () {
    var s = W(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), W(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function lo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = R(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Zn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function uo(t, n, e) {
  var r = (t += "") == "transform" ? di : Wn;
  return n == null
    ? this.styleTween(t, so(t, r)).on("end.style." + t, Zn(t))
    : typeof n == "function"
    ? this.styleTween(t, ao(t, r, Jt(this, "style." + t, n))).each(
        lo(this._id, t)
      )
    : this.styleTween(t, co(t, r, n), e).on("end.style." + t, null);
}
function fo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function ho(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && fo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function po(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, ho(t, n, e ?? ""));
}
function go(t) {
  return function () {
    this.textContent = t;
  };
}
function yo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function mo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? yo(Jt(this, "text", t))
      : go(t == null ? "" : t + "")
  );
}
function _o(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function vo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && _o(i)), n;
  }
  return (r._value = t), r;
}
function wo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, vo(t));
}
function xo() {
  for (
    var t = this._name,
      n = this._id,
      e = Qn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = N(a, n);
        Nt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new D(r, this._parents, t, e);
}
function bo() {
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
var Eo = 0;
function D(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Qn() {
  return ++Eo;
}
var L = st.prototype;
D.prototype = {
  constructor: D,
  select: eo,
  selectAll: ro,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: Wi,
  merge: Zi,
  selection: oo,
  transition: xo,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: ji,
  attr: Mi,
  attrTween: Gi,
  style: uo,
  styleTween: po,
  text: mo,
  textTween: wo,
  remove: no,
  tween: Ii,
  delay: Hi,
  duration: Yi,
  ease: zi,
  easeVarying: Ki,
  end: bo,
  [Symbol.iterator]: L[Symbol.iterator],
};
function $o(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Co = { time: null, delay: 0, duration: 250, ease: $o };
function Io(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function No(t) {
  var n, e;
  t instanceof D
    ? ((n = t._id), (t = t._name))
    : ((n = Qn()), ((e = Co).time = Zt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Nt(a, t, n, l, s, e || Io(a, n));
  return new D(r, this._parents, t, n);
}
st.prototype.interrupt = Ei;
st.prototype.transition = No;
const Yt = Math.PI,
  Vt = 2 * Yt,
  H = 1e-6,
  Po = Vt - H;
function Jn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Ao(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Jn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class ko {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Jn : Ao(n));
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
          V = Math.sqrt(m),
          P = Math.sqrt(f),
          A = o * Math.tan((Yt - Math.acos((m + f - $) / (2 * V * P))) / 2),
          d = A / P,
          g = A / V;
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
        (f < 0 && (f = (f % Vt) + Vt),
        f > Po
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > H &&
            this._append`A${r},${r},0,${+(f >= Yt)},${h},${(this._x1 =
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
function To(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function So(t, n) {
  return fetch(t, n).then(To);
}
function Mo(t) {
  return (n, e) => So(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Ro = Mo("application/xml");
function tt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
tt.prototype = {
  constructor: tt,
  scale: function (t) {
    return t === 1 ? this : new tt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new tt(this.k, this.x + this.k * t, this.y + this.k * n);
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
tt.prototype;
class Pt {
  constructor(n, e, r, i, o, s, c) {
    on(this, "dragged", (n) => {
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
    if (S("#" + this.id).node() != null) return;
    const n = await Ro(this.url);
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
      this.sensor.node().append(S(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          zr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    S(this).raise().classed("active", !0);
  }
  dragended(n) {
    S(this).classed("active", !1);
  }
}
const At = [
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
  ],
  Lo = [
    "relayPin1",
    "relayPin2",
    "relayPin3",
    "relayConnector1",
    "relayConnector2",
    "relayConnector3",
  ],
  dt = {
    relayPin1: "VCC pin of Relay",
    relayPin2: "GND pin of Relay",
    relayPin3: "Input Pin of Relay",
    relayConnector1: "NC pin of Relay",
    relayConnector2: "COM pin of Relay",
    relayConnector3: "NO pin of Relay",
  },
  Oo = ["m1", "m2"],
  pt = { m1: "-ve terminal of motor", m2: "+ve terminal of motor" },
  Do = ["batteryP", "batteryN"],
  gt = {
    batteryP: "+ve terminal of Battery",
    batteryN: "-ve terminal of Battery",
  },
  X = {
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
  },
  Go = (t) => {
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
        if (X[r.connector] == "GND" || X[r.connector] == "3.3v") {
          console.log("found", r.connector), e++;
          return;
        }
        At[r.connector] && X[r.connector].includes("GPIO") && e++;
      }),
      e == 10
    );
  };
class Bo {
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
      const e = X[this.connections[this.connections.length - 2].connector]
          ? X[this.connections[this.connections.length - 2].connector]
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : dt[this.connections[this.connections.length - 2].connector]
          ? dt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? X[this.connections[this.connections.length - 1].connector]
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
          : dt[this.connections[this.connections.length - 1].connector]
          ? dt[this.connections[this.connections.length - 1].connector]
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
class Xo {
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
const En = (t, n) => {
    jt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  O = S("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Ho = new Pt("raspberry", O, "./images/pi3dirk-5f8e35c9.svg", 1, !1),
  qo = new Pt("relay", O, "./images/relay-6ad2afac.svg", 0.3, !1, 300, 35),
  Fo = new Pt("dc_motor", O, "./images/motor-893372b1.svg", 1, !1, 500, 300),
  Yo = new Pt("batterComponent", O, "./images/battery-1582aebe.svg", 0.2, !1, 300, 300),
  jt = O.append("g").attr("id", "pathsGroup"),
  Vo = document.getElementById("rasberryPi"),
  zo = document.getElementById("displayInfo"),
  Uo = document.getElementById("codeSubmit"),
  Ko = document.getElementById("relayContainer"),
  Wo = document.getElementById("motor"),
  Zo = document.getElementById("battery"),
  Qo = document.getElementById("info"),
  Jo = document.getElementById("list");
let Lt = !1;
Qo.addEventListener("click", () => {
  (Lt = !Lt), (Jo.style.display = Lt ? "block" : "none");
});
const jo = (t) => S(t).classed("rotate", !0),
  $n = (t) =>
    At.includes(t.srcElement.id) ||
    Oo.includes(t.srcElement.id) ||
    Lo.includes(t.srcElement.id) ||
    Do.includes(t.srcElement.id);
Vo.addEventListener("click", async () => await Ho.load());
Ko.addEventListener("click", () => qo.load());
Wo.addEventListener("click", () => Fo.load());
Zo.addEventListener("click", () => Yo.load());
let w;
const I = new Bo("connectionLog"),
  Cn = new Xo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let T = 0;
const ts = document.querySelector("#undoButton");
ts.addEventListener("click", () => {
  I.undoLastConnection(), es();
});
const ns = (t) => {
    jt.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => {
        e.remove();
      });
  },
  es = () => {
    if (w) {
      jt
        .selectAll(`path[id^="path${T}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (w = null),
        (T = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (I.connections.length > 0) {
      const n = I.connections[I.connections.length - 1].lineID;
      ns(n),
        I.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
function rs(t) {
  const n = document.getElementById(t);
  n && (n.style.display = n.style.display === "none" ? "block" : "none");
}
const In = document.getElementById("infoIcon"),
  is = document.getElementById("generalInstructions");
In &&
  is &&
  In.addEventListener("click", () => {
    rs("generalInstructions");
  });
O.on("dblclick", (t) => {
  if ($n(t) && w == null) {
    (w = new ko()),
      w.moveTo(t.offsetX, t.offsetY),
      I.addConnection({
        lineID: `path${T}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      O.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(T, "path count");
    return;
  }
  if (t.srcElement.id == "svgContainer" && !At.includes(t.srcElement.id)) {
    w && w.lineTo(t.offsetX, t.offsetY),
      w &&
        I.connections.length > 0 &&
        (I.connections[I.connections.length - 1].connectorEnd = null),
      w &&
        (En(w.toString(), `path${T}`),
        console.log("path created"),
        console.log(T));
    return;
  }
  if ($n(t) && w) {
    w.lineTo(t.offsetX, t.offsetY),
      En(w.toString(), `path${T}`),
      I.addConnection({
        lineID: `path${T}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      T++,
      O.style("cursor", "default"),
      (w = null),
      console.log("connectedPointSequence", connectedPointSequence),
      console.log("path created 2"),
      console.log(T);
    return;
  }
});
O.on("mouseover", (t) => {
  At.includes(t.srcElement.id) && (zo.innerHTML = X[t.srcElement.id]);
});
Uo.addEventListener("click", () => {
  const t = Go(I.getConnectionLog());
  t == !0
    ? (jo("#rotor"), document.querySelector("#my-drawer-4").click())
    : t.error
    ? Cn.throw("Error", t.error)
    : Cn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
