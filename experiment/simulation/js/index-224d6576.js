var we = Object.defineProperty;
var be = (t, n, e) =>
  n in t
    ? we(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var $n = (t, n, e) => (be(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var Ee = { value: () => {} };
function ln() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new It(e);
}
function It(t) {
  this._ = t;
}
function $e(t, n) {
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
It.prototype = ln.prototype = {
  constructor: It,
  on: function (t, n) {
    var e = this._,
      r = $e(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Ce(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = Cn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = Cn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new It(t);
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
function Ce(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function Cn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Ee), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Qt = "http://www.w3.org/1999/xhtml";
const Nn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Qt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Gt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Nn.hasOwnProperty(n) ? { space: Nn[n], local: t } : t
  );
}
function Ne(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Qt && n.documentElement.namespaceURI === Qt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Ie(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Un(t) {
  var n = Gt(t);
  return (n.local ? Ie : Ne)(n);
}
function Me() {}
function un(t) {
  return t == null
    ? Me
    : function () {
        return this.querySelector(t);
      };
}
function ke(t) {
  typeof t != "function" && (t = un(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new $(r, this._parents);
}
function Pe(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ae() {
  return [];
}
function zn(t) {
  return t == null
    ? Ae
    : function () {
        return this.querySelectorAll(t);
      };
}
function Te(t) {
  return function () {
    return Pe(t.apply(this, arguments));
  };
}
function Re(t) {
  typeof t == "function" ? (t = Te(t)) : (t = zn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new $(r, i);
}
function Wn(t) {
  return function () {
    return this.matches(t);
  };
}
function Kn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Se = Array.prototype.find;
function Oe(t) {
  return function () {
    return Se.call(this.children, t);
  };
}
function Le() {
  return this.firstElementChild;
}
function De(t) {
  return this.select(t == null ? Le : Oe(typeof t == "function" ? t : Kn(t)));
}
var Be = Array.prototype.filter;
function Ge() {
  return Array.from(this.children);
}
function He(t) {
  return function () {
    return Be.call(this.children, t);
  };
}
function Xe(t) {
  return this.selectAll(
    t == null ? Ge : He(typeof t == "function" ? t : Kn(t))
  );
}
function Fe(t) {
  typeof t != "function" && (t = Wn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new $(r, this._parents);
}
function Zn(t) {
  return new Array(t.length);
}
function Ye() {
  return new $(this._enter || this._groups.map(Zn), this._parents);
}
function Rt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
Rt.prototype = {
  constructor: Rt,
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
function Ve(t) {
  return function () {
    return t;
  };
}
function qe(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new Rt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ue(t, n, e, r, i, o, s) {
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
        : (e[c] = new Rt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function ze(t) {
  return t.__data__;
}
function We(t, n) {
  if (!arguments.length) return Array.from(this, ze);
  var e = n ? Ue : qe,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Ve(t));
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
      p = Ke(t.call(u, u && u.__data__, l, r)),
      m = p.length,
      _ = (c[l] = new Array(m)),
      I = (s[l] = new Array(m)),
      Z = (a[l] = new Array(f));
    e(u, h, _, I, Z, p, n);
    for (var A = 0, T = 0, d, y; A < m; ++A)
      if ((d = _[A])) {
        for (A >= T && (T = A + 1); !(y = I[T]) && ++T < m; );
        d._next = y || null;
      }
  }
  return (s = new $(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ke(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ze() {
  return new $(this._exit || this._groups.map(Zn), this._parents);
}
function Qe(t, n, e) {
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
function Je(t) {
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
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, m = 0;
      m < h;
      ++m
    )
      (p = l[m] || u[m]) && (f[m] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new $(c, this._parents);
}
function je() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function tr(t) {
  t || (t = nr);
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
  return new $(i, this._parents).order();
}
function nr(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function er() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function rr() {
  return Array.from(this);
}
function ir() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function or() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function sr() {
  return !this.node();
}
function cr(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function ar(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function lr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ur(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function fr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function hr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function dr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function pr(t, n) {
  var e = Gt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? lr
        : ar
      : typeof n == "function"
      ? e.local
        ? dr
        : hr
      : e.local
      ? fr
      : ur)(e, n)
  );
}
function Qn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function gr(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function yr(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function mr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function _r(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? gr : typeof n == "function" ? mr : yr)(t, n, e ?? "")
      )
    : tt(this.node(), t);
}
function tt(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Qn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function xr(t) {
  return function () {
    delete this[t];
  };
}
function vr(t, n) {
  return function () {
    this[t] = n;
  };
}
function wr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function br(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? xr : typeof n == "function" ? wr : vr)(t, n))
    : this.node()[t];
}
function Jn(t) {
  return t.trim().split(/^|\s+/);
}
function fn(t) {
  return t.classList || new jn(t);
}
function jn(t) {
  (this._node = t), (this._names = Jn(t.getAttribute("class") || ""));
}
jn.prototype = {
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
function te(t, n) {
  for (var e = fn(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function ne(t, n) {
  for (var e = fn(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function Er(t) {
  return function () {
    te(this, t);
  };
}
function $r(t) {
  return function () {
    ne(this, t);
  };
}
function Cr(t, n) {
  return function () {
    (n.apply(this, arguments) ? te : ne)(this, t);
  };
}
function Nr(t, n) {
  var e = Jn(t + "");
  if (arguments.length < 2) {
    for (var r = fn(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Cr : n ? Er : $r)(e, n));
}
function Ir() {
  this.textContent = "";
}
function Mr(t) {
  return function () {
    this.textContent = t;
  };
}
function kr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Pr(t) {
  return arguments.length
    ? this.each(t == null ? Ir : (typeof t == "function" ? kr : Mr)(t))
    : this.node().textContent;
}
function Ar() {
  this.innerHTML = "";
}
function Tr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Rr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Sr(t) {
  return arguments.length
    ? this.each(t == null ? Ar : (typeof t == "function" ? Rr : Tr)(t))
    : this.node().innerHTML;
}
function Or() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Lr() {
  return this.each(Or);
}
function Dr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Br() {
  return this.each(Dr);
}
function Gr(t) {
  var n = typeof t == "function" ? t : Un(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Hr() {
  return null;
}
function Xr(t, n) {
  var e = typeof t == "function" ? t : Un(t),
    r = n == null ? Hr : typeof n == "function" ? n : un(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Fr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Yr() {
  return this.each(Fr);
}
function Vr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function qr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Ur(t) {
  return this.select(t ? qr : Vr);
}
function zr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Wr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Kr(t) {
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
function Zr(t) {
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
function Qr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Wr(n);
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
function Jr(t, n, e) {
  var r = Kr(t + ""),
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
  for (c = n ? Qr : Zr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function ee(t, n, e) {
  var r = Qn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function jr(t, n) {
  return function () {
    return ee(this, t, n);
  };
}
function ti(t, n) {
  return function () {
    return ee(this, t, n.apply(this, arguments));
  };
}
function ni(t, n) {
  return this.each((typeof n == "function" ? ti : jr)(t, n));
}
function* ei() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var re = [null];
function $(t, n) {
  (this._groups = t), (this._parents = n);
}
function _t() {
  return new $([[document.documentElement]], re);
}
function ri() {
  return this;
}
$.prototype = _t.prototype = {
  constructor: $,
  select: ke,
  selectAll: Re,
  selectChild: De,
  selectChildren: Xe,
  filter: Fe,
  data: We,
  enter: Ye,
  exit: Ze,
  join: Qe,
  merge: Je,
  selection: ri,
  order: je,
  sort: tr,
  call: er,
  nodes: rr,
  node: ir,
  size: or,
  empty: sr,
  each: cr,
  attr: pr,
  style: _r,
  property: br,
  classed: Nr,
  text: Pr,
  html: Sr,
  raise: Lr,
  lower: Br,
  append: Gr,
  insert: Xr,
  remove: Yr,
  clone: Ur,
  datum: zr,
  on: Jr,
  dispatch: ni,
  [Symbol.iterator]: ei,
};
function b(t) {
  return typeof t == "string"
    ? new $([[document.querySelector(t)]], [document.documentElement])
    : new $([[t]], re);
}
function ii(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function In(t, n) {
  if (((t = ii(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const oi = { passive: !1 },
  dt = { capture: !0, passive: !1 };
function zt(t) {
  t.stopImmediatePropagation();
}
function J(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function si(t) {
  var n = t.document.documentElement,
    e = b(t).on("dragstart.drag", J, dt);
  "onselectstart" in n
    ? e.on("selectstart.drag", J, dt)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function ci(t, n) {
  var e = t.document.documentElement,
    r = b(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", J, dt),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const wt = (t) => () => t;
function Jt(
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
Jt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function ai(t) {
  return !t.ctrlKey && !t.button;
}
function li() {
  return this.parentNode;
}
function ui(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function fi() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function hi() {
  var t = ai,
    n = li,
    e = ui,
    r = fi,
    i = {},
    o = ln("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", I)
      .on("touchmove.drag", Z, oi)
      .on("touchend.drag touchcancel.drag", A)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, y) {
    if (!(u || !t.call(this, d, y))) {
      var x = T(this, n.call(this, d, y), d, y, "mouse");
      x &&
        (b(d.view).on("mousemove.drag", m, dt).on("mouseup.drag", _, dt),
        si(d.view),
        zt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        x("start", d));
    }
  }
  function m(d) {
    if ((J(d), !l)) {
      var y = d.clientX - c,
        x = d.clientY - a;
      l = y * y + x * x > h;
    }
    i.mouse("drag", d);
  }
  function _(d) {
    b(d.view).on("mousemove.drag mouseup.drag", null),
      ci(d.view, l),
      J(d),
      i.mouse("end", d);
  }
  function I(d, y) {
    if (t.call(this, d, y)) {
      var x = d.changedTouches,
        w = n.call(this, d, y),
        C = x.length,
        G,
        Q;
      for (G = 0; G < C; ++G)
        (Q = T(this, w, d, y, x[G].identifier, x[G])) &&
          (zt(d), Q("start", d, x[G]));
    }
  }
  function Z(d) {
    var y = d.changedTouches,
      x = y.length,
      w,
      C;
    for (w = 0; w < x; ++w)
      (C = i[y[w].identifier]) && (J(d), C("drag", d, y[w]));
  }
  function A(d) {
    var y = d.changedTouches,
      x = y.length,
      w,
      C;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        w = 0;
      w < x;
      ++w
    )
      (C = i[y[w].identifier]) && (zt(d), C("end", d, y[w]));
  }
  function T(d, y, x, w, C, G) {
    var Q = o.copy(),
      R = In(G || x, y),
      vn,
      wn,
      vt;
    if (
      (vt = e.call(
        d,
        new Jt("beforestart", {
          sourceEvent: x,
          target: f,
          identifier: C,
          active: s,
          x: R[0],
          y: R[1],
          dx: 0,
          dy: 0,
          dispatch: Q,
        }),
        w
      )) != null
    )
      return (
        (vn = vt.x - R[0] || 0),
        (wn = vt.y - R[1] || 0),
        function xe(qt, bn, ve) {
          var En = R,
            Ut;
          switch (qt) {
            case "start":
              (i[C] = xe), (Ut = s++);
              break;
            case "end":
              delete i[C], --s;
            case "drag":
              (R = In(ve || bn, y)), (Ut = s);
              break;
          }
          Q.call(
            qt,
            d,
            new Jt(qt, {
              sourceEvent: bn,
              subject: vt,
              target: f,
              identifier: C,
              active: Ut,
              x: R[0] + vn,
              y: R[1] + wn,
              dx: R[0] - En[0],
              dy: R[1] - En[1],
              dispatch: Q,
            }),
            w
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : wt(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : wt(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : wt(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : wt(!!d)), f)
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
function hn(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function ie(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function xt() {}
var pt = 0.7,
  St = 1 / pt,
  j = "\\s*([+-]?\\d+)\\s*",
  gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  S = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  di = /^#([0-9a-f]{3,8})$/,
  pi = new RegExp(`^rgb\\(${j},${j},${j}\\)$`),
  gi = new RegExp(`^rgb\\(${S},${S},${S}\\)$`),
  yi = new RegExp(`^rgba\\(${j},${j},${j},${gt}\\)$`),
  mi = new RegExp(`^rgba\\(${S},${S},${S},${gt}\\)$`),
  _i = new RegExp(`^hsl\\(${gt},${S},${S}\\)$`),
  xi = new RegExp(`^hsla\\(${gt},${S},${S},${gt}\\)$`),
  Mn = {
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
hn(xt, yt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: kn,
  formatHex: kn,
  formatHex8: vi,
  formatHsl: wi,
  formatRgb: Pn,
  toString: Pn,
});
function kn() {
  return this.rgb().formatHex();
}
function vi() {
  return this.rgb().formatHex8();
}
function wi() {
  return oe(this).formatHsl();
}
function Pn() {
  return this.rgb().formatRgb();
}
function yt(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = di.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? An(n)
          : e === 3
          ? new E(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? bt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? bt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = pi.exec(t))
      ? new E(n[1], n[2], n[3], 1)
      : (n = gi.exec(t))
      ? new E((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = yi.exec(t))
      ? bt(n[1], n[2], n[3], n[4])
      : (n = mi.exec(t))
      ? bt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = _i.exec(t))
      ? Sn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = xi.exec(t))
      ? Sn(n[1], n[2] / 100, n[3] / 100, n[4])
      : Mn.hasOwnProperty(t)
      ? An(Mn[t])
      : t === "transparent"
      ? new E(NaN, NaN, NaN, 0)
      : null
  );
}
function An(t) {
  return new E((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function bt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new E(t, n, e, r);
}
function bi(t) {
  return (
    t instanceof xt || (t = yt(t)),
    t ? ((t = t.rgb()), new E(t.r, t.g, t.b, t.opacity)) : new E()
  );
}
function jt(t, n, e, r) {
  return arguments.length === 1 ? bi(t) : new E(t, n, e, r ?? 1);
}
function E(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
hn(
  E,
  jt,
  ie(xt, {
    brighter(t) {
      return (
        (t = t == null ? St : Math.pow(St, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? pt : Math.pow(pt, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new E(W(this.r), W(this.g), W(this.b), Ot(this.opacity));
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
    hex: Tn,
    formatHex: Tn,
    formatHex8: Ei,
    formatRgb: Rn,
    toString: Rn,
  })
);
function Tn() {
  return `#${z(this.r)}${z(this.g)}${z(this.b)}`;
}
function Ei() {
  return `#${z(this.r)}${z(this.g)}${z(this.b)}${z(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Rn() {
  const t = Ot(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${W(this.r)}, ${W(this.g)}, ${W(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Ot(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function W(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function z(t) {
  return (t = W(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Sn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new k(t, n, e, r)
  );
}
function oe(t) {
  if (t instanceof k) return new k(t.h, t.s, t.l, t.opacity);
  if ((t instanceof xt || (t = yt(t)), !t)) return new k();
  if (t instanceof k) return t;
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
    new k(s, c, a, t.opacity)
  );
}
function $i(t, n, e, r) {
  return arguments.length === 1 ? oe(t) : new k(t, n, e, r ?? 1);
}
function k(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
hn(
  k,
  $i,
  ie(xt, {
    brighter(t) {
      return (
        (t = t == null ? St : Math.pow(St, t)),
        new k(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? pt : Math.pow(pt, t)),
        new k(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new E(
        Wt(t >= 240 ? t - 240 : t + 120, i, r),
        Wt(t, i, r),
        Wt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new k(On(this.h), Et(this.s), Et(this.l), Ot(this.opacity));
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
      const t = Ot(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${On(this.h)}, ${
        Et(this.s) * 100
      }%, ${Et(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function On(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function Et(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Wt(t, n, e) {
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
const se = (t) => () => t;
function Ci(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function Ni(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Ii(t) {
  return (t = +t) == 1
    ? ce
    : function (n, e) {
        return e - n ? Ni(n, e, t) : se(isNaN(n) ? e : n);
      };
}
function ce(t, n) {
  var e = n - t;
  return e ? Ci(t, e) : se(isNaN(t) ? n : t);
}
const Ln = (function t(n) {
  var e = Ii(n);
  function r(i, o) {
    var s = e((i = jt(i)).r, (o = jt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = ce(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function H(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var tn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Kt = new RegExp(tn.source, "g");
function Mi(t) {
  return function () {
    return t;
  };
}
function ki(t) {
  return function (n) {
    return t(n) + "";
  };
}
function Pi(t, n) {
  var e = (tn.lastIndex = Kt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = tn.exec(t)) && (i = Kt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: H(r, i) })),
      (e = Kt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? ki(a[0].x)
        : Mi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var Dn = 180 / Math.PI,
  nn = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function ae(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Dn,
      skewX: Math.atan(a) * Dn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var $t;
function Ai(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? nn : ae(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ti(t) {
  return t == null ||
    ($t || ($t = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    $t.setAttribute("transform", t),
    !(t = $t.transform.baseVal.consolidate()))
    ? nn
    : ((t = t.matrix), ae(t.a, t.b, t.c, t.d, t.e, t.f));
}
function le(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var _ = p.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: H(l, h) }, { i: _ - 2, x: H(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: H(l, h) }, { i: _ - 2, x: H(u, f) });
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
        for (var m = -1, _ = f.length, I; ++m < _; ) h[(I = f[m]).i] = I.x(p);
        return h.join("");
      }
    );
  };
}
var Ri = le(Ai, "px, ", "px)", "deg)"),
  Si = le(Ti, ", ", ")", ")"),
  nt = 0,
  rt = 0,
  et = 0,
  ue = 1e3,
  Lt,
  it,
  Dt = 0,
  K = 0,
  Ht = 0,
  mt = typeof performance == "object" && performance.now ? performance : Date,
  fe =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function dn() {
  return K || (fe(Oi), (K = mt.now() + Ht));
}
function Oi() {
  K = 0;
}
function Bt() {
  this._call = this._time = this._next = null;
}
Bt.prototype = he.prototype = {
  constructor: Bt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? dn() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        it !== this &&
        (it ? (it._next = this) : (Lt = this), (it = this)),
      (this._call = t),
      (this._time = e),
      en();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), en());
  },
};
function he(t, n, e) {
  var r = new Bt();
  return r.restart(t, n, e), r;
}
function Li() {
  dn(), ++nt;
  for (var t = Lt, n; t; )
    (n = K - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --nt;
}
function Bn() {
  (K = (Dt = mt.now()) + Ht), (nt = rt = 0);
  try {
    Li();
  } finally {
    (nt = 0), Bi(), (K = 0);
  }
}
function Di() {
  var t = mt.now(),
    n = t - Dt;
  n > ue && ((Ht -= n), (Dt = t));
}
function Bi() {
  for (var t, n = Lt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Lt = e)));
  (it = t), en(r);
}
function en(t) {
  if (!nt) {
    rt && (rt = clearTimeout(rt));
    var n = t - K;
    n > 24
      ? (t < 1 / 0 && (rt = setTimeout(Bn, t - mt.now() - Ht)),
        et && (et = clearInterval(et)))
      : (et || ((Dt = mt.now()), (et = setInterval(Di, ue))), (nt = 1), fe(Bn));
  }
}
function Gn(t, n, e) {
  var r = new Bt();
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
var Gi = ln("start", "end", "cancel", "interrupt"),
  Hi = [],
  de = 0,
  Hn = 1,
  rn = 2,
  Mt = 3,
  Xn = 4,
  on = 5,
  kt = 6;
function Xt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Xi(t, e, {
    name: n,
    index: r,
    group: i,
    on: Gi,
    tween: Hi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: de,
  });
}
function pn(t, n) {
  var e = P(t, n);
  if (e.state > de) throw new Error("too late; already scheduled");
  return e;
}
function O(t, n) {
  var e = P(t, n);
  if (e.state > Mt) throw new Error("too late; already running");
  return e;
}
function P(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Xi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = he(o, 0, e.time));
  function o(l) {
    (e.state = Hn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== Hn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === Mt) return Gn(s);
        p.state === Xn
          ? ((p.state = kt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = kt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Gn(function () {
        e.state === Mt &&
          ((e.state = Xn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = rn),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === rn)
    ) {
      for (
        e.state = Mt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = on), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === on && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = kt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Fi(t, n) {
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
      (i = r.state > rn && r.state < on),
        (r.state = kt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Yi(t) {
  return this.each(function () {
    Fi(this, t);
  });
}
function Vi(t, n) {
  var e, r;
  return function () {
    var i = O(this, t),
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
function qi(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = O(this, t),
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
function Ui(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = P(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Vi : qi)(e, t, n));
}
function gn(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = O(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return P(i, r).value[n];
    }
  );
}
function pe(t, n) {
  var e;
  return (
    typeof n == "number"
      ? H
      : n instanceof yt
      ? Ln
      : (e = yt(n))
      ? ((n = e), Ln)
      : Pi
  )(t, n);
}
function zi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Wi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ki(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Zi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Qi(t, n, e) {
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
function Ji(t, n, e) {
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
function ji(t, n) {
  var e = Gt(t),
    r = e === "transform" ? Si : pe;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Ji : Qi)(e, r, gn(this, "attr." + t, n))
      : n == null
      ? (e.local ? Wi : zi)(e)
      : (e.local ? Zi : Ki)(e, r, n)
  );
}
function to(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function no(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function eo(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && no(t, o)), e;
  }
  return (i._value = n), i;
}
function ro(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && to(t, o)), e;
  }
  return (i._value = n), i;
}
function io(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Gt(t);
  return this.tween(e, (r.local ? eo : ro)(r, n));
}
function oo(t, n) {
  return function () {
    pn(this, t).delay = +n.apply(this, arguments);
  };
}
function so(t, n) {
  return (
    (n = +n),
    function () {
      pn(this, t).delay = n;
    }
  );
}
function co(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? oo : so)(n, t))
    : P(this.node(), n).delay;
}
function ao(t, n) {
  return function () {
    O(this, t).duration = +n.apply(this, arguments);
  };
}
function lo(t, n) {
  return (
    (n = +n),
    function () {
      O(this, t).duration = n;
    }
  );
}
function uo(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ao : lo)(n, t))
    : P(this.node(), n).duration;
}
function fo(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    O(this, t).ease = n;
  };
}
function ho(t) {
  var n = this._id;
  return arguments.length ? this.each(fo(n, t)) : P(this.node(), n).ease;
}
function po(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    O(this, t).ease = e;
  };
}
function go(t) {
  if (typeof t != "function") throw new Error();
  return this.each(po(this._id, t));
}
function yo(t) {
  typeof t != "function" && (t = Wn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new B(r, this._parents, this._name, this._id);
}
function mo(t) {
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
  return new B(s, this._parents, this._name, this._id);
}
function _o(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function xo(t, n, e) {
  var r,
    i,
    o = _o(n) ? pn : O;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function vo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? P(this.node(), e).on.on(t)
    : this.each(xo(e, t, n));
}
function wo(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function bo() {
  return this.on("end.remove", wo(this._id));
}
function Eo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = un(t));
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
        Xt(l[f], n, e, f, l, P(u, e)));
  return new B(o, this._parents, n, e);
}
function $o(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = zn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            m = P(u, e),
            _ = 0,
            I = f.length;
          _ < I;
          ++_
        )
          (p = f[_]) && Xt(p, n, e, _, f, m);
        o.push(f), s.push(u);
      }
  return new B(o, s, n, e);
}
var Co = _t.prototype.constructor;
function No() {
  return new Co(this._groups, this._parents);
}
function Io(t, n) {
  var e, r, i;
  return function () {
    var o = tt(this, t),
      s = (this.style.removeProperty(t), tt(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function ge(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Mo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = tt(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function ko(t, n, e) {
  var r, i, o;
  return function () {
    var s = tt(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), tt(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function Po(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = O(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = ge(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function Ao(t, n, e) {
  var r = (t += "") == "transform" ? Ri : pe;
  return n == null
    ? this.styleTween(t, Io(t, r)).on("end.style." + t, ge(t))
    : typeof n == "function"
    ? this.styleTween(t, ko(t, r, gn(this, "style." + t, n))).each(
        Po(this._id, t)
      )
    : this.styleTween(t, Mo(t, r, n), e).on("end.style." + t, null);
}
function To(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Ro(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && To(t, s, e)), r;
  }
  return (o._value = n), o;
}
function So(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Ro(t, n, e ?? ""));
}
function Oo(t) {
  return function () {
    this.textContent = t;
  };
}
function Lo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Do(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Lo(gn(this, "text", t))
      : Oo(t == null ? "" : t + "")
  );
}
function Bo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Go(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Bo(i)), n;
  }
  return (r._value = t), r;
}
function Ho(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Go(t));
}
function Xo() {
  for (
    var t = this._name,
      n = this._id,
      e = ye(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = P(a, n);
        Xt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new B(r, this._parents, t, e);
}
function Fo() {
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
      var l = O(this, r),
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
var Yo = 0;
function B(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function ye() {
  return ++Yo;
}
var L = _t.prototype;
B.prototype = {
  constructor: B,
  select: Eo,
  selectAll: $o,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: yo,
  merge: mo,
  selection: No,
  transition: Xo,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: vo,
  attr: ji,
  attrTween: io,
  style: Ao,
  styleTween: So,
  text: Do,
  textTween: Ho,
  remove: bo,
  tween: Ui,
  delay: co,
  duration: uo,
  ease: ho,
  easeVarying: go,
  end: Fo,
  [Symbol.iterator]: L[Symbol.iterator],
};
function Vo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qo = { time: null, delay: 0, duration: 250, ease: Vo };
function Uo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function zo(t) {
  var n, e;
  t instanceof B
    ? ((n = t._id), (t = t._name))
    : ((n = ye()), ((e = qo).time = dn()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Xt(a, t, n, l, s, e || Uo(a, n));
  return new B(r, this._parents, t, n);
}
_t.prototype.interrupt = Yi;
_t.prototype.transition = zo;
const sn = Math.PI,
  cn = 2 * sn,
  q = 1e-6,
  Wo = cn - q;
function me(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Ko(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return me;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Zo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? me : Ko(n));
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
    else if (f > q)
      if (!(Math.abs(h * a - l * u) > q) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          m = i - c,
          _ = a * a + l * l,
          I = p * p + m * m,
          Z = Math.sqrt(_),
          A = Math.sqrt(f),
          T = o * Math.tan((sn - Math.acos((_ + f - I) / (2 * Z * A))) / 2),
          d = T / A,
          y = T / Z;
        Math.abs(d - 1) > q && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * m)},${(this._x1 =
            n + y * a)},${(this._y1 = e + y * l)}`;
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
      : (Math.abs(this._x1 - l) > q || Math.abs(this._y1 - u) > q) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % cn) + cn),
        f > Wo
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > q &&
            this._append`A${r},${r},0,${+(f >= sn)},${h},${(this._x1 =
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
function Qo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Jo(t, n) {
  return fetch(t, n).then(Qo);
}
function jo(t) {
  return (n, e) => Jo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const ts = jo("application/xml");
function ot(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
ot.prototype = {
  constructor: ot,
  scale: function (t) {
    return t === 1 ? this : new ot(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new ot(this.k, this.x + this.k * t, this.y + this.k * n);
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
ot.prototype;
class Ft {
  constructor(n, e, r, i, o, s, c) {
    $n(this, "dragged", (n) => {
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
    if (b("#" + this.id).node() != null) return;
    const n = await ts(this.url);
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
      this.sensor.node().append(b(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          hi()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    b(this).raise().classed("active", !0);
  }
  dragended(n) {
    b(this).classed("active", !1);
  }
}
const V = [
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
    "_x30_.1.0.220.2.3-0": "HDMI",
    "_x30_.1.0.221.0.5.13-6": "Power",
    "_x30_.1.0.223.0.0.1.12-2": "Ethernet",
    "_x30_.1.0.224.0.10-7": "USB 0",
    "_x30_.1.0.224.0.10_1_-3": "USB 1",
    "_x30_.1.0.226.0.1": "CSI Camera",
    "_x30_.1.0.227.1": "DSI Display",
  },
  yn = [
    "relayPin1",
    "relayPin2",
    "relayPin3",
    "relayConnector1",
    "relayConnector2",
    "relayConnector3",
  ],
  Ct = {
    relayPin1: "VCC pin of Relay",
    relayPin2: "GND pin of Relay",
    relayPin3: "Input Pin of Relay",
    relayConnector1: "NC pin of Relay",
    relayConnector2: "COM pin of Relay",
    relayConnector3: "NO pin of Relay",
  },
  mn = ["m1", "m2"],
  st = { m1: "-ve terminal of motor", m2: "+ve terminal of motor" },
  _n = ["batteryP", "batteryN"],
  ct = {
    batteryP: "+ve terminal of Battery",
    batteryN: "-ve terminal of Battery",
  },
  ns = (t) => {
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
        V[r.connector] && X[r.connector].includes("GPIO") && e++;
      }),
      e == 10
    );
  };
class es {
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
          ? `${
              X[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : ct[this.connections[this.connections.length - 2].connector]
          ? ct[this.connections[this.connections.length - 2].connector]
          : st[this.connections[this.connections.length - 2].connector]
          ? st[this.connections[this.connections.length - 2].connector]
          : Ct[this.connections[this.connections.length - 2].connector]
          ? Ct[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = X[this.connections[this.connections.length - 1].connector]
          ? `${
              X[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : ct[this.connections[this.connections.length - 1].connector]
          ? ct[this.connections[this.connections.length - 1].connector]
          : st[this.connections[this.connections.length - 1].connector]
          ? st[this.connections[this.connections.length - 1].connector]
          : Ct[this.connections[this.connections.length - 1].connector]
          ? Ct[this.connections[this.connections.length - 1].connector]
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
class rs {
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
const F = document.getElementById("svg");
F || console.error("SVG container not found");
const at = (F == null ? void 0 : F.offsetWidth) || window.innerWidth,
  is =
    (F != null && F.offsetTop
      ? window.innerHeight - F.offsetTop
      : window.innerHeight) || 400,
  _e = window.innerWidth < 850,
  Fn = {
    desktop: {
      raspberry: { scale: 1, x: 0, y: 0 },
      relay: { scale: 0.3, x: 300, y: 35 },
      dc_motor: { scale: 1, x: 500, y: 300 },
      battery: { scale: 0.2, x: 300, y: 300 },
    },
    mobile: {
      raspberry: { scale: 0.25, x: at * 0.1, y: 10 },
      relay: { scale: 0.075, x: at * 0.3, y: 35 },
      dc_motor: { scale: 0.25, x: at * 0.5, y: 150 },
      battery: { scale: 0.05, x: at * 0.3, y: 150 },
    },
  },
  g = _e ? Fn.mobile : Fn.desktop,
  os = Math.max(
    g.raspberry.x + 400 * g.raspberry.scale,
    g.relay.x + 200 * g.relay.scale,
    g.dc_motor.x + 100 * g.dc_motor.scale,
    g.battery.x + 100 * g.battery.scale
  ),
  ss = Math.max(
    g.raspberry.y + 200 * g.raspberry.scale,
    g.relay.y + 100 * g.relay.scale,
    g.dc_motor.y + 100 * g.dc_motor.scale,
    g.battery.y + 100 * g.battery.scale
  ),
  cs = Math.max(at, os + 50),
  as = Math.max(is, ss + 50),
  v = b("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr("viewBox", `0 0 ${cs} ${as}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto"),
  Yn = (t, n) => {
    xn.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  Vn = (t, n, e) => {
    v.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  ls = new Ft(
    "raspberry",
    v,
    "images/pi3dirk.svg",
    g.raspberry.scale,
    !1,
    g.raspberry.x,
    g.raspberry.y
  ),
  us = new Ft(
    "relay",
    v,
    "images/relay.svg",
    g.relay.scale,
    !1,
    g.relay.x,
    g.relay.y
  ),
  fs = new Ft(
    "dc_motor",
    v,
    "images/motor.svg",
    g.dc_motor.scale,
    !1,
    g.dc_motor.x,
    g.dc_motor.y
  ),
  hs = new Ft(
    "batteryComponent",
    v,
    "images/battery.svg",
    g.battery.scale,
    !1,
    g.battery.x,
    g.battery.y
  ),
  xn = v.append("g").attr("id", "pathsGroup"),
  Yt = {
    rasberryPi:
      "Raspberry Pi: Controls the relay module using GPIO 21 to switch the relay on/off, enabling or disabling the motor circuit powered by the battery. Connects 3.3V and GND to power the relay.",
    relayContainer:
      "Relay: Acts as a switch controlled by the Raspberry Pi. Connect 3.3V and GND from the Pi to VCC and GND, GPIO 21 to IN, the battery’s positive to COM, and the motor’s positive to NO.",
    motor:
      "DC Motor: Rotates when powered by the battery through the relay. Connect its positive terminal to the relay’s NO (Normally Open) and its negative terminal to the battery’s negative.",
    battery:
      "9V Battery: Provides power to the DC motor. Connect its positive terminal to the relay’s COM (Common) and its negative to the motor’s negative terminal.",
  },
  lt = document.getElementById("rasberryPi"),
  ut = document.getElementById("relayContainer"),
  ft = document.getElementById("motor"),
  ht = document.getElementById("battery"),
  U = document.getElementById("componentDescription"),
  M = document.getElementById("displayInfo"),
  Pt = document.getElementById("codeSubmit"),
  At = document.getElementById("info"),
  an = document.getElementById("list"),
  Tt = document.getElementById("undoButton");
lt || console.error("Raspberry Pi component not found");
ut || console.error("Relay component not found");
ft || console.error("Motor component not found");
ht || console.error("Battery component not found");
U || console.error("Component description element not found");
M || console.error("Display info element not found");
Pt || console.error("Code submit button not found");
At || console.error("Info button not found");
an || console.error("List element not found");
Tt || console.error("Undo button not found");
lt == null ||
  lt.addEventListener("click", async () => {
    console.log("Raspberry Pi clicked"), await ls.load();
  });
ut == null ||
  ut.addEventListener("click", () => {
    console.log("Relay clicked"), us.load();
  });
ft == null ||
  ft.addEventListener("click", () => {
    console.log("Motor clicked"), fs.load();
  });
ht == null ||
  ht.addEventListener("click", () => {
    console.log("Battery clicked"), hs.load();
  });
const Vt = (t, n) => {
  t == null ||
    t.addEventListener("mouseover", () => {
      console.log("Hovering over component:", n),
        U && ((U.textContent = n), (U.style.display = "block"));
    }),
    t == null ||
      t.addEventListener("mouseout", () => {
        console.log("Mouse out from component"),
          U &&
            ((U.textContent = "Hover over a component to see its description."),
            (U.style.display = "none"));
      });
};
Vt(lt, Yt.rasberryPi);
Vt(ut, Yt.relayContainer);
Vt(ft, Yt.motor);
Vt(ht, Yt.battery);
let Nt = !1;
At == null ||
  At.addEventListener("click", () => {
    console.log("Info button clicked, showList:", Nt),
      (Nt = !Nt),
      an && (an.style.display = Nt ? "block" : "none");
  });
const ds = () => {
    v.select("#motorMessageText").remove(),
      v
        .append("text")
        .attr("id", "motorMessageText")
        .attr("x", g.dc_motor.x + 50 * g.dc_motor.scale)
        .attr("y", g.dc_motor.y + 150 * g.dc_motor.scale)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", _e ? "10px" : "14px")
        .attr("font-family", "sans-serif")
        .text("Success! Circuit completed, motor is rotating.")
        .call((t) => {
          const n = t.node().getBBox();
          v.insert("rect", "#motorMessageText")
            .attr("x", n.x - 5)
            .attr("y", n.y - 2)
            .attr("width", n.width + 10)
            .attr("height", n.height + 4)
            .attr("fill", "green");
        });
  },
  ps = (t) => {
    b(t).classed("rotate", !0), ds();
  },
  Zt = (t) =>
    V.includes(t.srcElement.id) ||
    yn.includes(t.srcElement.id) ||
    mn.includes(t.srcElement.id) ||
    _n.includes(t.srcElement.id);
let N;
const Y = new es("connectionLog"),
  qn = new rs("errorBox", "errorHeading", "errorText", "closeErrorBox");
let D = 0;
Tt == null ||
  Tt.addEventListener("click", () => {
    console.log("Undo button clicked"), Y.undoLastConnection(), ys();
  });
const gs = (t) => {
    xn.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  ys = () => {
    if (N) {
      xn.selectAll(`path[id^="path${D}"]`)
        .nodes()
        .forEach((e) => e.remove());
      const n = v.select(`#marker-start-${D}`);
      n.empty() || n.remove(),
        (N = null),
        console.log("Removed all incomplete paths and markers");
      return;
    }
    if (Y.connections.length > 0) {
      const t = Y.connections[Y.connections.length - 1],
        n = t.lineID,
        e = parseInt(n.replace("path", ""));
      gs(n);
      const r = v.select(`#marker-start-${e}`);
      r.empty() || r.remove();
      const i = v.select(`#marker-end-${e}`);
      i.empty() || i.remove(),
        V.includes(t.connector) &&
          b(`#${t.connector}`).style("fill", "#9a916c"),
        t.connectorEnd &&
          V.includes(t.connectorEnd) &&
          b(`#${t.connectorEnd}`).style("fill", "#9a916c"),
        Y.connections.pop(),
        console.log(`Removed paths and markers with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
v.on("dblclick", (t) => {
  if (
    (console.log("SVG double-clicked, target ID:", t.srcElement.id),
    Zt(t) && !N)
  ) {
    (N = new Zo()),
      N.moveTo(t.offsetX, t.offsetY),
      V.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : Vn(t.offsetX, t.offsetY, `marker-start-${D}`),
      Y.addConnection({
        lineID: `path${D}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      v.style("cursor", "crosshair"),
      console.log("Path started");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !Zt(t)) {
    N &&
      (N.lineTo(t.offsetX, t.offsetY),
      Yn(N.toString(), `path${D}`),
      console.log("Path segment added"));
    return;
  }
  if (Zt(t) && N) {
    N.lineTo(t.offsetX, t.offsetY),
      Yn(N.toString(), `path${D}`),
      V.includes(t.srcElement.id)
        ? b(`#${t.srcElement.id}`).style("fill", "black")
        : Vn(t.offsetX, t.offsetY, `marker-end-${D}`),
      Y.addConnection({
        lineID: `path${D}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      D++,
      v.style("cursor", "default"),
      (N = null),
      console.log("Path completed");
    return;
  }
});
v.on("mouseover", (t) => {
  V.includes(t.srcElement.id)
    ? (console.log("Mouseover Raspberry Pi connector:", t.srcElement.id),
      M && (M.innerHTML = X[t.srcElement.id] || "Raspberry Pi Connector"))
    : yn.includes(t.srcElement.id)
    ? (console.log("Mouseover Relay connector:", t.srcElement.id),
      M && (M.innerHTML = "Relay Connector"))
    : mn.includes(t.srcElement.id)
    ? (console.log("Mouseover Motor connector:", t.srcElement.id),
      M && (M.innerHTML = st[t.srcElement.id] || "Motor Connector"))
    : _n.includes(t.srcElement.id) &&
      (console.log("Mouseover Battery connector:", t.srcElement.id),
      M && (M.innerHTML = ct[t.srcElement.id] || "Battery Connector"));
});
v.on("mouseout", (t) => {
  (V.includes(t.srcElement.id) ||
    yn.includes(t.srcElement.id) ||
    mn.includes(t.srcElement.id) ||
    _n.includes(t.srcElement.id)) &&
    (console.log("Mouseout connector"), M && (M.innerHTML = "CONNECTOR INFO"));
});
Pt == null ||
  Pt.addEventListener("click", () => {
    console.log("Code submit button clicked");
    const t = ns(Y.getConnectionLog());
    t === !0
      ? ps("#rotor")
      : t.error
      ? qn.throw("Error", t.error)
      : qn.throw(
          "Error",
          "Please connect the components properly. Refer to the connection diagram."
        );
  });
document.getElementById("backButton").addEventListener("click", function () {
  window.location.href = "/";
});
