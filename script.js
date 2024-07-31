(()=>{
    "use strict";
    const t = {};
    function e() {
        if (location.hash)
            return location.hash.replace("#", "")
    }
    let o = !0
      , s = (t=500)=>{
        if (o) {
            const e = document.querySelectorAll("[data-lp]");
            setTimeout((()=>{
                e.forEach((t=>{
                    t.style.paddingRight = ""
                }
                )),
                document.body.style.paddingRight = "",
                document.documentElement.classList.remove("lock")
            }
            ), t),
            o = !1,
            setTimeout((function() {
                o = !0
            }
            ), t)
        }
    }
    ;
    function n() {
        s(),
        document.documentElement.classList.remove("menu-open")
    }
    function c(t) {
        setTimeout((()=>{
            window.FLS && console.log(t)
        }
        ), 0)
    }
    t.mousePrlx = new class {
        constructor(t, e=null) {
            if (this.config = Object.assign({
                init: !0,
                logging: !0
            }, t),
            this.config.init) {
                const t = document.querySelectorAll("[data-prlx-mouse]");
                t.length ? (this.paralaxMouseInit(t),
                this.setLogging(`Прокинувся, стежу за об'єктами: (${t.length})`)) : this.setLogging("Немає жодного обєкта. Сплю...")
            }
        }
        paralaxMouseInit(t) {
            t.forEach((t=>{
                const e = t.closest("[data-prlx-mouse-wrapper]")
                  , o = t.dataset.prlxCx ? +t.dataset.prlxCx : 100
                  , s = t.dataset.prlxCy ? +t.dataset.prlxCy : 100
                  , a = t.hasAttribute("data-prlx-dxr") ? -1 : 1
                  , n = t.hasAttribute("data-prlx-dyr") ? -1 : 1
                  , c = t.dataset.prlxA ? +t.dataset.prlxA : 50;
                let i = 0
                  , r = 0
                  , l = 0
                  , d = 0;
                function h(e=window) {
                    e.addEventListener("mousemove", (function(e) {
                        const o = t.getBoundingClientRect().top + window.scrollY;
                        if (o >= window.scrollY || o + t.offsetHeight >= window.scrollY) {
                            const t = window.innerWidth
                              , o = window.innerHeight
                              , s = e.clientX - t / 2
                              , a = e.clientY - o / 2;
                            l = s / t * 100,
                            d = a / o * 100
                        }
                    }
                    ))
                }
                !function e() {
                    i += (l - i) * c / 1e3,
                    r += (d - r) * c / 1e3,
                    t.style.cssText = `transform: translate3D(${a * i / (o / 10)}%,${n * r / (s / 10)}%,0) rotate(0.02deg);`,
                    requestAnimationFrame(e)
                }(),
                e ? h(e) : h()
            }
            ))
        }
        setLogging(t) {
            this.config.logging && c(`[PRLX Mouse]: ${t}`)
        }
    }
    ({});
    let r = (t,e=!1,o=500,s=0)=>{
        const a = document.querySelector(t);
        if (a) {
            let i = ""
              , r = 0;
            if (e) {
                i = "header.header";
                const t = document.querySelector(i);
                t.classList.contains("_header-scroll") ? r = t.offsetHeight : (t.style.cssText = "transition-duration: 0s;",
                t.classList.add("_header-scroll"),
                r = t.offsetHeight,
                t.classList.remove("_header-scroll"),
                setTimeout((()=>{
                    t.style.cssText = ""
                }
                ), 0))
            }
            let l = {
                speedAsDuration: !0,
                speed: o,
                header: i,
                offset: s,
                easing: "easeOutQuad"
            };
            if (document.documentElement.classList.contains("menu-open") && n(),
            "undefined" != typeof SmoothScroll)
                (new SmoothScroll).animateScroll(a, "", l);
            else {
                let t = a.getBoundingClientRect().top + scrollY;
                t = r ? t - r : t,
                t = s ? t - s : t,
                window.scrollTo({
                    top: t,
                    behavior: "smooth"
                })
            }
            c(`[gotoBlock]: Юхуу...їдемо до ${t}`)
        } else
            c(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${t}`)
    }
    ;
    class l {
        constructor(t) {
            this.config = Object.assign({
                logging: !0
            }, t),
            this.observer,
            !document.documentElement.classList.contains("watcher") && this.scrollWatcherRun()
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun()
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"))
        }
        scrollWatcherConstructor(t) {
            t.length ? (this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${t.length})...`),
            function i(t) {
                return t.filter((function(t, e, o) {
                    return o.indexOf(t) === e
                }
                ))
            }(Array.from(t).map((function(t) {
                if ("navigator" === t.dataset.watch && !t.dataset.watchThreshold) {
                    let e;
                    t.clientHeight > 2 ? (e = window.innerHeight / 2 / (t.clientHeight - 1),
                    e > 1 && (e = 1)) : e = 1,
                    t.setAttribute("data-watch-threshold", e.toFixed(2))
                }
                return `${t.dataset.watchRoot ? t.dataset.watchRoot : null}|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`
            }
            ))).forEach((e=>{
                let o = e.split("|")
                  , s = {
                    root: o[0],
                    margin: o[1],
                    threshold: o[2]
                }
                  , a = Array.from(t).filter((function(t) {
                    let e = t.dataset.watchRoot ? t.dataset.watchRoot : null
                      , o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px"
                      , a = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                    if (String(e) === s.root && String(o) === s.margin && String(a) === s.threshold)
                        return t
                }
                ))
                  , n = this.getScrollWatcherConfig(s);
                this.scrollWatcherInit(a, n)
            }
            ))) : this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz")
        }
        getScrollWatcherConfig(t) {
            let e = {};
            if (document.querySelector(t.root) ? e.root = document.querySelector(t.root) : "null" !== t.root && this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${t.root} немає на сторінці`),
            e.rootMargin = t.margin,
            !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0)) {
                if ("prx" === t.threshold) {
                    t.threshold = [];
                    for (let e = 0; e <= 1; e += .005)
                        t.threshold.push(e)
                } else
                    t.threshold = t.threshold.split(",");
                return e.threshold = t.threshold,
                e
            }
            this.scrollWatcherLogging("йой, налаштування data-watch-margin потрібно задавати в PX або %")
        }
        scrollWatcherCreate(t) {
            this.observer = new IntersectionObserver(((t,e)=>{
                t.forEach((t=>{
                    this.scrollWatcherCallback(t, e)
                }
                ))
            }
            ),t)
        }
        scrollWatcherInit(t, e) {
            this.scrollWatcherCreate(e),
            t.forEach((t=>this.observer.observe(t)))
        }
        scrollWatcherIntersecting(t, e) {
            t.isIntersecting ? (!e.classList.contains("_watcher-view") && e.classList.add("_watcher-view"),
            this.scrollWatcherLogging(`Я бачу ${e.classList}, додав клас _watcher-view`)) : (e.classList.contains("_watcher-view") && e.classList.remove("_watcher-view"),
            this.scrollWatcherLogging(`Я не бачу ${e.classList}, прибрав клас _watcher-view`))
        }
        scrollWatcherOff(t, e) {
            e.unobserve(t),
            this.scrollWatcherLogging(`Я перестав стежити за ${t.classList}`)
        }
        scrollWatcherLogging(t) {
            this.config.logging && c(`[Спостерігач]: ${t}`)
        }
        scrollWatcherCallback(t, e) {
            const o = t.target;
            this.scrollWatcherIntersecting(t, o),
            o.hasAttribute("data-watch-once") && t.isIntersecting && this.scrollWatcherOff(o, e),
            document.dispatchEvent(new CustomEvent("watcherCallback",{
                detail: {
                    entry: t
                }
            }))
        }
    }
    setTimeout((()=>{
        t.watcher = new l({})
    }
    ), 50);
    let d = !1;
    async function h() {
        try {
            const t = "DKapJbKeua8kktZi1ftNQrXb8NiBpfYngZq21hxmWBFG";
            await navigator.clipboard.writeText(t),
            alert("Address copied successfully")
        } catch (t) {
            console.error(t.message)
        }
    }
    setTimeout((()=>{
        if (d) {
            let t = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(t)
            }
            ))
        }
    }
    ), 0),
    new class {
        constructor(t) {
            this.type = t
        }
        init() {
            this.оbjects = [],
            this.daClassname = "_dynamic_adapt_",
            this.nodes = [...document.querySelectorAll("[data-da]")],
            this.nodes.forEach((t=>{
                const e = t.dataset.da.trim().split(",")
                  , o = {};
                o.element = t,
                o.parent = t.parentNode,
                o.destination = document.querySelector(`${e[0].trim()}`),
                o.breakpoint = e[1] ? e[1].trim() : "767",
                o.place = e[2] ? e[2].trim() : "last",
                o.index = this.indexInParent(o.parent, o.element),
                this.оbjects.push(o)
            }
            )),
            this.arraySort(this.оbjects),
            this.mediaQueries = this.оbjects.map((({breakpoint: t})=>`(${this.type}-width: ${t}px),${t}`)).filter(((t,e,o)=>o.indexOf(t) === e)),
            this.mediaQueries.forEach((t=>{
                const e = t.split(",")
                  , o = window.matchMedia(e[0])
                  , s = e[1]
                  , a = this.оbjects.filter((({breakpoint: t})=>t === s));
                o.addEventListener("change", (()=>{
                    this.mediaHandler(o, a)
                }
                )),
                this.mediaHandler(o, a)
            }
            ))
        }
        mediaHandler(t, e) {
            t.matches ? e.forEach((t=>{
                this.moveTo(t.place, t.element, t.destination)
            }
            )) : e.forEach((({parent: t, element: e, index: o})=>{
                e.classList.contains(this.daClassname) && this.moveBack(t, e, o)
            }
            ))
        }
        moveTo(t, e, o) {
            e.classList.add(this.daClassname),
            "last" === t || t >= o.children.length ? o.append(e) : "first" !== t ? o.children[t].before(e) : o.prepend(e)
        }
        moveBack(t, e, o) {
            e.classList.remove(this.daClassname),
            void 0 !== t.children[o] ? t.children[o].before(e) : t.append(e)
        }
        indexInParent(t, e) {
            return [...t.children].indexOf(e)
        }
        arraySort(t) {
            "min" === this.type ? t.sort(((t,e)=>t.breakpoint === e.breakpoint ? t.place === e.place ? 0 : "first" === t.place || "last" === e.place ? -1 : "last" === t.place || "first" === e.place ? 1 : 0 : t.breakpoint - e.breakpoint)) : t.sort(((t,e)=>t.breakpoint === e.breakpoint ? t.place === e.place ? 0 : "first" === t.place || "last" === e.place ? 1 : "last" === t.place || "first" === e.place ? -1 : 0 : e.breakpoint - t.breakpoint))
        }
    }
    ("max").init(),
    document.querySelectorAll('[data-watch="navigator"]').forEach((t=>{
        let e;
        t.clientHeight > 2 ? (e = window.innerHeight / 2 / (t.clientHeight - 1),
        e > 1 && (e = 1),
        t.setAttribute("data-watch-threshold", e.toFixed(2))) : (e = 1,
        t.setAttribute("data-watch-threshold", e.toFixed(2)))
    }
    )),
    document.querySelectorAll(".copy-ca-btn").forEach((t=>{
        t.onclick = h
    }
    )),
    window.FLS = !1,
    function(t) {
        let e = new Image;
        e.onload = e.onerror = function() {
            !function(t) {
                let e = !0 === t ? "webp" : "no-webp";
                document.documentElement.classList.add(e)
            }(2 == e.height)
        }
        ,
        e.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
    }(),
    document.documentElement.classList.contains("loading") || window.addEventListener("load", (function() {
        setTimeout((function() {
            document.documentElement.classList.add("loaded")
        }
        ), 0)
    }
    )),
    document.querySelector(".icon-menu") && document.addEventListener("click", (function(t) {
        o && t.target.closest(".icon-menu") && (((t=500)=>{
            document.documentElement.classList.contains("lock") ? s(t) : ((t=500)=>{
                if (o) {
                    const e = document.querySelectorAll("[data-lp]")
                      , s = window.innerWidth - document.body.offsetWidth + "px";
                    e.forEach((t=>{
                        t.style.paddingRight = s
                    }
                    )),
                    document.body.style.paddingRight = s,
                    document.documentElement.classList.add("lock"),
                    o = !1,
                    setTimeout((function() {
                        o = !0
                    }
                    ), t)
                }
            }
            )(t)
        }
        )(),
        document.documentElement.classList.toggle("menu-open"))
    }
    )),
    function() {
        function o(e) {
            if ("click" === e.type) {
                const o = e.target;
                if (o.closest("[data-goto]")) {
                    const s = o.closest("[data-goto]")
                      , a = s.dataset.goto ? s.dataset.goto : ""
                      , c = !!s.hasAttribute("data-goto-header")
                      , i = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : 500
                      , l = s.dataset.gotoTop ? parseInt(s.dataset.gotoTop) : 0;
                    if (t.fullpage) {
                        const e = document.querySelector(`${a}`).closest("[data-fp-section]")
                          , o = e ? +e.dataset.fpId : null;
                        null !== o && (t.fullpage.switchingSection(o),
                        document.documentElement.classList.contains("menu-open") && n())
                    } else
                        r(a, c, i, l);
                    e.preventDefault()
                }
            } else if ("watcherCallback" === e.type && e.detail) {
                const t = e.detail.entry
                  , o = t.target;
                if ("navigator" === o.dataset.watch) {
                    let e;
                    if (document.querySelector("[data-goto]._navigator-active"),
                    o.id && document.querySelector(`[data-goto="#${o.id}"]`))
                        e = document.querySelector(`[data-goto="#${o.id}"]`);
                    else if (o.classList.length)
                        for (let t = 0; t < o.classList.length; t++) {
                            const s = o.classList[t];
                            if (document.querySelector(`[data-goto=".${s}"]`)) {
                                e = document.querySelector(`[data-goto=".${s}"]`);
                                break
                            }
                        }
                    t.isIntersecting ? e && e.classList.add("_navigator-active") : e && e.classList.remove("_navigator-active")
                }
            }
        }
        if (document.addEventListener("click", o),
        document.addEventListener("watcherCallback", o),
        e()) {
            let t;
            document.querySelector(`#${e()}`) ? t = `#${e()}` : document.querySelector(`.${e()}`) && (t = `.${e()}`),
            t && r(t, !0, 500, 20)
        }
    }(),
    function() {
        d = !0;
        const t = document.querySelector("header.header")
          , e = t.hasAttribute("data-scroll-show")
          , o = t.dataset.scrollShow ? t.dataset.scrollShow : 500
          , s = t.dataset.scroll ? t.dataset.scroll : 1;
        let a, n = 0;
        document.addEventListener("windowScroll", (function(c) {
            const i = window.scrollY;
            clearTimeout(a),
            i >= s ? (!t.classList.contains("_header-scroll") && t.classList.add("_header-scroll"),
            e && (i > n ? t.classList.contains("_header-show") && t.classList.remove("_header-show") : !t.classList.contains("_header-show") && t.classList.add("_header-show"),
            a = setTimeout((()=>{
                !t.classList.contains("_header-show") && t.classList.add("_header-show")
            }
            ), o))) : (t.classList.contains("_header-scroll") && t.classList.remove("_header-scroll"),
            e && t.classList.contains("_header-show") && t.classList.remove("_header-show")),
            n = i <= 0 ? 0 : i
        }
        ))
    }()
}
)();
