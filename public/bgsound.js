!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).bgSound = e();
  }
})(function () {
  return (function () {
    return function e(t, r, n) {
      function o(s, a) {
        if (!r[s]) {
          if (!t[s]) {
            var u = "function" == typeof require && require;
            if (!a && u) return u(s, !0);
            if (i) return i(s, !0);
            var c = new Error("Cannot find module '" + s + "'");
            throw ((c.code = "MODULE_NOT_FOUND"), c);
          }
          var l = (r[s] = { exports: {} });
          t[s][0].call(
            l.exports,
            function (e) {
              return o(t[s][1][e] || e);
            },
            l,
            l.exports,
            e,
            t,
            r,
            n
          );
        }
        return r[s].exports;
      }
      for (
        var i = "function" == typeof require && require, s = 0;
        s < n.length;
        s++
      )
        o(n[s]);
      return o;
    };
  })()(
    {
      1: [
        function (e, t, r) {
          var n =
              Object.create ||
              function (e) {
                var t = function () {};
                return (t.prototype = e), new t();
              },
            o =
              Object.keys ||
              function (e) {
                var t = [];
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                return r;
              },
            i =
              Function.prototype.bind ||
              function (e) {
                var t = this;
                return function () {
                  return t.apply(e, arguments);
                };
              };
          function s() {
            (this._events &&
              Object.prototype.hasOwnProperty.call(this, "_events")) ||
              ((this._events = n(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }
          (t.exports = s),
            (s.EventEmitter = s),
            (s.prototype._events = void 0),
            (s.prototype._maxListeners = void 0);
          var a,
            u = 10;
          try {
            var c = {};
            Object.defineProperty &&
              Object.defineProperty(c, "x", { value: 0 }),
              (a = 0 === c.x);
          } catch (e) {
            a = !1;
          }
          function l(e) {
            return void 0 === e._maxListeners
              ? s.defaultMaxListeners
              : e._maxListeners;
          }
          function f(e, t, r, o) {
            var i, s, a;
            if ("function" != typeof r)
              throw new TypeError('"listener" argument must be a function');
            if (
              ((s = e._events)
                ? (s.newListener &&
                    (e.emit("newListener", t, r.listener ? r.listener : r),
                    (s = e._events)),
                  (a = s[t]))
                : ((s = e._events = n(null)), (e._eventsCount = 0)),
              a)
            ) {
              if (
                ("function" == typeof a
                  ? (a = s[t] = o ? [r, a] : [a, r])
                  : o
                  ? a.unshift(r)
                  : a.push(r),
                !a.warned && (i = l(e)) && i > 0 && a.length > i)
              ) {
                a.warned = !0;
                var u = new Error(
                  "Possible EventEmitter memory leak detected. " +
                    a.length +
                    ' "' +
                    String(t) +
                    '" listeners added. Use emitter.setMaxListeners() to increase limit.'
                );
                (u.name = "MaxListenersExceededWarning"),
                  (u.emitter = e),
                  (u.type = t),
                  (u.count = a.length),
                  "object" == typeof console &&
                    console.warn &&
                    console.warn("%s: %s", u.name, u.message);
              }
            } else (a = s[t] = r), ++e._eventsCount;
            return e;
          }
          function d() {
            if (!this.fired)
              switch (
                (this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                arguments.length)
              ) {
                case 0:
                  return this.listener.call(this.target);
                case 1:
                  return this.listener.call(this.target, arguments[0]);
                case 2:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1]
                  );
                case 3:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1],
                    arguments[2]
                  );
                default:
                  for (
                    var e = new Array(arguments.length), t = 0;
                    t < e.length;
                    ++t
                  )
                    e[t] = arguments[t];
                  this.listener.apply(this.target, e);
              }
          }
          function h(e, t, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: r,
              },
              o = i.call(d, n);
            return (o.listener = r), (n.wrapFn = o), o;
          }
          function p(e, t, r) {
            var n = e._events;
            if (!n) return [];
            var o = n[t];
            return o
              ? "function" == typeof o
                ? r
                  ? [o.listener || o]
                  : [o]
                : r
                ? (function (e) {
                    for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                      t[r] = e[r].listener || e[r];
                    return t;
                  })(o)
                : _(o, o.length)
              : [];
          }
          function m(e) {
            var t = this._events;
            if (t) {
              var r = t[e];
              if ("function" == typeof r) return 1;
              if (r) return r.length;
            }
            return 0;
          }
          function _(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
            return r;
          }
          a
            ? Object.defineProperty(s, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                  return u;
                },
                set: function (e) {
                  if ("number" != typeof e || e < 0 || e != e)
                    throw new TypeError(
                      '"defaultMaxListeners" must be a positive number'
                    );
                  u = e;
                },
              })
            : (s.defaultMaxListeners = u),
            (s.prototype.setMaxListeners = function (e) {
              if ("number" != typeof e || e < 0 || isNaN(e))
                throw new TypeError('"n" argument must be a positive number');
              return (this._maxListeners = e), this;
            }),
            (s.prototype.getMaxListeners = function () {
              return l(this);
            }),
            (s.prototype.emit = function (e) {
              var t,
                r,
                n,
                o,
                i,
                s,
                a = "error" === e;
              if ((s = this._events)) a = a && null == s.error;
              else if (!a) return !1;
              if (a) {
                if (
                  (arguments.length > 1 && (t = arguments[1]),
                  t instanceof Error)
                )
                  throw t;
                var u = new Error('Unhandled "error" event. (' + t + ")");
                throw ((u.context = t), u);
              }
              if (!(r = s[e])) return !1;
              var c = "function" == typeof r;
              switch ((n = arguments.length)) {
                case 1:
                  !(function (e, t, r) {
                    if (t) e.call(r);
                    else
                      for (var n = e.length, o = _(e, n), i = 0; i < n; ++i)
                        o[i].call(r);
                  })(r, c, this);
                  break;
                case 2:
                  !(function (e, t, r, n) {
                    if (t) e.call(r, n);
                    else
                      for (var o = e.length, i = _(e, o), s = 0; s < o; ++s)
                        i[s].call(r, n);
                  })(r, c, this, arguments[1]);
                  break;
                case 3:
                  !(function (e, t, r, n, o) {
                    if (t) e.call(r, n, o);
                    else
                      for (var i = e.length, s = _(e, i), a = 0; a < i; ++a)
                        s[a].call(r, n, o);
                  })(r, c, this, arguments[1], arguments[2]);
                  break;
                case 4:
                  !(function (e, t, r, n, o, i) {
                    if (t) e.call(r, n, o, i);
                    else
                      for (var s = e.length, a = _(e, s), u = 0; u < s; ++u)
                        a[u].call(r, n, o, i);
                  })(r, c, this, arguments[1], arguments[2], arguments[3]);
                  break;
                default:
                  for (o = new Array(n - 1), i = 1; i < n; i++)
                    o[i - 1] = arguments[i];
                  !(function (e, t, r, n) {
                    if (t) e.apply(r, n);
                    else
                      for (var o = e.length, i = _(e, o), s = 0; s < o; ++s)
                        i[s].apply(r, n);
                  })(r, c, this, o);
              }
              return !0;
            }),
            (s.prototype.addListener = function (e, t) {
              return f(this, e, t, !1);
            }),
            (s.prototype.on = s.prototype.addListener),
            (s.prototype.prependListener = function (e, t) {
              return f(this, e, t, !0);
            }),
            (s.prototype.once = function (e, t) {
              if ("function" != typeof t)
                throw new TypeError('"listener" argument must be a function');
              return this.on(e, h(this, e, t)), this;
            }),
            (s.prototype.prependOnceListener = function (e, t) {
              if ("function" != typeof t)
                throw new TypeError('"listener" argument must be a function');
              return this.prependListener(e, h(this, e, t)), this;
            }),
            (s.prototype.removeListener = function (e, t) {
              var r, o, i, s, a;
              if ("function" != typeof t)
                throw new TypeError('"listener" argument must be a function');
              if (!(o = this._events)) return this;
              if (!(r = o[e])) return this;
              if (r === t || r.listener === t)
                0 == --this._eventsCount
                  ? (this._events = n(null))
                  : (delete o[e],
                    o.removeListener &&
                      this.emit("removeListener", e, r.listener || t));
              else if ("function" != typeof r) {
                for (i = -1, s = r.length - 1; s >= 0; s--)
                  if (r[s] === t || r[s].listener === t) {
                    (a = r[s].listener), (i = s);
                    break;
                  }
                if (i < 0) return this;
                0 === i
                  ? r.shift()
                  : (function (e, t) {
                      for (
                        var r = t, n = r + 1, o = e.length;
                        n < o;
                        r += 1, n += 1
                      )
                        e[r] = e[n];
                      e.pop();
                    })(r, i),
                  1 === r.length && (o[e] = r[0]),
                  o.removeListener && this.emit("removeListener", e, a || t);
              }
              return this;
            }),
            (s.prototype.removeAllListeners = function (e) {
              var t, r, i;
              if (!(r = this._events)) return this;
              if (!r.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = n(null)), (this._eventsCount = 0))
                    : r[e] &&
                      (0 == --this._eventsCount
                        ? (this._events = n(null))
                        : delete r[e]),
                  this
                );
              if (0 === arguments.length) {
                var s,
                  a = o(r);
                for (i = 0; i < a.length; ++i)
                  "removeListener" !== (s = a[i]) && this.removeAllListeners(s);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = n(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ("function" == typeof (t = r[e])) this.removeListener(e, t);
              else if (t)
                for (i = t.length - 1; i >= 0; i--)
                  this.removeListener(e, t[i]);
              return this;
            }),
            (s.prototype.listeners = function (e) {
              return p(this, e, !0);
            }),
            (s.prototype.rawListeners = function (e) {
              return p(this, e, !1);
            }),
            (s.listenerCount = function (e, t) {
              return "function" == typeof e.listenerCount
                ? e.listenerCount(t)
                : m.call(e, t);
            }),
            (s.prototype.listenerCount = m),
            (s.prototype.eventNames = function () {
              return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
            });
        },
        {},
      ],
      2: [
        function (e, t, r) {
          var n,
            o,
            i = (t.exports = {});
          function s() {
            throw new Error("setTimeout has not been defined");
          }
          function a() {
            throw new Error("clearTimeout has not been defined");
          }
          function u(e) {
            if (n === setTimeout) return setTimeout(e, 0);
            if ((n === s || !n) && setTimeout)
              return (n = setTimeout), setTimeout(e, 0);
            try {
              return n(e, 0);
            } catch (t) {
              try {
                return n.call(null, e, 0);
              } catch (t) {
                return n.call(this, e, 0);
              }
            }
          }
          !(function () {
            try {
              n = "function" == typeof setTimeout ? setTimeout : s;
            } catch (e) {
              n = s;
            }
            try {
              o = "function" == typeof clearTimeout ? clearTimeout : a;
            } catch (e) {
              o = a;
            }
          })();
          var c,
            l = [],
            f = !1,
            d = -1;
          function h() {
            f &&
              c &&
              ((f = !1),
              c.length ? (l = c.concat(l)) : (d = -1),
              l.length && p());
          }
          function p() {
            if (!f) {
              var e = u(h);
              f = !0;
              for (var t = l.length; t; ) {
                for (c = l, l = []; ++d < t; ) c && c[d].run();
                (d = -1), (t = l.length);
              }
              (c = null),
                (f = !1),
                (function (e) {
                  if (o === clearTimeout) return clearTimeout(e);
                  if ((o === a || !o) && clearTimeout)
                    return (o = clearTimeout), clearTimeout(e);
                  try {
                    o(e);
                  } catch (t) {
                    try {
                      return o.call(null, e);
                    } catch (t) {
                      return o.call(this, e);
                    }
                  }
                })(e);
            }
          }
          function m(e, t) {
            (this.fun = e), (this.array = t);
          }
          function _() {}
          (i.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            l.push(new m(e, t)), 1 !== l.length || f || u(p);
          }),
            (m.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (i.title = "browser"),
            (i.browser = !0),
            (i.env = {}),
            (i.argv = []),
            (i.version = ""),
            (i.versions = {}),
            (i.on = _),
            (i.addListener = _),
            (i.once = _),
            (i.off = _),
            (i.removeListener = _),
            (i.removeAllListeners = _),
            (i.emit = _),
            (i.prependListener = _),
            (i.prependOnceListener = _),
            (i.listeners = function (e) {
              return [];
            }),
            (i.binding = function (e) {
              throw new Error("process.binding is not supported");
            }),
            (i.cwd = function () {
              return "/";
            }),
            (i.chdir = function (e) {
              throw new Error("process.chdir is not supported");
            }),
            (i.umask = function () {
              return 0;
            });
        },
        {},
      ],
      3: [
        function (e, t, r) {
          const n = e("debug")("bg-sound"),
            o = e("timidity"),
            i = e("insert-css"),
            s = e("when-dom-ready");
          class a extends HTMLElement {
            static get observedAttributes() {
              return ["src", "baseUrl", "loop"];
            }
            constructor() {
              super(),
                (this._playingFired = !1),
                (this._onClick = this._onClick.bind(this)),
                (this._onPlaying = this._onPlaying.bind(this)),
                (this._onEnded = this._onEnded.bind(this));
            }
            connectedCallback() {
              document.addEventListener("click", this._onClick),
                this.hasAttribute("baseUrl") ||
                  this.setAttribute("baseUrl", "https://bitmidi.com/timidity/"),
                this.hasAttribute("loop") || this.setAttribute("loop", 0),
                (this.playCount = 0),
                this._initPlayer();
            }
            disconnectedCallback() {
              document.removeEventListener("click", this._onClick),
                this._destroyPlayer();
            }
            get src() {
              return this.getAttribute("src");
            }
            set src(e) {
              this.setAttribute("src", e);
            }
            get loop() {
              return this.getAttribute("loop");
            }
            set loop(e) {
              this.setAttribute("loop", e);
            }
            get baseUrl() {
              return this.getAttribute("baseUrl");
            }
            set baseUrl(e) {
              this.setAttribute("baseUrl", e);
            }
            attributeChangedCallback(e, t, r) {
              n(`${e} changed from ${t} to ${r}`);
            }
            _initPlayer() {
              (this.player = new o(this.baseUrl)),
                this.player.once("playing", this._onPlaying),
                this.player.once("ended", this._onEnded),
                this.player.load(this.src),
                this.player.play();
            }
            _destroyPlayer() {
              this.player.pause(),
                this.player.destroy(),
                this.player.removeListener("playing", this._onPlaying),
                this.player.removeListener("ended", this._onEnded),
                (this.player = null);
            }
            _onPlaying() {
              this._playingFired = !0;
            }
            _onEnded() {
              this._destroyPlayer(), (this.playCount += 1);
              const e = String(this.loop).toLowerCase();
              ("infinite" === e ||
                "true" === e ||
                "-1" === e ||
                Number(this.loop) > this.playCount) &&
                this._initPlayer();
            }
            _onClick() {
              this._playingFired || this.player.play();
            }
          }
          window.customElements.define("bg-sound", a),
            (t.exports = a),
            (t.exports.enableCompatMode = function (e = {}) {
              i("\n    embed {\n      display: none;\n    }\n  "),
                s().then(() => {
                  [
                    ...document.querySelectorAll("embed"),
                    ...document.querySelectorAll("bgsound"),
                  ].forEach((t) => {
                    let r = t.getAttribute("src");
                    const n = t.getAttribute("loop");
                    if (
                      (t.remove(),
                      (r = new URL(r, window.location.href).href),
                      console.log(r),
                      r)
                    ) {
                      if (r.endsWith(".mid") || r.endsWith(".midi")) {
                        const t = document.createElement("bg-sound");
                        t.setAttribute("src", r),
                          n && t.setAttribute("loop", n),
                          e.baseUrl && t.setAttribute("baseUrl", e.baseUrl),
                          document.body.appendChild(t);
                      }
                      if (r.endsWith(".wav")) {
                        const e = document.createElement("audio");
                        (e.src = r),
                          (e.controls = !1),
                          (e.autoplay = !0),
                          n &&
                            ("infinite" === n.toLowerCase() ||
                              "true" === n ||
                              "-1" === n ||
                              Number(n) >= 2) &&
                            (e.loop = !0);
                        let t = !1;
                        e.addEventListener("playing", () => {
                          t = !0;
                        }),
                          document.body.addEventListener("click", () => {
                            t || e.play();
                          }),
                          document.body.appendChild(e);
                      }
                    }
                  });
                });
            });
        },
        { debug: 4, "insert-css": 6, timidity: 8, "when-dom-ready": 10 },
      ],
      4: [
        function (e, t, r) {
          (function (n) {
            (r.formatArgs = function (e) {
              if (
                ((e[0] =
                  (this.useColors ? "%c" : "") +
                  this.namespace +
                  (this.useColors ? " %c" : " ") +
                  e[0] +
                  (this.useColors ? "%c " : " ") +
                  "+" +
                  t.exports.humanize(this.diff)),
                !this.useColors)
              )
                return;
              const r = "color: " + this.color;
              e.splice(1, 0, r, "color: inherit");
              let n = 0,
                o = 0;
              e[0].replace(/%[a-zA-Z%]/g, (e) => {
                "%%" !== e && (n++, "%c" === e && (o = n));
              }),
                e.splice(o, 0, r);
            }),
              (r.save = function (e) {
                try {
                  e
                    ? r.storage.setItem("debug", e)
                    : r.storage.removeItem("debug");
                } catch (e) {}
              }),
              (r.load = function () {
                let e;
                try {
                  e = r.storage.getItem("debug");
                } catch (e) {}
                !e && void 0 !== n && "env" in n && (e = n.env.DEBUG);
                return e;
              }),
              (r.useColors = function () {
                if (
                  "undefined" != typeof window &&
                  window.process &&
                  ("renderer" === window.process.type || window.process.__nwjs)
                )
                  return !0;
                if (
                  "undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/(edge|trident)\/(\d+)/)
                )
                  return !1;
                return (
                  ("undefined" != typeof document &&
                    document.documentElement &&
                    document.documentElement.style &&
                    document.documentElement.style.WebkitAppearance) ||
                  ("undefined" != typeof window &&
                    window.console &&
                    (window.console.firebug ||
                      (window.console.exception && window.console.table))) ||
                  ("undefined" != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                    parseInt(RegExp.$1, 10) >= 31) ||
                  ("undefined" != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent
                      .toLowerCase()
                      .match(/applewebkit\/(\d+)/))
                );
              }),
              (r.storage = (function () {
                try {
                  return localStorage;
                } catch (e) {}
              })()),
              (r.colors = [
                "#0000CC",
                "#0000FF",
                "#0033CC",
                "#0033FF",
                "#0066CC",
                "#0066FF",
                "#0099CC",
                "#0099FF",
                "#00CC00",
                "#00CC33",
                "#00CC66",
                "#00CC99",
                "#00CCCC",
                "#00CCFF",
                "#3300CC",
                "#3300FF",
                "#3333CC",
                "#3333FF",
                "#3366CC",
                "#3366FF",
                "#3399CC",
                "#3399FF",
                "#33CC00",
                "#33CC33",
                "#33CC66",
                "#33CC99",
                "#33CCCC",
                "#33CCFF",
                "#6600CC",
                "#6600FF",
                "#6633CC",
                "#6633FF",
                "#66CC00",
                "#66CC33",
                "#9900CC",
                "#9900FF",
                "#9933CC",
                "#9933FF",
                "#99CC00",
                "#99CC33",
                "#CC0000",
                "#CC0033",
                "#CC0066",
                "#CC0099",
                "#CC00CC",
                "#CC00FF",
                "#CC3300",
                "#CC3333",
                "#CC3366",
                "#CC3399",
                "#CC33CC",
                "#CC33FF",
                "#CC6600",
                "#CC6633",
                "#CC9900",
                "#CC9933",
                "#CCCC00",
                "#CCCC33",
                "#FF0000",
                "#FF0033",
                "#FF0066",
                "#FF0099",
                "#FF00CC",
                "#FF00FF",
                "#FF3300",
                "#FF3333",
                "#FF3366",
                "#FF3399",
                "#FF33CC",
                "#FF33FF",
                "#FF6600",
                "#FF6633",
                "#FF9900",
                "#FF9933",
                "#FFCC00",
                "#FFCC33",
              ]),
              (r.log = console.debug || console.log || (() => {})),
              (t.exports = e("./common")(r));
            const { formatters: o } = t.exports;
            o.j = function (e) {
              try {
                return JSON.stringify(e);
              } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message;
              }
            };
          }.call(this, e("_process")));
        },
        { "./common": 5, _process: 2 },
      ],
      5: [
        function (e, t, r) {
          t.exports = function (t) {
            function r(e) {
              let t;
              function i(...e) {
                if (!i.enabled) return;
                const n = i,
                  o = Number(new Date()),
                  s = o - (t || o);
                (n.diff = s),
                  (n.prev = t),
                  (n.curr = o),
                  (t = o),
                  (e[0] = r.coerce(e[0])),
                  "string" != typeof e[0] && e.unshift("%O");
                let a = 0;
                (e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, o) => {
                  if ("%%" === t) return t;
                  a++;
                  const i = r.formatters[o];
                  if ("function" == typeof i) {
                    const r = e[a];
                    (t = i.call(n, r)), e.splice(a, 1), a--;
                  }
                  return t;
                })),
                  r.formatArgs.call(n, e),
                  (n.log || r.log).apply(n, e);
              }
              return (
                (i.namespace = e),
                (i.enabled = r.enabled(e)),
                (i.useColors = r.useColors()),
                (i.color = r.selectColor(e)),
                (i.destroy = n),
                (i.extend = o),
                "function" == typeof r.init && r.init(i),
                r.instances.push(i),
                i
              );
            }
            function n() {
              const e = r.instances.indexOf(this);
              return -1 !== e && (r.instances.splice(e, 1), !0);
            }
            function o(e, t) {
              const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
              return (n.log = this.log), n;
            }
            function i(e) {
              return e
                .toString()
                .substring(2, e.toString().length - 2)
                .replace(/\.\*\?$/, "*");
            }
            return (
              (r.debug = r),
              (r.default = r),
              (r.coerce = function (e) {
                return e instanceof Error ? e.stack || e.message : e;
              }),
              (r.disable = function () {
                const e = [
                  ...r.names.map(i),
                  ...r.skips.map(i).map((e) => "-" + e),
                ].join(",");
                return r.enable(""), e;
              }),
              (r.enable = function (e) {
                let t;
                r.save(e), (r.names = []), (r.skips = []);
                const n = ("string" == typeof e ? e : "").split(/[\s,]+/),
                  o = n.length;
                for (t = 0; t < o; t++)
                  n[t] &&
                    ("-" === (e = n[t].replace(/\*/g, ".*?"))[0]
                      ? r.skips.push(new RegExp("^" + e.substr(1) + "$"))
                      : r.names.push(new RegExp("^" + e + "$")));
                for (t = 0; t < r.instances.length; t++) {
                  const e = r.instances[t];
                  e.enabled = r.enabled(e.namespace);
                }
              }),
              (r.enabled = function (e) {
                if ("*" === e[e.length - 1]) return !0;
                let t, n;
                for (t = 0, n = r.skips.length; t < n; t++)
                  if (r.skips[t].test(e)) return !1;
                for (t = 0, n = r.names.length; t < n; t++)
                  if (r.names[t].test(e)) return !0;
                return !1;
              }),
              (r.humanize = e("ms")),
              Object.keys(t).forEach((e) => {
                r[e] = t[e];
              }),
              (r.instances = []),
              (r.names = []),
              (r.skips = []),
              (r.formatters = {}),
              (r.selectColor = function (e) {
                let t = 0;
                for (let r = 0; r < e.length; r++)
                  (t = (t << 5) - t + e.charCodeAt(r)), (t |= 0);
                return r.colors[Math.abs(t) % r.colors.length];
              }),
              r.enable(r.load()),
              r
            );
          };
        },
        { ms: 7 },
      ],
      6: [
        function (e, t, r) {
          var n = [],
            o = [],
            i =
              "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
          function s(e, t) {
            if (((t = t || {}), void 0 === e)) throw new Error(i);
            var r,
              s = !0 === t.prepend ? "prepend" : "append",
              a =
                void 0 !== t.container
                  ? t.container
                  : document.querySelector("head"),
              u = n.indexOf(a);
            return (
              -1 === u && ((u = n.push(a) - 1), (o[u] = {})),
              void 0 !== o[u] && void 0 !== o[u][s]
                ? (r = o[u][s])
                : ((r = o[u][s] = (function () {
                    var e = document.createElement("style");
                    return e.setAttribute("type", "text/css"), e;
                  })()),
                  "prepend" === s
                    ? a.insertBefore(r, a.childNodes[0])
                    : a.appendChild(r)),
              65279 === e.charCodeAt(0) && (e = e.substr(1, e.length)),
              r.styleSheet ? (r.styleSheet.cssText += e) : (r.textContent += e),
              r
            );
          }
          (t.exports = s), (t.exports.insertCss = s);
        },
        {},
      ],
      7: [
        function (e, t, r) {
          var n = 1e3,
            o = 60 * n,
            i = 60 * o,
            s = 24 * i,
            a = 7 * s,
            u = 365.25 * s;
          function c(e, t, r, n) {
            var o = t >= 1.5 * r;
            return Math.round(e / r) + " " + n + (o ? "s" : "");
          }
          t.exports = function (e, t) {
            t = t || {};
            var r = typeof e;
            if ("string" === r && e.length > 0)
              return (function (e) {
                if ((e = String(e)).length > 100) return;
                var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                  e
                );
                if (!t) return;
                var r = parseFloat(t[1]);
                switch ((t[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return r * u;
                  case "weeks":
                  case "week":
                  case "w":
                    return r * a;
                  case "days":
                  case "day":
                  case "d":
                    return r * s;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return r * i;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return r * o;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return r * n;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return r;
                  default:
                    return;
                }
              })(e);
            if ("number" === r && isFinite(e))
              return t.long
                ? (function (e) {
                    var t = Math.abs(e);
                    if (t >= s) return c(e, t, s, "day");
                    if (t >= i) return c(e, t, i, "hour");
                    if (t >= o) return c(e, t, o, "minute");
                    if (t >= n) return c(e, t, n, "second");
                    return e + " ms";
                  })(e)
                : (function (e) {
                    var t = Math.abs(e);
                    if (t >= s) return Math.round(e / s) + "d";
                    if (t >= i) return Math.round(e / i) + "h";
                    if (t >= o) return Math.round(e / o) + "m";
                    if (t >= n) return Math.round(e / n) + "s";
                    return e + "ms";
                  })(e);
            throw new Error(
              "val is not a non-empty string or a valid number. val=" +
                JSON.stringify(e)
            );
          };
        },
        {},
      ],
      8: [
        function (e, t, r) {
          const n = e("debug"),
            o = e("events").EventEmitter,
            i = e("./libtimidity"),
            s = n("timidity"),
            a = n("timidity:verbose"),
            u =
              "\ndrumset 0\n\n 25\tDrum_000/025_Snare_Roll.pat \n 26\tDrum_000/026_Snap.pat \n 27\tDrum_000/027_High_Q.pat \n 31\tDrum_000/031_Sticks.pat \n 32\tDrum_000/032_Square_Click.pat \n 33\tDrum_000/033_Metronome_Click.pat \n 34\tDrum_000/034_Metronome_Bell.pat \n 35\tDrum_000/035_Kick_1.pat amp=100\n 36\tDrum_000/036_Kick_2.pat amp=100\n 37\tDrum_000/037_Stick_Rim.pat \n 38\tDrum_000/038_Snare_1.pat \n 39\tDrum_000/039_Clap_Hand.pat amp=100\n 40\tDrum_000/040_Snare_2.pat \n 41\tDrum_000/041_Tom_Low_2.pat amp=100\n 42\tDrum_000/042_Hi-Hat_Closed.pat \n 43\tDrum_000/043_Tom_Low_1.pat amp=100\n 44\tDrum_000/044_Hi-Hat_Pedal.pat \n 45\tDrum_000/045_Tom_Mid_2.pat amp=100\n 46\tDrum_000/046_Hi-Hat_Open.pat \n 47\tDrum_000/047_Tom_Mid_1.pat amp=100\n 48\tDrum_000/048_Tom_High_2.pat amp=100\n 49\tDrum_000/049_Cymbal_Crash_1.pat \n 50\tDrum_000/050_Tom_High_1.pat amp=100\n 51\tDrum_000/051_Cymbal_Ride_1.pat \n 52\tDrum_000/052_Cymbal_Chinese.pat \n 53\tDrum_000/053_Cymbal_Ride_Bell.pat amp=100\n 54\tDrum_000/054_Tombourine.pat \n 55\tDrum_000/055_Cymbal_Splash.pat \n 56\tDrum_000/056_Cow_Bell.pat \n 57\tDrum_000/057_Cymbal_Crash_2.pat \n 58\tDrum_000/058_Vibra-Slap.pat \n 59\tDrum_000/059_Cymbal_Ride_2.pat \n 60\tDrum_000/060_Bongo_High.pat \n 61\tDrum_000/061_Bongo_Low.pat \n 62\tDrum_000/062_Conga_High_1_Mute.pat \n 63\tDrum_000/063_Conga_High_2_Open.pat \n 64\tDrum_000/064_Conga_Low.pat \n 65\tDrum_000/065_Timbale_High.pat \n 66\tDrum_000/066_Timbale_Low.pat \n 67\tDrum_000/067_Agogo_High.pat \n 68\tDrum_000/068_Agogo_Low.pat \n 69\tDrum_000/069_Cabasa.pat amp=100\n 70\tDrum_000/070_Maracas.pat \n 71\tDrum_000/071_Whistle_1_High_Short.pat \n 72\tDrum_000/072_Whistle_2_Low_Long.pat \n 73\tDrum_000/073_Guiro_1_Short.pat \n 74\tDrum_000/074_Guiro_2_Long.pat \n 75\tDrum_000/075_Claves.pat amp=100\n 76\tDrum_000/076_Wood_Block_1_High.pat \n 77\tDrum_000/077_Wood_Block_2_Low.pat \n 78\tDrum_000/078_Cuica_1_Mute.pat amp=100\n 79\tDrum_000/079_Cuica_2_Open.pat amp=100\n 80\tDrum_000/080_Triangle_1_Mute.pat \n 81\tDrum_000/081_Triangle_2_Open.pat \n 82\tDrum_000/082_Shaker.pat \n 84\tDrum_000/084_Belltree.pat \n\nbank 0\n\n 0\tTone_000/000_Acoustic_Grand_Piano.pat amp=120 pan=center\n 1\tTone_000/001_Acoustic_Brite_Piano.pat \n 2\tTone_000/002_Electric_Grand_Piano.pat \n 4\tTone_000/004_Electric_Piano_1_Rhodes.pat \n 5\tTone_000/005_Electric_Piano_2_Chorused_Yamaha_DX.pat \n 6\tTone_000/006_Harpsichord.pat \n 7\tTone_000/007_Clavinet.pat \n 8\tTone_000/008_Celesta.pat \n 9\tTone_000/009_Glockenspiel.pat \n 13\tTone_000/013_Xylophone.pat \n 14\tTone_000/014_Tubular_Bells.pat \n 15\tTone_000/015_Dulcimer.pat \n 16\tTone_000/016_Hammond_Organ.pat \n 19\tTone_000/019_Church_Organ.pat \n 21\tTone_000/021_Accordion.pat \n 23\tTone_000/023_Tango_Accordion.pat \n 24\tTone_000/024_Nylon_Guitar.pat \n 25\tTone_000/025_Steel_Guitar.pat \n 26\tTone_000/026_Jazz_Guitar.pat \n 27\tTone_000/027_Clean_Electric_Guitar.pat \n 28\tTone_000/028_Muted_Electric_Guitar.pat \n 29\tTone_000/029_Overdriven_Guitar.pat \n 30\tTone_000/030_Distortion_Guitar.pat \n 32\tTone_000/032_Acoustic_Bass.pat \n 33\tTone_000/033_Finger_Bass.pat \n 34\tTone_000/034_Pick_Bass.pat \n 35\tTone_000/035_Fretless_Bass.pat \n 36\tTone_000/036_Slap_Bass_1.pat \n 37\tTone_000/037_Slap_Bass_2.pat \n 38\tTone_000/038_Synth_Bass_1.pat \n 40\tTone_000/040_Violin.pat \n 42\tTone_000/042_Cello.pat \n 44\tTone_000/044_Tremolo_Strings.pat \n 45\tTone_000/045_Pizzicato_Strings.pat \n 46\tTone_000/046_Harp.pat \n 47\tTone_000/047_Timpani.pat \n 48\tTone_000/048_String_Ensemble_1_Marcato.pat \n 53\tTone_000/053_Voice_Oohs.pat \n 56\tTone_000/056_Trumpet.pat \n 57\tTone_000/057_Trombone.pat \n 58\tTone_000/058_Tuba.pat \n 59\tTone_000/059_Muted_Trumpet.pat \n 60\tTone_000/060_French_Horn.pat \n 61\tTone_000/061_Brass_Section.pat \n 64\tTone_000/064_Soprano_Sax.pat \n 65\tTone_000/065_Alto_Sax.pat \n 66\tTone_000/066_Tenor_Sax.pat \n 67\tTone_000/067_Baritone_Sax.pat \n 68\tTone_000/068_Oboe.pat \n 69\tTone_000/069_English_Horn.pat \n 70\tTone_000/070_Bassoon.pat \n 71\tTone_000/071_Clarinet.pat \n 72\tTone_000/072_Piccolo.pat \n 73\tTone_000/073_Flute.pat \n 74\tTone_000/074_Recorder.pat \n 75\tTone_000/075_Pan_Flute.pat \n 76\tTone_000/076_Bottle_Blow.pat \n 79\tTone_000/079_Ocarina.pat \n 80\tTone_000/080_Square_Wave.pat \n 84\tTone_000/084_Charang.pat \n 88\tTone_000/088_New_Age.pat \n 94\tTone_000/094_Halo_Pad.pat \n 95\tTone_000/095_Sweep_Pad.pat \n 98\tTone_000/098_Crystal.pat \n 101\tTone_000/101_Goblins--Unicorn.pat \n 102\tTone_000/102_Echo_Voice.pat \n 104\tTone_000/104_Sitar.pat \n 114\tTone_000/114_Steel_Drums.pat \n 115\tTone_000/115_Wood_Block.pat \n 120\tTone_000/120_Guitar_Fret_Noise.pat \n 122\tTone_000/122_Seashore.pat \n 125\tTone_000/125_Helicopter.pat \n\n",
            c = 44100,
            l = 32784,
            f = 2,
            d = 2 * f,
            h = 16384,
            p =
              "undefined" != typeof window &&
              (window.AudioContext || window.webkitAudioContext);
          t.exports = class extends o {
            constructor(e = "/") {
              super(),
                (this.destroyed = !1),
                e.endsWith("/") || (e += "/"),
                (this._baseUrl = new URL(e, window.location.origin).href),
                (this._ready = !1),
                (this._playing = !1),
                (this._pendingFetches = {}),
                (this._songPtr = 0),
                (this._bufferPtr = 0),
                (this._array = new Int16Array(2 * h)),
                (this._currentUrlOrBuf = null),
                (this._interval = null),
                (this._startInterval = this._startInterval.bind(this)),
                (this._stopInterval = this._stopInterval.bind(this)),
                (this._audioContext = new p()),
                (this._node = this._audioContext.createScriptProcessor(
                  h,
                  0,
                  f
                )),
                (this._onAudioProcess = this._onAudioProcess.bind(this)),
                this._node.addEventListener(
                  "audioprocess",
                  this._onAudioProcess
                ),
                this._node.connect(this._audioContext.destination),
                (this._lib = i({
                  locateFile: (e) => new URL(e, this._baseUrl).href,
                  onRuntimeInitialized: () => this._onLibReady(),
                }));
            }
            _onLibReady() {
              if (
                (this._lib.FS.writeFile("/timidity.cfg", u),
                0 !== this._lib._mid_init("/timidity.cfg"))
              )
                return this._destroy(
                  new Error("Failed to initialize libtimidity")
                );
              (this._bufferPtr = this._lib._malloc(h * d)),
                a("Initialized libtimidity"),
                (this._ready = !0),
                this.emit("_ready");
            }
            async load(e) {
              if ((s("load %o", e), this.destroyed))
                throw new Error("load() called after destroy()");
              if (
                (this._audioContext.resume(),
                this._songPtr && this._destroySong(),
                this.emit("unstarted"),
                this._stopInterval(),
                !this._ready)
              )
                return this.once("_ready", () => this.load(e));
              let t;
              if (
                (this.emit("buffering"),
                (this._currentUrlOrBuf = e),
                "string" == typeof e)
              ) {
                if (
                  ((t = await this._fetch(new URL(e, this._baseUrl))),
                  this._currentUrlOrBuf !== e)
                )
                  return;
              } else {
                if (!(e instanceof Uint8Array))
                  throw new Error(
                    "load() expects a `string` or `Uint8Array` argument"
                  );
                t = e;
              }
              let r = this._loadSong(t),
                n = this._lib._mid_get_load_request_count(r);
              if (n > 0) {
                let o = this._getMissingInstruments(r, n);
                if (
                  (a("Fetching instruments: %o", o),
                  await Promise.all(o.map((e) => this._fetchInstrument(e))),
                  this._currentUrlOrBuf !== e)
                )
                  return;
                this._lib._mid_song_free(r),
                  (r = this._loadSong(t)),
                  (n = this._lib._mid_get_load_request_count(r)) > 0 &&
                    ((o = this._getMissingInstruments(r, n)),
                    s("Playing with missing instruments: %o", o));
              }
              (this._songPtr = r),
                this._lib._mid_song_start(this._songPtr),
                a("Song and instruments are loaded");
            }
            _getMissingInstruments(e, t) {
              const r = [];
              for (let n = 0; n < t; n++) {
                const t = this._lib._mid_get_load_request(e, n),
                  o = this._lib.UTF8ToString(t);
                r.push(o);
              }
              return r;
            }
            _loadSong(e) {
              const t = this._lib._mid_alloc_options(c, l, f, h),
                r = this._lib._malloc(e.byteLength);
              this._lib.HEAPU8.set(e, r);
              const n = this._lib._mid_istream_open_mem(r, e.byteLength),
                o = this._lib._mid_song_load(n, t);
              return (
                this._lib._mid_istream_close(n),
                this._lib._free(t),
                this._lib._free(r),
                0 === o
                  ? this._destroy(new Error("Failed to load MIDI file"))
                  : o
              );
            }
            async _fetchInstrument(e) {
              if (this._pendingFetches[e]) return this._pendingFetches[e];
              const t = new URL(e, this._baseUrl),
                r = this._fetch(t);
              this._pendingFetches[e] = r;
              const n = await r;
              return (
                this._writeInstrumentFile(e, n),
                delete this._pendingFetches[e],
                n
              );
            }
            _writeInstrumentFile(e, t) {
              const r = e.split("/").slice(0, -1).join("/");
              this._mkdirp(r),
                this._lib.FS.writeFile(e, t, { encoding: "binary" });
            }
            _mkdirp(e) {
              const t = e.split("/");
              let r = "/";
              for (let e = 0; e < t.length; e++) {
                const n = t[e];
                try {
                  this._lib.FS.mkdir(`${r}${n}`);
                } catch (e) {}
                r += `${n}/`;
              }
            }
            async _fetch(e) {
              const t = await window.fetch(e, {
                mode: "cors",
                credentials: "same-origin",
              });
              if (200 !== t.status) throw new Error(`Could not load ${e}`);
              const r = await t.arrayBuffer();
              return new Uint8Array(r);
            }
            play() {
              if ((s("play"), this.destroyed))
                throw new Error("play() called after destroy()");
              this._audioContext.resume(),
                (this._playing = !0),
                this._ready &&
                  !this._currentUrlOrBuf &&
                  (this.emit("playing"), this._startInterval());
            }
            _onAudioProcess(e) {
              const t =
                this._songPtr && this._playing ? this._readMidiData() : 0;
              t > 0 &&
                this._currentUrlOrBuf &&
                ((this._currentUrlOrBuf = null),
                this.emit("playing"),
                this._startInterval());
              const r = e.outputBuffer.getChannelData(0),
                n = e.outputBuffer.getChannelData(1);
              for (let e = 0; e < t; e++)
                (r[e] = this._array[2 * e] / 32767),
                  (n[e] = this._array[2 * e + 1] / 32767);
              for (let e = t; e < h; e++) (r[e] = 0), (n[e] = 0);
              this._songPtr &&
                this._playing &&
                0 === t &&
                (this.seek(0),
                this.pause(),
                this._lib._mid_song_start(this._songPtr),
                this.emit("ended"));
            }
            _readMidiData() {
              const e = this._lib._mid_song_read_wave(
                  this._songPtr,
                  this._bufferPtr,
                  h * d
                ),
                t = e / d;
              return 0 === t
                ? 0
                : (this._array.set(
                    this._lib.HEAP16.subarray(
                      this._bufferPtr / 2,
                      (this._bufferPtr + e) / 2
                    )
                  ),
                  t);
            }
            pause() {
              if ((s("pause"), this.destroyed))
                throw new Error("pause() called after destroy()");
              (this._playing = !1), this._stopInterval(), this.emit("paused");
            }
            seek(e) {
              if ((s("seek %d", e), this.destroyed))
                throw new Error("seek() called after destroy()");
              if (!this._songPtr) return;
              const t = Math.floor(1e3 * e);
              this._lib._mid_song_seek(this._songPtr, t), this._onTimeupdate();
            }
            get currentTime() {
              return this.destroyed || !this._songPtr
                ? 0
                : this._lib._mid_song_get_time(this._songPtr) / 1e3;
            }
            get duration() {
              return this.destroyed || !this._songPtr
                ? 1
                : this._lib._mid_song_get_total_time(this._songPtr) / 1e3;
            }
            _onTimeupdate() {
              this.emit("timeupdate", this.currentTime);
            }
            _startInterval() {
              this._onTimeupdate(),
                (this._interval = setInterval(() => this._onTimeupdate(), 1e3));
            }
            _stopInterval() {
              this._onTimeupdate(),
                clearInterval(this._interval),
                (this._interval = null);
            }
            destroy() {
              if ((s("destroy"), this.destroyed))
                throw new Error("destroy() called after destroy()");
              this._destroy();
            }
            _destroy(e) {
              this.destroyed ||
                ((this.destroyed = !0),
                this._stopInterval(),
                (this._array = null),
                this._songPtr && this._destroySong(),
                this._bufferPtr &&
                  (this._lib._free(this._bufferPtr), (this._bufferPtr = 0)),
                this._node &&
                  (this._node.disconnect(),
                  this._node.removeEventListener(
                    "audioprocess",
                    this._onAudioProcess
                  )),
                this._audioContext && this._audioContext.close(),
                e && this.emit("error", e),
                s("destroyed (err %o)", e));
            }
            _destroySong() {
              this._lib._mid_song_free(this._songPtr), (this._songPtr = 0);
            }
          };
        },
        { "./libtimidity": 9, debug: 4, events: 1 },
      ],
      9: [
        function (e, t, r) {
          var n,
            o =
              ((n =
                "undefined" != typeof document && document.currentScript
                  ? document.currentScript.src
                  : void 0),
              function (e) {
                var t,
                  r = void 0 !== (e = e || {}) ? e : {},
                  o = {};
                for (t in r) r.hasOwnProperty(t) && (o[t] = r[t]);
                var i,
                  s,
                  a = [],
                  u = !0,
                  c = !1,
                  l = "";
                (u || c) &&
                  (c
                    ? (l = self.location.href)
                    : document.currentScript &&
                      (l = document.currentScript.src),
                  n && (l = n),
                  (l =
                    0 !== l.indexOf("blob:")
                      ? l.substr(0, l.lastIndexOf("/") + 1)
                      : ""),
                  (i = function (e) {
                    var t = new XMLHttpRequest();
                    return t.open("GET", e, !1), t.send(null), t.responseText;
                  }),
                  c &&
                    (s = function (e) {
                      var t = new XMLHttpRequest();
                      return (
                        t.open("GET", e, !1),
                        (t.responseType = "arraybuffer"),
                        t.send(null),
                        new Uint8Array(t.response)
                      );
                    }));
                var f = r.print || console.log.bind(console),
                  d = r.printErr || console.warn.bind(console);
                for (t in o) o.hasOwnProperty(t) && (r[t] = o[t]);
                (o = null),
                  r.arguments && (a = r.arguments),
                  r.thisProgram && r.thisProgram,
                  r.quit && r.quit;
                var h,
                  p,
                  m = {
                    "f64-rem": function (e, t) {
                      return e % t;
                    },
                    debugger: function () {},
                  };
                new Array(0),
                  r.wasmBinary && (h = r.wasmBinary),
                  r.noExitRuntime && r.noExitRuntime,
                  "object" != typeof WebAssembly &&
                    d("no native wasm support detected");
                var _,
                  g,
                  y,
                  w,
                  v,
                  E = !1,
                  b =
                    "undefined" != typeof TextDecoder
                      ? new TextDecoder("utf8")
                      : void 0;
                function k(e, t, r) {
                  for (var n = t + r, o = t; e[o] && !(o >= n); ) ++o;
                  if (o - t > 16 && e.subarray && b)
                    return b.decode(e.subarray(t, o));
                  for (var i = ""; t < o; ) {
                    var s = e[t++];
                    if (128 & s) {
                      var a = 63 & e[t++];
                      if (192 != (224 & s)) {
                        var u = 63 & e[t++];
                        if (
                          (s =
                            224 == (240 & s)
                              ? ((15 & s) << 12) | (a << 6) | u
                              : ((7 & s) << 18) |
                                (a << 12) |
                                (u << 6) |
                                (63 & e[t++])) < 65536
                        )
                          i += String.fromCharCode(s);
                        else {
                          var c = s - 65536;
                          i += String.fromCharCode(
                            55296 | (c >> 10),
                            56320 | (1023 & c)
                          );
                        }
                      } else i += String.fromCharCode(((31 & s) << 6) | a);
                    } else i += String.fromCharCode(s);
                  }
                  return i;
                }
                function C(e, t) {
                  return e ? k(y, e, t) : "";
                }
                function D(e, t, r, n) {
                  if (!(n > 0)) return 0;
                  for (var o = r, i = r + n - 1, s = 0; s < e.length; ++s) {
                    var a = e.charCodeAt(s);
                    if (
                      (a >= 55296 &&
                        a <= 57343 &&
                        (a =
                          (65536 + ((1023 & a) << 10)) |
                          (1023 & e.charCodeAt(++s))),
                      a <= 127)
                    ) {
                      if (r >= i) break;
                      t[r++] = a;
                    } else if (a <= 2047) {
                      if (r + 1 >= i) break;
                      (t[r++] = 192 | (a >> 6)), (t[r++] = 128 | (63 & a));
                    } else if (a <= 65535) {
                      if (r + 2 >= i) break;
                      (t[r++] = 224 | (a >> 12)),
                        (t[r++] = 128 | ((a >> 6) & 63)),
                        (t[r++] = 128 | (63 & a));
                    } else {
                      if (r + 3 >= i) break;
                      (t[r++] = 240 | (a >> 18)),
                        (t[r++] = 128 | ((a >> 12) & 63)),
                        (t[r++] = 128 | ((a >> 6) & 63)),
                        (t[r++] = 128 | (63 & a));
                    }
                  }
                  return (t[r] = 0), r - o;
                }
                function F(e) {
                  for (var t = 0, r = 0; r < e.length; ++r) {
                    var n = e.charCodeAt(r);
                    n >= 55296 &&
                      n <= 57343 &&
                      (n =
                        (65536 + ((1023 & n) << 10)) |
                        (1023 & e.charCodeAt(++r))),
                      n <= 127
                        ? ++t
                        : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
                  }
                  return t;
                }
                function T(e, t) {
                  return e % t > 0 && (e += t - (e % t)), e;
                }
                function S(e) {
                  (_ = e),
                    (r.HEAP8 = g = new Int8Array(e)),
                    (r.HEAP16 = w = new Int16Array(e)),
                    (r.HEAP32 = v = new Int32Array(e)),
                    (r.HEAPU8 = y = new Uint8Array(e)),
                    (r.HEAPU16 = new Uint16Array(e)),
                    (r.HEAPU32 = new Uint32Array(e)),
                    (r.HEAPF32 = new Float32Array(e)),
                    (r.HEAPF64 = new Float64Array(e));
                }
                "undefined" != typeof TextDecoder &&
                  new TextDecoder("utf-16le");
                var P = 10848,
                  A = r.TOTAL_MEMORY || 16777216;
                function x(e) {
                  for (; e.length > 0; ) {
                    var t = e.shift();
                    if ("function" != typeof t) {
                      var n = t.func;
                      "number" == typeof n
                        ? void 0 === t.arg
                          ? r.dynCall_v(n)
                          : r.dynCall_vi(n, t.arg)
                        : n(void 0 === t.arg ? null : t.arg);
                    } else t();
                  }
                }
                (p = r.wasmMemory
                  ? r.wasmMemory
                  : new WebAssembly.Memory({ initial: A / 65536 })) &&
                  (_ = p.buffer),
                  (A = _.byteLength),
                  S(_),
                  (v[P >> 2] = 5253760);
                var M = [],
                  L = [],
                  R = [],
                  B = [],
                  O = Math.abs,
                  N = Math.ceil,
                  I = Math.floor,
                  z = Math.min,
                  U = 0,
                  j = null,
                  H = null;
                function q(e) {
                  U++, r.monitorRunDependencies && r.monitorRunDependencies(U);
                }
                function W(e) {
                  if (
                    (U--,
                    r.monitorRunDependencies && r.monitorRunDependencies(U),
                    0 == U && (null !== j && (clearInterval(j), (j = null)), H))
                  ) {
                    var t = H;
                    (H = null), t();
                  }
                }
                (r.preloadedImages = {}), (r.preloadedAudios = {});
                var G = "data:application/octet-stream;base64,";
                function X(e) {
                  return String.prototype.startsWith
                    ? e.startsWith(G)
                    : 0 === e.indexOf(G);
                }
                var $,
                  V,
                  K,
                  J = "libtimidity.wasm";
                function Z() {
                  try {
                    if (h) return new Uint8Array(h);
                    if (s) return s(J);
                    throw "both async and sync fetching of the wasm failed";
                  } catch (e) {
                    pe(e);
                  }
                }
                function Y(e) {
                  var t = {
                    env: e,
                    wasi_unstable: e,
                    global: { NaN: NaN, Infinity: 1 / 0 },
                    "global.Math": Math,
                    asm2wasm: m,
                  };
                  function n(e, t) {
                    var n = e.exports;
                    (r.asm = n), W();
                  }
                  function o(e) {
                    n(e.instance);
                  }
                  function i(e) {
                    return (h || (!u && !c) || "function" != typeof fetch
                      ? new Promise(function (e, t) {
                          e(Z());
                        })
                      : fetch(J, { credentials: "same-origin" })
                          .then(function (e) {
                            if (!e.ok)
                              throw (
                                "failed to load wasm binary file at '" + J + "'"
                              );
                            return e.arrayBuffer();
                          })
                          .catch(function () {
                            return Z();
                          })
                    )
                      .then(function (e) {
                        return WebAssembly.instantiate(e, t);
                      })
                      .then(e, function (e) {
                        d("failed to asynchronously prepare wasm: " + e), pe(e);
                      });
                  }
                  if ((q(), r.instantiateWasm))
                    try {
                      return r.instantiateWasm(t, n);
                    } catch (e) {
                      return (
                        d(
                          "Module.instantiateWasm callback failed with error: " +
                            e
                        ),
                        !1
                      );
                    }
                  return (
                    (function () {
                      if (
                        h ||
                        "function" != typeof WebAssembly.instantiateStreaming ||
                        X(J) ||
                        "function" != typeof fetch
                      )
                        return i(o);
                      fetch(J, { credentials: "same-origin" }).then(function (
                        e
                      ) {
                        return WebAssembly.instantiateStreaming(e, t).then(
                          o,
                          function (e) {
                            d("wasm streaming compile failed: " + e),
                              d("falling back to ArrayBuffer instantiation"),
                              i(o);
                          }
                        );
                      });
                    })(),
                    {}
                  );
                }
                function Q() {
                  var e = (function () {
                    var e = new Error();
                    if (!e.stack) {
                      try {
                        throw new Error(0);
                      } catch (t) {
                        e = t;
                      }
                      if (!e.stack) return "(no stack trace available)";
                    }
                    return e.stack.toString();
                  })();
                  return (
                    r.extraStackTrace && (e += "\n" + r.extraStackTrace()),
                    e.replace(/\b__Z[\w\d_]+/g, function (e) {
                      var t = e;
                      return e === t ? e : t + " [" + e + "]";
                    })
                  );
                }
                X(J) ||
                  (($ = J), (J = r.locateFile ? r.locateFile($, l) : l + $)),
                  (r.asm = function (e, t, r) {
                    return (
                      (t.memory = p),
                      (t.table = new WebAssembly.Table({
                        initial: 26,
                        maximum: 26,
                        element: "anyfunc",
                      })),
                      (t.__memory_base = 1024),
                      (t.__table_base = 0),
                      Y(t)
                    );
                  });
                var ee = {
                  splitPath: function (e) {
                    return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                      .exec(e)
                      .slice(1);
                  },
                  normalizeArray: function (e, t) {
                    for (var r = 0, n = e.length - 1; n >= 0; n--) {
                      var o = e[n];
                      "." === o
                        ? e.splice(n, 1)
                        : ".." === o
                        ? (e.splice(n, 1), r++)
                        : r && (e.splice(n, 1), r--);
                    }
                    if (t) for (; r; r--) e.unshift("..");
                    return e;
                  },
                  normalize: function (e) {
                    var t = "/" === e.charAt(0),
                      r = "/" === e.substr(-1);
                    return (
                      (e = ee
                        .normalizeArray(
                          e.split("/").filter(function (e) {
                            return !!e;
                          }),
                          !t
                        )
                        .join("/")) ||
                        t ||
                        (e = "."),
                      e && r && (e += "/"),
                      (t ? "/" : "") + e
                    );
                  },
                  dirname: function (e) {
                    var t = ee.splitPath(e),
                      r = t[0],
                      n = t[1];
                    return r || n
                      ? (n && (n = n.substr(0, n.length - 1)), r + n)
                      : ".";
                  },
                  basename: function (e) {
                    if ("/" === e) return "/";
                    var t = e.lastIndexOf("/");
                    return -1 === t ? e : e.substr(t + 1);
                  },
                  extname: function (e) {
                    return ee.splitPath(e)[3];
                  },
                  join: function () {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return ee.normalize(e.join("/"));
                  },
                  join2: function (e, t) {
                    return ee.normalize(e + "/" + t);
                  },
                };
                function te(e) {
                  return (
                    r.___errno_location && (v[r.___errno_location() >> 2] = e),
                    e
                  );
                }
                var re = {
                    resolve: function () {
                      for (
                        var e = "", t = !1, r = arguments.length - 1;
                        r >= -1 && !t;
                        r--
                      ) {
                        var n = r >= 0 ? arguments[r] : ie.cwd();
                        if ("string" != typeof n)
                          throw new TypeError(
                            "Arguments to path.resolve must be strings"
                          );
                        if (!n) return "";
                        (e = n + "/" + e), (t = "/" === n.charAt(0));
                      }
                      return (
                        (t ? "/" : "") +
                          (e = ee
                            .normalizeArray(
                              e.split("/").filter(function (e) {
                                return !!e;
                              }),
                              !t
                            )
                            .join("/")) || "."
                      );
                    },
                    relative: function (e, t) {
                      function r(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++);
                        for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                        return t > r ? [] : e.slice(t, r - t + 1);
                      }
                      (e = re.resolve(e).substr(1)),
                        (t = re.resolve(t).substr(1));
                      for (
                        var n = r(e.split("/")),
                          o = r(t.split("/")),
                          i = Math.min(n.length, o.length),
                          s = i,
                          a = 0;
                        a < i;
                        a++
                      )
                        if (n[a] !== o[a]) {
                          s = a;
                          break;
                        }
                      var u = [];
                      for (a = s; a < n.length; a++) u.push("..");
                      return (u = u.concat(o.slice(s))).join("/");
                    },
                  },
                  ne = {
                    ttys: [],
                    init: function () {},
                    shutdown: function () {},
                    register: function (e, t) {
                      (ne.ttys[e] = { input: [], output: [], ops: t }),
                        ie.registerDevice(e, ne.stream_ops);
                    },
                    stream_ops: {
                      open: function (e) {
                        var t = ne.ttys[e.node.rdev];
                        if (!t) throw new ie.ErrnoError(19);
                        (e.tty = t), (e.seekable = !1);
                      },
                      close: function (e) {
                        e.tty.ops.flush(e.tty);
                      },
                      flush: function (e) {
                        e.tty.ops.flush(e.tty);
                      },
                      read: function (e, t, r, n, o) {
                        if (!e.tty || !e.tty.ops.get_char)
                          throw new ie.ErrnoError(6);
                        for (var i = 0, s = 0; s < n; s++) {
                          var a;
                          try {
                            a = e.tty.ops.get_char(e.tty);
                          } catch (e) {
                            throw new ie.ErrnoError(5);
                          }
                          if (void 0 === a && 0 === i)
                            throw new ie.ErrnoError(11);
                          if (null == a) break;
                          i++, (t[r + s] = a);
                        }
                        return i && (e.node.timestamp = Date.now()), i;
                      },
                      write: function (e, t, r, n, o) {
                        if (!e.tty || !e.tty.ops.put_char)
                          throw new ie.ErrnoError(6);
                        try {
                          for (var i = 0; i < n; i++)
                            e.tty.ops.put_char(e.tty, t[r + i]);
                        } catch (e) {
                          throw new ie.ErrnoError(5);
                        }
                        return n && (e.node.timestamp = Date.now()), i;
                      },
                    },
                    default_tty_ops: {
                      get_char: function (e) {
                        if (!e.input.length) {
                          var t = null;
                          if (
                            ("undefined" != typeof window &&
                            "function" == typeof window.prompt
                              ? null !== (t = window.prompt("Input: ")) &&
                                (t += "\n")
                              : "function" == typeof readline &&
                                null !== (t = readline()) &&
                                (t += "\n"),
                            !t)
                          )
                            return null;
                          e.input = ue(t, !0);
                        }
                        return e.input.shift();
                      },
                      put_char: function (e, t) {
                        null === t || 10 === t
                          ? (f(k(e.output, 0)), (e.output = []))
                          : 0 != t && e.output.push(t);
                      },
                      flush: function (e) {
                        e.output &&
                          e.output.length > 0 &&
                          (f(k(e.output, 0)), (e.output = []));
                      },
                    },
                    default_tty1_ops: {
                      put_char: function (e, t) {
                        null === t || 10 === t
                          ? (d(k(e.output, 0)), (e.output = []))
                          : 0 != t && e.output.push(t);
                      },
                      flush: function (e) {
                        e.output &&
                          e.output.length > 0 &&
                          (d(k(e.output, 0)), (e.output = []));
                      },
                    },
                  },
                  oe = {
                    ops_table: null,
                    mount: function (e) {
                      return oe.createNode(null, "/", 16895, 0);
                    },
                    createNode: function (e, t, r, n) {
                      if (ie.isBlkdev(r) || ie.isFIFO(r))
                        throw new ie.ErrnoError(1);
                      oe.ops_table ||
                        (oe.ops_table = {
                          dir: {
                            node: {
                              getattr: oe.node_ops.getattr,
                              setattr: oe.node_ops.setattr,
                              lookup: oe.node_ops.lookup,
                              mknod: oe.node_ops.mknod,
                              rename: oe.node_ops.rename,
                              unlink: oe.node_ops.unlink,
                              rmdir: oe.node_ops.rmdir,
                              readdir: oe.node_ops.readdir,
                              symlink: oe.node_ops.symlink,
                            },
                            stream: { llseek: oe.stream_ops.llseek },
                          },
                          file: {
                            node: {
                              getattr: oe.node_ops.getattr,
                              setattr: oe.node_ops.setattr,
                            },
                            stream: {
                              llseek: oe.stream_ops.llseek,
                              read: oe.stream_ops.read,
                              write: oe.stream_ops.write,
                              allocate: oe.stream_ops.allocate,
                              mmap: oe.stream_ops.mmap,
                              msync: oe.stream_ops.msync,
                            },
                          },
                          link: {
                            node: {
                              getattr: oe.node_ops.getattr,
                              setattr: oe.node_ops.setattr,
                              readlink: oe.node_ops.readlink,
                            },
                            stream: {},
                          },
                          chrdev: {
                            node: {
                              getattr: oe.node_ops.getattr,
                              setattr: oe.node_ops.setattr,
                            },
                            stream: ie.chrdev_stream_ops,
                          },
                        });
                      var o = ie.createNode(e, t, r, n);
                      return (
                        ie.isDir(o.mode)
                          ? ((o.node_ops = oe.ops_table.dir.node),
                            (o.stream_ops = oe.ops_table.dir.stream),
                            (o.contents = {}))
                          : ie.isFile(o.mode)
                          ? ((o.node_ops = oe.ops_table.file.node),
                            (o.stream_ops = oe.ops_table.file.stream),
                            (o.usedBytes = 0),
                            (o.contents = null))
                          : ie.isLink(o.mode)
                          ? ((o.node_ops = oe.ops_table.link.node),
                            (o.stream_ops = oe.ops_table.link.stream))
                          : ie.isChrdev(o.mode) &&
                            ((o.node_ops = oe.ops_table.chrdev.node),
                            (o.stream_ops = oe.ops_table.chrdev.stream)),
                        (o.timestamp = Date.now()),
                        e && (e.contents[t] = o),
                        o
                      );
                    },
                    getFileDataAsRegularArray: function (e) {
                      if (e.contents && e.contents.subarray) {
                        for (var t = [], r = 0; r < e.usedBytes; ++r)
                          t.push(e.contents[r]);
                        return t;
                      }
                      return e.contents;
                    },
                    getFileDataAsTypedArray: function (e) {
                      return e.contents
                        ? e.contents.subarray
                          ? e.contents.subarray(0, e.usedBytes)
                          : new Uint8Array(e.contents)
                        : new Uint8Array();
                    },
                    expandFileStorage: function (e, t) {
                      var r = e.contents ? e.contents.length : 0;
                      if (!(r >= t)) {
                        (t = Math.max(t, (r * (r < 1048576 ? 2 : 1.125)) | 0)),
                          0 != r && (t = Math.max(t, 256));
                        var n = e.contents;
                        (e.contents = new Uint8Array(t)),
                          e.usedBytes > 0 &&
                            e.contents.set(n.subarray(0, e.usedBytes), 0);
                      }
                    },
                    resizeFileStorage: function (e, t) {
                      if (e.usedBytes != t) {
                        if (0 == t)
                          return (e.contents = null), void (e.usedBytes = 0);
                        if (!e.contents || e.contents.subarray) {
                          var r = e.contents;
                          return (
                            (e.contents = new Uint8Array(new ArrayBuffer(t))),
                            r &&
                              e.contents.set(
                                r.subarray(0, Math.min(t, e.usedBytes))
                              ),
                            void (e.usedBytes = t)
                          );
                        }
                        if (
                          (e.contents || (e.contents = []),
                          e.contents.length > t)
                        )
                          e.contents.length = t;
                        else for (; e.contents.length < t; ) e.contents.push(0);
                        e.usedBytes = t;
                      }
                    },
                    node_ops: {
                      getattr: function (e) {
                        var t = {};
                        return (
                          (t.dev = ie.isChrdev(e.mode) ? e.id : 1),
                          (t.ino = e.id),
                          (t.mode = e.mode),
                          (t.nlink = 1),
                          (t.uid = 0),
                          (t.gid = 0),
                          (t.rdev = e.rdev),
                          ie.isDir(e.mode)
                            ? (t.size = 4096)
                            : ie.isFile(e.mode)
                            ? (t.size = e.usedBytes)
                            : ie.isLink(e.mode)
                            ? (t.size = e.link.length)
                            : (t.size = 0),
                          (t.atime = new Date(e.timestamp)),
                          (t.mtime = new Date(e.timestamp)),
                          (t.ctime = new Date(e.timestamp)),
                          (t.blksize = 4096),
                          (t.blocks = Math.ceil(t.size / t.blksize)),
                          t
                        );
                      },
                      setattr: function (e, t) {
                        void 0 !== t.mode && (e.mode = t.mode),
                          void 0 !== t.timestamp && (e.timestamp = t.timestamp),
                          void 0 !== t.size && oe.resizeFileStorage(e, t.size);
                      },
                      lookup: function (e, t) {
                        throw ie.genericErrors[2];
                      },
                      mknod: function (e, t, r, n) {
                        return oe.createNode(e, t, r, n);
                      },
                      rename: function (e, t, r) {
                        if (ie.isDir(e.mode)) {
                          var n;
                          try {
                            n = ie.lookupNode(t, r);
                          } catch (e) {}
                          if (n)
                            for (var o in n.contents)
                              throw new ie.ErrnoError(39);
                        }
                        delete e.parent.contents[e.name],
                          (e.name = r),
                          (t.contents[r] = e),
                          (e.parent = t);
                      },
                      unlink: function (e, t) {
                        delete e.contents[t];
                      },
                      rmdir: function (e, t) {
                        var r = ie.lookupNode(e, t);
                        for (var n in r.contents) throw new ie.ErrnoError(39);
                        delete e.contents[t];
                      },
                      readdir: function (e) {
                        var t = [".", ".."];
                        for (var r in e.contents)
                          e.contents.hasOwnProperty(r) && t.push(r);
                        return t;
                      },
                      symlink: function (e, t, r) {
                        var n = oe.createNode(e, t, 41471, 0);
                        return (n.link = r), n;
                      },
                      readlink: function (e) {
                        if (!ie.isLink(e.mode)) throw new ie.ErrnoError(22);
                        return e.link;
                      },
                    },
                    stream_ops: {
                      read: function (e, t, r, n, o) {
                        var i = e.node.contents;
                        if (o >= e.node.usedBytes) return 0;
                        var s = Math.min(e.node.usedBytes - o, n);
                        if (s > 8 && i.subarray) t.set(i.subarray(o, o + s), r);
                        else for (var a = 0; a < s; a++) t[r + a] = i[o + a];
                        return s;
                      },
                      write: function (e, t, r, n, o, i) {
                        if (!n) return 0;
                        var s = e.node;
                        if (
                          ((s.timestamp = Date.now()),
                          t.subarray && (!s.contents || s.contents.subarray))
                        ) {
                          if (0 === s.usedBytes && 0 === o)
                            return (
                              (s.contents = new Uint8Array(
                                t.subarray(r, r + n)
                              )),
                              (s.usedBytes = n),
                              n
                            );
                          if (o + n <= s.usedBytes)
                            return s.contents.set(t.subarray(r, r + n), o), n;
                        }
                        if (
                          (oe.expandFileStorage(s, o + n),
                          s.contents.subarray && t.subarray)
                        )
                          s.contents.set(t.subarray(r, r + n), o);
                        else
                          for (var a = 0; a < n; a++)
                            s.contents[o + a] = t[r + a];
                        return (s.usedBytes = Math.max(s.usedBytes, o + n)), n;
                      },
                      llseek: function (e, t, r) {
                        var n = t;
                        if (
                          (1 === r
                            ? (n += e.position)
                            : 2 === r &&
                              ie.isFile(e.node.mode) &&
                              (n += e.node.usedBytes),
                          n < 0)
                        )
                          throw new ie.ErrnoError(22);
                        return n;
                      },
                      allocate: function (e, t, r) {
                        oe.expandFileStorage(e.node, t + r),
                          (e.node.usedBytes = Math.max(
                            e.node.usedBytes,
                            t + r
                          ));
                      },
                      mmap: function (e, t, r, n, o, i, s) {
                        if (!ie.isFile(e.node.mode))
                          throw new ie.ErrnoError(19);
                        var a,
                          u,
                          c = e.node.contents;
                        if (
                          2 & s ||
                          (c.buffer !== t && c.buffer !== t.buffer)
                        ) {
                          (o > 0 || o + n < e.node.usedBytes) &&
                            (c = c.subarray
                              ? c.subarray(o, o + n)
                              : Array.prototype.slice.call(c, o, o + n)),
                            (u = !0);
                          var l = t.buffer == g.buffer;
                          if (!(a = de(n))) throw new ie.ErrnoError(12);
                          (l ? g : t).set(c, a);
                        } else (u = !1), (a = c.byteOffset);
                        return { ptr: a, allocated: u };
                      },
                      msync: function (e, t, r, n, o) {
                        if (!ie.isFile(e.node.mode))
                          throw new ie.ErrnoError(19);
                        return 2 & o
                          ? 0
                          : (oe.stream_ops.write(e, t, 0, n, r, !1), 0);
                      },
                    },
                  },
                  ie = {
                    root: null,
                    mounts: [],
                    devices: {},
                    streams: [],
                    nextInode: 1,
                    nameTable: null,
                    currentPath: "/",
                    initialized: !1,
                    ignorePermissions: !0,
                    trackingDelegate: {},
                    tracking: { openFlags: { READ: 1, WRITE: 2 } },
                    ErrnoError: null,
                    genericErrors: {},
                    filesystems: null,
                    syncFSRequests: 0,
                    handleFSError: function (e) {
                      if (!(e instanceof ie.ErrnoError)) throw e + " : " + Q();
                      return te(e.errno);
                    },
                    lookupPath: function (e, t) {
                      if (((t = t || {}), !(e = re.resolve(ie.cwd(), e))))
                        return { path: "", node: null };
                      var r = { follow_mount: !0, recurse_count: 0 };
                      for (var n in r) void 0 === t[n] && (t[n] = r[n]);
                      if (t.recurse_count > 8) throw new ie.ErrnoError(40);
                      for (
                        var o = ee.normalizeArray(
                            e.split("/").filter(function (e) {
                              return !!e;
                            }),
                            !1
                          ),
                          i = ie.root,
                          s = "/",
                          a = 0;
                        a < o.length;
                        a++
                      ) {
                        var u = a === o.length - 1;
                        if (u && t.parent) break;
                        if (
                          ((i = ie.lookupNode(i, o[a])),
                          (s = ee.join2(s, o[a])),
                          ie.isMountpoint(i) &&
                            (!u || (u && t.follow_mount)) &&
                            (i = i.mounted.root),
                          !u || t.follow)
                        )
                          for (var c = 0; ie.isLink(i.mode); ) {
                            var l = ie.readlink(s);
                            if (
                              ((s = re.resolve(ee.dirname(s), l)),
                              (i = ie.lookupPath(s, {
                                recurse_count: t.recurse_count,
                              }).node),
                              c++ > 40)
                            )
                              throw new ie.ErrnoError(40);
                          }
                      }
                      return { path: s, node: i };
                    },
                    getPath: function (e) {
                      for (var t; ; ) {
                        if (ie.isRoot(e)) {
                          var r = e.mount.mountpoint;
                          return t
                            ? "/" !== r[r.length - 1]
                              ? r + "/" + t
                              : r + t
                            : r;
                        }
                        (t = t ? e.name + "/" + t : e.name), (e = e.parent);
                      }
                    },
                    hashName: function (e, t) {
                      for (var r = 0, n = 0; n < t.length; n++)
                        r = ((r << 5) - r + t.charCodeAt(n)) | 0;
                      return ((e + r) >>> 0) % ie.nameTable.length;
                    },
                    hashAddNode: function (e) {
                      var t = ie.hashName(e.parent.id, e.name);
                      (e.name_next = ie.nameTable[t]), (ie.nameTable[t] = e);
                    },
                    hashRemoveNode: function (e) {
                      var t = ie.hashName(e.parent.id, e.name);
                      if (ie.nameTable[t] === e) ie.nameTable[t] = e.name_next;
                      else
                        for (var r = ie.nameTable[t]; r; ) {
                          if (r.name_next === e) {
                            r.name_next = e.name_next;
                            break;
                          }
                          r = r.name_next;
                        }
                    },
                    lookupNode: function (e, t) {
                      var r = ie.mayLookup(e);
                      if (r) throw new ie.ErrnoError(r, e);
                      for (
                        var n = ie.hashName(e.id, t), o = ie.nameTable[n];
                        o;
                        o = o.name_next
                      ) {
                        var i = o.name;
                        if (o.parent.id === e.id && i === t) return o;
                      }
                      return ie.lookup(e, t);
                    },
                    createNode: function (e, t, r, n) {
                      ie.FSNode ||
                        ((ie.FSNode = function (e, t, r, n) {
                          e || (e = this),
                            (this.parent = e),
                            (this.mount = e.mount),
                            (this.mounted = null),
                            (this.id = ie.nextInode++),
                            (this.name = t),
                            (this.mode = r),
                            (this.node_ops = {}),
                            (this.stream_ops = {}),
                            (this.rdev = n);
                        }),
                        (ie.FSNode.prototype = {}),
                        Object.defineProperties(ie.FSNode.prototype, {
                          read: {
                            get: function () {
                              return 365 == (365 & this.mode);
                            },
                            set: function (e) {
                              e ? (this.mode |= 365) : (this.mode &= -366);
                            },
                          },
                          write: {
                            get: function () {
                              return 146 == (146 & this.mode);
                            },
                            set: function (e) {
                              e ? (this.mode |= 146) : (this.mode &= -147);
                            },
                          },
                          isFolder: {
                            get: function () {
                              return ie.isDir(this.mode);
                            },
                          },
                          isDevice: {
                            get: function () {
                              return ie.isChrdev(this.mode);
                            },
                          },
                        }));
                      var o = new ie.FSNode(e, t, r, n);
                      return ie.hashAddNode(o), o;
                    },
                    destroyNode: function (e) {
                      ie.hashRemoveNode(e);
                    },
                    isRoot: function (e) {
                      return e === e.parent;
                    },
                    isMountpoint: function (e) {
                      return !!e.mounted;
                    },
                    isFile: function (e) {
                      return 32768 == (61440 & e);
                    },
                    isDir: function (e) {
                      return 16384 == (61440 & e);
                    },
                    isLink: function (e) {
                      return 40960 == (61440 & e);
                    },
                    isChrdev: function (e) {
                      return 8192 == (61440 & e);
                    },
                    isBlkdev: function (e) {
                      return 24576 == (61440 & e);
                    },
                    isFIFO: function (e) {
                      return 4096 == (61440 & e);
                    },
                    isSocket: function (e) {
                      return 49152 == (49152 & e);
                    },
                    flagModes: {
                      r: 0,
                      rs: 1052672,
                      "r+": 2,
                      w: 577,
                      wx: 705,
                      xw: 705,
                      "w+": 578,
                      "wx+": 706,
                      "xw+": 706,
                      a: 1089,
                      ax: 1217,
                      xa: 1217,
                      "a+": 1090,
                      "ax+": 1218,
                      "xa+": 1218,
                    },
                    modeStringToFlags: function (e) {
                      var t = ie.flagModes[e];
                      if (void 0 === t)
                        throw new Error("Unknown file open mode: " + e);
                      return t;
                    },
                    flagsToPermissionString: function (e) {
                      var t = ["r", "w", "rw"][3 & e];
                      return 512 & e && (t += "w"), t;
                    },
                    nodePermissions: function (e, t) {
                      return ie.ignorePermissions
                        ? 0
                        : (-1 === t.indexOf("r") || 292 & e.mode) &&
                          (-1 === t.indexOf("w") || 146 & e.mode) &&
                          (-1 === t.indexOf("x") || 73 & e.mode)
                        ? 0
                        : 13;
                    },
                    mayLookup: function (e) {
                      var t = ie.nodePermissions(e, "x");
                      return t || (e.node_ops.lookup ? 0 : 13);
                    },
                    mayCreate: function (e, t) {
                      try {
                        return ie.lookupNode(e, t), 17;
                      } catch (e) {}
                      return ie.nodePermissions(e, "wx");
                    },
                    mayDelete: function (e, t, r) {
                      var n;
                      try {
                        n = ie.lookupNode(e, t);
                      } catch (e) {
                        return e.errno;
                      }
                      var o = ie.nodePermissions(e, "wx");
                      if (o) return o;
                      if (r) {
                        if (!ie.isDir(n.mode)) return 20;
                        if (ie.isRoot(n) || ie.getPath(n) === ie.cwd())
                          return 16;
                      } else if (ie.isDir(n.mode)) return 21;
                      return 0;
                    },
                    mayOpen: function (e, t) {
                      return e
                        ? ie.isLink(e.mode)
                          ? 40
                          : ie.isDir(e.mode) &&
                            ("r" !== ie.flagsToPermissionString(t) || 512 & t)
                          ? 21
                          : ie.nodePermissions(e, ie.flagsToPermissionString(t))
                        : 2;
                    },
                    MAX_OPEN_FDS: 4096,
                    nextfd: function (e, t) {
                      (e = e || 0), (t = t || ie.MAX_OPEN_FDS);
                      for (var r = e; r <= t; r++) if (!ie.streams[r]) return r;
                      throw new ie.ErrnoError(24);
                    },
                    getStream: function (e) {
                      return ie.streams[e];
                    },
                    createStream: function (e, t, r) {
                      ie.FSStream ||
                        ((ie.FSStream = function () {}),
                        (ie.FSStream.prototype = {}),
                        Object.defineProperties(ie.FSStream.prototype, {
                          object: {
                            get: function () {
                              return this.node;
                            },
                            set: function (e) {
                              this.node = e;
                            },
                          },
                          isRead: {
                            get: function () {
                              return 1 != (2097155 & this.flags);
                            },
                          },
                          isWrite: {
                            get: function () {
                              return 0 != (2097155 & this.flags);
                            },
                          },
                          isAppend: {
                            get: function () {
                              return 1024 & this.flags;
                            },
                          },
                        }));
                      var n = new ie.FSStream();
                      for (var o in e) n[o] = e[o];
                      e = n;
                      var i = ie.nextfd(t, r);
                      return (e.fd = i), (ie.streams[i] = e), e;
                    },
                    closeStream: function (e) {
                      ie.streams[e] = null;
                    },
                    chrdev_stream_ops: {
                      open: function (e) {
                        var t = ie.getDevice(e.node.rdev);
                        (e.stream_ops = t.stream_ops),
                          e.stream_ops.open && e.stream_ops.open(e);
                      },
                      llseek: function () {
                        throw new ie.ErrnoError(29);
                      },
                    },
                    major: function (e) {
                      return e >> 8;
                    },
                    minor: function (e) {
                      return 255 & e;
                    },
                    makedev: function (e, t) {
                      return (e << 8) | t;
                    },
                    registerDevice: function (e, t) {
                      ie.devices[e] = { stream_ops: t };
                    },
                    getDevice: function (e) {
                      return ie.devices[e];
                    },
                    getMounts: function (e) {
                      for (var t = [], r = [e]; r.length; ) {
                        var n = r.pop();
                        t.push(n), r.push.apply(r, n.mounts);
                      }
                      return t;
                    },
                    syncfs: function (e, t) {
                      "function" == typeof e && ((t = e), (e = !1)),
                        ie.syncFSRequests++,
                        ie.syncFSRequests > 1 &&
                          console.log(
                            "warning: " +
                              ie.syncFSRequests +
                              " FS.syncfs operations in flight at once, probably just doing extra work"
                          );
                      var r = ie.getMounts(ie.root.mount),
                        n = 0;
                      function o(e) {
                        return ie.syncFSRequests--, t(e);
                      }
                      function i(e) {
                        if (e)
                          return i.errored ? void 0 : ((i.errored = !0), o(e));
                        ++n >= r.length && o(null);
                      }
                      r.forEach(function (t) {
                        if (!t.type.syncfs) return i(null);
                        t.type.syncfs(t, e, i);
                      });
                    },
                    mount: function (e, t, r) {
                      var n,
                        o = "/" === r,
                        i = !r;
                      if (o && ie.root) throw new ie.ErrnoError(16);
                      if (!o && !i) {
                        var s = ie.lookupPath(r, { follow_mount: !1 });
                        if (((r = s.path), (n = s.node), ie.isMountpoint(n)))
                          throw new ie.ErrnoError(16);
                        if (!ie.isDir(n.mode)) throw new ie.ErrnoError(20);
                      }
                      var a = { type: e, opts: t, mountpoint: r, mounts: [] },
                        u = e.mount(a);
                      return (
                        (u.mount = a),
                        (a.root = u),
                        o
                          ? (ie.root = u)
                          : n &&
                            ((n.mounted = a),
                            n.mount && n.mount.mounts.push(a)),
                        u
                      );
                    },
                    unmount: function (e) {
                      var t = ie.lookupPath(e, { follow_mount: !1 });
                      if (!ie.isMountpoint(t.node)) throw new ie.ErrnoError(22);
                      var r = t.node,
                        n = r.mounted,
                        o = ie.getMounts(n);
                      Object.keys(ie.nameTable).forEach(function (e) {
                        for (var t = ie.nameTable[e]; t; ) {
                          var r = t.name_next;
                          -1 !== o.indexOf(t.mount) && ie.destroyNode(t),
                            (t = r);
                        }
                      }),
                        (r.mounted = null);
                      var i = r.mount.mounts.indexOf(n);
                      r.mount.mounts.splice(i, 1);
                    },
                    lookup: function (e, t) {
                      return e.node_ops.lookup(e, t);
                    },
                    mknod: function (e, t, r) {
                      var n = ie.lookupPath(e, { parent: !0 }).node,
                        o = ee.basename(e);
                      if (!o || "." === o || ".." === o)
                        throw new ie.ErrnoError(22);
                      var i = ie.mayCreate(n, o);
                      if (i) throw new ie.ErrnoError(i);
                      if (!n.node_ops.mknod) throw new ie.ErrnoError(1);
                      return n.node_ops.mknod(n, o, t, r);
                    },
                    create: function (e, t) {
                      return (
                        (t = void 0 !== t ? t : 438),
                        (t &= 4095),
                        (t |= 32768),
                        ie.mknod(e, t, 0)
                      );
                    },
                    mkdir: function (e, t) {
                      return (
                        (t = void 0 !== t ? t : 511),
                        (t &= 1023),
                        (t |= 16384),
                        ie.mknod(e, t, 0)
                      );
                    },
                    mkdirTree: function (e, t) {
                      for (
                        var r = e.split("/"), n = "", o = 0;
                        o < r.length;
                        ++o
                      )
                        if (r[o]) {
                          n += "/" + r[o];
                          try {
                            ie.mkdir(n, t);
                          } catch (e) {
                            if (17 != e.errno) throw e;
                          }
                        }
                    },
                    mkdev: function (e, t, r) {
                      return (
                        void 0 === r && ((r = t), (t = 438)),
                        (t |= 8192),
                        ie.mknod(e, t, r)
                      );
                    },
                    symlink: function (e, t) {
                      if (!re.resolve(e)) throw new ie.ErrnoError(2);
                      var r = ie.lookupPath(t, { parent: !0 }).node;
                      if (!r) throw new ie.ErrnoError(2);
                      var n = ee.basename(t),
                        o = ie.mayCreate(r, n);
                      if (o) throw new ie.ErrnoError(o);
                      if (!r.node_ops.symlink) throw new ie.ErrnoError(1);
                      return r.node_ops.symlink(r, n, e);
                    },
                    rename: function (e, t) {
                      var r,
                        n,
                        o = ee.dirname(e),
                        i = ee.dirname(t),
                        s = ee.basename(e),
                        a = ee.basename(t);
                      try {
                        (r = ie.lookupPath(e, { parent: !0 }).node),
                          (n = ie.lookupPath(t, { parent: !0 }).node);
                      } catch (e) {
                        throw new ie.ErrnoError(16);
                      }
                      if (!r || !n) throw new ie.ErrnoError(2);
                      if (r.mount !== n.mount) throw new ie.ErrnoError(18);
                      var u,
                        c = ie.lookupNode(r, s),
                        l = re.relative(e, i);
                      if ("." !== l.charAt(0)) throw new ie.ErrnoError(22);
                      if ("." !== (l = re.relative(t, o)).charAt(0))
                        throw new ie.ErrnoError(39);
                      try {
                        u = ie.lookupNode(n, a);
                      } catch (e) {}
                      if (c !== u) {
                        var f = ie.isDir(c.mode),
                          d = ie.mayDelete(r, s, f);
                        if (d) throw new ie.ErrnoError(d);
                        if (
                          (d = u ? ie.mayDelete(n, a, f) : ie.mayCreate(n, a))
                        )
                          throw new ie.ErrnoError(d);
                        if (!r.node_ops.rename) throw new ie.ErrnoError(1);
                        if (ie.isMountpoint(c) || (u && ie.isMountpoint(u)))
                          throw new ie.ErrnoError(16);
                        if (n !== r && (d = ie.nodePermissions(r, "w")))
                          throw new ie.ErrnoError(d);
                        try {
                          ie.trackingDelegate.willMovePath &&
                            ie.trackingDelegate.willMovePath(e, t);
                        } catch (r) {
                          console.log(
                            "FS.trackingDelegate['willMovePath']('" +
                              e +
                              "', '" +
                              t +
                              "') threw an exception: " +
                              r.message
                          );
                        }
                        ie.hashRemoveNode(c);
                        try {
                          r.node_ops.rename(c, n, a);
                        } catch (e) {
                          throw e;
                        } finally {
                          ie.hashAddNode(c);
                        }
                        try {
                          ie.trackingDelegate.onMovePath &&
                            ie.trackingDelegate.onMovePath(e, t);
                        } catch (r) {
                          console.log(
                            "FS.trackingDelegate['onMovePath']('" +
                              e +
                              "', '" +
                              t +
                              "') threw an exception: " +
                              r.message
                          );
                        }
                      }
                    },
                    rmdir: function (e) {
                      var t = ie.lookupPath(e, { parent: !0 }).node,
                        r = ee.basename(e),
                        n = ie.lookupNode(t, r),
                        o = ie.mayDelete(t, r, !0);
                      if (o) throw new ie.ErrnoError(o);
                      if (!t.node_ops.rmdir) throw new ie.ErrnoError(1);
                      if (ie.isMountpoint(n)) throw new ie.ErrnoError(16);
                      try {
                        ie.trackingDelegate.willDeletePath &&
                          ie.trackingDelegate.willDeletePath(e);
                      } catch (t) {
                        console.log(
                          "FS.trackingDelegate['willDeletePath']('" +
                            e +
                            "') threw an exception: " +
                            t.message
                        );
                      }
                      t.node_ops.rmdir(t, r), ie.destroyNode(n);
                      try {
                        ie.trackingDelegate.onDeletePath &&
                          ie.trackingDelegate.onDeletePath(e);
                      } catch (t) {
                        console.log(
                          "FS.trackingDelegate['onDeletePath']('" +
                            e +
                            "') threw an exception: " +
                            t.message
                        );
                      }
                    },
                    readdir: function (e) {
                      var t = ie.lookupPath(e, { follow: !0 }).node;
                      if (!t.node_ops.readdir) throw new ie.ErrnoError(20);
                      return t.node_ops.readdir(t);
                    },
                    unlink: function (e) {
                      var t = ie.lookupPath(e, { parent: !0 }).node,
                        r = ee.basename(e),
                        n = ie.lookupNode(t, r),
                        o = ie.mayDelete(t, r, !1);
                      if (o) throw new ie.ErrnoError(o);
                      if (!t.node_ops.unlink) throw new ie.ErrnoError(1);
                      if (ie.isMountpoint(n)) throw new ie.ErrnoError(16);
                      try {
                        ie.trackingDelegate.willDeletePath &&
                          ie.trackingDelegate.willDeletePath(e);
                      } catch (t) {
                        console.log(
                          "FS.trackingDelegate['willDeletePath']('" +
                            e +
                            "') threw an exception: " +
                            t.message
                        );
                      }
                      t.node_ops.unlink(t, r), ie.destroyNode(n);
                      try {
                        ie.trackingDelegate.onDeletePath &&
                          ie.trackingDelegate.onDeletePath(e);
                      } catch (t) {
                        console.log(
                          "FS.trackingDelegate['onDeletePath']('" +
                            e +
                            "') threw an exception: " +
                            t.message
                        );
                      }
                    },
                    readlink: function (e) {
                      var t = ie.lookupPath(e).node;
                      if (!t) throw new ie.ErrnoError(2);
                      if (!t.node_ops.readlink) throw new ie.ErrnoError(22);
                      return re.resolve(
                        ie.getPath(t.parent),
                        t.node_ops.readlink(t)
                      );
                    },
                    stat: function (e, t) {
                      var r = ie.lookupPath(e, { follow: !t }).node;
                      if (!r) throw new ie.ErrnoError(2);
                      if (!r.node_ops.getattr) throw new ie.ErrnoError(1);
                      return r.node_ops.getattr(r);
                    },
                    lstat: function (e) {
                      return ie.stat(e, !0);
                    },
                    chmod: function (e, t, r) {
                      var n;
                      if (
                        !(n =
                          "string" == typeof e
                            ? ie.lookupPath(e, { follow: !r }).node
                            : e).node_ops.setattr
                      )
                        throw new ie.ErrnoError(1);
                      n.node_ops.setattr(n, {
                        mode: (4095 & t) | (-4096 & n.mode),
                        timestamp: Date.now(),
                      });
                    },
                    lchmod: function (e, t) {
                      ie.chmod(e, t, !0);
                    },
                    fchmod: function (e, t) {
                      var r = ie.getStream(e);
                      if (!r) throw new ie.ErrnoError(9);
                      ie.chmod(r.node, t);
                    },
                    chown: function (e, t, r, n) {
                      var o;
                      if (
                        !(o =
                          "string" == typeof e
                            ? ie.lookupPath(e, { follow: !n }).node
                            : e).node_ops.setattr
                      )
                        throw new ie.ErrnoError(1);
                      o.node_ops.setattr(o, { timestamp: Date.now() });
                    },
                    lchown: function (e, t, r) {
                      ie.chown(e, t, r, !0);
                    },
                    fchown: function (e, t, r) {
                      var n = ie.getStream(e);
                      if (!n) throw new ie.ErrnoError(9);
                      ie.chown(n.node, t, r);
                    },
                    truncate: function (e, t) {
                      if (t < 0) throw new ie.ErrnoError(22);
                      var r;
                      if (
                        !(r =
                          "string" == typeof e
                            ? ie.lookupPath(e, { follow: !0 }).node
                            : e).node_ops.setattr
                      )
                        throw new ie.ErrnoError(1);
                      if (ie.isDir(r.mode)) throw new ie.ErrnoError(21);
                      if (!ie.isFile(r.mode)) throw new ie.ErrnoError(22);
                      var n = ie.nodePermissions(r, "w");
                      if (n) throw new ie.ErrnoError(n);
                      r.node_ops.setattr(r, { size: t, timestamp: Date.now() });
                    },
                    ftruncate: function (e, t) {
                      var r = ie.getStream(e);
                      if (!r) throw new ie.ErrnoError(9);
                      if (0 == (2097155 & r.flags)) throw new ie.ErrnoError(22);
                      ie.truncate(r.node, t);
                    },
                    utime: function (e, t, r) {
                      var n = ie.lookupPath(e, { follow: !0 }).node;
                      n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
                    },
                    open: function (e, t, n, o, i) {
                      if ("" === e) throw new ie.ErrnoError(2);
                      var s;
                      if (
                        ((n = void 0 === n ? 438 : n),
                        (n =
                          64 &
                          (t =
                            "string" == typeof t ? ie.modeStringToFlags(t) : t)
                            ? (4095 & n) | 32768
                            : 0),
                        "object" == typeof e)
                      )
                        s = e;
                      else {
                        e = ee.normalize(e);
                        try {
                          s = ie.lookupPath(e, { follow: !(131072 & t) }).node;
                        } catch (e) {}
                      }
                      var a = !1;
                      if (64 & t)
                        if (s) {
                          if (128 & t) throw new ie.ErrnoError(17);
                        } else (s = ie.mknod(e, n, 0)), (a = !0);
                      if (!s) throw new ie.ErrnoError(2);
                      if (
                        (ie.isChrdev(s.mode) && (t &= -513),
                        65536 & t && !ie.isDir(s.mode))
                      )
                        throw new ie.ErrnoError(20);
                      if (!a) {
                        var u = ie.mayOpen(s, t);
                        if (u) throw new ie.ErrnoError(u);
                      }
                      512 & t && ie.truncate(s, 0), (t &= -641);
                      var c = ie.createStream(
                        {
                          node: s,
                          path: ie.getPath(s),
                          flags: t,
                          seekable: !0,
                          position: 0,
                          stream_ops: s.stream_ops,
                          ungotten: [],
                          error: !1,
                        },
                        o,
                        i
                      );
                      c.stream_ops.open && c.stream_ops.open(c),
                        !r.logReadFiles ||
                          1 & t ||
                          (ie.readFiles || (ie.readFiles = {}),
                          e in ie.readFiles ||
                            ((ie.readFiles[e] = 1),
                            console.log(
                              "FS.trackingDelegate error on read file: " + e
                            )));
                      try {
                        if (ie.trackingDelegate.onOpenFile) {
                          var l = 0;
                          1 != (2097155 & t) &&
                            (l |= ie.tracking.openFlags.READ),
                            0 != (2097155 & t) &&
                              (l |= ie.tracking.openFlags.WRITE),
                            ie.trackingDelegate.onOpenFile(e, l);
                        }
                      } catch (t) {
                        console.log(
                          "FS.trackingDelegate['onOpenFile']('" +
                            e +
                            "', flags) threw an exception: " +
                            t.message
                        );
                      }
                      return c;
                    },
                    close: function (e) {
                      if (ie.isClosed(e)) throw new ie.ErrnoError(9);
                      e.getdents && (e.getdents = null);
                      try {
                        e.stream_ops.close && e.stream_ops.close(e);
                      } catch (e) {
                        throw e;
                      } finally {
                        ie.closeStream(e.fd);
                      }
                      e.fd = null;
                    },
                    isClosed: function (e) {
                      return null === e.fd;
                    },
                    llseek: function (e, t, r) {
                      if (ie.isClosed(e)) throw new ie.ErrnoError(9);
                      if (!e.seekable || !e.stream_ops.llseek)
                        throw new ie.ErrnoError(29);
                      if (0 != r && 1 != r && 2 != r)
                        throw new ie.ErrnoError(22);
                      return (
                        (e.position = e.stream_ops.llseek(e, t, r)),
                        (e.ungotten = []),
                        e.position
                      );
                    },
                    read: function (e, t, r, n, o) {
                      if (n < 0 || o < 0) throw new ie.ErrnoError(22);
                      if (ie.isClosed(e)) throw new ie.ErrnoError(9);
                      if (1 == (2097155 & e.flags)) throw new ie.ErrnoError(9);
                      if (ie.isDir(e.node.mode)) throw new ie.ErrnoError(21);
                      if (!e.stream_ops.read) throw new ie.ErrnoError(22);
                      var i = void 0 !== o;
                      if (i) {
                        if (!e.seekable) throw new ie.ErrnoError(29);
                      } else o = e.position;
                      var s = e.stream_ops.read(e, t, r, n, o);
                      return i || (e.position += s), s;
                    },
                    write: function (e, t, r, n, o, i) {
                      if (n < 0 || o < 0) throw new ie.ErrnoError(22);
                      if (ie.isClosed(e)) throw new ie.ErrnoError(9);
                      if (0 == (2097155 & e.flags)) throw new ie.ErrnoError(9);
                      if (ie.isDir(e.node.mode)) throw new ie.ErrnoError(21);
                      if (!e.stream_ops.write) throw new ie.ErrnoError(22);
                      1024 & e.flags && ie.llseek(e, 0, 2);
                      var s = void 0 !== o;
                      if (s) {
                        if (!e.seekable) throw new ie.ErrnoError(29);
                      } else o = e.position;
                      var a = e.stream_ops.write(e, t, r, n, o, i);
                      s || (e.position += a);
                      try {
                        e.path &&
                          ie.trackingDelegate.onWriteToFile &&
                          ie.trackingDelegate.onWriteToFile(e.path);
                      } catch (t) {
                        console.log(
                          "FS.trackingDelegate['onWriteToFile']('" +
                            e.path +
                            "') threw an exception: " +
                            t.message
                        );
                      }
                      return a;
                    },
                    allocate: function (e, t, r) {
                      if (ie.isClosed(e)) throw new ie.ErrnoError(9);
                      if (t < 0 || r <= 0) throw new ie.ErrnoError(22);
                      if (0 == (2097155 & e.flags)) throw new ie.ErrnoError(9);
                      if (!ie.isFile(e.node.mode) && !ie.isDir(e.node.mode))
                        throw new ie.ErrnoError(19);
                      if (!e.stream_ops.allocate) throw new ie.ErrnoError(95);
                      e.stream_ops.allocate(e, t, r);
                    },
                    mmap: function (e, t, r, n, o, i, s) {
                      if (
                        0 != (2 & i) &&
                        0 == (2 & s) &&
                        2 != (2097155 & e.flags)
                      )
                        throw new ie.ErrnoError(13);
                      if (1 == (2097155 & e.flags)) throw new ie.ErrnoError(13);
                      if (!e.stream_ops.mmap) throw new ie.ErrnoError(19);
                      return e.stream_ops.mmap(e, t, r, n, o, i, s);
                    },
                    msync: function (e, t, r, n, o) {
                      return e && e.stream_ops.msync
                        ? e.stream_ops.msync(e, t, r, n, o)
                        : 0;
                    },
                    munmap: function (e) {
                      return 0;
                    },
                    ioctl: function (e, t, r) {
                      if (!e.stream_ops.ioctl) throw new ie.ErrnoError(25);
                      return e.stream_ops.ioctl(e, t, r);
                    },
                    readFile: function (e, t) {
                      if (
                        (((t = t || {}).flags = t.flags || "r"),
                        (t.encoding = t.encoding || "binary"),
                        "utf8" !== t.encoding && "binary" !== t.encoding)
                      )
                        throw new Error(
                          'Invalid encoding type "' + t.encoding + '"'
                        );
                      var r,
                        n = ie.open(e, t.flags),
                        o = ie.stat(e).size,
                        i = new Uint8Array(o);
                      return (
                        ie.read(n, i, 0, o, 0),
                        "utf8" === t.encoding
                          ? (r = k(i, 0))
                          : "binary" === t.encoding && (r = i),
                        ie.close(n),
                        r
                      );
                    },
                    writeFile: function (e, t, r) {
                      (r = r || {}).flags = r.flags || "w";
                      var n = ie.open(e, r.flags, r.mode);
                      if ("string" == typeof t) {
                        var o = new Uint8Array(F(t) + 1),
                          i = D(t, o, 0, o.length);
                        ie.write(n, o, 0, i, void 0, r.canOwn);
                      } else {
                        if (!ArrayBuffer.isView(t))
                          throw new Error("Unsupported data type");
                        ie.write(n, t, 0, t.byteLength, void 0, r.canOwn);
                      }
                      ie.close(n);
                    },
                    cwd: function () {
                      return ie.currentPath;
                    },
                    chdir: function (e) {
                      var t = ie.lookupPath(e, { follow: !0 });
                      if (null === t.node) throw new ie.ErrnoError(2);
                      if (!ie.isDir(t.node.mode)) throw new ie.ErrnoError(20);
                      var r = ie.nodePermissions(t.node, "x");
                      if (r) throw new ie.ErrnoError(r);
                      ie.currentPath = t.path;
                    },
                    createDefaultDirectories: function () {
                      ie.mkdir("/tmp"),
                        ie.mkdir("/home"),
                        ie.mkdir("/home/web_user");
                    },
                    createDefaultDevices: function () {
                      var e;
                      if (
                        (ie.mkdir("/dev"),
                        ie.registerDevice(ie.makedev(1, 3), {
                          read: function () {
                            return 0;
                          },
                          write: function (e, t, r, n, o) {
                            return n;
                          },
                        }),
                        ie.mkdev("/dev/null", ie.makedev(1, 3)),
                        ne.register(ie.makedev(5, 0), ne.default_tty_ops),
                        ne.register(ie.makedev(6, 0), ne.default_tty1_ops),
                        ie.mkdev("/dev/tty", ie.makedev(5, 0)),
                        ie.mkdev("/dev/tty1", ie.makedev(6, 0)),
                        "object" == typeof crypto &&
                          "function" == typeof crypto.getRandomValues)
                      ) {
                        var t = new Uint8Array(1);
                        e = function () {
                          return crypto.getRandomValues(t), t[0];
                        };
                      }
                      e ||
                        (e = function () {
                          pe("random_device");
                        }),
                        ie.createDevice("/dev", "random", e),
                        ie.createDevice("/dev", "urandom", e),
                        ie.mkdir("/dev/shm"),
                        ie.mkdir("/dev/shm/tmp");
                    },
                    createSpecialDirectories: function () {
                      ie.mkdir("/proc"),
                        ie.mkdir("/proc/self"),
                        ie.mkdir("/proc/self/fd"),
                        ie.mount(
                          {
                            mount: function () {
                              var e = ie.createNode(
                                "/proc/self",
                                "fd",
                                16895,
                                73
                              );
                              return (
                                (e.node_ops = {
                                  lookup: function (e, t) {
                                    var r = +t,
                                      n = ie.getStream(r);
                                    if (!n) throw new ie.ErrnoError(9);
                                    var o = {
                                      parent: null,
                                      mount: { mountpoint: "fake" },
                                      node_ops: {
                                        readlink: function () {
                                          return n.path;
                                        },
                                      },
                                    };
                                    return (o.parent = o), o;
                                  },
                                }),
                                e
                              );
                            },
                          },
                          {},
                          "/proc/self/fd"
                        );
                    },
                    createStandardStreams: function () {
                      r.stdin
                        ? ie.createDevice("/dev", "stdin", r.stdin)
                        : ie.symlink("/dev/tty", "/dev/stdin"),
                        r.stdout
                          ? ie.createDevice("/dev", "stdout", null, r.stdout)
                          : ie.symlink("/dev/tty", "/dev/stdout"),
                        r.stderr
                          ? ie.createDevice("/dev", "stderr", null, r.stderr)
                          : ie.symlink("/dev/tty1", "/dev/stderr"),
                        ie.open("/dev/stdin", "r"),
                        ie.open("/dev/stdout", "w"),
                        ie.open("/dev/stderr", "w");
                    },
                    ensureErrnoError: function () {
                      ie.ErrnoError ||
                        ((ie.ErrnoError = function (e, t) {
                          (this.node = t),
                            (this.setErrno = function (e) {
                              this.errno = e;
                            }),
                            this.setErrno(e),
                            (this.message = "FS error");
                        }),
                        (ie.ErrnoError.prototype = new Error()),
                        (ie.ErrnoError.prototype.constructor = ie.ErrnoError),
                        [2].forEach(function (e) {
                          (ie.genericErrors[e] = new ie.ErrnoError(e)),
                            (ie.genericErrors[e].stack =
                              "<generic error, no stack>");
                        }));
                    },
                    staticInit: function () {
                      ie.ensureErrnoError(),
                        (ie.nameTable = new Array(4096)),
                        ie.mount(oe, {}, "/"),
                        ie.createDefaultDirectories(),
                        ie.createDefaultDevices(),
                        ie.createSpecialDirectories(),
                        (ie.filesystems = { MEMFS: oe });
                    },
                    init: function (e, t, n) {
                      (ie.init.initialized = !0),
                        ie.ensureErrnoError(),
                        (r.stdin = e || r.stdin),
                        (r.stdout = t || r.stdout),
                        (r.stderr = n || r.stderr),
                        ie.createStandardStreams();
                    },
                    quit: function () {
                      ie.init.initialized = !1;
                      var e = r._fflush;
                      e && e(0);
                      for (var t = 0; t < ie.streams.length; t++) {
                        var n = ie.streams[t];
                        n && ie.close(n);
                      }
                    },
                    getMode: function (e, t) {
                      var r = 0;
                      return e && (r |= 365), t && (r |= 146), r;
                    },
                    joinPath: function (e, t) {
                      var r = ee.join.apply(null, e);
                      return t && "/" == r[0] && (r = r.substr(1)), r;
                    },
                    absolutePath: function (e, t) {
                      return re.resolve(t, e);
                    },
                    standardizePath: function (e) {
                      return ee.normalize(e);
                    },
                    findObject: function (e, t) {
                      var r = ie.analyzePath(e, t);
                      return r.exists ? r.object : (te(r.error), null);
                    },
                    analyzePath: function (e, t) {
                      try {
                        e = (n = ie.lookupPath(e, { follow: !t })).path;
                      } catch (e) {}
                      var r = {
                        isRoot: !1,
                        exists: !1,
                        error: 0,
                        name: null,
                        path: null,
                        object: null,
                        parentExists: !1,
                        parentPath: null,
                        parentObject: null,
                      };
                      try {
                        var n = ie.lookupPath(e, { parent: !0 });
                        (r.parentExists = !0),
                          (r.parentPath = n.path),
                          (r.parentObject = n.node),
                          (r.name = ee.basename(e)),
                          (n = ie.lookupPath(e, { follow: !t })),
                          (r.exists = !0),
                          (r.path = n.path),
                          (r.object = n.node),
                          (r.name = n.node.name),
                          (r.isRoot = "/" === n.path);
                      } catch (e) {
                        r.error = e.errno;
                      }
                      return r;
                    },
                    createFolder: function (e, t, r, n) {
                      var o = ee.join2(
                          "string" == typeof e ? e : ie.getPath(e),
                          t
                        ),
                        i = ie.getMode(r, n);
                      return ie.mkdir(o, i);
                    },
                    createPath: function (e, t, r, n) {
                      e = "string" == typeof e ? e : ie.getPath(e);
                      for (var o = t.split("/").reverse(); o.length; ) {
                        var i = o.pop();
                        if (i) {
                          var s = ee.join2(e, i);
                          try {
                            ie.mkdir(s);
                          } catch (e) {}
                          e = s;
                        }
                      }
                      return s;
                    },
                    createFile: function (e, t, r, n, o) {
                      var i = ee.join2(
                          "string" == typeof e ? e : ie.getPath(e),
                          t
                        ),
                        s = ie.getMode(n, o);
                      return ie.create(i, s);
                    },
                    createDataFile: function (e, t, r, n, o, i) {
                      var s = t
                          ? ee.join2(
                              "string" == typeof e ? e : ie.getPath(e),
                              t
                            )
                          : e,
                        a = ie.getMode(n, o),
                        u = ie.create(s, a);
                      if (r) {
                        if ("string" == typeof r) {
                          for (
                            var c = new Array(r.length), l = 0, f = r.length;
                            l < f;
                            ++l
                          )
                            c[l] = r.charCodeAt(l);
                          r = c;
                        }
                        ie.chmod(u, 146 | a);
                        var d = ie.open(u, "w");
                        ie.write(d, r, 0, r.length, 0, i),
                          ie.close(d),
                          ie.chmod(u, a);
                      }
                      return u;
                    },
                    createDevice: function (e, t, r, n) {
                      var o = ee.join2(
                          "string" == typeof e ? e : ie.getPath(e),
                          t
                        ),
                        i = ie.getMode(!!r, !!n);
                      ie.createDevice.major || (ie.createDevice.major = 64);
                      var s = ie.makedev(ie.createDevice.major++, 0);
                      return (
                        ie.registerDevice(s, {
                          open: function (e) {
                            e.seekable = !1;
                          },
                          close: function (e) {
                            n && n.buffer && n.buffer.length && n(10);
                          },
                          read: function (e, t, n, o, i) {
                            for (var s = 0, a = 0; a < o; a++) {
                              var u;
                              try {
                                u = r();
                              } catch (e) {
                                throw new ie.ErrnoError(5);
                              }
                              if (void 0 === u && 0 === s)
                                throw new ie.ErrnoError(11);
                              if (null == u) break;
                              s++, (t[n + a] = u);
                            }
                            return s && (e.node.timestamp = Date.now()), s;
                          },
                          write: function (e, t, r, o, i) {
                            for (var s = 0; s < o; s++)
                              try {
                                n(t[r + s]);
                              } catch (e) {
                                throw new ie.ErrnoError(5);
                              }
                            return o && (e.node.timestamp = Date.now()), s;
                          },
                        }),
                        ie.mkdev(o, i, s)
                      );
                    },
                    createLink: function (e, t, r, n, o) {
                      var i = ee.join2(
                        "string" == typeof e ? e : ie.getPath(e),
                        t
                      );
                      return ie.symlink(r, i);
                    },
                    forceLoadFile: function (e) {
                      if (e.isDevice || e.isFolder || e.link || e.contents)
                        return !0;
                      var t = !0;
                      if ("undefined" != typeof XMLHttpRequest)
                        throw new Error(
                          "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
                        );
                      if (!i)
                        throw new Error(
                          "Cannot load without read() or XMLHttpRequest."
                        );
                      try {
                        (e.contents = ue(i(e.url), !0)),
                          (e.usedBytes = e.contents.length);
                      } catch (e) {
                        t = !1;
                      }
                      return t || te(5), t;
                    },
                    createLazyFile: function (e, t, r, n, o) {
                      function i() {
                        (this.lengthKnown = !1), (this.chunks = []);
                      }
                      if (
                        ((i.prototype.get = function (e) {
                          if (!(e > this.length - 1 || e < 0)) {
                            var t = e % this.chunkSize,
                              r = (e / this.chunkSize) | 0;
                            return this.getter(r)[t];
                          }
                        }),
                        (i.prototype.setDataGetter = function (e) {
                          this.getter = e;
                        }),
                        (i.prototype.cacheLength = function () {
                          var e = new XMLHttpRequest();
                          if (
                            (e.open("HEAD", r, !1),
                            e.send(null),
                            !(
                              (e.status >= 200 && e.status < 300) ||
                              304 === e.status
                            ))
                          )
                            throw new Error(
                              "Couldn't load " + r + ". Status: " + e.status
                            );
                          var t,
                            n = Number(e.getResponseHeader("Content-length")),
                            o =
                              (t = e.getResponseHeader("Accept-Ranges")) &&
                              "bytes" === t,
                            i =
                              (t = e.getResponseHeader("Content-Encoding")) &&
                              "gzip" === t,
                            s = 1048576;
                          o || (s = n);
                          var a = this;
                          a.setDataGetter(function (e) {
                            var t = e * s,
                              o = (e + 1) * s - 1;
                            if (
                              ((o = Math.min(o, n - 1)),
                              void 0 === a.chunks[e] &&
                                (a.chunks[e] = (function (e, t) {
                                  if (e > t)
                                    throw new Error(
                                      "invalid range (" +
                                        e +
                                        ", " +
                                        t +
                                        ") or no bytes requested!"
                                    );
                                  if (t > n - 1)
                                    throw new Error(
                                      "only " +
                                        n +
                                        " bytes available! programmer error!"
                                    );
                                  var o = new XMLHttpRequest();
                                  if (
                                    (o.open("GET", r, !1),
                                    n !== s &&
                                      o.setRequestHeader(
                                        "Range",
                                        "bytes=" + e + "-" + t
                                      ),
                                    "undefined" != typeof Uint8Array &&
                                      (o.responseType = "arraybuffer"),
                                    o.overrideMimeType &&
                                      o.overrideMimeType(
                                        "text/plain; charset=x-user-defined"
                                      ),
                                    o.send(null),
                                    !(
                                      (o.status >= 200 && o.status < 300) ||
                                      304 === o.status
                                    ))
                                  )
                                    throw new Error(
                                      "Couldn't load " +
                                        r +
                                        ". Status: " +
                                        o.status
                                    );
                                  return void 0 !== o.response
                                    ? new Uint8Array(o.response || [])
                                    : ue(o.responseText || "", !0);
                                })(t, o)),
                              void 0 === a.chunks[e])
                            )
                              throw new Error("doXHR failed!");
                            return a.chunks[e];
                          }),
                            (!i && n) ||
                              ((s = n = 1),
                              (n = this.getter(0).length),
                              (s = n),
                              console.log(
                                "LazyFiles on gzip forces download of the whole file when length is accessed"
                              )),
                            (this._length = n),
                            (this._chunkSize = s),
                            (this.lengthKnown = !0);
                        }),
                        "undefined" != typeof XMLHttpRequest)
                      ) {
                        if (!c)
                          throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                        var s = new i();
                        Object.defineProperties(s, {
                          length: {
                            get: function () {
                              return (
                                this.lengthKnown || this.cacheLength(),
                                this._length
                              );
                            },
                          },
                          chunkSize: {
                            get: function () {
                              return (
                                this.lengthKnown || this.cacheLength(),
                                this._chunkSize
                              );
                            },
                          },
                        });
                        var a = { isDevice: !1, contents: s };
                      } else a = { isDevice: !1, url: r };
                      var u = ie.createFile(e, t, a, n, o);
                      a.contents
                        ? (u.contents = a.contents)
                        : a.url && ((u.contents = null), (u.url = a.url)),
                        Object.defineProperties(u, {
                          usedBytes: {
                            get: function () {
                              return this.contents.length;
                            },
                          },
                        });
                      var l = {};
                      return (
                        Object.keys(u.stream_ops).forEach(function (e) {
                          var t = u.stream_ops[e];
                          l[e] = function () {
                            if (!ie.forceLoadFile(u))
                              throw new ie.ErrnoError(5);
                            return t.apply(null, arguments);
                          };
                        }),
                        (l.read = function (e, t, r, n, o) {
                          if (!ie.forceLoadFile(u)) throw new ie.ErrnoError(5);
                          var i = e.node.contents;
                          if (o >= i.length) return 0;
                          var s = Math.min(i.length - o, n);
                          if (i.slice)
                            for (var a = 0; a < s; a++) t[r + a] = i[o + a];
                          else for (a = 0; a < s; a++) t[r + a] = i.get(o + a);
                          return s;
                        }),
                        (u.stream_ops = l),
                        u
                      );
                    },
                    createPreloadedFile: function (
                      e,
                      t,
                      n,
                      o,
                      i,
                      s,
                      a,
                      u,
                      c,
                      l
                    ) {
                      Browser.init();
                      var f = t ? re.resolve(ee.join2(e, t)) : e;
                      function d(n) {
                        function d(r) {
                          l && l(),
                            u || ie.createDataFile(e, t, r, o, i, c),
                            s && s(),
                            W();
                        }
                        var h = !1;
                        r.preloadPlugins.forEach(function (e) {
                          h ||
                            (e.canHandle(f) &&
                              (e.handle(n, f, d, function () {
                                a && a(), W();
                              }),
                              (h = !0)));
                        }),
                          h || d(n);
                      }
                      q(),
                        "string" == typeof n
                          ? Browser.asyncLoad(
                              n,
                              function (e) {
                                d(e);
                              },
                              a
                            )
                          : d(n);
                    },
                    indexedDB: function () {
                      return (
                        window.indexedDB ||
                        window.mozIndexedDB ||
                        window.webkitIndexedDB ||
                        window.msIndexedDB
                      );
                    },
                    DB_NAME: function () {
                      return "EM_FS_" + window.location.pathname;
                    },
                    DB_VERSION: 20,
                    DB_STORE_NAME: "FILE_DATA",
                    saveFilesToDB: function (e, t, r) {
                      (t = t || function () {}), (r = r || function () {});
                      var n = ie.indexedDB();
                      try {
                        var o = n.open(ie.DB_NAME(), ie.DB_VERSION);
                      } catch (e) {
                        return r(e);
                      }
                      (o.onupgradeneeded = function () {
                        console.log("creating db"),
                          o.result.createObjectStore(ie.DB_STORE_NAME);
                      }),
                        (o.onsuccess = function () {
                          var n = o.result.transaction(
                              [ie.DB_STORE_NAME],
                              "readwrite"
                            ),
                            i = n.objectStore(ie.DB_STORE_NAME),
                            s = 0,
                            a = 0,
                            u = e.length;
                          function c() {
                            0 == a ? t() : r();
                          }
                          e.forEach(function (e) {
                            var t = i.put(ie.analyzePath(e).object.contents, e);
                            (t.onsuccess = function () {
                              ++s + a == u && c();
                            }),
                              (t.onerror = function () {
                                s + ++a == u && c();
                              });
                          }),
                            (n.onerror = r);
                        }),
                        (o.onerror = r);
                    },
                    loadFilesFromDB: function (e, t, r) {
                      (t = t || function () {}), (r = r || function () {});
                      var n = ie.indexedDB();
                      try {
                        var o = n.open(ie.DB_NAME(), ie.DB_VERSION);
                      } catch (e) {
                        return r(e);
                      }
                      (o.onupgradeneeded = r),
                        (o.onsuccess = function () {
                          var n = o.result;
                          try {
                            var i = n.transaction(
                              [ie.DB_STORE_NAME],
                              "readonly"
                            );
                          } catch (e) {
                            return void r(e);
                          }
                          var s = i.objectStore(ie.DB_STORE_NAME),
                            a = 0,
                            u = 0,
                            c = e.length;
                          function l() {
                            0 == u ? t() : r();
                          }
                          e.forEach(function (e) {
                            var t = s.get(e);
                            (t.onsuccess = function () {
                              ie.analyzePath(e).exists && ie.unlink(e),
                                ie.createDataFile(
                                  ee.dirname(e),
                                  ee.basename(e),
                                  t.result,
                                  !0,
                                  !0,
                                  !0
                                ),
                                ++a + u == c && l();
                            }),
                              (t.onerror = function () {
                                a + ++u == c && l();
                              });
                          }),
                            (i.onerror = r);
                        }),
                        (o.onerror = r);
                    },
                  },
                  se = {
                    DEFAULT_POLLMASK: 5,
                    mappings: {},
                    umask: 511,
                    calculateAt: function (e, t) {
                      if ("/" !== t[0]) {
                        var r;
                        if (-100 === e) r = ie.cwd();
                        else {
                          var n = ie.getStream(e);
                          if (!n) throw new ie.ErrnoError(9);
                          r = n.path;
                        }
                        t = ee.join2(r, t);
                      }
                      return t;
                    },
                    doStat: function (e, t, r) {
                      try {
                        var n = e(t);
                      } catch (e) {
                        if (
                          e &&
                          e.node &&
                          ee.normalize(t) !== ee.normalize(ie.getPath(e.node))
                        )
                          return -20;
                        throw e;
                      }
                      return (
                        (v[r >> 2] = n.dev),
                        (v[(r + 4) >> 2] = 0),
                        (v[(r + 8) >> 2] = n.ino),
                        (v[(r + 12) >> 2] = n.mode),
                        (v[(r + 16) >> 2] = n.nlink),
                        (v[(r + 20) >> 2] = n.uid),
                        (v[(r + 24) >> 2] = n.gid),
                        (v[(r + 28) >> 2] = n.rdev),
                        (v[(r + 32) >> 2] = 0),
                        (K = [
                          n.size >>> 0,
                          ((V = n.size),
                          +O(V) >= 1
                            ? V > 0
                              ? (0 | z(+I(V / 4294967296), 4294967295)) >>> 0
                              : ~~+N((V - +(~~V >>> 0)) / 4294967296) >>> 0
                            : 0),
                        ]),
                        (v[(r + 40) >> 2] = K[0]),
                        (v[(r + 44) >> 2] = K[1]),
                        (v[(r + 48) >> 2] = 4096),
                        (v[(r + 52) >> 2] = n.blocks),
                        (v[(r + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                        (v[(r + 60) >> 2] = 0),
                        (v[(r + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                        (v[(r + 68) >> 2] = 0),
                        (v[(r + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                        (v[(r + 76) >> 2] = 0),
                        (K = [
                          n.ino >>> 0,
                          ((V = n.ino),
                          +O(V) >= 1
                            ? V > 0
                              ? (0 | z(+I(V / 4294967296), 4294967295)) >>> 0
                              : ~~+N((V - +(~~V >>> 0)) / 4294967296) >>> 0
                            : 0),
                        ]),
                        (v[(r + 80) >> 2] = K[0]),
                        (v[(r + 84) >> 2] = K[1]),
                        0
                      );
                    },
                    doMsync: function (e, t, r, n) {
                      var o = new Uint8Array(y.subarray(e, e + r));
                      ie.msync(t, o, 0, r, n);
                    },
                    doMkdir: function (e, t) {
                      return (
                        "/" === (e = ee.normalize(e))[e.length - 1] &&
                          (e = e.substr(0, e.length - 1)),
                        ie.mkdir(e, t, 0),
                        0
                      );
                    },
                    doMknod: function (e, t, r) {
                      switch (61440 & t) {
                        case 32768:
                        case 8192:
                        case 24576:
                        case 4096:
                        case 49152:
                          break;
                        default:
                          return -22;
                      }
                      return ie.mknod(e, t, r), 0;
                    },
                    doReadlink: function (e, t, r) {
                      if (r <= 0) return -22;
                      var n = ie.readlink(e),
                        o = Math.min(r, F(n)),
                        i = g[t + o];
                      return D(n, y, t, r + 1), (g[t + o] = i), o;
                    },
                    doAccess: function (e, t) {
                      if (-8 & t) return -22;
                      var r;
                      if (!(r = ie.lookupPath(e, { follow: !0 }).node))
                        return -2;
                      var n = "";
                      return (
                        4 & t && (n += "r"),
                        2 & t && (n += "w"),
                        1 & t && (n += "x"),
                        n && ie.nodePermissions(r, n) ? -13 : 0
                      );
                    },
                    doDup: function (e, t, r) {
                      var n = ie.getStream(r);
                      return n && ie.close(n), ie.open(e, t, 0, r, r).fd;
                    },
                    doReadv: function (e, t, r, n) {
                      for (var o = 0, i = 0; i < r; i++) {
                        var s = v[(t + 8 * i) >> 2],
                          a = v[(t + (8 * i + 4)) >> 2],
                          u = ie.read(e, g, s, a, n);
                        if (u < 0) return -1;
                        if (((o += u), u < a)) break;
                      }
                      return o;
                    },
                    doWritev: function (e, t, r, n) {
                      for (var o = 0, i = 0; i < r; i++) {
                        var s = v[(t + 8 * i) >> 2],
                          a = v[(t + (8 * i + 4)) >> 2],
                          u = ie.write(e, g, s, a, n);
                        if (u < 0) return -1;
                        o += u;
                      }
                      return o;
                    },
                    varargs: 0,
                    get: function (e) {
                      return (se.varargs += 4), v[(se.varargs - 4) >> 2];
                    },
                    getStr: function () {
                      return C(se.get());
                    },
                    getStreamFromFD: function () {
                      var e = ie.getStream(se.get());
                      if (!e) throw new ie.ErrnoError(9);
                      return e;
                    },
                    get64: function () {
                      var e = se.get();
                      return se.get(), e;
                    },
                    getZero: function () {
                      se.get();
                    },
                  };
                function ae() {
                  return g.length;
                }
                function ue(e, t, r) {
                  var n = r > 0 ? r : F(e) + 1,
                    o = new Array(n),
                    i = D(e, o, 0, o.length);
                  return t && (o.length = i), o;
                }
                ie.staticInit();
                var ce = {
                    b: pe,
                    p: function () {},
                    f: te,
                    j: function (e, t) {
                      se.varargs = t;
                      try {
                        var r = se.getStreamFromFD(),
                          n = se.get(),
                          o = se.get(),
                          i = se.get(),
                          s = se.get(),
                          a = 4294967296 * n + (o >>> 0);
                        return a <= -9007199254740992 || a >= 9007199254740992
                          ? -75
                          : (ie.llseek(r, a, s),
                            (K = [
                              r.position >>> 0,
                              ((V = r.position),
                              +O(V) >= 1
                                ? V > 0
                                  ? (0 | z(+I(V / 4294967296), 4294967295)) >>>
                                    0
                                  : ~~+N((V - +(~~V >>> 0)) / 4294967296) >>> 0
                                : 0),
                            ]),
                            (v[i >> 2] = K[0]),
                            (v[(i + 4) >> 2] = K[1]),
                            r.getdents &&
                              0 === a &&
                              0 === s &&
                              (r.getdents = null),
                            0);
                      } catch (e) {
                        return (
                          (void 0 !== ie && e instanceof ie.ErrnoError) ||
                            pe(e),
                          -e.errno
                        );
                      }
                    },
                    i: function (e, t) {
                      se.varargs = t;
                      try {
                        var r = se.getStreamFromFD(),
                          n = se.get(),
                          o = se.get();
                        return se.doReadv(r, n, o);
                      } catch (e) {
                        return (
                          (void 0 !== ie && e instanceof ie.ErrnoError) ||
                            pe(e),
                          -e.errno
                        );
                      }
                    },
                    c: function (e, t) {
                      se.varargs = t;
                      try {
                        var r = se.getStreamFromFD();
                        switch (se.get()) {
                          case 0:
                            return (n = se.get()) < 0
                              ? -22
                              : ie.open(r.path, r.flags, 0, n).fd;
                          case 1:
                          case 2:
                            return 0;
                          case 3:
                            return r.flags;
                          case 4:
                            var n = se.get();
                            return (r.flags |= n), 0;
                          case 12:
                            return (n = se.get()), (w[(n + 0) >> 1] = 2), 0;
                          case 13:
                          case 14:
                            return 0;
                          case 16:
                          case 8:
                            return -22;
                          case 9:
                            return te(22), -1;
                          default:
                            return -22;
                        }
                      } catch (e) {
                        return (
                          (void 0 !== ie && e instanceof ie.ErrnoError) ||
                            pe(e),
                          -e.errno
                        );
                      }
                    },
                    h: function (e, t) {
                      se.varargs = t;
                      try {
                        var r = se.getStr(),
                          n = se.get(),
                          o = se.get();
                        return ie.open(r, n, o).fd;
                      } catch (e) {
                        return (
                          (void 0 !== ie && e instanceof ie.ErrnoError) ||
                            pe(e),
                          -e.errno
                        );
                      }
                    },
                    g: function (e, t) {
                      se.varargs = t;
                      try {
                        var r = se.getStreamFromFD(),
                          n = se.get();
                        switch (n) {
                          case 21509:
                          case 21505:
                            return r.tty ? 0 : -25;
                          case 21510:
                          case 21511:
                          case 21512:
                          case 21506:
                          case 21507:
                          case 21508:
                            return r.tty ? 0 : -25;
                          case 21519:
                            if (!r.tty) return -25;
                            var o = se.get();
                            return (v[o >> 2] = 0), 0;
                          case 21520:
                            return r.tty ? -22 : -25;
                          case 21531:
                            return (o = se.get()), ie.ioctl(r, n, o);
                          case 21523:
                          case 21524:
                            return r.tty ? 0 : -25;
                          default:
                            pe("bad ioctl syscall " + n);
                        }
                      } catch (e) {
                        return (
                          (void 0 !== ie && e instanceof ie.ErrnoError) ||
                            pe(e),
                          -e.errno
                        );
                      }
                    },
                    e: function (e, t) {
                      se.varargs = t;
                      try {
                        var r = se.getStreamFromFD();
                        return ie.close(r), 0;
                      } catch (e) {
                        return (
                          (void 0 !== ie && e instanceof ie.ErrnoError) ||
                            pe(e),
                          -e.errno
                        );
                      }
                    },
                    d: function () {},
                    o: function () {
                      return function (e, t, r, n) {
                        try {
                          if (!(e = ie.getStream(e)))
                            throw new ie.ErrnoError(9);
                          var o = se.doWritev(e, t, r);
                          return (v[n >> 2] = o), 0;
                        } catch (e) {
                          return (
                            (void 0 !== ie && e instanceof ie.ErrnoError) ||
                              pe(e),
                            -e.errno
                          );
                        }
                      }.apply(null, arguments);
                    },
                    n: ae,
                    m: function (e, t, r) {
                      y.set(y.subarray(t, t + r), e);
                    },
                    l: function (e) {
                      var t = ae();
                      if (e > 2147418112) return !1;
                      for (var r = Math.max(t, 16777216); r < e; )
                        r =
                          r <= 536870912
                            ? T(2 * r, 65536)
                            : Math.min(
                                T((3 * r + 2147483648) / 4, 65536),
                                2147418112
                              );
                      return !!(function (e) {
                        try {
                          return (
                            p.grow((e - _.byteLength + 65535) >> 16),
                            S(p.buffer),
                            1
                          );
                        } catch (e) {}
                      })(r);
                    },
                    k: function (e) {
                      pe("OOM");
                    },
                    a: P,
                  },
                  le = r.asm({}, ce, _);
                (r.asm = le),
                  (r.___errno_location = function () {
                    return r.asm.q.apply(null, arguments);
                  }),
                  (r._free = function () {
                    return r.asm.r.apply(null, arguments);
                  });
                var fe,
                  de = (r._malloc = function () {
                    return r.asm.s.apply(null, arguments);
                  });
                function he(e) {
                  function t() {
                    fe ||
                      ((fe = !0),
                      E ||
                        (r.noFSInit || ie.init.initialized || ie.init(),
                        ne.init(),
                        x(L),
                        (ie.ignorePermissions = !1),
                        x(R),
                        r.onRuntimeInitialized && r.onRuntimeInitialized(),
                        (function () {
                          if (r.postRun)
                            for (
                              "function" == typeof r.postRun &&
                              (r.postRun = [r.postRun]);
                              r.postRun.length;

                            )
                              (e = r.postRun.shift()), B.unshift(e);
                          var e;
                          x(B);
                        })()));
                  }
                  (e = e || a),
                    U > 0 ||
                      ((function () {
                        if (r.preRun)
                          for (
                            "function" == typeof r.preRun &&
                            (r.preRun = [r.preRun]);
                            r.preRun.length;

                          )
                            (e = r.preRun.shift()), M.unshift(e);
                        var e;
                        x(M);
                      })(),
                      U > 0 ||
                        (r.setStatus
                          ? (r.setStatus("Running..."),
                            setTimeout(function () {
                              setTimeout(function () {
                                r.setStatus("");
                              }, 1),
                                t();
                            }, 1))
                          : t()));
                }
                function pe(e) {
                  throw (
                    (r.onAbort && r.onAbort(e),
                    f((e += "")),
                    d(e),
                    (E = !0),
                    "abort(" +
                      e +
                      "). Build with -s ASSERTIONS=1 for more info.")
                  );
                }
                if (
                  ((r._mid_alloc_options = function () {
                    return r.asm.t.apply(null, arguments);
                  }),
                  (r._mid_exit = function () {
                    return r.asm.u.apply(null, arguments);
                  }),
                  (r._mid_get_load_request = function () {
                    return r.asm.v.apply(null, arguments);
                  }),
                  (r._mid_get_load_request_count = function () {
                    return r.asm.w.apply(null, arguments);
                  }),
                  (r._mid_init = function () {
                    return r.asm.x.apply(null, arguments);
                  }),
                  (r._mid_istream_close = function () {
                    return r.asm.y.apply(null, arguments);
                  }),
                  (r._mid_istream_open_mem = function () {
                    return r.asm.z.apply(null, arguments);
                  }),
                  (r._mid_song_free = function () {
                    return r.asm.A.apply(null, arguments);
                  }),
                  (r._mid_song_get_time = function () {
                    return r.asm.B.apply(null, arguments);
                  }),
                  (r._mid_song_get_total_time = function () {
                    return r.asm.C.apply(null, arguments);
                  }),
                  (r._mid_song_load = function () {
                    return r.asm.D.apply(null, arguments);
                  }),
                  (r._mid_song_read_wave = function () {
                    return r.asm.E.apply(null, arguments);
                  }),
                  (r._mid_song_seek = function () {
                    return r.asm.F.apply(null, arguments);
                  }),
                  (r._mid_song_start = function () {
                    return r.asm.G.apply(null, arguments);
                  }),
                  (r.stackAlloc = function () {
                    return r.asm.H.apply(null, arguments);
                  }),
                  (r.asm = le),
                  (r.UTF8ToString = C),
                  (r.FS = ie),
                  (r.then = function (e) {
                    if (fe) e(r);
                    else {
                      var t = r.onRuntimeInitialized;
                      r.onRuntimeInitialized = function () {
                        t && t(), e(r);
                      };
                    }
                    return r;
                  }),
                  (H = function e() {
                    fe || he(), fe || (H = e);
                  }),
                  (r.run = he),
                  (r.abort = pe),
                  r.preInit)
                )
                  for (
                    "function" == typeof r.preInit && (r.preInit = [r.preInit]);
                    r.preInit.length > 0;

                  )
                    r.preInit.pop()();
                return he(), e;
              });
          "object" == typeof r && "object" == typeof t
            ? (t.exports = o)
            : "object" == typeof r && (r.LibTimidity = o);
        },
        {},
      ],
      10: [
        function (e, t, r) {
          var n, o;
          (n = this),
            (o = function () {
              "use strict";
              var e = ["interactive", "complete"],
                t = function (t, r) {
                  return new Promise(function (n) {
                    t && "function" != typeof t && ((r = t), (t = null)),
                      (r = r || window.document);
                    var o = function () {
                      return n(void (t && setTimeout(t)));
                    };
                    -1 !== e.indexOf(r.readyState)
                      ? o()
                      : r.addEventListener("DOMContentLoaded", o);
                  });
                };
              return (
                (t.resume = function (e) {
                  return function (r) {
                    return t(e).then(function () {
                      return r;
                    });
                  };
                }),
                t
              );
            }),
            "object" == typeof r && void 0 !== t
              ? (t.exports = o())
              : (n.whenDomReady = o());
        },
        {},
      ],
    },
    {},
    [3]
  )(3);
});
