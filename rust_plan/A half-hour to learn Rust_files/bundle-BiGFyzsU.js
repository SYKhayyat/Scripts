const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.svelte-BbdTeiJT.js","assets/mount-utils-DpDTmfTQ.js","assets/index-B9p2AkFE.css","assets/index.svelte-D7FENdb1.js","assets/pulldown_latex_wasm-DoMGhsmh.js","assets/index-BPpOwtmz.css","assets/index.svelte-Dr5U7zWH.js","assets/index-CMPDsbhS.css","assets/index.svelte-NzjLBdGi.js","assets/key-CdH6jyIw.js","assets/index-ylSQ-x_P.css","assets/index.svelte-CXSPELPL.js","assets/index-Bh2f_7PO.css","assets/index.svelte-Bn4CWvrF.js","assets/index-C6-wNMHT.css"])))=>i.map(i=>d[i]);
let sn, fe, De, nf, ef, $a, Ke, Ss, Jc, ke, Ir, ti, Ga, _r, _t, Vt, Ya, ja, Lc, tf, Ra, dr, qt, Qc, Mo, At, It, ge, g, ne, ya, ce, gt, Qe, mi, af, rf, Oi, gi, tt, A, W, k, Te, N, vr, G, L, oe, un, ie, Ze, q, ue, Le, mn, h, S, V, F, ut, Et, Ne, Q, re;
let __tla = (async ()=>{
    const oo = "modulepreload", io = function(e) {
        return "https://cdn.fasterthanli.me/dist/" + e;
    }, wr = {}, et = function(t, n, r) {
        let a = Promise.resolve();
        if (n && n.length > 0) {
            let u = function(l) {
                return Promise.all(l.map((c)=>Promise.resolve(c).then((f)=>({
                            status: "fulfilled",
                            value: f
                        }), (f)=>({
                            status: "rejected",
                            reason: f
                        }))));
            };
            document.getElementsByTagName("link");
            const i = document.querySelector("meta[property=csp-nonce]"), s = i?.nonce || i?.getAttribute("nonce");
            a = u(n.map((l)=>{
                if (l = io(l), l in wr) return;
                wr[l] = !0;
                const c = l.endsWith(".css"), f = c ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${l}"]${f}`)) return;
                const d = document.createElement("link");
                if (d.rel = c ? "stylesheet" : oo, c || (d.as = "script"), d.crossOrigin = "", d.href = l, s && d.setAttribute("nonce", s), document.head.appendChild(d), c) return new Promise((p, v)=>{
                    d.addEventListener("load", p), d.addEventListener("error", ()=>v(new Error(`Unable to preload CSS for ${l}`)));
                });
            }));
        }
        function o(i) {
            const s = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (s.payload = i, window.dispatchEvent(s), !s.defaultPrevented) throw i;
        }
        return a.then((i)=>{
            for (const s of i || [])s.status === "rejected" && o(s.reason);
            return t().catch(o);
        });
    };
    let so, lo, Zr;
    ce = Symbol();
    so = "http://www.w3.org/1999/xhtml";
    lo = "@attach";
    Zr = !1;
    var dn = Array.isArray, uo = Array.prototype.indexOf, Zn = Array.from, jn = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, Qr = Object.getOwnPropertyDescriptors, co = Object.prototype, fo = Array.prototype, Qn = Object.getPrototypeOf, Cr = Object.isExtensible;
    function Lt(e) {
        return typeof e == "function";
    }
    const ea = ()=>{};
    function vo(e) {
        return e();
    }
    function rn(e) {
        for(var t = 0; t < e.length; t++)e[t]();
    }
    function ho() {
        var e, t, n = new Promise((r, a)=>{
            e = r, t = a;
        });
        return {
            promise: n,
            resolve: e,
            reject: t
        };
    }
    Jc = function(e, t) {
        if (Array.isArray(e)) return e;
        if (!(Symbol.iterator in e)) return Array.from(e);
        const n = [];
        for (const r of e)if (n.push(r), n.length === t) break;
        return n;
    };
    const Ce = 2, er = 4, vn = 8, St = 16, qe = 32, ct = 64, tr = 128, Se = 256, an = 512, de = 1024, xe = 2048, We = 4096, Ae = 8192, ft = 16384, nr = 32768, Bt = 65536, kr = 1 << 17, po = 1 << 18, xt = 1 << 19, ta = 1 << 20, Vn = 1 << 21, rr = 1 << 22, rt = 1 << 23, Pe = Symbol("$state"), na = Symbol("legacy props"), _o = Symbol(""), ar = new class extends Error {
        name = "StaleReactionError";
        message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
    };
    function ra(e) {
        throw new Error("https://svelte.dev/e/lifecycle_outside_component");
    }
    function go() {
        throw new Error("https://svelte.dev/e/async_derived_orphan");
    }
    function mo(e) {
        throw new Error("https://svelte.dev/e/effect_in_teardown");
    }
    function yo() {
        throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
    }
    function bo(e) {
        throw new Error("https://svelte.dev/e/effect_orphan");
    }
    function wo() {
        throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
    }
    function Co(e) {
        throw new Error("https://svelte.dev/e/props_invalid_value");
    }
    function ko() {
        throw new Error("https://svelte.dev/e/state_descriptors_fixed");
    }
    function Eo() {
        throw new Error("https://svelte.dev/e/state_prototype_fixed");
    }
    function So() {
        throw new Error("https://svelte.dev/e/state_unsafe_mutation");
    }
    function xo() {
        throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
    }
    function To() {
        console.warn("https://svelte.dev/e/select_multiple_invalid_value");
    }
    function Io() {
        console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
    }
    let Ao = !1;
    function aa(e) {
        return e === this.v;
    }
    Mo = function(e, t) {
        return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
    };
    Qc = function(e, t) {
        return e !== t;
    };
    function oa(e) {
        return !Mo(e, this.v);
    }
    let Tt = !1, Lo = !1;
    function Po() {
        Tt = !0;
    }
    let ae = null;
    function bt(e) {
        ae = e;
    }
    oe = function(e, t = !1, n) {
        ae = {
            p: ae,
            c: null,
            e: null,
            s: e,
            x: null,
            l: Tt && !t ? {
                s: null,
                u: null,
                $: []
            } : null
        };
    };
    ie = function(e) {
        var t = ae, n = t.e;
        if (n !== null) {
            t.e = null;
            for (var r of n)wa(r);
        }
        return ae = t.p, {};
    };
    qt = function() {
        return !Tt || ae !== null && ae.l === null;
    };
    let $e = [], on = [];
    function ia() {
        var e = $e;
        $e = [], rn(e);
    }
    function Fo() {
        var e = on;
        on = [], rn(e);
    }
    function Do() {
        return $e.length > 0 || on.length > 0;
    }
    function Be(e) {
        if ($e.length === 0 && !Ot) {
            var t = $e;
            queueMicrotask(()=>{
                t === $e && ia();
            });
        }
        $e.push(e);
    }
    function No() {
        $e.length > 0 && ia(), on.length > 0 && Fo();
    }
    const Ro = new WeakMap;
    function sa(e) {
        var t = $;
        if (t === null) return Y.f |= rt, e;
        if ((t.f & nr) === 0) {
            if ((t.f & tr) === 0) throw !t.parent && e instanceof Error && la(e), e;
            t.b.error(e);
        } else wt(e, t);
    }
    function wt(e, t) {
        for(; t !== null;){
            if ((t.f & tr) !== 0) try {
                t.b.error(e);
                return;
            } catch (n) {
                e = n;
            }
            t = t.parent;
        }
        throw e instanceof Error && la(e), e;
    }
    function la(e) {
        const t = Ro.get(e);
        t && (jn(e, "message", {
            value: t.message
        }), jn(e, "stack", {
            value: t.stack
        }));
    }
    const kn = new Set;
    let Qt, Un, it, hn, Hn, Ot;
    ne = null;
    Qt = null;
    Un = new Set;
    it = [];
    hn = null;
    Hn = !1;
    Ot = !1;
    class Ve {
        current = new Map;
        #o = new Map;
        #t = new Set;
        #d = 0;
        #i = null;
        #c = !1;
        #a = [];
        #n = [];
        #e = [];
        #r = [];
        #s = [];
        #f = [];
        #u = [];
        skipped_effects = new Set;
        process(t) {
            it = [], Qt = null;
            for (const a of t)this.#v(a);
            if (this.#a.length === 0 && this.#d === 0) {
                this.#h();
                var n = this.#e, r = this.#r;
                this.#e = [], this.#r = [], this.#s = [], Qt = ne, ne = null, Er(n), Er(r), ne === null ? ne = this : kn.delete(this), this.#i?.resolve();
            } else this.#l(this.#e), this.#l(this.#r), this.#l(this.#s);
            for (const a of this.#a)ot(a);
            for (const a of this.#n)ot(a);
            this.#a = [], this.#n = [];
        }
        #v(t) {
            t.f ^= de;
            for(var n = t.first; n !== null;){
                var r = n.f, a = (r & (qe | ct)) !== 0, o = a && (r & de) !== 0, i = o || (r & Ae) !== 0 || this.skipped_effects.has(n);
                if (!i && n.fn !== null) {
                    if (a) n.f ^= de;
                    else if ((r & er) !== 0) this.#r.push(n);
                    else if ((r & de) === 0) if ((r & rr) !== 0) {
                        var s = n.b?.is_pending() ? this.#n : this.#a;
                        s.push(n);
                    } else Yt(n) && ((n.f & St) !== 0 && this.#s.push(n), ot(n));
                    var u = n.first;
                    if (u !== null) {
                        n = u;
                        continue;
                    }
                }
                var l = n.parent;
                for(n = n.next; n === null && l !== null;)n = l.next, l = l.parent;
            }
        }
        #l(t) {
            for (const n of t)((n.f & xe) !== 0 ? this.#f : this.#u).push(n), _e(n, de);
            t.length = 0;
        }
        capture(t, n) {
            this.#o.has(t) || this.#o.set(t, n), this.current.set(t, t.v);
        }
        activate() {
            ne = this;
        }
        deactivate() {
            ne = null, Qt = null;
            for (const t of Un)if (Un.delete(t), t(), ne !== null) break;
        }
        neuter() {
            this.#c = !0;
        }
        flush() {
            it.length > 0 ? ua() : this.#h(), ne === this && (this.#d === 0 && kn.delete(this), this.deactivate());
        }
        #h() {
            if (!this.#c) for (const t of this.#t)t();
            this.#t.clear();
        }
        increment() {
            this.#d += 1;
        }
        decrement() {
            if (this.#d -= 1, this.#d === 0) {
                for (const t of this.#f)_e(t, xe), Ct(t);
                for (const t of this.#u)_e(t, We), Ct(t);
                this.#e = [], this.#r = [], this.flush();
            } else this.deactivate();
        }
        add_callback(t) {
            this.#t.add(t);
        }
        settled() {
            return (this.#i ??= ho()).promise;
        }
        static ensure() {
            if (ne === null) {
                const t = ne = new Ve;
                kn.add(ne), Ot || Ve.enqueue(()=>{
                    ne === t && t.flush();
                });
            }
            return ne;
        }
        static enqueue(t) {
            Be(t);
        }
    }
    function Oo(e) {
        var t = Ot;
        Ot = !0;
        try {
            for(var n;;){
                if (No(), it.length === 0 && !Do() && (ne?.flush(), it.length === 0)) return hn = null, n;
                ua();
            }
        } finally{
            Ot = t;
        }
    }
    function ua() {
        var e = mt;
        Hn = !0;
        try {
            var t = 0;
            for(Ar(!0); it.length > 0;){
                var n = Ve.ensure();
                if (t++ > 1e3) {
                    var r, a;
                    zo();
                }
                n.process(it), Xe.clear();
            }
        } finally{
            Hn = !1, Ar(e), hn = null;
        }
    }
    function zo() {
        try {
            wo();
        } catch (e) {
            wt(e, hn);
        }
    }
    let nt = null;
    function Er(e) {
        var t = e.length;
        if (t !== 0) {
            for(var n = 0; n < t;){
                var r = e[n++];
                if ((r.f & (ft | Ae)) === 0 && Yt(r) && (nt = [], ot(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Sa(r) : r.fn = null), nt?.length > 0)) {
                    Xe.clear();
                    for (const a of nt)ot(a);
                    nt = [];
                }
            }
            nt = null;
        }
    }
    function Ct(e) {
        for(var t = hn = e; t.parent !== null;){
            t = t.parent;
            var n = t.f;
            if (Hn && t === $ && (n & St) !== 0) return;
            if ((n & (ct | qe)) !== 0) {
                if ((n & de) === 0) return;
                t.f ^= de;
            }
        }
        it.push(t);
    }
    function jo(e) {
        let t = 0, n = st(0), r;
        return ()=>{
            Zo() && (h(n), dt(()=>(t === 0 && (r = Oe(()=>e(()=>zt(n)))), t += 1, ()=>{
                    Be(()=>{
                        t -= 1, t === 0 && (r?.(), r = void 0, zt(n));
                    });
                })));
        };
    }
    var Vo = Bt | xt | tr;
    function Uo(e, t, n) {
        new Ho(e, t, n);
    }
    class Ho {
        parent;
        #o = !1;
        #t;
        #d = null;
        #i;
        #c;
        #a;
        #n = null;
        #e = null;
        #r = null;
        #s = null;
        #f = 0;
        #u = 0;
        #v = !1;
        #l = null;
        #h = ()=>{
            this.#l && kt(this.#l, this.#f);
        };
        #m = jo(()=>(this.#l = st(this.#f), ()=>{
                this.#l = null;
            }));
        constructor(t, n, r){
            this.#t = t, this.#i = n, this.#c = r, this.parent = $.b, this.#o = !!this.#i.pending, this.#a = At(()=>{
                $.b = this;
                {
                    try {
                        this.#n = ge(()=>r(this.#t));
                    } catch (a) {
                        this.error(a);
                    }
                    this.#u > 0 ? this.#_() : this.#o = !1;
                }
            }, Vo);
        }
        #y() {
            try {
                this.#n = ge(()=>this.#c(this.#t));
            } catch (t) {
                this.error(t);
            }
            this.#o = !1;
        }
        #b() {
            const t = this.#i.pending;
            t && (this.#e = ge(()=>t(this.#t)), Ve.enqueue(()=>{
                this.#n = this.#p(()=>(Ve.ensure(), ge(()=>this.#c(this.#t)))), this.#u > 0 ? this.#_() : (gt(this.#e, ()=>{
                    this.#e = null;
                }), this.#o = !1);
            }));
        }
        is_pending() {
            return this.#o || !!this.parent && this.parent.is_pending();
        }
        has_pending_snippet() {
            return !!this.#i.pending;
        }
        #p(t) {
            var n = $, r = Y, a = ae;
            Fe(this.#a), me(this.#a), bt(this.#a.ctx);
            try {
                return t();
            } catch (o) {
                return sa(o), null;
            } finally{
                Fe(n), me(r), bt(a);
            }
        }
        #_() {
            const t = this.#i.pending;
            this.#n !== null && (this.#s = document.createDocumentFragment(), Bo(this.#n, this.#s)), this.#e === null && (this.#e = ge(()=>t(this.#t)));
        }
        #g(t) {
            if (!this.has_pending_snippet()) {
                this.parent && this.parent.#g(t);
                return;
            }
            this.#u += t, this.#u === 0 && (this.#o = !1, this.#e && gt(this.#e, ()=>{
                this.#e = null;
            }), this.#s && (this.#t.before(this.#s), this.#s = null));
        }
        update_pending_count(t) {
            this.#g(t), this.#f += t, Un.add(this.#h);
        }
        get_effect_pending() {
            return this.#m(), h(this.#l);
        }
        error(t) {
            var n = this.#i.onerror;
            let r = this.#i.failed;
            if (this.#v || !n && !r) throw t;
            this.#n && (ve(this.#n), this.#n = null), this.#e && (ve(this.#e), this.#e = null), this.#r && (ve(this.#r), this.#r = null);
            var a = !1, o = !1;
            const i = ()=>{
                if (a) {
                    Io();
                    return;
                }
                a = !0, o && xo(), Ve.ensure(), this.#f = 0, this.#r !== null && gt(this.#r, ()=>{
                    this.#r = null;
                }), this.#o = this.has_pending_snippet(), this.#n = this.#p(()=>(this.#v = !1, ge(()=>this.#c(this.#t)))), this.#u > 0 ? this.#_() : this.#o = !1;
            };
            var s = Y;
            try {
                me(null), o = !0, n?.(t, i), o = !1;
            } catch (u) {
                wt(u, this.#a && this.#a.parent);
            } finally{
                me(s);
            }
            r && Be(()=>{
                this.#r = this.#p(()=>{
                    this.#v = !0;
                    try {
                        return ge(()=>{
                            r(this.#t, ()=>t, ()=>i);
                        });
                    } catch (u) {
                        return wt(u, this.#a.parent), null;
                    } finally{
                        this.#v = !1;
                    }
                });
            });
        }
    }
    function Bo(e, t) {
        for(var n = e.nodes_start, r = e.nodes_end; n !== null;){
            var a = n === r ? null : $t(n);
            t.append(n), n = a;
        }
    }
    function ca(e, t, n) {
        const r = qt() ? Wt : or;
        if (t.length === 0) {
            n(e.map(r));
            return;
        }
        var a = ne, o = $, i = qo();
        Promise.all(t.map((s)=>Wo(s))).then((s)=>{
            a?.activate(), i();
            try {
                n([
                    ...e.map(r),
                    ...s
                ]);
            } catch (u) {
                (o.f & ft) === 0 && wt(u, o);
            }
            a?.deactivate(), fa();
        }).catch((s)=>{
            wt(s, o);
        });
    }
    function qo() {
        var e = $, t = Y, n = ae, r = ne;
        return function() {
            Fe(e), me(t), bt(n), r?.activate();
        };
    }
    function fa() {
        Fe(null), me(null), bt(null);
    }
    function Wt(e) {
        var t = Ce | xe, n = Y !== null && (Y.f & Ce) !== 0 ? Y : null;
        return $ === null || n !== null && (n.f & Se) !== 0 ? t |= Se : $.f |= xt, {
            ctx: ae,
            deps: null,
            effects: null,
            equals: aa,
            f: t,
            fn: e,
            reactions: null,
            rv: 0,
            v: ce,
            wv: 0,
            parent: n ?? $,
            ac: null
        };
    }
    function Wo(e, t) {
        let n = $;
        n === null && go();
        var r = n.b, a = void 0, o = st(ce), i = null, s = !Y;
        return ni(()=>{
            try {
                var u = e();
                i && Promise.resolve(u).catch(()=>{});
            } catch (p) {
                u = Promise.reject(p);
            }
            var l = ()=>u;
            a = i?.then(l, l) ?? Promise.resolve(u), i = a;
            var c = ne, f = r.is_pending();
            s && (r.update_pending_count(1), f || c.increment());
            const d = (p, v = void 0)=>{
                i = null, f || c.activate(), v ? v !== ar && (o.f |= rt, kt(o, v)) : ((o.f & rt) !== 0 && (o.f ^= rt), kt(o, p)), s && (r.update_pending_count(-1), f || c.decrement()), fa();
            };
            if (a.then(d, (p)=>d(null, p || "unknown")), c) return ()=>{
                queueMicrotask(()=>c.neuter());
            };
        }), new Promise((u)=>{
            function l(c) {
                function f() {
                    c === a ? u(o) : l(a);
                }
                c.then(f, f);
            }
            l(a);
        });
    }
    Q = function(e) {
        const t = Wt(e);
        return Ia(t), t;
    };
    function or(e) {
        const t = Wt(e);
        return t.equals = oa, t;
    }
    function da(e) {
        var t = e.effects;
        if (t !== null) {
            e.effects = null;
            for(var n = 0; n < t.length; n += 1)ve(t[n]);
        }
    }
    function $o(e) {
        for(var t = e.parent; t !== null;){
            if ((t.f & Ce) === 0) return t;
            t = t.parent;
        }
        return null;
    }
    function ir(e) {
        var t, n = $;
        Fe($o(e));
        try {
            da(e), t = Pa(e);
        } finally{
            Fe(n);
        }
        return t;
    }
    function va(e) {
        var t = ir(e);
        if (e.equals(t) || (e.v = t, e.wv = Ma()), !vt) {
            var n = (Ye || (e.f & Se) !== 0) && e.deps !== null ? We : de;
            _e(e, n);
        }
    }
    const Xe = new Map;
    function st(e, t) {
        var n = {
            f: 0,
            v: e,
            reactions: null,
            equals: aa,
            rv: 0,
            wv: 0
        };
        return n;
    }
    q = function(e, t) {
        const n = st(e);
        return Ia(n), n;
    };
    _t = function(e, t = !1, n = !0) {
        const r = st(e);
        return t || (r.equals = oa), Tt && n && ae !== null && ae.l !== null && (ae.l.s ??= []).push(r), r;
    };
    function Sr(e, t) {
        return F(e, Oe(()=>h(e))), t;
    }
    F = function(e, t, n = !1) {
        Y !== null && (!Ie || (Y.f & kr) !== 0) && qt() && (Y.f & (Ce | St | rr | kr)) !== 0 && !Ue?.includes(e) && So();
        let r = n ? ue(t) : t;
        return kt(e, r);
    };
    function kt(e, t) {
        if (!e.equals(t)) {
            var n = e.v;
            vt ? Xe.set(e, t) : Xe.set(e, n), e.v = t;
            var r = Ve.ensure();
            r.capture(e, n), (e.f & Ce) !== 0 && ((e.f & xe) !== 0 && ir(e), _e(e, (e.f & Se) === 0 ? de : We)), e.wv = Ma(), ha(e, xe), qt() && $ !== null && ($.f & de) !== 0 && ($.f & (qe | ct)) === 0 && (Ee === null ? ai([
                e
            ]) : Ee.push(e));
        }
        return t;
    }
    function zt(e) {
        F(e, e.v + 1);
    }
    function ha(e, t) {
        var n = e.reactions;
        if (n !== null) for(var r = qt(), a = n.length, o = 0; o < a; o++){
            var i = n[o], s = i.f;
            if (!(!r && i === $)) {
                var u = (s & xe) === 0;
                u && _e(i, t), (s & Ce) !== 0 ? ha(i, We) : u && ((s & St) !== 0 && nt !== null && nt.push(i), Ct(i));
            }
        }
    }
    ue = function(e) {
        if (typeof e != "object" || e === null || Pe in e) return e;
        const t = Qn(e);
        if (t !== co && t !== fo) return e;
        var n = new Map, r = dn(e), a = q(0), o = at, i = (s)=>{
            if (at === o) return s();
            var u = Y, l = at;
            me(null), Lr(o);
            var c = s();
            return me(u), Lr(l), c;
        };
        return r && n.set("length", q(e.length)), new Proxy(e, {
            defineProperty (s, u, l) {
                (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && ko();
                var c = n.get(u);
                return c === void 0 ? c = i(()=>{
                    var f = q(l.value);
                    return n.set(u, f), f;
                }) : F(c, l.value, !0), !0;
            },
            deleteProperty (s, u) {
                var l = n.get(u);
                if (l === void 0) {
                    if (u in s) {
                        const c = i(()=>q(ce));
                        n.set(u, c), zt(a);
                    }
                } else F(l, ce), zt(a);
                return !0;
            },
            get (s, u, l) {
                if (u === Pe) return e;
                var c = n.get(u), f = u in s;
                if (c === void 0 && (!f || Ge(s, u)?.writable) && (c = i(()=>{
                    var p = ue(f ? s[u] : ce), v = q(p);
                    return v;
                }), n.set(u, c)), c !== void 0) {
                    var d = h(c);
                    return d === ce ? void 0 : d;
                }
                return Reflect.get(s, u, l);
            },
            getOwnPropertyDescriptor (s, u) {
                var l = Reflect.getOwnPropertyDescriptor(s, u);
                if (l && "value" in l) {
                    var c = n.get(u);
                    c && (l.value = h(c));
                } else if (l === void 0) {
                    var f = n.get(u), d = f?.v;
                    if (f !== void 0 && d !== ce) return {
                        enumerable: !0,
                        configurable: !0,
                        value: d,
                        writable: !0
                    };
                }
                return l;
            },
            has (s, u) {
                if (u === Pe) return !0;
                var l = n.get(u), c = l !== void 0 && l.v !== ce || Reflect.has(s, u);
                if (l !== void 0 || $ !== null && (!c || Ge(s, u)?.writable)) {
                    l === void 0 && (l = i(()=>{
                        var d = c ? ue(s[u]) : ce, p = q(d);
                        return p;
                    }), n.set(u, l));
                    var f = h(l);
                    if (f === ce) return !1;
                }
                return c;
            },
            set (s, u, l, c) {
                var f = n.get(u), d = u in s;
                if (r && u === "length") for(var p = l; p < f.v; p += 1){
                    var v = n.get(p + "");
                    v !== void 0 ? F(v, ce) : p in s && (v = i(()=>q(ce)), n.set(p + "", v));
                }
                if (f === void 0) (!d || Ge(s, u)?.writable) && (f = i(()=>q(void 0)), F(f, ue(l)), n.set(u, f));
                else {
                    d = f.v !== ce;
                    var m = i(()=>ue(l));
                    F(f, m);
                }
                var _ = Reflect.getOwnPropertyDescriptor(s, u);
                if (_?.set && _.set.call(c, l), !d) {
                    if (r && typeof u == "string") {
                        var C = n.get("length"), b = Number(u);
                        Number.isInteger(b) && b >= C.v && F(C, b + 1);
                    }
                    zt(a);
                }
                return !0;
            },
            ownKeys (s) {
                h(a);
                var u = Reflect.ownKeys(s).filter((f)=>{
                    var d = n.get(f);
                    return d === void 0 || d.v !== ce;
                });
                for (var [l, c] of n)c.v !== ce && !(l in s) && u.push(l);
                return u;
            },
            setPrototypeOf () {
                Eo();
            }
        });
    };
    function xr(e) {
        try {
            if (e !== null && typeof e == "object" && Pe in e) return e[Pe];
        } catch  {}
        return e;
    }
    function pa(e, t) {
        return Object.is(xr(e), xr(t));
    }
    let _a, ga, ma;
    function Yo() {
        if (sn === void 0) {
            sn = window, _a = /Firefox/.test(navigator.userAgent);
            var e = Element.prototype, t = Node.prototype, n = Text.prototype;
            ga = Ge(t, "firstChild").get, ma = Ge(t, "nextSibling").get, Cr(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Cr(n) && (n.__t = void 0);
        }
    }
    It = function(e = "") {
        return document.createTextNode(e);
    };
    function we(e) {
        return ga.call(e);
    }
    function $t(e) {
        return ma.call(e);
    }
    k = function(e, t) {
        return we(e);
    };
    N = function(e, t = !1) {
        {
            var n = we(e);
            return n instanceof Comment && n.data === "" ? $t(n) : n;
        }
    };
    S = function(e, t = 1, n = !1) {
        let r = e;
        for(; t--;)r = $t(r);
        return r;
    };
    function Go(e) {
        e.textContent = "";
    }
    ya = function() {
        return !1;
    };
    function Xo(e, t) {
        if (t) {
            const n = document.body;
            e.autofocus = !0, Be(()=>{
                document.activeElement === n && e.focus();
            });
        }
    }
    let Tr = !1;
    function Ko() {
        Tr || (Tr = !0, document.addEventListener("reset", (e)=>{
            Promise.resolve().then(()=>{
                if (!e.defaultPrevented) for (const t of e.target.elements)t.__on_r?.();
            });
        }, {
            capture: !0
        }));
    }
    function pn(e) {
        var t = Y, n = $;
        me(null), Fe(null);
        try {
            return e();
        } finally{
            me(t), Fe(n);
        }
    }
    function _n(e, t, n, r = n) {
        e.addEventListener(t, ()=>pn(n));
        const a = e.__on_r;
        a ? e.__on_r = ()=>{
            a(), r(!0);
        } : e.__on_r = ()=>r(!0), Ko();
    }
    function ba(e) {
        $ === null && Y === null && bo(), Y !== null && (Y.f & Se) !== 0 && $ === null && yo(), vt && mo();
    }
    function Jo(e, t) {
        var n = t.last;
        n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
    }
    function Re(e, t, n, r = !0) {
        var a = $;
        a !== null && (a.f & Ae) !== 0 && (e |= Ae);
        var o = {
            ctx: ae,
            deps: null,
            nodes_start: null,
            nodes_end: null,
            f: e | xe,
            first: null,
            fn: t,
            last: null,
            next: null,
            parent: a,
            b: a && a.b,
            prev: null,
            teardown: null,
            transitions: null,
            wv: 0,
            ac: null
        };
        if (n) try {
            ot(o), o.f |= nr;
        } catch (u) {
            throw ve(o), u;
        }
        else t !== null && Ct(o);
        if (r) {
            var i = o;
            if (n && i.deps === null && i.teardown === null && i.nodes_start === null && i.first === i.last && (i.f & xt) === 0 && (i = i.first), i !== null && (i.parent = a, a !== null && Jo(i, a), Y !== null && (Y.f & Ce) !== 0 && (e & ct) === 0)) {
                var s = Y;
                (s.effects ??= []).push(i);
            }
        }
        return o;
    }
    function Zo() {
        return Y !== null && !Ie;
    }
    function sr(e) {
        const t = Re(vn, null, !1);
        return _e(t, de), t.teardown = e, t;
    }
    Vt = function(e) {
        ba();
        var t = $.f, n = !Y && (t & qe) !== 0 && (t & nr) === 0;
        if (n) {
            var r = ae;
            (r.e ??= []).push(e);
        } else return wa(e);
    };
    function wa(e) {
        return Re(er | ta, e, !1);
    }
    function Qo(e) {
        return ba(), Re(vn | ta, e, !0);
    }
    function ei(e) {
        Ve.ensure();
        const t = Re(ct | xt, e, !0);
        return (n = {})=>new Promise((r)=>{
                n.outro ? gt(t, ()=>{
                    ve(t), r(void 0);
                }) : (ve(t), r(void 0));
            });
    }
    function gn(e) {
        return Re(er, e, !1);
    }
    Ir = function(e, t) {
        var n = ae, r = {
            effect: null,
            ran: !1,
            deps: e
        };
        n.l.$.push(r), r.effect = dt(()=>{
            e(), !r.ran && (r.ran = !0, Oe(t));
        });
    };
    ti = function() {
        var e = ae;
        dt(()=>{
            for (var t of e.l.$){
                t.deps();
                var n = t.effect;
                (n.f & de) !== 0 && _e(n, We), Yt(n) && ot(n), t.ran = !1;
            }
        });
    };
    function ni(e) {
        return Re(rr | xt, e, !0);
    }
    function dt(e, t = 0) {
        return Re(vn | t, e, !0);
    }
    V = function(e, t = [], n = []) {
        ca(t, n, (r)=>{
            Re(vn, ()=>e(...r.map(h)), !0);
        });
    };
    At = function(e, t = 0) {
        var n = Re(St | t, e, !0);
        return n;
    };
    ge = function(e, t = !0) {
        return Re(qe | xt, e, !0, t);
    };
    function Ca(e) {
        var t = e.teardown;
        if (t !== null) {
            const n = vt, r = Y;
            Mr(!0), me(null);
            try {
                t.call(null);
            } finally{
                Mr(n), me(r);
            }
        }
    }
    function ka(e, t = !1) {
        var n = e.first;
        for(e.first = e.last = null; n !== null;){
            const a = n.ac;
            a !== null && pn(()=>{
                a.abort(ar);
            });
            var r = n.next;
            (n.f & ct) !== 0 ? n.parent = null : ve(n, t), n = r;
        }
    }
    function ri(e) {
        for(var t = e.first; t !== null;){
            var n = t.next;
            (t.f & qe) === 0 && ve(t), t = n;
        }
    }
    function ve(e, t = !0) {
        var n = !1;
        (t || (e.f & po) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Ea(e.nodes_start, e.nodes_end), n = !0), ka(e, t && !n), ln(e, 0), _e(e, ft);
        var r = e.transitions;
        if (r !== null) for (const o of r)o.stop();
        Ca(e);
        var a = e.parent;
        a !== null && a.first !== null && Sa(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
    }
    function Ea(e, t) {
        for(; e !== null;){
            var n = e === t ? null : $t(e);
            e.remove(), e = n;
        }
    }
    function Sa(e) {
        var t = e.parent, n = e.prev, r = e.next;
        n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
    }
    gt = function(e, t) {
        var n = [];
        lr(e, n, !0), xa(n, ()=>{
            ve(e), t && t();
        });
    };
    function xa(e, t) {
        var n = e.length;
        if (n > 0) {
            var r = ()=>--n || t();
            for (var a of e)a.out(r);
        } else t();
    }
    function lr(e, t, n) {
        if ((e.f & Ae) === 0) {
            if (e.f ^= Ae, e.transitions !== null) for (const i of e.transitions)(i.is_global || n) && t.push(i);
            for(var r = e.first; r !== null;){
                var a = r.next, o = (r.f & Bt) !== 0 || (r.f & qe) !== 0;
                lr(r, t, o ? n : !1), r = a;
            }
        }
    }
    function ur(e) {
        Ta(e, !0);
    }
    function Ta(e, t) {
        if ((e.f & Ae) !== 0) {
            e.f ^= Ae, (e.f & de) === 0 && (_e(e, xe), Ct(e));
            for(var n = e.first; n !== null;){
                var r = n.next, a = (n.f & Bt) !== 0 || (n.f & qe) !== 0;
                Ta(n, a ? t : !1), n = r;
            }
            if (e.transitions !== null) for (const o of e.transitions)(o.is_global || t) && o.in();
        }
    }
    let mt = !1;
    function Ar(e) {
        mt = e;
    }
    let vt = !1;
    function Mr(e) {
        vt = e;
    }
    let Y = null, Ie = !1;
    function me(e) {
        Y = e;
    }
    let $ = null;
    function Fe(e) {
        $ = e;
    }
    let Ue = null;
    function Ia(e) {
        Y !== null && (Ue === null ? Ue = [
            e
        ] : Ue.push(e));
    }
    let pe = null, be = 0, Ee = null;
    function ai(e) {
        Ee = e;
    }
    let Aa = 1, Ut = 0, at = Ut;
    function Lr(e) {
        at = e;
    }
    let Ye = !1;
    function Ma() {
        return ++Aa;
    }
    function Yt(e) {
        var t = e.f;
        if ((t & xe) !== 0) return !0;
        if ((t & We) !== 0) {
            var n = e.deps, r = (t & Se) !== 0;
            if (n !== null) {
                var a, o, i = (t & an) !== 0, s = r && $ !== null && !Ye, u = n.length;
                if ((i || s) && ($ === null || ($.f & ft) === 0)) {
                    var l = e, c = l.parent;
                    for(a = 0; a < u; a++)o = n[a], (i || !o?.reactions?.includes(l)) && (o.reactions ??= []).push(l);
                    i && (l.f ^= an), s && c !== null && (c.f & Se) === 0 && (l.f ^= Se);
                }
                for(a = 0; a < u; a++)if (o = n[a], Yt(o) && va(o), o.wv > e.wv) return !0;
            }
            (!r || $ !== null && !Ye) && _e(e, de);
        }
        return !1;
    }
    function La(e, t, n = !0) {
        var r = e.reactions;
        if (r !== null && !Ue?.includes(e)) for(var a = 0; a < r.length; a++){
            var o = r[a];
            (o.f & Ce) !== 0 ? La(o, t, !1) : t === o && (n ? _e(o, xe) : (o.f & de) !== 0 && _e(o, We), Ct(o));
        }
    }
    function Pa(e) {
        var t = pe, n = be, r = Ee, a = Y, o = Ye, i = Ue, s = ae, u = Ie, l = at, c = e.f;
        pe = null, be = 0, Ee = null, Ye = (c & Se) !== 0 && (Ie || !mt || Y === null), Y = (c & (qe | ct)) === 0 ? e : null, Ue = null, bt(e.ctx), Ie = !1, at = ++Ut, e.ac !== null && (pn(()=>{
            e.ac.abort(ar);
        }), e.ac = null);
        try {
            e.f |= Vn;
            var f = e.fn, d = f(), p = e.deps;
            if (pe !== null) {
                var v;
                if (ln(e, be), p !== null && be > 0) for(p.length = be + pe.length, v = 0; v < pe.length; v++)p[be + v] = pe[v];
                else e.deps = p = pe;
                if (!Ye || (c & Ce) !== 0 && e.reactions !== null) for(v = be; v < p.length; v++)(p[v].reactions ??= []).push(e);
            } else p !== null && be < p.length && (ln(e, be), p.length = be);
            if (qt() && Ee !== null && !Ie && p !== null && (e.f & (Ce | We | xe)) === 0) for(v = 0; v < Ee.length; v++)La(Ee[v], e);
            return a !== null && a !== e && (Ut++, Ee !== null && (r === null ? r = Ee : r.push(...Ee))), (e.f & rt) !== 0 && (e.f ^= rt), d;
        } catch (m) {
            return sa(m);
        } finally{
            e.f ^= Vn, pe = t, be = n, Ee = r, Y = a, Ye = o, Ue = i, bt(s), Ie = u, at = l;
        }
    }
    function oi(e, t) {
        let n = t.reactions;
        if (n !== null) {
            var r = uo.call(n, e);
            if (r !== -1) {
                var a = n.length - 1;
                a === 0 ? n = t.reactions = null : (n[r] = n[a], n.pop());
            }
        }
        n === null && (t.f & Ce) !== 0 && (pe === null || !pe.includes(t)) && (_e(t, We), (t.f & (Se | an)) === 0 && (t.f ^= an), da(t), ln(t, 0));
    }
    function ln(e, t) {
        var n = e.deps;
        if (n !== null) for(var r = t; r < n.length; r++)oi(e, n[r]);
    }
    function ot(e) {
        var t = e.f;
        if ((t & ft) === 0) {
            _e(e, de);
            var n = $, r = mt;
            $ = e, mt = !0;
            try {
                (t & St) !== 0 ? ri(e) : ka(e), Ca(e);
                var a = Pa(e);
                e.teardown = typeof a == "function" ? a : null, e.wv = Aa;
                var o;
                Zr && Lo && (e.f & xe) !== 0 && e.deps;
            } finally{
                mt = r, $ = n;
            }
        }
    }
    async function ii() {
        await Promise.resolve(), Oo();
    }
    h = function(e) {
        var t = e.f, n = (t & Ce) !== 0;
        if (Y !== null && !Ie) {
            var r = $ !== null && ($.f & ft) !== 0;
            if (!r && !Ue?.includes(e)) {
                var a = Y.deps;
                if ((Y.f & Vn) !== 0) e.rv < Ut && (e.rv = Ut, pe === null && a !== null && a[be] === e ? be++ : pe === null ? pe = [
                    e
                ] : (!Ye || !pe.includes(e)) && pe.push(e));
                else {
                    (Y.deps ??= []).push(e);
                    var o = e.reactions;
                    o === null ? e.reactions = [
                        Y
                    ] : o.includes(Y) || o.push(Y);
                }
            }
        } else if (n && e.deps === null && e.effects === null) {
            var i = e, s = i.parent;
            s !== null && (s.f & Se) === 0 && (i.f ^= Se);
        }
        if (vt) {
            if (Xe.has(e)) return Xe.get(e);
            if (n) {
                i = e;
                var u = i.v;
                return ((i.f & de) === 0 && i.reactions !== null || Fa(i)) && (u = ir(i)), Xe.set(i, u), u;
            }
        } else n && (i = e, Yt(i) && va(i));
        if ((e.f & rt) !== 0) throw e.v;
        return e.v;
    };
    function Fa(e) {
        if (e.v === ce) return !0;
        if (e.deps === null) return !1;
        for (const t of e.deps)if (Xe.has(t) || (t.f & Ce) !== 0 && Fa(t)) return !0;
        return !1;
    }
    function Oe(e) {
        var t = Ie;
        try {
            return Ie = !0, e();
        } finally{
            Ie = t;
        }
    }
    const si = -7169;
    function _e(e, t) {
        e.f = e.f & si | t;
    }
    function Nt(e) {
        if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
            if (Pe in e) Bn(e);
            else if (!Array.isArray(e)) for(let t in e){
                const n = e[t];
                typeof n == "object" && n && Pe in n && Bn(n);
            }
        }
    }
    function Bn(e, t = new Set) {
        if (typeof e == "object" && e !== null && !(e instanceof EventTarget) && !t.has(e)) {
            t.add(e), e instanceof Date && e.getTime();
            for(let r in e)try {
                Bn(e[r], t);
            } catch  {}
            const n = Qn(e);
            if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
                const r = Qr(n);
                for(let a in r){
                    const o = r[a].get;
                    if (o) try {
                        o.call(e);
                    } catch  {}
                }
            }
        }
    }
    const Da = new Set, qn = new Set;
    function Na(e, t, n, r = {}) {
        function a(o) {
            if (r.capture || Rt.call(t, o), !o.cancelBubble) return pn(()=>n?.call(this, o));
        }
        return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Be(()=>{
            t.addEventListener(e, a, r);
        }) : t.addEventListener(e, a, r), a;
    }
    un = function(e, t, n, r, a) {
        var o = {
            capture: r,
            passive: a
        }, i = Na(e, t, n, o);
        (t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && sr(()=>{
            t.removeEventListener(e, i, o);
        });
    };
    Ze = function(e) {
        for(var t = 0; t < e.length; t++)Da.add(e[t]);
        for (var n of qn)n(e);
    };
    let Pr = null;
    function Rt(e) {
        var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
        Pr = e;
        var i = 0, s = Pr === e && e.__root;
        if (s) {
            var u = a.indexOf(s);
            if (u !== -1 && (t === document || t === window)) {
                e.__root = t;
                return;
            }
            var l = a.indexOf(t);
            if (l === -1) return;
            u <= l && (i = u);
        }
        if (o = a[i] || e.target, o !== t) {
            jn(e, "currentTarget", {
                configurable: !0,
                get () {
                    return o || n;
                }
            });
            var c = Y, f = $;
            me(null), Fe(null);
            try {
                for(var d, p = []; o !== null;){
                    var v = o.assignedSlot || o.parentNode || o.host || null;
                    try {
                        var m = o["__" + r];
                        if (m != null && (!o.disabled || e.target === o)) if (dn(m)) {
                            var [_, ...C] = m;
                            _.apply(o, [
                                e,
                                ...C
                            ]);
                        } else m.call(o, e);
                    } catch (b) {
                        d ? p.push(b) : d = b;
                    }
                    if (e.cancelBubble || v === t || v === null) break;
                    o = v;
                }
                if (d) {
                    for (let b of p)queueMicrotask(()=>{
                        throw b;
                    });
                    throw d;
                }
            } finally{
                e.__root = t, delete e.currentTarget, me(c), Fe(f);
            }
        }
    }
    function cr(e) {
        var t = document.createElement("template");
        return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
    }
    function lt(e, t) {
        var n = $;
        n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
    }
    A = function(e, t) {
        var n = (t & 1) !== 0, r = (t & 2) !== 0, a, o = !e.startsWith("<!>");
        return ()=>{
            a === void 0 && (a = cr(o ? e : "<!>" + e), n || (a = we(a)));
            var i = r || _a ? document.importNode(a, !0) : a.cloneNode(!0);
            if (n) {
                var s = we(i), u = i.lastChild;
                lt(s, u);
            } else lt(i, i);
            return i;
        };
    };
    function li(e, t, n = "svg") {
        var r = !e.startsWith("<!>"), a = (t & 1) !== 0, o = `<${n}>${r ? e : "<!>" + e}</${n}>`, i;
        return ()=>{
            if (!i) {
                var s = cr(o), u = we(s);
                if (a) for(i = document.createDocumentFragment(); we(u);)i.appendChild(we(u));
                else i = we(u);
            }
            var l = i.cloneNode(!0);
            if (a) {
                var c = we(l), f = l.lastChild;
                lt(c, f);
            } else lt(l, l);
            return l;
        };
    }
    Ra = function(e, t) {
        return li(e, t, "svg");
    };
    fe = function(e = "") {
        {
            var t = It(e + "");
            return lt(t, t), t;
        }
    };
    W = function() {
        var e = document.createDocumentFragment(), t = document.createComment(""), n = It();
        return e.append(t, n), lt(t, n), e;
    };
    g = function(e, t) {
        e !== null && e.before(t);
    };
    function ui(e) {
        return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
    }
    const ci = [
        "beforeinput",
        "click",
        "change",
        "dblclick",
        "contextmenu",
        "focusin",
        "focusout",
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "pointerdown",
        "pointermove",
        "pointerout",
        "pointerover",
        "pointerup",
        "touchend",
        "touchmove",
        "touchstart"
    ];
    function fi(e) {
        return ci.includes(e);
    }
    const di = {
        formnovalidate: "formNoValidate",
        ismap: "isMap",
        nomodule: "noModule",
        playsinline: "playsInline",
        readonly: "readOnly",
        defaultvalue: "defaultValue",
        defaultchecked: "defaultChecked",
        srcobject: "srcObject",
        novalidate: "noValidate",
        allowfullscreen: "allowFullscreen",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback"
    };
    function vi(e) {
        return e = e.toLowerCase(), di[e] ?? e;
    }
    const hi = [
        "touchstart",
        "touchmove"
    ];
    function pi(e) {
        return hi.includes(e);
    }
    G = function(e, t) {
        var n = t == null ? "" : typeof t == "object" ? t + "" : t;
        n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = n + "");
    };
    function fr(e, t) {
        return _i(e, t);
    }
    const ht = new Map;
    function _i(e, { target: t, anchor: n, props: r = {}, events: a, context: o, intro: i = !0 }) {
        Yo();
        var s = new Set, u = (f)=>{
            for(var d = 0; d < f.length; d++){
                var p = f[d];
                if (!s.has(p)) {
                    s.add(p);
                    var v = pi(p);
                    t.addEventListener(p, Rt, {
                        passive: v
                    });
                    var m = ht.get(p);
                    m === void 0 ? (document.addEventListener(p, Rt, {
                        passive: v
                    }), ht.set(p, 1)) : ht.set(p, m + 1);
                }
            }
        };
        u(Zn(Da)), qn.add(u);
        var l = void 0, c = ei(()=>{
            var f = n ?? t.appendChild(It());
            return Uo(f, {
                pending: ()=>{}
            }, (d)=>{
                if (o) {
                    oe({});
                    var p = ae;
                    p.c = o;
                }
                a && (r.$$events = a), l = e(d, r) || {}, o && ie();
            }), ()=>{
                for (var d of s){
                    t.removeEventListener(d, Rt);
                    var p = ht.get(d);
                    --p === 0 ? (document.removeEventListener(d, Rt), ht.delete(d)) : ht.set(d, p);
                }
                qn.delete(u), f !== n && f.parentNode?.removeChild(f);
            };
        });
        return Wn.set(l, c), l;
    }
    let Wn = new WeakMap;
    gi = function(e, t) {
        const n = Wn.get(e);
        return n ? (Wn.delete(e), n(t)) : Promise.resolve();
    };
    mi = function(e, t, ...n) {
        var r = e, a = ea, o;
        At(()=>{
            a !== (a = t()) && (o && (ve(o), o = null), o = ge(()=>a(r, ...n)));
        }, Bt);
    };
    mn = function(e) {
        ae === null && ra(), Tt && ae.l !== null ? bi(ae).m.push(e) : Vt(()=>{
            const t = Oe(e);
            if (typeof t == "function") return t;
        });
    };
    function yi(e) {
        ae === null && ra(), mn(()=>()=>Oe(e));
    }
    function bi(e) {
        var t = e.l;
        return t.u ??= {
            a: [],
            b: [],
            m: []
        };
    }
    L = function(e, t, n = !1) {
        var r = e, a = null, o = null, i = ce, s = n ? Bt : 0, u = !1;
        const l = (p, v = !0)=>{
            u = !0, d(v, p);
        };
        var c = null;
        function f() {
            c !== null && (c.lastChild.remove(), r.before(c), c = null);
            var p = i ? a : o, v = i ? o : a;
            p && ur(p), v && gt(v, ()=>{
                i ? o = null : a = null;
            });
        }
        const d = (p, v)=>{
            if (i !== (i = p)) {
                var m = ya(), _ = r;
                if (m && (c = document.createDocumentFragment(), c.append(_ = It())), i ? a ??= v && ge(()=>v(_)) : o ??= v && ge(()=>v(_)), m) {
                    var C = ne, b = i ? a : o, y = i ? o : a;
                    b && C.skipped_effects.delete(b), y && C.skipped_effects.add(y), C.add_callback(f);
                } else f();
            }
        };
        At(()=>{
            u = !1, t(l), u || d(null, null);
        }, s);
    };
    De = function(e, t) {
        return t;
    };
    function wi(e, t, n) {
        for(var r = e.items, a = [], o = t.length, i = 0; i < o; i++)lr(t[i].e, a, !0);
        var s = o > 0 && a.length === 0 && n !== null;
        if (s) {
            var u = n.parentNode;
            Go(u), u.append(n), r.clear(), Me(e, t[0].prev, t[o - 1].next);
        }
        xa(a, ()=>{
            for(var l = 0; l < o; l++){
                var c = t[l];
                s || (r.delete(c.k), Me(e, c.prev, c.next)), ve(c.e, !s);
            }
        });
    }
    Ne = function(e, t, n, r, a, o = null) {
        var i = e, s = {
            flags: t,
            items: new Map,
            first: null
        }, u = (t & 4) !== 0;
        if (u) {
            var l = e;
            i = l.appendChild(It());
        }
        var c = null, f = !1, d = new Map, p = or(()=>{
            var C = n();
            return dn(C) ? C : C == null ? [] : Zn(C);
        }), v, m;
        function _() {
            Ci(m, v, s, d, i, a, t, r, n), o !== null && (v.length === 0 ? c ? ur(c) : c = ge(()=>o(i)) : c !== null && gt(c, ()=>{
                c = null;
            }));
        }
        At(()=>{
            m ??= $, v = h(p);
            var C = v.length;
            if (!(f && C === 0)) {
                f = C === 0;
                var b, y, E, x;
                if (ya()) {
                    var T = new Set, w = ne;
                    for(y = 0; y < C; y += 1){
                        E = v[y], x = r(E, y);
                        var I = s.items.get(x) ?? d.get(x);
                        I ? (t & 3) !== 0 && Oa(I, E, y, t) : (b = za(null, s, null, null, E, x, y, a, t, n, !0), d.set(x, b)), T.add(x);
                    }
                    for (const [M, P] of s.items)T.has(M) || w.skipped_effects.add(P.e);
                    w.add_callback(_);
                } else _();
                h(p);
            }
        });
    };
    function Ci(e, t, n, r, a, o, i, s, u) {
        var l = (i & 8) !== 0, c = (i & 3) !== 0, f = t.length, d = n.items, p = n.first, v = p, m, _ = null, C, b = [], y = [], E, x, T, w;
        if (l) for(w = 0; w < f; w += 1)E = t[w], x = s(E, w), T = d.get(x), T !== void 0 && (T.a?.measure(), (C ??= new Set).add(T));
        for(w = 0; w < f; w += 1){
            if (E = t[w], x = s(E, w), T = d.get(x), T === void 0) {
                var I = r.get(x);
                if (I !== void 0) {
                    r.delete(x), d.set(x, I);
                    var M = _ ? _.next : v;
                    Me(n, _, I), Me(n, I, M), En(I, M, a), _ = I;
                } else {
                    var P = v ? v.e.nodes_start : a;
                    _ = za(P, n, _, _ === null ? n.first : _.next, E, x, w, o, i, u);
                }
                d.set(x, _), b = [], y = [], v = _.next;
                continue;
            }
            if (c && Oa(T, E, w, i), (T.e.f & Ae) !== 0 && (ur(T.e), l && (T.a?.unfix(), (C ??= new Set).delete(T))), T !== v) {
                if (m !== void 0 && m.has(T)) {
                    if (b.length < y.length) {
                        var R = y[0], U;
                        _ = R.prev;
                        var O = b[0], B = b[b.length - 1];
                        for(U = 0; U < b.length; U += 1)En(b[U], R, a);
                        for(U = 0; U < y.length; U += 1)m.delete(y[U]);
                        Me(n, O.prev, B.next), Me(n, _, O), Me(n, B, R), v = R, _ = B, w -= 1, b = [], y = [];
                    } else m.delete(T), En(T, v, a), Me(n, T.prev, T.next), Me(n, T, _ === null ? n.first : _.next), Me(n, _, T), _ = T;
                    continue;
                }
                for(b = [], y = []; v !== null && v.k !== x;)(v.e.f & Ae) === 0 && (m ??= new Set).add(v), y.push(v), v = v.next;
                if (v === null) continue;
                T = v;
            }
            b.push(T), _ = T, v = T.next;
        }
        if (v !== null || m !== void 0) {
            for(var D = m === void 0 ? [] : Zn(m); v !== null;)(v.e.f & Ae) === 0 && D.push(v), v = v.next;
            var z = D.length;
            if (z > 0) {
                var j = (i & 4) !== 0 && f === 0 ? a : null;
                if (l) {
                    for(w = 0; w < z; w += 1)D[w].a?.measure();
                    for(w = 0; w < z; w += 1)D[w].a?.fix();
                }
                wi(n, D, j);
            }
        }
        l && Be(()=>{
            if (C !== void 0) for (T of C)T.a?.apply();
        }), e.first = n.first && n.first.e, e.last = _ && _.e;
        for (var H of r.values())ve(H.e);
        r.clear();
    }
    function Oa(e, t, n, r) {
        (r & 1) !== 0 && kt(e.v, t), (r & 2) !== 0 ? kt(e.i, n) : e.i = n;
    }
    function za(e, t, n, r, a, o, i, s, u, l, c) {
        var f = (u & 1) !== 0, d = (u & 16) === 0, p = f ? d ? _t(a, !1, !1) : st(a) : a, v = (u & 2) === 0 ? i : st(i), m = {
            i: v,
            v: p,
            k: o,
            a: null,
            e: null,
            prev: n,
            next: r
        };
        try {
            if (e === null) {
                var _ = document.createDocumentFragment();
                _.append(e = It());
            }
            return m.e = ge(()=>s(e, p, v, l), Ao), m.e.prev = n && n.e, m.e.next = r && r.e, n === null ? c || (t.first = m) : (n.next = m, n.e.next = m.e), r !== null && (r.prev = m, r.e.prev = m.e), m;
        } finally{}
    }
    function En(e, t, n) {
        for(var r = e.next ? e.next.e.nodes_start : n, a = t ? t.e.nodes_start : n, o = e.e.nodes_start; o !== null && o !== r;){
            var i = $t(o);
            a.before(o), o = i;
        }
    }
    function Me(e, t, n) {
        t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
    }
    ja = function(e, t, n = !1, r = !1, a = !1) {
        var o = e, i = "";
        V(()=>{
            var s = $;
            if (i !== (i = t() ?? "") && (s.nodes_start !== null && (Ea(s.nodes_start, s.nodes_end), s.nodes_start = s.nodes_end = null), i !== "")) {
                var u = i + "";
                n ? u = `<svg>${u}</svg>` : r && (u = `<math>${u}</math>`);
                var l = cr(u);
                if ((n || r) && (l = we(l)), lt(we(l), l.lastChild), n || r) for(; we(l);)o.before(we(l));
                else o.before(l);
            }
        });
    };
    function ki(e, t) {
        var n = void 0, r;
        At(()=>{
            n !== (n = t()) && (r && (ve(r), r = null), n && (r = ge(()=>{
                gn(()=>n(e));
            })));
        });
    }
    function Va(e) {
        var t, n, r = "";
        if (typeof e == "string" || typeof e == "number") r += e;
        else if (typeof e == "object") if (Array.isArray(e)) {
            var a = e.length;
            for(t = 0; t < a; t++)e[t] && (n = Va(e[t])) && (r && (r += " "), r += n);
        } else for(n in e)e[n] && (r && (r += " "), r += n);
        return r;
    }
    function Ei() {
        for(var e, t, n = 0, r = "", a = arguments.length; n < a; n++)(e = arguments[n]) && (t = Va(e)) && (r && (r += " "), r += t);
        return r;
    }
    dr = function(e) {
        return typeof e == "object" ? Ei(e) : e ?? "";
    };
    const Fr = [
        ...` 	
\r\f \v\uFEFF`
    ];
    function Si(e, t, n) {
        var r = e == null ? "" : "" + e;
        if (t && (r = r ? r + " " + t : t), n) {
            for(var a in n)if (n[a]) r = r ? r + " " + a : a;
            else if (r.length) for(var o = a.length, i = 0; (i = r.indexOf(a, i)) >= 0;){
                var s = i + o;
                (i === 0 || Fr.includes(r[i - 1])) && (s === r.length || Fr.includes(r[s])) ? r = (i === 0 ? "" : r.substring(0, i)) + r.substring(s + 1) : i = s;
            }
        }
        return r === "" ? null : r;
    }
    function Dr(e, t = !1) {
        var n = t ? " !important;" : ";", r = "";
        for(var a in e){
            var o = e[a];
            o != null && o !== "" && (r += " " + a + ": " + o + n);
        }
        return r;
    }
    function Sn(e) {
        return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
    }
    function xi(e, t) {
        if (t) {
            var n = "", r, a;
            if (Array.isArray(t) ? (r = t[0], a = t[1]) : r = t, e) {
                e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
                var o = !1, i = 0, s = !1, u = [];
                r && u.push(...Object.keys(r).map(Sn)), a && u.push(...Object.keys(a).map(Sn));
                var l = 0, c = -1;
                const m = e.length;
                for(var f = 0; f < m; f++){
                    var d = e[f];
                    if (s ? d === "/" && e[f - 1] === "*" && (s = !1) : o ? o === d && (o = !1) : d === "/" && e[f + 1] === "*" ? s = !0 : d === '"' || d === "'" ? o = d : d === "(" ? i++ : d === ")" && i--, !s && o === !1 && i === 0) {
                        if (d === ":" && c === -1) c = f;
                        else if (d === ";" || f === m - 1) {
                            if (c !== -1) {
                                var p = Sn(e.substring(l, c).trim());
                                if (!u.includes(p)) {
                                    d !== ";" && f++;
                                    var v = e.substring(l, f).trim();
                                    n += " " + v + ";";
                                }
                            }
                            l = f + 1, c = -1;
                        }
                    }
                }
            }
            return r && (n += Dr(r)), a && (n += Dr(a, !0)), n = n.trim(), n === "" ? null : n;
        }
        return e == null ? null : String(e);
    }
    Te = function(e, t, n, r, a, o) {
        var i = e.__className;
        if (i !== n || i === void 0) {
            var s = Si(n, r, o);
            s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s), e.__className = n;
        } else if (o && a !== o) for(var u in o){
            var l = !!o[u];
            (a == null || l !== !!a[u]) && e.classList.toggle(u, l);
        }
        return o;
    };
    function xn(e, t = {}, n, r) {
        for(var a in n){
            var o = n[a];
            t[a] !== o && (n[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, o, r));
        }
    }
    vr = function(e, t, n, r) {
        var a = e.__style;
        if (a !== t) {
            var o = xi(t, r);
            o == null ? e.removeAttribute("style") : e.style.cssText = o, e.__style = t;
        } else r && (Array.isArray(r) ? (xn(e, n?.[0], r[0]), xn(e, n?.[1], r[1], "important")) : xn(e, n, r));
        return r;
    };
    function cn(e, t, n = !1) {
        if (e.multiple) {
            if (t == null) return;
            if (!dn(t)) return To();
            for (var r of e.options)r.selected = t.includes(jt(r));
            return;
        }
        for (r of e.options){
            var a = jt(r);
            if (pa(a, t)) {
                r.selected = !0;
                return;
            }
        }
        (!n || t !== void 0) && (e.selectedIndex = -1);
    }
    function Ua(e) {
        var t = new MutationObserver(()=>{
            cn(e, e.__value);
        });
        t.observe(e, {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: [
                "value"
            ]
        }), sr(()=>{
            t.disconnect();
        });
    }
    ef = function(e, t, n = t) {
        var r = !0;
        _n(e, "change", (a)=>{
            var o = a ? "[selected]" : ":checked", i;
            if (e.multiple) i = [].map.call(e.querySelectorAll(o), jt);
            else {
                var s = e.querySelector(o) ?? e.querySelector("option:not([disabled])");
                i = s && jt(s);
            }
            n(i);
        }), gn(()=>{
            var a = t();
            if (cn(e, a, r), r && a === void 0) {
                var o = e.querySelector(":checked");
                o !== null && (a = jt(o), n(a));
            }
            e.__value = a, r = !1;
        }), Ua(e);
    };
    function jt(e) {
        return "__value" in e ? e.__value : e.value;
    }
    const pt = Symbol("class"), Pt = Symbol("style"), Ha = Symbol("is custom element"), Ba = Symbol("is html");
    function Ti(e, t) {
        var n = hr(e);
        n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== "PROGRESS") || (e.value = t ?? "");
    }
    function Ii(e, t) {
        t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
    }
    re = function(e, t, n, r) {
        var a = hr(e);
        a[t] !== (a[t] = n) && (t === "loading" && (e[_o] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Wa(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
    };
    function Ai(e, t, n, r, a = !1, o = !1) {
        var i = hr(e), s = i[Ha], u = !i[Ba], l = t || {}, c = e.tagName === "OPTION";
        for(var f in t)f in n || (n[f] = null);
        n.class ? n.class = dr(n.class) : (r || n[pt]) && (n.class = null), n[Pt] && (n.style ??= null);
        var d = Wa(e);
        for(const y in n){
            let E = n[y];
            if (c && y === "value" && E == null) {
                e.value = e.__value = "", l[y] = E;
                continue;
            }
            if (y === "class") {
                var p = e.namespaceURI === "http://www.w3.org/1999/xhtml";
                Te(e, p, E, r, t?.[pt], n[pt]), l[y] = E, l[pt] = n[pt];
                continue;
            }
            if (y === "style") {
                vr(e, E, t?.[Pt], n[Pt]), l[y] = E, l[Pt] = n[Pt];
                continue;
            }
            var v = l[y];
            if (!(E === v && !(E === void 0 && e.hasAttribute(y)))) {
                l[y] = E;
                var m = y[0] + y[1];
                if (m !== "$$") if (m === "on") {
                    const x = {}, T = "$$" + y;
                    let w = y.slice(2);
                    var _ = fi(w);
                    if (ui(w) && (w = w.slice(0, -7), x.capture = !0), !_ && v) {
                        if (E != null) continue;
                        e.removeEventListener(w, l[T], x), l[T] = null;
                    }
                    if (E != null) if (_) e[`__${w}`] = E, Ze([
                        w
                    ]);
                    else {
                        let I = function(M) {
                            l[y].call(this, M);
                        };
                        l[T] = Na(w, e, I, x);
                    }
                    else _ && (e[`__${w}`] = void 0);
                } else if (y === "style") re(e, y, E);
                else if (y === "autofocus") Xo(e, !!E);
                else if (!s && (y === "__value" || y === "value" && E != null)) e.value = e.__value = E;
                else if (y === "selected" && c) Ii(e, E);
                else {
                    var C = y;
                    u || (C = vi(C));
                    var b = C === "defaultValue" || C === "defaultChecked";
                    if (E == null && !s && !b) if (i[y] = null, C === "value" || C === "checked") {
                        let x = e;
                        const T = t === void 0;
                        if (C === "value") {
                            let w = x.defaultValue;
                            x.removeAttribute(C), x.defaultValue = w, x.value = x.__value = T ? w : null;
                        } else {
                            let w = x.defaultChecked;
                            x.removeAttribute(C), x.defaultChecked = w, x.checked = T ? w : !1;
                        }
                    } else e.removeAttribute(y);
                    else b || d.includes(C) && (s || typeof E != "string") ? (e[C] = E, C in i && (i[C] = ce)) : typeof E != "function" && re(e, C, E);
                }
            }
        }
        return l;
    }
    function qa(e, t, n = [], r = [], a, o = !1, i = !1) {
        ca(n, r, (s)=>{
            var u = void 0, l = {}, c = e.nodeName === "SELECT", f = !1;
            if (At(()=>{
                var p = t(...s.map(h)), v = Ai(e, u, p, a, o, i);
                f && c && "value" in p && cn(e, p.value);
                for (let _ of Object.getOwnPropertySymbols(l))p[_] || ve(l[_]);
                for (let _ of Object.getOwnPropertySymbols(p)){
                    var m = p[_];
                    _.description === lo && (!u || m !== u[_]) && (l[_] && ve(l[_]), l[_] = ge(()=>ki(e, ()=>m))), v[_] = m;
                }
                u = v;
            }), c) {
                var d = e;
                gn(()=>{
                    cn(d, u.value, !0), Ua(d);
                });
            }
            f = !0;
        });
    }
    function hr(e) {
        return e.__attributes ??= {
            [Ha]: e.nodeName.includes("-"),
            [Ba]: e.namespaceURI === so
        };
    }
    var Nr = new Map;
    function Wa(e) {
        var t = e.getAttribute("is") || e.nodeName, n = Nr.get(t);
        if (n) return n;
        Nr.set(t, n = []);
        for(var r, a = e, o = Element.prototype; o !== a;){
            r = Qr(a);
            for(var i in r)r[i].set && n.push(i);
            a = Qn(a);
        }
        return n;
    }
    $a = function(e, t, n = t) {
        var r = new WeakSet;
        _n(e, "input", async (a)=>{
            var o = a ? e.defaultValue : e.value;
            if (o = In(e) ? An(o) : o, n(o), ne !== null && r.add(ne), await ii(), o !== (o = t())) {
                var i = e.selectionStart, s = e.selectionEnd;
                e.value = o ?? "", s !== null && (e.selectionStart = i, e.selectionEnd = Math.min(s, e.value.length));
            }
        }), Oe(t) == null && e.value && (n(In(e) ? An(e.value) : e.value), ne !== null && r.add(ne)), dt(()=>{
            var a = t();
            if (e === document.activeElement) {
                var o = Qt ?? ne;
                if (r.has(o)) return;
            }
            In(e) && a === An(e.value) || e.type === "date" && !a && !e.value || a !== e.value && (e.value = a ?? "");
        });
    };
    const Tn = new Set;
    tf = function(e, t, n, r, a = r) {
        var o = n.getAttribute("type") === "checkbox", i = e;
        if (t !== null) for (var s of t)i = i[s] ??= [];
        i.push(n), _n(n, "change", ()=>{
            var u = n.__value;
            o && (u = Mi(i, u, n.checked)), a(u);
        }, ()=>a(o ? [] : null)), dt(()=>{
            var u = r();
            o ? (u = u || [], n.checked = u.includes(n.__value)) : n.checked = pa(n.__value, u);
        }), sr(()=>{
            var u = i.indexOf(n);
            u !== -1 && i.splice(u, 1);
        }), Tn.has(i) || (Tn.add(i), Be(()=>{
            i.sort((u, l)=>u.compareDocumentPosition(l) === 4 ? -1 : 1), Tn.delete(i);
        })), Be(()=>{});
    };
    nf = function(e, t, n = t) {
        _n(e, "change", (r)=>{
            var a = r ? e.defaultChecked : e.checked;
            n(a);
        }), Oe(t) == null && n(e.checked), dt(()=>{
            var r = t();
            e.checked = !!r;
        });
    };
    function Mi(e, t, n) {
        for(var r = new Set, a = 0; a < e.length; a += 1)e[a].checked && r.add(e[a].__value);
        return n || r.delete(t), Array.from(r);
    }
    function In(e) {
        var t = e.type;
        return t === "number" || t === "range";
    }
    function An(e) {
        return e === "" ? null : +e;
    }
    function Rr(e, t) {
        return e === t || e?.[Pe] === t;
    }
    Ya = function(e = {}, t, n, r) {
        return gn(()=>{
            var a, o;
            return dt(()=>{
                a = o, o = [], Oe(()=>{
                    e !== n(...o) && (t(e, ...o), a && Rr(n(...a), e) && t(null, ...a));
                });
            }), ()=>{
                Be(()=>{
                    o && Rr(n(...o), e) && t(null, ...o);
                });
            };
        }), e;
    };
    Ga = function(e = !1) {
        const t = ae, n = t.l.u;
        if (!n) return;
        let r = ()=>Nt(t.s);
        if (e) {
            let a = 0, o = {};
            const i = Wt(()=>{
                let s = !1;
                const u = t.s;
                for(const l in u)u[l] !== o[l] && (o[l] = u[l], s = !0);
                return s && a++, a;
            });
            r = ()=>h(i);
        }
        n.b.length && Qo(()=>{
            Or(t, r), rn(n.b);
        }), Vt(()=>{
            const a = Oe(()=>n.m.map(vo));
            return ()=>{
                for (const o of a)typeof o == "function" && o();
            };
        }), n.a.length && Vt(()=>{
            Or(t, r), rn(n.a);
        });
    };
    function Or(e, t) {
        if (e.l.s) for (const n of e.l.s)h(n);
        t();
    }
    let Xt = !1;
    function Li(e) {
        var t = Xt;
        try {
            return Xt = !1, [
                e(),
                Xt
            ];
        } finally{
            Xt = t;
        }
    }
    const Pi = {
        get (e, t) {
            if (!e.exclude.includes(t)) return e.props[t];
        },
        set (e, t) {
            return !1;
        },
        getOwnPropertyDescriptor (e, t) {
            if (!e.exclude.includes(t) && t in e.props) return {
                enumerable: !0,
                configurable: !0,
                value: e.props[t]
            };
        },
        has (e, t) {
            return e.exclude.includes(t) ? !1 : t in e.props;
        },
        ownKeys (e) {
            return Reflect.ownKeys(e.props).filter((t)=>!e.exclude.includes(t));
        }
    };
    Qe = function(e, t, n) {
        return new Proxy({
            props: e,
            exclude: t
        }, Pi);
    };
    const Fi = {
        get (e, t) {
            let n = e.props.length;
            for(; n--;){
                let r = e.props[n];
                if (Lt(r) && (r = r()), typeof r == "object" && r !== null && t in r) return r[t];
            }
        },
        set (e, t, n) {
            let r = e.props.length;
            for(; r--;){
                let a = e.props[r];
                Lt(a) && (a = a());
                const o = Ge(a, t);
                if (o && o.set) return o.set(n), !0;
            }
            return !1;
        },
        getOwnPropertyDescriptor (e, t) {
            let n = e.props.length;
            for(; n--;){
                let r = e.props[n];
                if (Lt(r) && (r = r()), typeof r == "object" && r !== null && t in r) {
                    const a = Ge(r, t);
                    return a && !a.configurable && (a.configurable = !0), a;
                }
            }
        },
        has (e, t) {
            if (t === Pe || t === na) return !1;
            for (let n of e.props)if (Lt(n) && (n = n()), n != null && t in n) return !0;
            return !1;
        },
        ownKeys (e) {
            const t = [];
            for (let n of e.props)if (Lt(n) && (n = n()), !!n) {
                for(const r in n)t.includes(r) || t.push(r);
                for (const r of Object.getOwnPropertySymbols(n))t.includes(r) || t.push(r);
            }
            return t;
        }
    };
    function Xa(...e) {
        return new Proxy({
            props: e
        }, Fi);
    }
    Le = function(e, t, n, r) {
        var a = !Tt || (n & 2) !== 0, o = (n & 8) !== 0, i = (n & 16) !== 0, s = r, u = !0, l = ()=>(u && (u = !1, s = i ? Oe(r) : r), s), c;
        if (o) {
            var f = Pe in e || na in e;
            c = Ge(e, t)?.set ?? (f && t in e ? (y)=>e[t] = y : void 0);
        }
        var d, p = !1;
        o ? [d, p] = Li(()=>e[t]) : d = e[t], d === void 0 && r !== void 0 && (d = l(), c && (a && Co(), c(d)));
        var v;
        if (a ? v = ()=>{
            var y = e[t];
            return y === void 0 ? l() : (u = !0, y);
        } : v = ()=>{
            var y = e[t];
            return y !== void 0 && (s = void 0), y === void 0 ? s : y;
        }, a && (n & 4) === 0) return v;
        if (c) {
            var m = e.$$legacy;
            return (function(y, E) {
                return arguments.length > 0 ? ((!a || !E || m || p) && c(E ? v() : y), y) : v();
            });
        }
        var _ = !1, C = ((n & 1) !== 0 ? Wt : or)(()=>(_ = !1, v()));
        o && h(C);
        var b = $;
        return (function(y, E) {
            if (arguments.length > 0) {
                const x = E ? h(C) : a && o ? ue(y) : y;
                return F(C, x), _ = !0, s !== void 0 && (s = x), y;
            }
            return vt && _ || (b.f & ft) !== 0 ? C.v : h(C);
        });
    };
    function Di() {
        document.querySelectorAll("figure.code-block").forEach((t)=>{
            if (!(t instanceof HTMLElement)) return;
            const n = t.textContent?.trim();
            if (!n) return;
            const r = n.split(`
`).length;
            if (r > 30) {
                const a = document.createElement("div");
                a.className = "code-block-wrapper", a.style.marginBlockEnd = "var(--paragraph-block-end)", a.style.position = "relative", a.style.maxHeight = "25em", a.style.overflow = "hidden", t.parentNode?.insertBefore(a, t), a.appendChild(t);
                let o = "linear-gradient(in oklch to bottom, black, black 60%, transparent 90%)";
                t.style.maskImage = o, t.style.webkitMaskImage = o, t.style.maskSize = "100% 28em", t.style.webkitMaskSize = "100% 28em";
                const i = document.createElement("button");
                i.textContent = `Show all ${r} lines`, i.style.position = "absolute", i.style.bottom = "10px", i.style.left = "50%", i.style.fontSize = "1em", i.style.padding = "0.5em 1em", i.style.borderRadius = "0.3125em", i.style.transform = "translateX(-50%)", i.style.background = "light-dark(#ffffff, #1a1a1a)", i.style.border = "1px solid light-dark(#ccc, #333)", i.style.zIndex = "1";
                let s = "0.9";
                i.style.opacity = s, a.appendChild(i);
                let u = !1;
                a.style.cursor = "pointer", a.addEventListener("click", ()=>{
                    u || (a.style.maxHeight = "none", t.style.maskImage = "none", t.style.webkitMaskImage = "none", i.style.display = "none", u = !0, a.style.cursor = "default");
                }), a.addEventListener("mouseover", ()=>{
                    i.style.opacity = "1";
                }), a.addEventListener("mouseout", ()=>{
                    i.style.opacity = s;
                });
            }
        });
    }
    function Ni() {
        document.querySelectorAll('.page-markup img[data-kind="media"], .page-markup img[data-kind="diagram"]').forEach((o)=>{
            !(o instanceof HTMLImageElement) || !o.width || !o.height || o.closest(".page-thumbnail-container") || o.closest(".post-list") || o.closest(".dialog") || o.closest(".tip") || (o.addEventListener("click", (s)=>{
                if (!s.shiftKey) return;
                const u = document.querySelector("main");
                if (!u) {
                    console.debug("Giving up: no main element found");
                    return;
                }
                const l = Array.from(u.querySelectorAll(".bear-mark"));
                if (l.length === 0) {
                    console.debug("Giving up: no dialogs found within main element");
                    return;
                }
                const c = o.closest(".bear-mark");
                if (!c) {
                    console.debug("Giving up: current dialog not found");
                    return;
                }
                const f = l.indexOf(c);
                if (f === -1 || f === l.length - 1) {
                    console.debug("Giving up: dialog is either not in the list or is the last one", {
                        currentIndex: f,
                        totalDialogs: l.length
                    });
                    return;
                }
                const d = l[f + 1];
                console.debug("Scrolling to next dialog", {
                    currentIndex: f,
                    nextIndex: f + 1,
                    totalDialogs: l.length
                }), d.scrollIntoView({
                    behavior: "instant"
                });
            }), window.getComputedStyle(o).position === "absolute") || (o.style.cursor = "zoom-in", o.addEventListener("click", (s)=>n(s)));
        }), document.addEventListener("keydown", (o)=>{
            o.key === "Escape" && r();
        });
        let t = null;
        function n(o) {
            const i = o.target, s = i.closest("figure") || i.closest("picture") || i;
            if (t) r();
            else {
                t = document.createElement("div"), t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.width = "100vw", t.style.height = "100vh", t.style.backgroundColor = "rgba(0, 0, 0, 0.9)", t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.zIndex = "1000";
                const u = s.cloneNode(!0);
                u.style.maxWidth = "90%", u.style.maxHeight = "90%", u.style.display = "flex", u.style.flexDirection = "column", u.style.alignItems = "center";
                const l = u.querySelector("img");
                l && l instanceof HTMLImageElement && (l.style.maxWidth = "100%", l.style.maxHeight = "80vh", l.style.objectFit = "contain", l.style.cursor = "zoom-out");
                const c = u.querySelector("figcaption");
                c && (c.style.marginTop = "1rem", c.style.color = "#fff", c.style.textAlign = "center", c.style.fontStyle = "normal"), t.appendChild(u), document.body.appendChild(t), t.addEventListener("click", r);
            }
        }
        function r() {
            t && (t.removeEventListener("click", r), document.body.removeChild(t), t = null);
        }
        document.addEventListener("keypress", (o)=>{
            if ((o.key === "j" || o.key === "k") && !(o.target instanceof HTMLInputElement || o.target instanceof HTMLTextAreaElement || o.target instanceof HTMLElement && o.target.isContentEditable)) {
                console.debug(`${o.key} shortcut detected`);
                const i = document.querySelector("main");
                if (!i) {
                    console.debug(`${o.key}: No main element found`);
                    return;
                }
                const s = Array.from(i.querySelectorAll(".bear-mark"));
                if (console.debug("Found dialogs:", {
                    count: s.length,
                    selectors: ".bear-mark",
                    parentElement: i
                }), s.length === 0) {
                    console.debug(`${o.key}: No dialogs found within main element`);
                    return;
                }
                const u = window.scrollY || document.documentElement.scrollTop;
                console.debug("Current scroll position:", u);
                let l = 40, c;
                if (o.key === "j") {
                    let f = -1;
                    c = s[0];
                    for(let d = 0; d < s.length; d++){
                        const p = s[d].getBoundingClientRect();
                        if (console.debug(`Dialog ${d} position:`, {
                            top: p.top,
                            bottom: p.bottom,
                            y: s[d].offsetTop,
                            element: s[d]
                        }), p.top > l) {
                            f = d - 1, c = s[d], console.debug("Found next dialog to scroll to:", {
                                index: d,
                                element: c,
                                position: p,
                                tolerance: l
                            });
                            break;
                        }
                    }
                    f === -1 && s.length > 0 && (c = s[0], console.debug("At or past last dialog, looping to first", {
                        element: c
                    }));
                } else {
                    let f = -1;
                    c = s[s.length - 1];
                    const d = -40;
                    for(let p = s.length - 1; p >= 0; p--){
                        const v = s[p].getBoundingClientRect();
                        if (console.debug(`Dialog ${p} position (backward):`, {
                            top: v.top,
                            bottom: v.bottom,
                            y: s[p].offsetTop,
                            element: s[p]
                        }), v.bottom < l) {
                            f = p, c = s[p], v.bottom > d && p > 0 && (c = s[p - 1], f = p - 1), console.debug("Found previous dialog to scroll to:", {
                                index: f,
                                element: c,
                                position: v,
                                positiveTolerance: l,
                                negativeTolerance: d
                            });
                            break;
                        }
                    }
                    f === -1 && s.length > 0 && (c = s[s.length - 1], console.debug("Before first dialog, looping to last", {
                        element: c
                    }));
                }
                console.debug(`${o.key}: Scrolling to dialog`, {
                    totalDialogs: s.length,
                    targetElement: c
                }), c.scrollIntoView({
                    behavior: "instant"
                });
            }
        }), document.querySelectorAll(".macos-window").forEach((o)=>{
            !(o instanceof HTMLImageElement) && !(o instanceof HTMLVideoElement) || !o.width || !o.height || Ri(o);
        });
    }
    function Ri(e) {
        const t = e.width, n = e.height, r = 8.42, a = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}"><rect width="${t}" height="${n}" rx="${r}" ry="${r}" fill="white"/></svg>`;
        e.style.webkitMaskImage = `url('${a}')`, e.style.maskImage = `url('${a}')`, e.style.webkitMaskSize = "100% 100%", e.style.maskSize = "100% 100%";
    }
    Oi = function(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    };
    var Kt = {
        exports: {}
    }, Mn, zr;
    function zi() {
        if (zr) return Mn;
        zr = 1;
        var e = 1e3, t = e * 60, n = t * 60, r = n * 24, a = r * 7, o = r * 365.25;
        Mn = function(c, f) {
            f = f || {};
            var d = typeof c;
            if (d === "string" && c.length > 0) return i(c);
            if (d === "number" && isFinite(c)) return f.long ? u(c) : s(c);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(c));
        };
        function i(c) {
            if (c = String(c), !(c.length > 100)) {
                var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(c);
                if (f) {
                    var d = parseFloat(f[1]), p = (f[2] || "ms").toLowerCase();
                    switch(p){
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return d * o;
                        case "weeks":
                        case "week":
                        case "w":
                            return d * a;
                        case "days":
                        case "day":
                        case "d":
                            return d * r;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return d * n;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return d * t;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return d * e;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return d;
                        default:
                            return;
                    }
                }
            }
        }
        function s(c) {
            var f = Math.abs(c);
            return f >= r ? Math.round(c / r) + "d" : f >= n ? Math.round(c / n) + "h" : f >= t ? Math.round(c / t) + "m" : f >= e ? Math.round(c / e) + "s" : c + "ms";
        }
        function u(c) {
            var f = Math.abs(c);
            return f >= r ? l(c, f, r, "day") : f >= n ? l(c, f, n, "hour") : f >= t ? l(c, f, t, "minute") : f >= e ? l(c, f, e, "second") : c + " ms";
        }
        function l(c, f, d, p) {
            var v = f >= d * 1.5;
            return Math.round(c / d) + " " + p + (v ? "s" : "");
        }
        return Mn;
    }
    var Ln, jr;
    function ji() {
        if (jr) return Ln;
        jr = 1;
        function e(t) {
            r.debug = r, r.default = r, r.coerce = l, r.disable = s, r.enable = o, r.enabled = u, r.humanize = zi(), r.destroy = c, Object.keys(t).forEach((f)=>{
                r[f] = t[f];
            }), r.names = [], r.skips = [], r.formatters = {};
            function n(f) {
                let d = 0;
                for(let p = 0; p < f.length; p++)d = (d << 5) - d + f.charCodeAt(p), d |= 0;
                return r.colors[Math.abs(d) % r.colors.length];
            }
            r.selectColor = n;
            function r(f) {
                let d, p = null, v, m;
                function _(...C) {
                    if (!_.enabled) return;
                    const b = _, y = Number(new Date), E = y - (d || y);
                    b.diff = E, b.prev = d, b.curr = y, d = y, C[0] = r.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
                    let x = 0;
                    C[0] = C[0].replace(/%([a-zA-Z%])/g, (w, I)=>{
                        if (w === "%%") return "%";
                        x++;
                        const M = r.formatters[I];
                        if (typeof M == "function") {
                            const P = C[x];
                            w = M.call(b, P), C.splice(x, 1), x--;
                        }
                        return w;
                    }), r.formatArgs.call(b, C), (b.log || r.log).apply(b, C);
                }
                return _.namespace = f, _.useColors = r.useColors(), _.color = r.selectColor(f), _.extend = a, _.destroy = r.destroy, Object.defineProperty(_, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: ()=>p !== null ? p : (v !== r.namespaces && (v = r.namespaces, m = r.enabled(f)), m),
                    set: (C)=>{
                        p = C;
                    }
                }), typeof r.init == "function" && r.init(_), _;
            }
            function a(f, d) {
                const p = r(this.namespace + (typeof d > "u" ? ":" : d) + f);
                return p.log = this.log, p;
            }
            function o(f) {
                r.save(f), r.namespaces = f, r.names = [], r.skips = [];
                const d = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
                for (const p of d)p[0] === "-" ? r.skips.push(p.slice(1)) : r.names.push(p);
            }
            function i(f, d) {
                let p = 0, v = 0, m = -1, _ = 0;
                for(; p < f.length;)if (v < d.length && (d[v] === f[p] || d[v] === "*")) d[v] === "*" ? (m = v, _ = p, v++) : (p++, v++);
                else if (m !== -1) v = m + 1, _++, p = _;
                else return !1;
                for(; v < d.length && d[v] === "*";)v++;
                return v === d.length;
            }
            function s() {
                const f = [
                    ...r.names,
                    ...r.skips.map((d)=>"-" + d)
                ].join(",");
                return r.enable(""), f;
            }
            function u(f) {
                for (const d of r.skips)if (i(f, d)) return !1;
                for (const d of r.names)if (i(f, d)) return !0;
                return !1;
            }
            function l(f) {
                return f instanceof Error ? f.stack || f.message : f;
            }
            function c() {
                console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
            }
            return r.enable(r.load()), r;
        }
        return Ln = e, Ln;
    }
    var Vr;
    function Vi() {
        return Vr || (Vr = 1, (function(e, t) {
            var n = {};
            t.formatArgs = a, t.save = o, t.load = i, t.useColors = r, t.storage = s(), t.destroy = (()=>{
                let l = !1;
                return ()=>{
                    l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
                };
            })(), t.colors = [
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
                "#FFCC33"
            ];
            function r() {
                if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
                if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
                let l;
                return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
            }
            function a(l) {
                if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
                const c = "color: " + this.color;
                l.splice(1, 0, c, "color: inherit");
                let f = 0, d = 0;
                l[0].replace(/%[a-zA-Z%]/g, (p)=>{
                    p !== "%%" && (f++, p === "%c" && (d = f));
                }), l.splice(d, 0, c);
            }
            t.log = console.debug || console.log || (()=>{});
            function o(l) {
                try {
                    l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
                } catch  {}
            }
            function i() {
                let l;
                try {
                    l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
                } catch  {}
                return !l && typeof process < "u" && "env" in process && (l = n.DEBUG), l;
            }
            function s() {
                try {
                    return localStorage;
                } catch  {}
            }
            e.exports = ji()(t);
            const { formatters: u } = e.exports;
            u.j = function(l) {
                try {
                    return JSON.stringify(l);
                } catch (c) {
                    return "[UnexpectedJSONParseError]: " + c.message;
                }
            };
        })(Kt, Kt.exports)), Kt.exports;
    }
    var Ui = Vi();
    const Gt = Oi(Ui), Hi = "5";
    typeof window < "u" && ((window.__svelte ??= {}).v ??= new Set).add(Hi);
    function Bi(e, t, n, r, a) {
        if (t.disabled) return;
        const o = e.clientY, i = n();
        function s(l) {
            const c = (o - l.clientY) * r();
            n(a(i + c)), t.onchange(n());
        }
        function u() {
            window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", u), t.onchange(n());
        }
        window.addEventListener("mousemove", s), window.addEventListener("mouseup", u);
    }
    function qi(e, t, n) {
        t.disabled || (n(t.initialValue), t.onchange(n()));
    }
    function Wi(e, t, n, r) {
        if (!t.disabled && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
            e.preventDefault();
            const a = e.shiftKey ? t.shiftStep : t.step, o = Number((n() + (e.key === "ArrowUp" ? a : -a)).toFixed(t.precision));
            n(r(o)), t.onchange(n());
        }
    }
    function $i(e, t, n) {
        t.onchange(n());
    }
    function Yi(e, t, n) {
        t.onchange(n());
    }
    var Gi = A('<div><label class="svelte-1ivfuwj"><div class="label-content svelte-1ivfuwj"><button type="button" class="drag-handle svelte-1ivfuwj" aria-label="Drag to adjust value"> </button></div> <input type="range" class="svelte-1ivfuwj"/> <span class="value-display"> </span></label></div>');
    function Pn(e, t) {
        oe(t, !0);
        let n = Le(t, "value", 15), r = Le(t, "sensitivity", 3, .002);
        function a(v) {
            return Math.max(t.min, Math.min(t.max, v));
        }
        var o = Gi();
        let i;
        var s = k(o), u = k(s), l = k(u);
        l.__mousedown = [
            Bi,
            t,
            n,
            r,
            a
        ], l.__keydown = [
            Wi,
            t,
            n,
            a
        ], l.__dblclick = [
            qi,
            t,
            n
        ];
        var c = k(l), f = S(u, 2);
        f.__change = [
            $i,
            t,
            n
        ], f.__input = [
            Yi,
            t,
            n
        ];
        var d = S(f, 2), p = k(d);
        V((v, m)=>{
            i = Te(o, 1, "slider-group svelte-1ivfuwj", null, i, v), re(l, "tabindex", t.disabled ? -1 : 0), l.disabled = t.disabled, G(c, t.label), re(f, "min", t.min), re(f, "max", t.max), re(f, "step", t.step), re(f, "tabindex", t.disabled ? -1 : 0), f.disabled = t.disabled, G(p, m);
        }, [
            ()=>({
                    disabled: t.disabled
                }),
            ()=>n().toFixed(t.precision)
        ]), $a(f, n), g(e, o), ie();
    }
    Ze([
        "mousedown",
        "keydown",
        "dblclick",
        "change",
        "input"
    ]);
    const Ka = String.raw, Ur = Ka`\p{Emoji}(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?)`, Xi = ()=>new RegExp(Ka`\p{RI}{2}|(?![#*\d](?!\uFE0F?\u20E3))${Ur}(?:\u200D${Ur})*`, "gu");
    function Fn(e) {
        const t = e / 255;
        return t <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4);
    }
    const Ki = 100, Ji = 109, Zi = 2401, Qi = 2402, es = 2403, ts = 2404;
    function ns(e) {
        let t, n = typeof e.value;
        if (typeof e.value == "string") t = `String = ${JSON.stringify(e.value)}`;
        else if (typeof e.value == "number") t = `Value = ${e.value}`;
        else throw new Error(`Unsuported value type: ${n}`);
        return `{ ${e.id}, ${e.start}, ${e.endInclusive}, ${t} }`;
    }
    function rs(e) {
        let t = e.CLS.Styles.map(ns).join(`,
							`);
        return `{
 Tools = ordered() {
  Text1 = TextPlus {
   CtrlWZoom = false,
   Inputs = {
    GlobalOut = Input { Value = 122, },
    Width = Input { Value = 3840, },
    Height = Input { Value = 2160, },
    UseFrameFormatSettings = Input { Value = 1, },
    ["Gamut.SLogVersion"] = Input { Value = FuID { "SLog2" }, },
    Wrap = Input { Value = 1, },
    Center = Input { Value = { ${e.Text.Center.x}, ${e.Text.Center.y} }, },
    LayoutRotation = Input { Value = 1, },
    TransformRotation = Input { Value = 1, },
    Softness1 = Input { Value = 1, },
    StyledText = Input {
     SourceOp = "CharacterLevelStyling1",
     Source = "StyledText",
    },
    Font = Input { Value = "${e.Text.Font}", },
    Style = Input { Value = "${e.Text.Style}", },
    Size = Input { Value = ${e.Text.Size}, },
    VerticalTopCenterBottom = Input { Value = -1, },
    VerticalJustificationNew = Input { Value = 3, },
    HorizontalLeftCenterRight = Input { Value = -1, },
    HorizontalJustificationNew = Input { Value = 3, }
   },
   ViewInfo = OperatorInfo { Pos = { 99.3334, 45.5454 } },
  },
  CharacterLevelStyling1 = StyledTextCLS {
   CtrlWZoom = false,
   Inputs = {
    TransformRotation = Input { Value = 1, },
    Softness = Input { Value = 1, },
    Text = Input { Value = ${JSON.stringify(e.CLS.Text)} },
    CharacterLevelStyling = Input {
     Value = StyledText {
      Array = {
       ${t}
      }
     },
    }
   },
  },
  MediaOut1 = MediaOut {
   Inputs = {
    Index = Input { Value = "0", },
    Input = Input {
     SourceOp = "Text1",
     Source = "Output",
    }
   },
   ViewInfo = OperatorInfo { Pos = { 246.667, 44.6515 } },
  }
 }
}`;
    }
    function Dn(e, t) {
        return !(e.r !== t.r || e.g !== t.g || e.b !== t.b || e.a !== t.a || e.font !== t.font || e.style !== t.style);
    }
    function as(e, t) {
        let n = (l)=>{
            if (l.nodeType == Node.ELEMENT_NODE && l.tagName == "U") return !0;
            for (let c of l.childNodes)if (n(c)) return !0;
            return !1;
        }, r = n(e);
        r && console.log("🎯 Focus mode enabled (found <u> tags)");
        let a = {
            Text: {
                Font: "Berkeley Mono",
                Style: "Condensed",
                Size: t.Size,
                Center: {
                    x: t.CenterX,
                    y: t.CenterY
                }
            },
            CLS: {
                Text: "",
                Styles: []
            }
        }, o = {
            start: 0,
            style: {
                r: 0,
                g: 0,
                b: 0
            }
        }, i = 0, s = ()=>{
            let l = i;
            if (o.start != l) {
                console.log("💅 End of the old style:", o.style, "ran", o.start, "..", i);
                let { start: c, style: f } = o, d = l - 1;
                a.CLS.Styles.push({
                    id: Zi,
                    start: c,
                    endInclusive: d,
                    value: Fn(f.r)
                }), a.CLS.Styles.push({
                    id: Qi,
                    start: c,
                    endInclusive: d,
                    value: Fn(f.g)
                }), a.CLS.Styles.push({
                    id: es,
                    start: c,
                    endInclusive: d,
                    value: Fn(f.b)
                }), typeof f.a < "u" && a.CLS.Styles.push({
                    id: ts,
                    start: c,
                    endInclusive: d,
                    value: f.a
                }), typeof f.font < "u" && a.CLS.Styles.push({
                    id: Ki,
                    start: c,
                    endInclusive: d,
                    value: f.font
                }), typeof f.style < "u" && a.CLS.Styles.push({
                    id: Ji,
                    start: c,
                    endInclusive: d,
                    value: f.style
                });
            }
        };
        function u(l, c) {
            if (l.nodeType == Node.TEXT_NODE && l.nodeValue) {
                a.CLS.Text += l.nodeValue;
                let d = new Intl.Segmenter("en").segment(l.nodeValue), p = o.style;
                for (let v of d){
                    let m = [
                        ...v.segment
                    ].length, _ = p, C = "";
                    if (Xi().test(v.segment)) _ = structuredClone(_), _.font = "Noto Emoji", _.style = "Regular", C = "emoji";
                    else {
                        let b = !1, y = !1;
                        const E = v.segment.codePointAt(0);
                        E && ((E >= 57344 && E <= 63743 || E >= 983040 && E <= 1048573 || E >= 1048576 && E <= 1114109 || E >= 9984 && E <= 10175) && (b = !0), E >= 880 && E <= 1023 && (y = !0)), y ? (_ = structuredClone(_), _.font = "Apple Symbols", _.style = "Regular", C = "greek") : b && (_ = structuredClone(_), _.font = "Symbols Nerd Font", _.style = "Regular", C = "nerdfont");
                    }
                    if (C || m > 1 || !Dn(o.style, _)) {
                        const b = v.segment.codePointAt(0);
                        console.log(`[${i}] "${v.segment}" (${m} cp${m > 1 ? "s" : ""}) U+${b?.toString(16).toUpperCase().padStart(4, "0")} ` + (C ? `→ ${C}` : ""));
                    }
                    Dn(o.style, _) || (s(), o = {
                        start: i,
                        style: _
                    }), i += m;
                }
            } else if (l.nodeType == Node.ELEMENT_NODE) {
                let f = l;
                f.tagName == "U" && (c = !0);
                let d = f.computedStyleMap(), p = d.get("color")?.toString(), v = d.get("font-weight")?.toString(), m = {
                    r: 0,
                    g: 0,
                    b: 0
                };
                if (p) {
                    const _ = p.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
                    _ ? (m.r = parseInt(_[1], 10), m.g = parseInt(_[2], 10), m.b = parseInt(_[3], 10)) : console.warn(`Unhandled color format: ${p}`);
                } else console.warn("No computed color?");
                r && (c ? m.a = 1 : m.a = .2), v && v !== "normal" && (parseInt(v, 10) >= 600 || v === "bold") && (m.style = "Bold Condensed");
                for (let _ of l.childNodes)Dn(o.style, m) || (s(), o = {
                    start: i,
                    style: m
                }), u(_, c);
            }
        }
        return u(e, !1), s(), console.log(`Total codepoint count: ${i}`), console.log(a), rs(a);
    }
    const Ja = {
        a: {
            viewBox: "0 0 1024 1024",
            fill: "currentColor",
            "fill-rule": "evenodd"
        },
        c: '<path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"></path>'
    };
    Po();
    var os = Ra("<svg><!></svg>");
    ke = function(e, t) {
        oe(t, !1);
        let n = Le(t, "src", 8), r = Le(t, "size", 8, "1em"), a = Le(t, "viewBox", 24, ()=>{}), o = Le(t, "color", 8, "currentColor"), i = Le(t, "title", 24, ()=>{}), s = Le(t, "className", 8, ""), u = _t(), l = _t({});
        Ir(()=>(Nt(o()), Nt(n())), ()=>{
            F(l, {}), o() && (n().a.stroke !== "none" && Sr(l, h(l).stroke = "currentColor"), n().a.fill !== "none" && Sr(l, h(l).fill = "currentColor"));
        }), Ir(()=>(Nt(i()), Nt(n())), ()=>{
            F(u, (i() ? `<title>${i()}</title>` : "") + n().c);
        }), ti(), Ga();
        var c = os();
        qa(c, ()=>({
                width: r(),
                height: r(),
                viewBox: a(),
                style: o() ? "color: " + o() + ";" : "",
                "stroke-width": "0",
                class: s(),
                ...n().a,
                ...h(l),
                xmlns: "http://www.w3.org/2000/svg"
            }));
        var f = k(c);
        ja(f, ()=>h(u), !0), g(e, c), ie();
    };
    function is(e, t, n) {
        h(t) && F(n, h(t).innerHTML, !0);
    }
    var ss = ()=>document.execCommand("undo", !1), ls = A('<img alt="Amos Face Overlay" class="amos-face-overlay svelte-1lp8dgj"/>'), us = A('<div class="overlay svelte-1lp8dgj"><div class="editor-modal svelte-1lp8dgj"><div class="toolbar svelte-1lp8dgj"><button class="tool-button format-button svelte-1lp8dgj" title="Undo"><span>↩</span></button> <!> <!> <!> <button class="tool-button copy-button svelte-1lp8dgj"> </button> <button class="tool-button close-button svelte-1lp8dgj"><!></button></div> <code class="editor-container home-ansi scroll-wrapper svelte-1lp8dgj"><!> <div class="editor svelte-1lp8dgj" contenteditable="true" spellcheck="false"></div></code></div></div>');
    function cs(e, t) {
        oe(t, !0);
        const n = Gt("app:code-stuff-editor");
        let r = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]), { visible: a, onClose: o, rawHtml: i = "" } = r, s = q(ue(i)), u = q(null);
        const l = .035;
        let c = q(ue(localStorage.getItem("editorFontSize") ? parseFloat(localStorage.getItem("editorFontSize")) : l));
        const f = .055;
        let d = q(ue(localStorage.getItem("editorCenterX") ? parseFloat(localStorage.getItem("editorCenterX")) : f));
        const p = .866;
        let v = q(ue(localStorage.getItem("editorCenterY") ? parseFloat(localStorage.getItem("editorCenterY")) : p)), m = ()=>{
            localStorage.setItem("editorFontSize", h(c).toString()), localStorage.setItem("editorCenterX", h(d).toString()), localStorage.setItem("editorCenterY", h(v).toString());
        }, _ = q(null);
        mn(()=>{
            const I = document.querySelector('meta[name="amos-face"]');
            I && (F(u, I.getAttribute("content"), !0), n("Grabbed amos-face meta content:", h(u))), h(_) && i && (h(_).innerHTML = i, F(s, i, !0));
        });
        let C = q("Copy Fusion Graph"), b = null;
        yi(()=>{
            b && (clearTimeout(b), b = null);
        });
        async function y() {
            try {
                if (!h(_)) return;
                const I = as(h(_), {
                    CenterX: h(d),
                    CenterY: h(v),
                    Size: h(c)
                });
                await navigator.clipboard.writeText(I), F(C, "Copied!"), b && clearTimeout(b), b = setTimeout(()=>{
                    F(C, "Copy Fusion Graph"), b = null;
                }, 2e3);
            } catch (I) {
                console.error("Failed to copy to clipboard:", I), F(C, "Copy failed!"), b && clearTimeout(b), b = setTimeout(()=>{
                    F(C, "Copy Fusion Graph"), b = null;
                }, 2e3);
            }
        }
        function E(I) {
            if (n(`Keydown: ${I.code} (Meta: ${I.metaKey}, Ctrl: ${I.ctrlKey})`), I.code === "Escape") {
                o();
                return;
            }
            const M = window.getSelection(), P = h(_) && M && M.rangeCount > 0 && !M.isCollapsed && M.anchorNode && h(_).contains(M.anchorNode) && M.focusNode && h(_).contains(M.focusNode);
            if (I.code === "Space") {
                P ? (n(`Space pressed with selection: "${M.toString()}"`), I.preventDefault(), document.execCommand("underline", !1), M.removeAllRanges(), h(_) && F(s, h(_).innerHTML, !0), n("Underline applied, selection cleared, content updated.")) : n("Space pressed, no active selection in editor. Default behavior.");
                return;
            }
            if ((I.metaKey || I.ctrlKey) && I.code === "KeyA") {
                if (n("Cmd/Ctrl+A pressed."), I.preventDefault(), h(_)) {
                    const R = document.createElement("div");
                    R.innerHTML = h(_).innerHTML;
                    const U = R.querySelectorAll("u");
                    U.length > 0 ? (n(`Removing ${U.length} underlines.`), U.forEach((O)=>O.replaceWith(...O.childNodes)), h(_).innerHTML = R.innerHTML, F(s, h(_).innerHTML, !0), n("Underlines cleared, content updated.")) : n("No underlines found to clear.");
                }
                return;
            }
        }
        var x = W();
        un("keydown", sn, E);
        var T = N(x);
        {
            var w = (I)=>{
                var M = us(), P = k(M), R = k(P), U = k(R);
                U.__click = [
                    ss
                ];
                var O = S(U, 2);
                Pn(O, {
                    label: "Font Size",
                    initialValue: l,
                    min: .01,
                    max: .06,
                    step: .001,
                    shiftStep: .005,
                    precision: 3,
                    sensitivity: 25e-5,
                    onchange: ()=>m(),
                    get value () {
                        return h(c);
                    },
                    set value (ee){
                        F(c, ee, !0);
                    }
                });
                var B = S(O, 2);
                Pn(B, {
                    label: "Center X",
                    initialValue: f,
                    min: 0,
                    max: 1,
                    step: .001,
                    shiftStep: .01,
                    precision: 3,
                    onchange: ()=>m(),
                    get value () {
                        return h(d);
                    },
                    set value (ee){
                        F(d, ee, !0);
                    }
                });
                var D = S(B, 2);
                Pn(D, {
                    label: "Center Y",
                    initialValue: p,
                    min: 0,
                    max: 1,
                    step: .001,
                    shiftStep: .01,
                    precision: 3,
                    onchange: ()=>m(),
                    get value () {
                        return h(v);
                    },
                    set value (ee){
                        F(v, ee, !0);
                    }
                });
                var z = S(D, 2);
                z.__click = y;
                var j = k(z), H = S(z, 2);
                H.__click = o;
                var J = k(H);
                ke(J, {
                    get src () {
                        return Ja;
                    }
                });
                var K = S(R, 2), Z = k(K);
                {
                    var he = (ee)=>{
                        var le = ls();
                        V(()=>re(le, "src", h(u))), g(ee, le);
                    };
                    L(Z, (ee)=>{
                        h(u) && ee(he);
                    });
                }
                var se = S(Z, 2);
                se.__input = [
                    is,
                    _,
                    s
                ], Ya(se, (ee)=>F(_, ee), ()=>h(_)), V(()=>{
                    G(j, h(C)), vr(se, `padding-left: calc(${h(d) ?? ""} * 1280px); padding-top: calc((1 - ${h(v) ?? ""}) * 720px); font-size: calc(${h(c) ?? ""} * 850px);`);
                }), g(I, M);
            };
            L(T, (I)=>{
                a && I(w);
            });
        }
        g(e, x), ie();
    }
    Ze([
        "click",
        "input"
    ]);
    Gt("app:fusion");
    function fs() {
        console.log("Rendering composition editor");
        let e = document.querySelectorAll("figure");
        console.log("Found", e.length, "figures");
        for(let t = 0; t < e.length; t++){
            let n = e[t], r = n.querySelector("code.scroll-wrapper");
            if (!r) continue;
            const a = r.innerHTML;
            n.onclick = null;
            let o = n.querySelector("button[data-code-stuff-edit]");
            o && o.remove();
            const i = document.createElement("div");
            i.style.display = "none", document.body.appendChild(i);
            let s = document.createElement("button");
            s.textContent = "⌘", s.style.marginTop = "1em", s.setAttribute("data-code-stuff-edit", "1"), s.onclick = (u)=>{
                u.stopPropagation();
                const l = fr(cs, {
                    target: i,
                    props: {
                        visible: !0,
                        rawHtml: a,
                        onClose: ()=>{
                            gi(l), document.body.contains(i) && (i.style.display = "none");
                        }
                    }
                });
                i.style.display = "block";
            }, s.style.position = "absolute", s.style.right = ".6em", s.style.top = "0", s.style.zIndex = "100", n.prepend(s);
        }
    }
    let ds, vs, hs, Hr, ps, Br, _s;
    ut = {
        a: {
            viewBox: "0 0 496 512"
        },
        c: '<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>'
    };
    ds = {
        a: {
            viewBox: "0 0 448 512"
        },
        c: '<path d="M439.55 236.05L244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z"></path>'
    };
    vs = {
        a: {
            viewBox: "0 0 576 512"
        },
        c: '<path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>'
    };
    Ke = {
        a: {
            viewBox: "0 0 512 512"
        },
        c: '<path d="M489.7 153.8c-.1-65.4-51-119-110.7-138.3C304.8-8.5 207-5 136.1 28.4C50.3 68.9 23.3 157.7 22.3 246.2C21.5 319 28.7 510.6 136.9 512c80.3 1 92.3-102.5 129.5-152.3c26.4-35.5 60.5-45.5 102.4-55.9c72-17.8 121.1-74.7 121-150z"></path>'
    };
    Et = {
        a: {
            viewBox: "0 0 640 512"
        },
        c: '<path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>'
    };
    hs = {
        a: {
            viewBox: "0 0 448 512"
        },
        c: '<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>'
    };
    Hr = {
        a: {
            viewBox: "0 0 448 512"
        },
        c: '<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>'
    };
    ps = {
        a: {
            viewBox: "0 0 512 512"
        },
        c: '<path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"></path>'
    };
    Br = {
        a: {
            viewBox: "0 0 384 512"
        },
        c: '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>'
    };
    _s = {
        a: {
            viewBox: "0 0 512 512"
        },
        c: '<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>'
    };
    var gs = A('<div class="spinner svelte-1lku2ri"><div class="dot svelte-1lku2ri"></div> <div class="dot svelte-1lku2ri"></div> <div class="dot svelte-1lku2ri"></div></div>');
    function ms(e, t) {
        let n = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]), { size: r = "0.5rem", color: a = "var(--text-muted, #666)" } = n;
        var o = gs();
        V(()=>vr(o, `--dot-size: ${r ?? ""}; --dot-color: ${a ?? ""}`)), g(e, o);
    }
    var ys = A('<span class="label svelte-64wfvc"> </span>'), bs = A('<div class="spinner-overlay svelte-64wfvc"><!></div>'), ws = A("<a><div><!> <!></div> <!></a>");
    function te(e, t) {
        oe(t, !0);
        let n = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy",
            "icon",
            "disabled",
            "loading",
            "secondary",
            "inlineflex",
            "onclick",
            "label"
        ]);
        var r = ws(), a = (p)=>{
            t.disabled || t.onclick?.(p);
        };
        qa(r, (p)=>({
                ...n,
                role: "button",
                tabindex: t.disabled ? -1 : 0,
                onclick: a,
                [pt]: p
            }), [
            ()=>({
                    loading: t.loading,
                    disabled: t.disabled,
                    secondary: t.secondary,
                    inlineflex: t.inlineflex,
                    nolabel: !t.label
                })
        ], void 0, "svelte-64wfvc");
        var o = k(r);
        let i;
        var s = k(o);
        {
            var u = (p)=>{
                ke(p, {
                    size: "1em",
                    get src () {
                        return t.icon;
                    }
                });
            };
            L(s, (p)=>{
                t.icon && p(u);
            });
        }
        var l = S(s, 2);
        {
            var c = (p)=>{
                var v = ys(), m = k(v);
                V(()=>G(m, t.label)), g(p, v);
            };
            L(l, (p)=>{
                t.label && p(c);
            });
        }
        var f = S(o, 2);
        {
            var d = (p)=>{
                var v = bs(), m = k(v);
                ms(m, {
                    size: "0.4em",
                    color: "#efefef"
                }), g(p, v);
            };
            L(f, (p)=>{
                t.loading && p(d);
            });
        }
        V((p)=>i = Te(o, 1, "content svelte-64wfvc", null, i, p), [
            ()=>({
                    loading: t.loading
                })
        ]), g(e, r), ie();
    }
    const Cs = {
        a: {
            viewBox: "0 0 24 24"
        },
        c: '<path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>'
    }, ks = {
        a: {
            viewBox: "0 0 24 24"
        },
        c: '<path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>'
    }, Es = {
        a: {
            viewBox: "0 0 24 24"
        },
        c: '<path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path>'
    };
    Ss = function(e) {
        return e.avatar_hash ? `https://cdn.discordapp.com/avatars/${e.id}/${e.avatar_hash}.png` : null;
    };
    function pr() {
        return encodeURIComponent(location.pathname.slice(1) + location.search);
    }
    function Nn(e) {
        location.href = `/login/${e}/unlink?return_to=${pr()}`;
    }
    function yt(e, t) {
        const n = t?.returnTo ?? pr();
        location.href = `/login/${e}?return_to=${n}`;
    }
    function xs(e, t) {
        let n = 0, r = null;
        return (...a)=>{
            const o = Date.now(), i = t - (o - n);
            i <= 0 ? (r && (clearTimeout(r), r = null), n = o, e(...a)) : r || (r = setTimeout(()=>{
                n = Date.now(), r = null, e(...a);
            }, i));
        };
    }
    const fn = "https://github.com/sponsors/fasterthanlime", en = "https://patreon.com/fasterthanlime", Ts = "https://www.patreon.com/settings/memberships", Is = "/discord", As = "https://tube.fasterthanli.me";
    function $n(e) {
        if (e) {
            if (e.has_gold) return "gold";
            if (e.has_silver) return "silver";
            if (e.has_bronze) return "bronze";
        }
    }
    const Za = [
        {
            id: "bonus-content",
            icon: ds,
            text: "Access to bonus content (Rust codebases etc.)",
            tier: "bronze",
            color: "#f14e32"
        },
        {
            id: "discord-access",
            icon: Et,
            text: "Access to private Discord channels",
            tier: "bronze",
            color: "#5865F2"
        }
    ], Yn = [
        {
            id: "early-access",
            icon: ps,
            text: "Early access to videos and articles",
            tier: "silver",
            color: "#32CD32"
        },
        {
            id: "credits",
            icon: vs,
            text: "Name credited in videos and articles",
            tier: "silver",
            color: "#FF0000"
        }
    ], Gn = [
        {
            id: "gratitude",
            icon: _s,
            text: "My eternal gratitude",
            tier: "gold",
            color: "#32AA88"
        }
    ], Ms = [
        {
            name: "bronze",
            badge: "bronze-badge",
            perks: [
                ...Za
            ]
        },
        {
            name: "silver",
            badge: "silver-badge",
            perks: [
                ...Yn
            ],
            highlighted: !0
        },
        {
            name: "gold",
            badge: "gold-badge",
            perks: [
                ...Gn
            ]
        }
    ], X = ue({
        viewer: (()=>{
            const e = new URLSearchParams(window.location.search), t = {
                ...window.home.viewer
            };
            return e.has("has_bronze") && (t.has_bronze = !0, t.tier_cause = "cheating"), e.has("has_silver") && (t.has_bronze = !0, t.has_silver = !0, t.tier_cause = "cheating"), e.has("has_gold") && (t.has_bronze = !0, t.has_silver = !0, t.has_gold = !0, t.tier_cause = "cheating"), t;
        })(),
        profile: window.home.profile,
        user_info: window.home.user_info
    });
    var Ls = A('<img alt="GitHub avatar" class="avatar svelte-1cljn7s"/>'), Ps = A('<div class="privacy-level svelte-1cljn7s"> </div>'), Fs = A('<div class="sponsorship-amount svelte-1cljn7s"> </div> <!>', 1), Ds = A('<div class="not-sponsor svelte-1cljn7s">Not a sponsor</div>'), Ns = A('<div class="account-info svelte-1cljn7s"><!> <div class="account-details svelte-1cljn7s"><div class="account-name svelte-1cljn7s"> </div> <!></div> <!></div>'), Rs = A('<div class="button-group svelte-1cljn7s"><!></div>'), Os = A('<img alt="Patreon avatar" class="avatar svelte-1cljn7s"/>'), zs = A('<div class="tier svelte-1cljn7s"> </div> <div class="manage-subscription"><a href="https://www.patreon.com/fasterthanlime" target="_blank">Manage your subscription</a></div>', 1), js = A('<div class="not-sponsor svelte-1cljn7s"><div class="not-sponsor svelte-1cljn7s">Not a patron</div></div>'), Vs = A('<div class="account-info svelte-1cljn7s"><!> <div class="account-details svelte-1cljn7s"><div class="account-name svelte-1cljn7s"> </div> <!></div> <!></div>'), Us = A('<div class="button-group svelte-1cljn7s"><!></div>'), Hs = A('<img alt="Discord avatar" class="avatar svelte-1cljn7s"/>'), Bs = A('<div class="account-info svelte-1cljn7s"><!> <div class="account-details svelte-1cljn7s"><div class="account-name svelte-1cljn7s"> </div> <div class="bot-status svelte-1cljn7s">The bot has noticed you.</div></div> <!> <!></div>'), qs = A('<div class="button-group svelte-1cljn7s"><!> <!></div>'), Ws = A('<div class="connected-accounts svelte-1cljn7s"><div class="account-section"><!></div> <div class="account-section"><!></div> <div class="account-section"><!></div></div>');
    function $s(e, t) {
        oe(t, !0);
        let n = Q(()=>X.user_info), r = q(!1), a = q(!1), o = q(!1), i = q(!1), s = q(!1), u = q(!1);
        var l = Ws(), c = k(l), f = k(c);
        {
            var d = (T)=>{
                var w = Ns(), I = k(w);
                {
                    var M = (j)=>{
                        var H = Ls();
                        V(()=>re(H, "src", h(n).github.avatar_url)), g(j, H);
                    };
                    L(I, (j)=>{
                        h(n).github.avatar_url && j(M);
                    });
                }
                var P = S(I, 2), R = k(P), U = k(R), O = S(R, 2);
                {
                    var B = (j)=>{
                        var H = Fs(), J = N(H), K = k(J), Z = S(J, 2);
                        {
                            var he = (se)=>{
                                var ee = Ps(), le = k(ee);
                                V(()=>G(le, `Privacy: ${h(n).github.sponsorship_privacy_level ?? ""}`)), g(se, ee);
                            };
                            L(Z, (se)=>{
                                h(n).github.sponsorship_privacy_level && se(he);
                            });
                        }
                        V(()=>G(K, `$${h(n).github.monthly_usd ?? ""}/month`)), g(j, H);
                    }, D = (j)=>{
                        var H = Ds();
                        g(j, H);
                    };
                    L(O, (j)=>{
                        h(n).github.monthly_usd ? j(B) : j(D, !1);
                    });
                }
                var z = S(P, 2);
                te(z, {
                    label: "Unlink GitHub",
                    onclick: ()=>{
                        F(i, !0), Nn("github");
                    },
                    get icon () {
                        return ut;
                    },
                    secondary: !0,
                    get loading () {
                        return h(i);
                    }
                }), V(()=>G(U, `${(h(n).github.name || h(n).github.login) ?? ""} (@${h(n).github.login ?? ""})`)), g(T, w);
            }, p = (T)=>{
                var w = Rs(), I = k(w);
                te(I, {
                    label: "Link your GitHub",
                    onclick: ()=>{
                        F(r, !0), yt("github");
                    },
                    get icon () {
                        return ut;
                    },
                    get loading () {
                        return h(r);
                    }
                }), g(T, w);
            };
            L(f, (T)=>{
                h(n)?.github ? T(d) : T(p, !1);
            });
        }
        var v = S(c, 2), m = k(v);
        {
            var _ = (T)=>{
                var w = Vs(), I = k(w);
                {
                    var M = (j)=>{
                        var H = Os();
                        V(()=>re(H, "src", h(n).patreon.avatar_url)), g(j, H);
                    };
                    L(I, (j)=>{
                        h(n).patreon.avatar_url && j(M);
                    });
                }
                var P = S(I, 2), R = k(P), U = k(R), O = S(R, 2);
                {
                    var B = (j)=>{
                        var H = zs(), J = N(H), K = k(J);
                        V(()=>G(K, `Tier: ${h(n).patreon.tier ?? ""}`)), g(j, H);
                    }, D = (j)=>{
                        var H = js();
                        g(j, H);
                    };
                    L(O, (j)=>{
                        h(n).patreon.tier && h(n).patreon.tier !== "Free" ? j(B) : j(D, !1);
                    });
                }
                var z = S(P, 2);
                te(z, {
                    label: "Unlink Patreon",
                    onclick: ()=>{
                        F(s, !0), Nn("patreon");
                    },
                    get icon () {
                        return Ke;
                    },
                    secondary: !0,
                    get loading () {
                        return h(s);
                    }
                }), V(()=>G(U, h(n).patreon.full_name)), g(T, w);
            }, C = (T)=>{
                var w = Us(), I = k(w);
                te(I, {
                    label: "Link your Patreon",
                    onclick: ()=>{
                        F(a, !0), yt("patreon");
                    },
                    get icon () {
                        return Ke;
                    },
                    get loading () {
                        return h(a);
                    }
                }), g(T, w);
            };
            L(m, (T)=>{
                h(n)?.patreon ? T(_) : T(C, !1);
            });
        }
        var b = S(v, 2), y = k(b);
        {
            var E = (T)=>{
                var w = Bs(), I = k(w);
                {
                    var M = (D)=>{
                        var z = Hs();
                        V(()=>re(z, "src", `https://cdn.discordapp.com/avatars/${h(n).discord.id}/${h(n).discord.avatar_hash}.png`)), g(D, z);
                    };
                    L(I, (D)=>{
                        h(n).discord.avatar_hash && D(M);
                    });
                }
                var P = S(I, 2), R = k(P), U = k(R), O = S(P, 2);
                te(O, {
                    label: "Join the server",
                    href: "/discord",
                    target: "_blank"
                });
                var B = S(O, 2);
                te(B, {
                    label: "Unlink Discord",
                    onclick: ()=>{
                        F(u, !0), Nn("discord");
                    },
                    get icon () {
                        return Et;
                    },
                    secondary: !0,
                    get loading () {
                        return h(u);
                    }
                }), V(()=>G(U, `${(h(n).discord.global_name || h(n).discord.username) ?? ""} (@${h(n).discord.username ?? ""})`)), g(T, w);
            }, x = (T)=>{
                var w = qs(), I = k(w);
                te(I, {
                    label: "Link your Discord",
                    onclick: ()=>{
                        F(o, !0), yt("discord");
                    },
                    get icon () {
                        return Et;
                    },
                    get loading () {
                        return h(o);
                    }
                });
                var M = S(I, 2);
                te(M, {
                    label: "Join the server",
                    href: "/discord",
                    target: "_blank",
                    secondary: !0
                }), g(T, w);
            };
            L(y, (T)=>{
                h(n)?.discord ? T(E) : T(x, !1);
            });
        }
        g(e, l), ie();
    }
    const Ys = (e, t)=>{
        e.target.classList.contains("modal") && t();
    };
    var Gs = (e, t)=>{
        e.preventDefault(), t();
    }, Xs = A('<div class="modal svelte-vbnrse" role="presentation"><div class="modal-content svelte-vbnrse"><div class="button-row svelte-vbnrse"><span tabindex="0" title="Close modal" role="button" class="svelte-vbnrse"><div class="icon svelte-vbnrse"><!></div></span></div> <!></div></div>');
    _r = function(e, t) {
        oe(t, !0);
        const n = ()=>{
            t.onclose();
        }, r = (s)=>{
            s.code === "Escape" && n();
        };
        var a = W();
        un("keydown", sn, r);
        var o = N(a);
        {
            var i = (s)=>{
                var u = Xs();
                u.__click = [
                    Ys,
                    n
                ], u.__keydown = r;
                var l = k(u), c = k(l), f = k(c);
                f.__click = n, f.__keydown = [
                    Gs,
                    n
                ];
                var d = k(f), p = k(d);
                ke(p, {
                    get src () {
                        return Ja;
                    }
                });
                var v = S(c, 2);
                mi(v, ()=>t.children ?? ea), g(s, u);
            };
            L(o, (s)=>{
                t.visible && s(i);
            });
        }
        g(e, a), ie();
    };
    Ze([
        "click",
        "keydown"
    ]);
    const Jt = {
        get: function(e) {
            if (typeof document > "u" || arguments.length && !e) return;
            const t = document?.cookie?.split("; ") ?? [], n = {};
            for (const r of t){
                const a = r.split("="), o = decodeURIComponent(a.slice(1).join("=")), i = decodeURIComponent(a[0]);
                if (i in n || (n[i] = o), e === i) break;
            }
            return e ? n[e] : n;
        },
        set: function(...e) {
            const [t, n, r] = e, a = e.length;
            let o = {
                name: "",
                value: ""
            };
            a === 1 ? o = t : a === 2 ? o = {
                name: t,
                value: n
            } : o = {
                name: t,
                value: n,
                ...r
            };
            const { name: i, value: s, path: u = "/", domain: l, sameSite: c, secure: f, expires: d, httpOnly: p, partitioned: v, priority: m } = o;
            if (!i || typeof document > "u") return !1;
            let _ = "";
            if (d) switch(d.constructor){
                case Number:
                    _ = d === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + d;
                    break;
                case String:
                    _ = "; expires=" + d;
                    break;
                case Date:
                    _ = "; expires=" + d.toUTCString();
                    break;
            }
            document.cookie = encodeURIComponent(i) + "=" + encodeURIComponent(s) + _ + (l ? "; domain=" + l : "") + (u ? "; path=" + u : "") + (f ? "; secure" : "") + (c ? typeof c == "boolean" ? "; samesite=Strict" : "; samesite=" + c : "") + (m ? "; priority=" + m : "") + (p ? "; httponly" : "") + (v ? "; partitioned" : "");
        },
        remove: function(e, t, n) {
            this.set(e, "", {
                path: t,
                domain: n,
                expires: -1
            });
        },
        has: function(e) {
            return !!this.get(e);
        },
        keys: function() {
            return Object.keys(this.get());
        }
    }, tn = new BroadcastChannel("reload-sync");
    function Ks() {
        if (tn.onmessage = (e)=>{
            console.log(`Received event ${e.data}, reloading`), window.location.reload();
        }, Jt.get("just_logged_in")) {
            Jt.remove("just_logged_in", "/"), tn.postMessage("just-logged-in");
            const e = document.querySelector(".gentle-nudge-island");
            e && e.dataset.context === "playwall" && e.scrollIntoView({
                behavior: "smooth"
            });
        }
        Jt.get("just_logged_out") && (Jt.remove("just_logged_out", "/"), tn.postMessage("just-logged-out"));
    }
    function Js(e) {
        tn.postMessage(e);
    }
    var Zs = A("<p> </p>"), Qs = A("<!> <!> <!>", 1);
    function gr(e, t) {
        oe(t, !0);
        let n = [
            "Refresh"
        ], r = ()=>n[Math.floor(Math.random() * n.length)], a = q(ue(r())), o = q(!1), i = q(null), s = q(!1), u = async ()=>{
            F(o, !0), F(i, null), F(s, !1);
            try {
                let v = new Date;
                await fetch("/api/refresh-userinfo", {
                    method: "POST",
                    credentials: "include"
                }).then(async (m)=>{
                    let _ = await m.json();
                    console.log("Refreshed bundle", _);
                    let C = $n(X.viewer), b = $n(_.viewer);
                    X.profile = _.profile, X.user_info = _.user_info, X.viewer = _.viewer, X.last_checked = v, F(a, r(), !0), b !== C && (console.log("Tier changed: new one is ", b), Js("viewer-upgraded"), t.onUpgrade && t.onUpgrade());
                });
            } catch (v) {
                console.error("While refreshing user info", v), F(i, `Well something went wrong: ${v}`), F(s, !0);
            } finally{
                F(o, !1);
            }
        };
        var l = Qs(), c = N(l);
        te(c, {
            get label () {
                return h(a);
            },
            get loading () {
                return h(o);
            },
            get disabled () {
                return h(o);
            },
            get icon () {
                return Cs;
            },
            inlineflex: !0,
            secondary: !0,
            onclick: u
        });
        var f = S(c, 2);
        {
            var d = (v)=>{
                var m = fe();
                V((_)=>G(m, `  — last checked ${_ ?? ""}`), [
                    ()=>X.last_checked.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                        })
                ]), g(v, m);
            };
            L(f, (v)=>{
                X.last_checked && v(d);
            });
        }
        var p = S(f, 2);
        _r(p, {
            get visible () {
                return h(s);
            },
            onclose: ()=>F(s, !1),
            children: (v, m)=>{
                var _ = W(), C = N(_);
                {
                    var b = (y)=>{
                        var E = Zs(), x = k(E);
                        V(()=>G(x, h(i))), g(y, E);
                    };
                    L(C, (y)=>{
                        h(i) && y(b);
                    });
                }
                g(v, _);
            },
            $$slots: {
                default: !0
            }
        }), g(e, l), ie();
    }
    var el = A('<div class="login-container svelte-1ozk0qh"><div class="button-container svelte-1ozk0qh"><!> <!></div></div>');
    function He(e, t) {
        oe(t, !0);
        let n = q(!1), r = q(!1), a = !1, o = ()=>{
            F(n, !0), yt("github", {
                returnTo: t.returnTo
            });
        }, i = ()=>{
            F(r, !0), yt("patreon", {
                returnTo: t.returnTo
            });
        }, s = Q(()=>h(n) || h(r) || a);
        var u = el(), l = k(u), c = k(l);
        te(c, {
            get icon () {
                return ut;
            },
            label: "Log in with GitHub",
            onclick: o,
            get loading () {
                return h(n);
            },
            get disabled () {
                return h(s);
            }
        });
        var f = S(c, 2);
        te(f, {
            get icon () {
                return Ke;
            },
            label: "Log in with Patreon",
            secondary: !0,
            onclick: i,
            get loading () {
                return h(r);
            },
            get disabled () {
                return h(s);
            }
        }), g(e, u), ie();
    }
    function Xn(e, t) {
        oe(t, !0);
        var n = W(), r = N(n);
        {
            var a = (i)=>{
                te(i, {
                    get href () {
                        return fn;
                    },
                    get icon () {
                        return ut;
                    },
                    label: "Manage sponsorship",
                    target: "_blank",
                    inlineflex: !0
                });
            }, o = (i)=>{
                var s = W(), u = N(s);
                {
                    var l = (c)=>{
                        te(c, {
                            get href () {
                                return Ts;
                            },
                            get icon () {
                                return Ke;
                            },
                            label: "Manage membership",
                            target: "_blank",
                            inlineflex: !0
                        });
                    };
                    L(u, (c)=>{
                        t.userInfo.patreon && c(l);
                    }, !0);
                }
                g(i, s);
            };
            L(r, (i)=>{
                t.userInfo.github ? i(a) : i(o, !1);
            });
        }
        g(e, n), ie();
    }
    var tl = A("<div> </div>");
    function Ht(e, t) {
        const n = {
            bronze: "Bronze Tier",
            silver: "Silver Tier",
            gold: "Gold Tier"
        };
        var r = tl(), a = k(r);
        V(()=>{
            Te(r, 1, `badge ${t.tier ?? ""}-badge`, "svelte-1bx227o"), G(a, n[t.tier]);
        }), g(e, r);
    }
    var nl = A("<h3>So close!</h3> <p>You're logged in with <!> but you're not yet sponsoring.</p>", 1), rl = A("<h3> </h3>"), al = A('<li class="inherited-perks svelte-1n8echp">All perks from other tiers, plus:</li>'), ol = A("<li><!> </li>"), il = A('<tr><td class="svelte-1n8echp"><!></td><td class="svelte-1n8echp"><ul class="perks-list svelte-1n8echp"><!> <!></ul></td></tr>'), sl = A('<div class="separator svelte-1n8echp">or</div> <!>', 1), ll = A("<!> <!>", 1), ul = A("<!> <!>", 1), cl = A('<div class="cta-buttons svelte-1n8echp"><!></div>'), fl = A('<div class="supporter-section"><!> <p>If you can, consider supporting this work at a tier you can afford:</p> <div class="tiers-section svelte-1n8echp"><table class="tiers-table svelte-1n8echp"><tbody></tbody></table></div> <!></div>');
    function Kn(e) {
        let { user_info: t, profile: n } = X, r = [
            "Your support makes all the difference",
            "We could not do this without you",
            "Individual sponsors keep this thing going",
            "I share cat pictures in the #gold channel on Discord",
            "Help us test our Github/Patreon/Discord integration",
            "A small donation can make a big difference",
            "Give the gift of knowledge... to everyone",
            "Just imagine Jimmy Wales' head is here somewhere",
            "Want more? Donations help out a lot.",
            "We're a small operation that cares a lot",
            "There is no ethical Patreon sub under capitalism",
            "Here's the deal",
            "Okay, hear me out:",
            "It's people like you who keep us going"
        ], a = ue(r[Math.floor(Math.random() * r.length)]);
        var o = fl(), i = k(o);
        {
            var s = (v)=>{
                var m = nl(), _ = S(N(m), 2), C = S(k(_));
                {
                    var b = (E)=>{
                        var x = fe("GitHub and Patreon");
                        g(E, x);
                    }, y = (E)=>{
                        var x = W(), T = N(x);
                        {
                            var w = (M)=>{
                                var P = fe("GitHub");
                                g(M, P);
                            }, I = (M)=>{
                                var P = W(), R = N(P);
                                {
                                    var U = (O)=>{
                                        var B = fe("Patreon");
                                        g(O, B);
                                    };
                                    L(R, (O)=>{
                                        t?.patreon && O(U);
                                    }, !0);
                                }
                                g(M, P);
                            };
                            L(T, (M)=>{
                                t?.github ? M(w) : M(I, !1);
                            }, !0);
                        }
                        g(E, x);
                    };
                    L(C, (E)=>{
                        t?.github && t?.patreon ? E(b) : E(y, !1);
                    });
                }
                g(v, m);
            }, u = (v)=>{
                var m = rl(), _ = k(m);
                V(()=>G(_, a)), g(v, m);
            };
            L(i, (v)=>{
                n ? v(s) : v(u, !1);
            });
        }
        var l = S(i, 4), c = k(l), f = k(c);
        Ne(f, 21, ()=>Ms, De, (v, m, _)=>{
            var C = il();
            let b;
            var y = k(C), E = k(y);
            Ht(E, {
                get tier () {
                    return h(m).name;
                }
            });
            var x = S(y), T = k(x), w = k(T);
            {
                var I = (P)=>{
                    var R = al();
                    g(P, R);
                };
                L(w, (P)=>{
                    _ > 0 && P(I);
                });
            }
            var M = S(w, 2);
            Ne(M, 17, ()=>h(m).perks, De, (P, R)=>{
                var U = ol();
                let O;
                var B = k(U);
                {
                    let z = Q(()=>h(R).color ?? "inherit");
                    ke(B, {
                        get src () {
                            return h(R).icon;
                        },
                        get color () {
                            return h(z);
                        },
                        size: "1.25em"
                    });
                }
                var D = S(B);
                V((z)=>{
                    O = Te(U, 1, "svelte-1n8echp", null, O, z), G(D, ` ${h(R).text ?? ""}`);
                }, [
                    ()=>({
                            new: h(R).new
                        })
                ]), g(P, U);
            }), V((P)=>b = Te(C, 1, "", null, b, P), [
                ()=>({
                        highlighted: h(m).highlighted
                    })
            ]), g(v, C);
        });
        var d = S(l, 2);
        {
            var p = (v)=>{
                var m = cl(), _ = k(m);
                {
                    var C = (y)=>{
                        var E = ll(), x = N(E);
                        te(x, {
                            get href () {
                                return fn;
                            },
                            get icon () {
                                return ut;
                            },
                            label: "Sponsor me on GitHub"
                        });
                        var T = S(x, 2);
                        {
                            var w = (I)=>{
                                var M = sl(), P = S(N(M), 2);
                                te(P, {
                                    get href () {
                                        return en;
                                    },
                                    get icon () {
                                        return Ke;
                                    },
                                    label: "Become a Patron",
                                    secondary: !0
                                }), g(I, M);
                            };
                            L(T, (I)=>{
                                t.patreon && I(w);
                            });
                        }
                        g(y, E);
                    }, b = (y)=>{
                        var E = W(), x = N(E);
                        {
                            var T = (I)=>{
                                te(I, {
                                    get href () {
                                        return en;
                                    },
                                    get icon () {
                                        return Ke;
                                    },
                                    label: "Become a Patron"
                                });
                            }, w = (I)=>{
                                var M = ul(), P = N(M);
                                te(P, {
                                    get href () {
                                        return fn;
                                    },
                                    get icon () {
                                        return ut;
                                    },
                                    label: "Sponsor via GitHub"
                                });
                                var R = S(P, 2);
                                te(R, {
                                    get href () {
                                        return en;
                                    },
                                    get icon () {
                                        return Ke;
                                    },
                                    label: "Support via Patreon",
                                    secondary: !0
                                }), g(I, M);
                            };
                            L(x, (I)=>{
                                t.patreon ? I(T) : I(w, !1);
                            }, !0);
                        }
                        g(y, E);
                    };
                    L(_, (y)=>{
                        t.github ? y(C) : y(b, !1);
                    });
                }
                g(v, m);
            };
            L(d, (v)=>{
                t && v(p);
            });
        }
        g(e, o);
    }
    var dl = A('<div class="copy-field svelte-q5y6aw"><input type="text" readonly="" class="svelte-q5y6aw"/> <!></div>');
    function Qa(e, t) {
        let n = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]), { text: r, label: a } = n, o = q(!1);
        const i = async ()=>{
            try {
                await navigator.clipboard.writeText(r), F(o, !0), setTimeout(()=>{
                    F(o, !1);
                }, 2e3);
            } catch (c) {
                console.error("Failed to copy:", c);
            }
        };
        var s = dl(), u = k(s), l = S(u, 2);
        {
            let c = Q(()=>h(o) ? "Copied!" : a || "Copy");
            te(l, {
                get label () {
                    return h(c);
                },
                get icon () {
                    return ks;
                },
                onclick: i
            });
        }
        V(()=>Ti(u, r)), g(e, s);
    }
    var vl = A('<div class="loading svelte-h4mmgg"><p>Generating API key...</p></div>'), hl = A('<div class="error svelte-h4mmgg"><p> </p> <button class="svelte-h4mmgg">Retry</button></div>'), pl = A(`<div class="feed-url"><p><span class="center-middle svelte-h4mmgg"><!> Here's your private RSS feed URL:</span></p> <!></div>`);
    function _l(e, t) {
        oe(t, !1);
        let n = _t(!0), r = "", a = _t(""), o = _t("");
        async function i() {
            F(n, !0), F(o, "");
            const f = new URLSearchParams(window.location.search);
            let d = "";
            f.has("admin_means_silver") ? d = "?admin_means_silver=1" : f.has("admin_means_bronze") && (d = "?admin_means_bronze=1"), fetch(`/api/make-api-key${d}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin"
            }).then(async (p)=>{
                if (console.log("Status:", p.status), !p.ok) {
                    const v = await p.text();
                    throw new Error(`HTTP ${p.status}: ${v}`);
                }
                return p.json();
            }).then((p)=>{
                let v = p;
                if (console.log("Response:", v), v.api_key) {
                    r = v.api_key;
                    const m = window.location.protocol, _ = window.location.hostname, C = window.location.port ? `:${window.location.port}` : "";
                    F(a, `${m}//${_}${C}/index.xml?api_key=${r}`), console.log("Feed URL:", h(a));
                }
                F(n, !1);
            }).catch((p)=>{
                console.error("Error:", p), F(o, p.message), F(n, !1);
            });
        }
        i(), Ga();
        var s = W(), u = N(s);
        {
            var l = (f)=>{
                var d = vl();
                g(f, d);
            }, c = (f)=>{
                var d = W(), p = N(d);
                {
                    var v = (_)=>{
                        var C = hl(), b = k(C), y = k(b), E = S(b, 2);
                        E.__click = i, V(()=>G(y, `Error: ${h(o) ?? ""}`)), g(_, C);
                    }, m = (_)=>{
                        var C = pl(), b = k(C), y = k(b), E = k(y);
                        ke(E, {
                            get src () {
                                return hs;
                            },
                            size: "1.4em",
                            color: "#ff8c00"
                        });
                        var x = S(b, 2);
                        Qa(x, {
                            get text () {
                                return h(a);
                            }
                        }), g(_, C);
                    };
                    L(p, (_)=>{
                        h(o) ? _(v) : _(m, !1);
                    }, !0);
                }
                g(f, d);
            };
            L(u, (f)=>{
                h(n) ? f(l) : f(c, !1);
            });
        }
        g(e, s), ie();
    }
    Ze([
        "click"
    ]);
    var gl = A('<img alt="Discord avatar" class="discord-avatar svelte-1uaigbn"/>'), ml = A('<div class="connected-info svelte-1uaigbn"><!> <span class="connected-text svelte-1uaigbn"> </span></div>'), yl = A(`<span class="connected-text svelte-1uaigbn">You're in!</span>`), bl = A("<strong>Gold</strong>"), wl = A("<strong>Silver</strong>"), Cl = A("<strong>Bronze</strong>"), kl = A("<p>Once both steps are complete, the bot will automatically assign you the <!> role<!></p>"), El = A(`<div class="discord-perk svelte-1uaigbn"><p>The <a href="/discord" target="_blank">fasterthanlime Discord server</a> is a nice place to discuss
        Rust, but not only!</p> <div class="checklist svelte-1uaigbn"><div><div class="checkbox svelte-1uaigbn"><!></div> <span class="item-text svelte-1uaigbn">Link your Discord account</span> <!></div> <div><div class="checkbox svelte-1uaigbn"><!></div> <span class="item-text svelte-1uaigbn">Join the Discord server</span> <!></div></div> <!></div>`);
    function Sl(e, t) {
        oe(t, !0);
        let n = Q(()=>X.user_info), r = Q(()=>X.viewer), a = q(!1), o = Q(()=>!!h(n)?.discord), i = Q(()=>h(n)?.in_discord);
        var s = El(), u = S(k(s), 2), l = k(u), c = k(l), f = k(c);
        {
            let w = Q(()=>h(o) ? Hr : Br);
            ke(f, {
                get src () {
                    return h(w);
                },
                size: "14"
            });
        }
        var d = S(c, 4);
        {
            var p = (w)=>{
                var I = ml(), M = k(I);
                {
                    var P = (O)=>{
                        const B = Q(()=>Ss(h(n).discord));
                        var D = W(), z = N(D);
                        {
                            var j = (H)=>{
                                var J = gl();
                                V(()=>re(J, "src", h(B))), g(H, J);
                            };
                            L(z, (H)=>{
                                h(B) && H(j);
                            });
                        }
                        g(O, D);
                    };
                    L(M, (O)=>{
                        h(n)?.discord && O(P);
                    });
                }
                var R = S(M, 2), U = k(R);
                V(()=>G(U, `@${h(n)?.discord?.username ?? ""}`)), g(w, I);
            }, v = (w)=>{
                te(w, {
                    label: "Connect Discord",
                    onclick: ()=>{
                        F(a, !0), yt("discord");
                    },
                    get icon () {
                        return Et;
                    },
                    get loading () {
                        return h(a);
                    }
                });
            };
            L(d, (w)=>{
                h(o) ? w(p) : w(v, !1);
            });
        }
        var m = S(l, 2), _ = k(m), C = k(_);
        {
            let w = Q(()=>h(i) ? Hr : Br);
            ke(C, {
                get src () {
                    return h(w);
                },
                size: "14"
            });
        }
        var b = S(_, 4);
        {
            var y = (w)=>{
                var I = yl();
                g(w, I);
            }, E = (w)=>{
                te(w, {
                    label: "Join server",
                    href: "/discord",
                    target: "_blank",
                    get icon () {
                        return Et;
                    },
                    secondary: !0
                });
            };
            L(b, (w)=>{
                h(i) ? w(y) : w(E, !1);
            });
        }
        var x = S(u, 2);
        {
            var T = (w)=>{
                var I = kl(), M = S(k(I));
                {
                    var P = (D)=>{
                        var z = bl();
                        g(D, z);
                    }, R = (D)=>{
                        var z = W(), j = N(z);
                        {
                            var H = (K)=>{
                                var Z = wl();
                                g(K, Z);
                            }, J = (K)=>{
                                var Z = W(), he = N(Z);
                                {
                                    var se = (ee)=>{
                                        var le = Cl();
                                        g(ee, le);
                                    };
                                    L(he, (ee)=>{
                                        h(r).has_bronze && ee(se);
                                    }, !0);
                                }
                                g(K, Z);
                            };
                            L(j, (K)=>{
                                h(r).has_silver ? K(H) : K(J, !1);
                            }, !0);
                        }
                        g(D, z);
                    };
                    L(M, (D)=>{
                        h(r).has_gold ? D(P) : D(R, !1);
                    });
                }
                var U = S(M, 2);
                {
                    var O = (D)=>{
                        var z = fe(`, and you'll be able to discuss early access content without
                spoiling anyone!`);
                        g(D, z);
                    }, B = (D)=>{
                        var z = W(), j = N(z);
                        {
                            var H = (K)=>{
                                var Z = fe(`, and you'll be able to discuss bonus
                content without spoiling anyone!`);
                                g(K, Z);
                            }, J = (K)=>{
                                var Z = fe(".");
                                g(K, Z);
                            };
                            L(j, (K)=>{
                                h(r).has_bronze ? K(H) : K(J, !1);
                            }, !0);
                        }
                        g(D, z);
                    };
                    L(U, (D)=>{
                        h(r).has_silver ? D(O) : D(B, !1);
                    });
                }
                g(w, I);
            };
            L(x, (w)=>{
                h(o) && w(T);
            });
        }
        V(()=>{
            Te(l, 1, `checklist-item ${h(o) ? "completed" : "pending"}`, "svelte-1uaigbn"), Te(m, 1, `checklist-item ${h(i) ? "completed" : "pending"}`, "svelte-1uaigbn");
        }), g(e, s), ie();
    }
    function xl(e, t) {
        e.preventDefault(), F(t, !0);
    }
    function Tl(e, t) {
        e.preventDefault(), F(t, !1);
    }
    var Il = A(" <!>", 1), Al = A('and <a href="#" id="show-all-sponsors"><span id="more-sponsors-count"> </span> more</a>', 1), Ml = A('<span id="visible-sponsors"><!> <!></span>'), Ll = A(" <!>", 1), Pl = A('<span id="all-sponsors"><!> <a href="#" id="show-less-sponsors">Show less</a></span>'), Fl = A('<p id="sponsor-list" class="sponsor-list">Thanks to my sponsors: <!></p>');
    function Dl(e, t) {
        const n = t.sponsors || window.home?.sponsors || [];
        function r(v) {
            const m = [
                ...v
            ];
            for(let _ = m.length - 1; _ > 0; _--){
                const C = Math.floor(Math.random() * (_ + 1));
                [m[_], m[C]] = [
                    m[C],
                    m[_]
                ];
            }
            return m;
        }
        const a = r(n), o = 20, i = a.slice(0, o), s = a.length > o, u = a.length - o;
        let l = q(!1);
        var c = Fl(), f = S(k(c));
        {
            var d = (v)=>{
                var m = Ml(), _ = k(m);
                Ne(_, 17, ()=>i, De, (y, E, x)=>{
                    var T = Il(), w = N(T, !0), I = S(w);
                    {
                        var M = (P)=>{
                            var R = fe();
                            R.nodeValue = ", ", g(P, R);
                        };
                        L(I, (P)=>{
                            x < i.length - 1 && P(M);
                        });
                    }
                    V(()=>G(w, h(E))), g(y, T);
                });
                var C = S(_, 2);
                {
                    var b = (y)=>{
                        var E = Al(), x = S(N(E));
                        x.__click = [
                            xl,
                            l
                        ];
                        var T = k(x), w = k(T);
                        V(()=>G(w, u)), g(y, E);
                    };
                    L(C, (y)=>{
                        s && y(b);
                    });
                }
                g(v, m);
            }, p = (v)=>{
                var m = Pl(), _ = k(m);
                Ne(_, 17, ()=>a, De, (b, y, E)=>{
                    var x = Ll(), T = N(x, !0), w = S(T);
                    {
                        var I = (M)=>{
                            var P = fe(",");
                            g(M, P);
                        };
                        L(w, (M)=>{
                            E < a.length - 1 && M(I);
                        });
                    }
                    V(()=>G(T, h(y))), g(b, x);
                });
                var C = S(_, 2);
                C.__click = [
                    Tl,
                    l
                ], g(v, m);
            };
            L(f, (v)=>{
                h(l) ? v(p, !1) : v(d);
            });
        }
        g(e, c);
    }
    Ze([
        "click"
    ]);
    var Nl = A('<p class="svelte-1fxztp3">Loading...</p>'), Rl = A('<div class="login-prompt svelte-1fxztp3"><p class="svelte-1fxztp3">This article comes with a bonus code repository.</p> <p class="svelte-1fxztp3">Please log in to access it:</p> <!></div>'), Ol = A("<!> to gain access.", 1), zl = A("<!> to gain access.", 1), jl = A('<p class="svelte-1fxztp3"><!></p> <p class="svelte-1fxztp3"><!> &nbsp;<!></p>', 1), Vl = A('<p class="svelte-1fxztp3">Please log in first to check your sponsorship status:</p> <!>', 1), Ul = A('<div class="upgrade-prompt"><p class="svelte-1fxztp3">This article comes with a bonus code repository.</p> <!></div>'), Hl = A('<p class="error svelte-1fxztp3"> </p>'), Bl = A(`<div class="token-info"><div class="field svelte-1fxztp3"><p class="svelte-1fxztp3">The bonus code for this article, <strong> </strong>, is available as a
                    Git repository:</p> <!></div> <p class="thanks svelte-1fxztp3">Thank you for your support! 💖</p></div>`), ql = A('<p class="svelte-1fxztp3">No token received</p>'), Wl = A('<div class="git-repo svelte-1fxztp3"><h3 class="svelte-1fxztp3">Bonus content</h3> <!></div>');
    function eo(e, t) {
        oe(t, !0);
        let n = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]), { repoName: r } = n, a = q(!1), o = q(null), i = q(null), s = q(null), u = Q(()=>X.viewer), l = Q(()=>X.profile), c = Q(()=>X.user_info);
        const f = ()=>{
            F(a, !0), F(o, null), F(i, null);
            const _ = new URLSearchParams(window.location.search);
            let C = "";
            _.has("admin_means_silver") ? C = "?admin_means_silver=1" : _.has("admin_means_bronze") ? C = "?admin_means_bronze=1" : _.has("admin_means_gold") && (C = "?admin_means_gold=1"), fetch(`/api/make-api-key${C}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repo: r
                }),
                credentials: "same-origin"
            }).then(async (b)=>{
                if (console.log("Status:", b.status), F(i, b.status, !0), !b.ok) {
                    const y = await b.text();
                    throw new Error(`HTTP ${b.status}: ${y}`);
                }
                return b.json();
            }).then((b)=>{
                let y = b;
                if (console.log("Response:", y), y.api_key) {
                    const E = window.location.protocol.replace(":", ""), x = window.location.hostname, T = window.location.port ? `:${window.location.port}` : "";
                    F(s, `git clone ${E}://token:${y.api_key}@${x}${T}/extras/${r}.git`), console.log("Clone command:"), console.log(h(s));
                }
                F(a, !1);
            }).catch((b)=>{
                console.error("Error:", b), F(o, b.message, !0), F(a, !1);
            });
        };
        mn(()=>{
            h(u) ? f() : (F(a, !1), F(i, 401));
        });
        var d = Wl(), p = S(k(d), 2);
        {
            var v = (_)=>{
                var C = Nl();
                g(_, C);
            }, m = (_)=>{
                var C = W(), b = N(C);
                {
                    var y = (x)=>{
                        var T = Rl(), w = S(k(T), 4);
                        He(w, {}), g(x, T);
                    }, E = (x)=>{
                        var T = W(), w = N(T);
                        {
                            var I = (P)=>{
                                var R = Ul(), U = S(k(R), 2);
                                {
                                    var O = (D)=>{
                                        var z = jl(), j = N(z), H = k(j);
                                        {
                                            var J = (le)=>{
                                                var ze = W(), Mt = N(ze);
                                                {
                                                    var yn = (ye)=>{
                                                        var je = Ol(), wn = N(je);
                                                        te(wn, {
                                                            get icon () {
                                                                return ut;
                                                            },
                                                            label: "Sponsor me on GitHub",
                                                            get href () {
                                                                return fn;
                                                            },
                                                            target: "_blank",
                                                            inlineflex: !0
                                                        }), g(ye, je);
                                                    }, bn = (ye)=>{
                                                        var je = W(), wn = N(je);
                                                        {
                                                            var ro = (Cn)=>{
                                                                var br = zl(), ao = N(br);
                                                                te(ao, {
                                                                    get icon () {
                                                                        return Ke;
                                                                    },
                                                                    label: "Become a Patreon",
                                                                    get href () {
                                                                        return en;
                                                                    },
                                                                    target: "_blank",
                                                                    inlineflex: !0
                                                                }), g(Cn, br);
                                                            };
                                                            L(wn, (Cn)=>{
                                                                h(c).patreon && Cn(ro);
                                                            }, !0);
                                                        }
                                                        g(ye, je);
                                                    };
                                                    L(Mt, (ye)=>{
                                                        h(c).github ? ye(yn) : ye(bn, !1);
                                                    });
                                                }
                                                g(le, ze);
                                            };
                                            L(H, (le)=>{
                                                h(c) && le(J);
                                            });
                                        }
                                        var K = S(j, 2), Z = k(K);
                                        {
                                            var he = (le)=>{
                                                var ze = fe("Already a sponsor?");
                                                g(le, ze);
                                            }, se = (le)=>{
                                                var ze = W(), Mt = N(ze);
                                                {
                                                    var yn = (ye)=>{
                                                        var je = fe("Already a patron?");
                                                        g(ye, je);
                                                    }, bn = (ye)=>{
                                                        var je = fe("Already upgraded?");
                                                        g(ye, je);
                                                    };
                                                    L(Mt, (ye)=>{
                                                        h(c)?.patreon ? ye(yn) : ye(bn, !1);
                                                    }, !0);
                                                }
                                                g(le, ze);
                                            };
                                            L(Z, (le)=>{
                                                h(c)?.github ? le(he) : le(se, !1);
                                            });
                                        }
                                        var ee = S(Z, 2);
                                        gr(ee, {}), g(D, z);
                                    }, B = (D)=>{
                                        var z = Vl(), j = S(N(z), 2);
                                        He(j, {}), g(D, z);
                                    };
                                    L(U, (D)=>{
                                        h(l) && h(u) ? D(O) : D(B, !1);
                                    });
                                }
                                g(P, R);
                            }, M = (P)=>{
                                var R = W(), U = N(R);
                                {
                                    var O = (D)=>{
                                        var z = Hl(), j = k(z);
                                        V(()=>G(j, `Error: ${h(o) ?? ""}`)), g(D, z);
                                    }, B = (D)=>{
                                        var z = W(), j = N(z);
                                        {
                                            var H = (K)=>{
                                                var Z = Bl(), he = k(Z), se = k(he), ee = S(k(se)), le = k(ee), ze = S(se, 2);
                                                {
                                                    let Mt = Q(()=>h(s) ?? "");
                                                    Qa(ze, {
                                                        get text () {
                                                            return h(Mt);
                                                        }
                                                    });
                                                }
                                                V(()=>G(le, r)), g(K, Z);
                                            }, J = (K)=>{
                                                var Z = ql();
                                                g(K, Z);
                                            };
                                            L(j, (K)=>{
                                                h(s) ? K(H) : K(J, !1);
                                            }, !0);
                                        }
                                        g(D, z);
                                    };
                                    L(U, (D)=>{
                                        h(o) ? D(O) : D(B, !1);
                                    }, !0);
                                }
                                g(P, R);
                            };
                            L(w, (P)=>{
                                h(i) === 403 ? P(I) : P(M, !1);
                            }, !0);
                        }
                        g(x, T);
                    };
                    L(b, (x)=>{
                        h(i) === 401 ? x(y) : x(E, !1);
                    }, !0);
                }
                g(_, C);
            };
            L(p, (_)=>{
                h(a) ? _(v) : _(m, !1);
            });
        }
        g(e, d), ie();
    }
    var $l = A(`<p>Some articles come with bonus code. Usually it's a little Rust project you can compile and
        run yourself.</p> <p>For example, <a href="/articles/the-virtue-of-unsynn" target="_blank">The Virtue of Unsynn</a> comes with <strong>fargo</strong>, a tool to do causal profiling of Rust builds.</p> <!> <p>If you have trouble with a bonus repo, just ask for help in the Discord!</p>`, 1), Yl = A(`<p>Your private RSS feed contains early access content.</p> <aside><!></aside> <p>Videos and links to early access articles will also be posted to Patreon.</p> <p>For GitHub sponsors, early access videos can be watched directly on this site. They'll
        appear in the private RSS feed, and on the front page (when logged in).</p>`, 1), Gl = A(`<p>Your name will be listed in the credits of videos and articles.</p> <p>Here's what article credits typically look like:</p> <!> <p>As for video, check out the end of <a href="https://youtu.be/OzCbdsVVnKI?t=1129" target="_blank">All color is best-effort</a>.</p> <p>If you want to opt out of this, GitHub has a "sponsorship privacy level" option. Patreon
        doesn't, but I could cook something up if you really wanted it.</p>`, 1), Xl = A(`<p>When I started writing seriously, in 2019, I had no idea it would actually work and become
        my full-time job.</p> <p>I had no idea folks would encourage and support (not just monetarily) the creation of
        high-quality content about Rust, video, sound, and whatever I'm curious about at any given
        moment.</p> <p>I am tremendously grateful for that, for all I've been able to learn and to share with
        others. Thank you.</p>`, 1), Kl = A("<p>TODO: explain</p>");
    function Jl(e, t) {
        var n = W(), r = N(n);
        {
            var a = (i)=>{
                var s = $l(), u = S(N(s), 4);
                eo(u, {
                    repoName: "fargo"
                }), g(i, s);
            }, o = (i)=>{
                var s = W(), u = N(s);
                {
                    var l = (f)=>{
                        Sl(f, {});
                    }, c = (f)=>{
                        var d = W(), p = N(d);
                        {
                            var v = (_)=>{
                                var C = Yl(), b = S(N(C), 2), y = k(b);
                                _l(y, {}), g(_, C);
                            }, m = (_)=>{
                                var C = W(), b = N(C);
                                {
                                    var y = (x)=>{
                                        var T = Gl(), w = S(N(T), 4);
                                        Dl(w, {}), g(x, T);
                                    }, E = (x)=>{
                                        var T = W(), w = N(T);
                                        {
                                            var I = (P)=>{
                                                var R = Xl();
                                                g(P, R);
                                            }, M = (P)=>{
                                                var R = Kl();
                                                g(P, R);
                                            };
                                            L(w, (P)=>{
                                                t.id === "gratitude" ? P(I) : P(M, !1);
                                            }, !0);
                                        }
                                        g(x, T);
                                    };
                                    L(b, (x)=>{
                                        t.id === "credits" ? x(y) : x(E, !1);
                                    }, !0);
                                }
                                g(_, C);
                            };
                            L(p, (_)=>{
                                t.id === "early-access" ? _(v) : _(m, !1);
                            }, !0);
                        }
                        g(f, d);
                    };
                    L(u, (f)=>{
                        t.id === "discord-access" ? f(l) : f(c, !1);
                    }, !0);
                }
                g(i, s);
            };
            L(r, (i)=>{
                t.id === "bonus-content" ? i(a) : i(o, !1);
            });
        }
        g(e, n);
    }
    var Zl = A('<aside class="perk-container svelte-o2o51r"><h3 class="explainer-heading svelte-o2o51r"><span class="perk-icon-container svelte-o2o51r"><!></span> </h3> <!> <div class="right-corner svelte-o2o51r"><!></div></aside>');
    function Rn(e, t) {
        var n = W(), r = N(n);
        Ne(r, 17, ()=>t.activePerks, De, (a, o)=>{
            var i = Zl(), s = k(i), u = k(s), l = k(u);
            {
                let v = Q(()=>h(o).color ?? "inherit");
                ke(l, {
                    get src () {
                        return h(o).icon;
                    },
                    size: "1.8em",
                    get color () {
                        return h(v);
                    }
                });
            }
            var c = S(u), f = S(s, 2);
            Jl(f, {
                get id () {
                    return h(o).id;
                }
            });
            var d = S(f, 2), p = k(d);
            Ht(p, {
                get tier () {
                    return h(o).tier;
                }
            }), V(()=>G(c, ` ${h(o).text ?? ""}`)), g(a, i);
        }), g(e, n);
    }
    var Ql = A(`<p class="svelte-klgik3">You're a <!> supporter <!></p>`);
    function On(e, t) {
        oe(t, !0);
        const n = Q(()=>t.viewer.has_gold ? "gold" : t.viewer.has_silver ? "silver" : t.viewer.has_bronze ? "bronze" : null);
        var r = W(), a = N(r);
        {
            var o = (i)=>{
                var s = Ql(), u = S(k(s));
                Ht(u, {
                    get tier () {
                        return h(n);
                    }
                });
                var l = S(u, 2);
                {
                    var c = (f)=>{
                        var d = fe();
                        V(()=>G(d, `via ${t.viewer.tier_cause ?? ""}`)), g(f, d);
                    };
                    L(l, (f)=>{
                        t.viewer.tier_cause && f(c);
                    });
                }
                g(i, s);
            };
            L(a, (i)=>{
                h(n) && i(o);
            });
        }
        g(e, r), ie();
    }
    var eu = A('<pre class="debug"> </pre>'), tu = A('<div class="supporter-section"><!> <p>Thanks for your support! Here are your perks:</p> <!></div>'), nu = A('<li class="svelte-kh3qwx"><!> </li>'), ru = A('<div class="supporter-section"><!> <p>Thanks for your support! Here are your perks:</p> <!> <div class="upsell-section svelte-kh3qwx"><h4>Want to throw me a tremendous amount of money for no good reason?</h4> <p>Feel free to upgrade to Gold for:</p> <ul class="upsell-perks svelte-kh3qwx"></ul> <!></div></div>'), au = A('<li class="svelte-kh3qwx"><!> </li>'), ou = A('<div class="supporter-section"><!> <p>Thanks for your support! Here are your perks:</p> <!> <div class="upsell-section svelte-kh3qwx"><h4>Want more perks? Upgrade to the Silver tier for:</h4> <ul class="upsell-perks svelte-kh3qwx"></ul> <!></div></div>'), iu = A("<!> <p>Things don't look right? &nbsp; <!></p> <!>", 1), su = A("<p>You're not logged in, so we can't show you your profile, but we <em>can</em> ask for your support.</p> <!> <!>", 1), lu = A("<!> <!>", 1);
    function uu(e, t) {
        oe(t, !0);
        let n = Q(()=>X.viewer), r = new URLSearchParams(window.location.search).has("debug"), a = Q(()=>{
            const f = [];
            return h(n)?.has_bronze && f.push(...Za), h(n)?.has_silver && f.push(...Yn), h(n)?.has_gold && f.push(...Gn), f;
        });
        var o = lu(), i = N(o);
        {
            var s = (f)=>{
                var d = eu(), p = k(d);
                V((v)=>G(p, v), [
                    ()=>JSON.stringify(X, null, 2)
                ]), g(f, d);
            };
            L(i, (f)=>{
                r && f(s);
            });
        }
        var u = S(i, 2);
        {
            var l = (f)=>{
                var d = iu(), p = N(d);
                {
                    var v = (y)=>{
                        var E = tu(), x = k(E);
                        On(x, {
                            get viewer () {
                                return X.viewer;
                            }
                        });
                        var T = S(x, 4);
                        Rn(T, {
                            get activePerks () {
                                return h(a);
                            }
                        }), g(y, E);
                    }, m = (y)=>{
                        var E = W(), x = N(E);
                        {
                            var T = (I)=>{
                                var M = ru(), P = k(M);
                                On(P, {
                                    get viewer () {
                                        return X.viewer;
                                    }
                                });
                                var R = S(P, 4);
                                Rn(R, {
                                    get activePerks () {
                                        return h(a);
                                    }
                                });
                                var U = S(R, 2), O = S(k(U), 4);
                                Ne(O, 21, ()=>Gn, De, (D, z)=>{
                                    var j = nu(), H = k(j);
                                    ke(H, {
                                        get src () {
                                            return h(z).icon;
                                        },
                                        size: "16"
                                    });
                                    var J = S(H);
                                    V(()=>G(J, ` ${h(z).text ?? ""}`)), g(D, j);
                                });
                                var B = S(O, 2);
                                Xn(B, {
                                    get userInfo () {
                                        return X.user_info;
                                    }
                                }), g(I, M);
                            }, w = (I)=>{
                                var M = W(), P = N(M);
                                {
                                    var R = (O)=>{
                                        var B = ou(), D = k(B);
                                        On(D, {
                                            get viewer () {
                                                return X.viewer;
                                            }
                                        });
                                        var z = S(D, 4);
                                        Rn(z, {
                                            get activePerks () {
                                                return h(a);
                                            }
                                        });
                                        var j = S(z, 2), H = S(k(j), 2);
                                        Ne(H, 21, ()=>Yn, De, (K, Z)=>{
                                            var he = au(), se = k(he);
                                            ke(se, {
                                                get src () {
                                                    return h(Z).icon;
                                                },
                                                size: "16"
                                            });
                                            var ee = S(se);
                                            V(()=>G(ee, ` ${h(Z).text ?? ""}`)), g(K, he);
                                        });
                                        var J = S(H, 2);
                                        Xn(J, {
                                            get userInfo () {
                                                return X.user_info;
                                            }
                                        }), g(O, B);
                                    }, U = (O)=>{
                                        Kn(O);
                                    };
                                    L(P, (O)=>{
                                        X.viewer.has_bronze ? O(R) : O(U, !1);
                                    }, !0);
                                }
                                g(I, M);
                            };
                            L(x, (I)=>{
                                X.viewer.has_silver ? I(T) : I(w, !1);
                            }, !0);
                        }
                        g(y, E);
                    };
                    L(p, (y)=>{
                        X.viewer.has_gold ? y(v) : y(m, !1);
                    });
                }
                var _ = S(p, 2), C = S(k(_));
                gr(C, {});
                var b = S(_, 2);
                $s(b, {}), g(f, d);
            }, c = (f)=>{
                var d = su(), p = S(N(d), 2);
                Kn(p);
                var v = S(p, 2);
                He(v, {}), g(f, d);
            };
            L(u, (f)=>{
                X.user_info ? f(l) : f(c, !1);
            });
        }
        g(e, o), ie();
    }
    var cu = A(`<p>This is an exclusive article! Folks who sponsor me for 10EUR/month or above get to read it right
    now.</p> <p>Exclusive articles become available for everyone after a six month period.</p> <p>My <a href="https://www.youtube.com/@fasterthanlime">YouTube channel</a> sometimes has these in video form.</p> <p>Read more about me and this odd business model on <a href="/about">my about page</a>.</p>`, 1);
    function fu(e, t) {
        let n = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]);
        _r(e, Xa(()=>n, {
            children: (r, a)=>{
                var o = cu();
                g(r, o);
            },
            $$slots: {
                default: !0
            }
        }));
    }
    let du;
    du = {
        a: {
            fill: "currentColor",
            viewBox: "0 0 16 16"
        },
        c: '<path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"></path><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"></path>'
    };
    rf = {
        a: {
            fill: "currentColor",
            viewBox: "0 0 16 16"
        },
        c: '<path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"></path>'
    };
    af = {
        a: {
            fill: "currentColor",
            viewBox: "0 0 16 16"
        },
        c: '<path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"></path><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"></path><path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"></path>'
    };
    Gt("mountOrShowError");
    function vu(e) {
        return e instanceof Document ? e.body : e instanceof ShadowRoot ? e.host : e;
    }
    tt = function(e, t) {
        const n = vu(t.target);
        n.classList.add("svelte-component");
        try {
            return fr(e, t);
        } catch (r) {
            console.error("While mounting component", e, t), console.error("Got error", r);
            let a = "<p>Woops, some JavaScript broke. Details are in console, reach out if you want to!</p>";
            window.location.protocol === "http:" && (a += `<pre style="min-height: 8em; width: 100%; overflow: scroll; font-size: .8rem"><span style="color: red">${r}</span>
${r.stack}</pre>`), n.innerHTML = a;
        }
    };
    const hu = (e, t, n, r)=>{
        e.code === "Enter" && t(e), e.code === "ArrowUp" || e.shiftKey && e.code === "Tab" ? (e.preventDefault(), F(n, (h(n) - 1 + r.length) % r.length)) : (e.code === "ArrowDown" || !e.shiftKey && e.code === "Tab") && (e.preventDefault(), F(n, (h(n) + 1) % r.length));
    };
    var pu = (e, t, n)=>{
        F(t, !0), n("Search input focused");
    }, _u = (e, t, n)=>{
        t("Search input unfocused"), setTimeout(()=>{
            t("Now clearing focused"), F(n, !1);
        }, 250);
    }, gu = (e, t)=>F(t, !0), mu = A('<a><!> <span class="term"><!></span></a>'), yu = A('<div class="completions svelte-2t1r4w"></div>'), bu = A('<div class="search-container svelte-2t1r4w" tabindex="-1"><input type="search"/> <!></div>');
    function wu(e, t) {
        oe(t, !0);
        const n = Gt("search");
        let r = q(ue(new URLSearchParams(window.location.search).get("q") || "")), a = ue([]), o = q(-1), i = q(!1), s = q(!1), u = q(void 0), l = (b)=>{
            let y = new URLSearchParams;
            return y.set("q", b), `/search?${y}`;
        }, c = (b)=>b.url ? b.url : l(b.text), f = async (b)=>{
            let y = new URLSearchParams;
            y.set("q", b);
            let x = await (await fetch(`/api/autocomplete?${y}`)).json();
            a.length = 0, a.push(...x), F(o, -1);
        }, d = (b)=>{
            if (b.preventDefault(), F(s, !0), h(o) !== -1 && a[h(o)]) {
                let y = a[h(o)];
                window.location.href = c(y);
            } else window.location.href = l(h(r));
        };
        Vt(()=>{
            h(r).length > 0 ? f(h(r)) : a.length = 0;
        });
        let p = (b)=>{
            (b.metaKey || b.ctrlKey) && b.key === "k" && (b.preventDefault(), h(u) && (h(u).focus(), h(u).select(), h(u).scrollIntoView({
                behavior: "smooth"
            })));
        };
        Vt(()=>(document.addEventListener("keydown", p), ()=>{
                document.removeEventListener("keydown", p);
            }));
        var v = bu();
        v.__focusin = [
            pu,
            i,
            n
        ], v.__focusout = [
            _u,
            n,
            i
        ];
        var m = k(v);
        re(m, "placeholder", `Search... ${navigator.platform.includes("Mac") ? "(⌘ K)" : "(Ctrl+K)"}`), m.__keydown = [
            hu,
            d,
            o,
            a
        ], Ya(m, (b)=>F(u, b), ()=>h(u));
        var _ = S(m, 2);
        {
            var C = (b)=>{
                var y = yu();
                Ne(y, 21, ()=>a, De, (E, x, T)=>{
                    var w = mu();
                    w.__click = [
                        gu,
                        s
                    ];
                    var I = k(w);
                    {
                        var M = (O)=>{
                            ke(O, {
                                get src () {
                                    return Es;
                                }
                            });
                        }, P = (O)=>{
                            ke(O, {
                                get src () {
                                    return du;
                                }
                            });
                        };
                        L(I, (O)=>{
                            h(x).kind === "term" ? O(M) : O(P, !1);
                        });
                    }
                    var R = S(I, 2), U = k(R);
                    ja(U, ()=>h(x).html), V((O)=>{
                        Te(w, 1, `completion ${T === h(o) ? "active" : ""}`, "svelte-2t1r4w"), re(w, "href", O);
                    }, [
                        ()=>c(h(x))
                    ]), un("mouseenter", w, ()=>F(o, T, !0)), g(E, w);
                }), g(b, y);
            };
            L(_, (b)=>{
                h(i) && a.length > 0 && b(C);
            });
        }
        V(()=>Te(m, 1, dr(h(s) ? "loading" : ""), "svelte-2t1r4w")), un("submit", m, d), $a(m, ()=>h(r), (b)=>F(r, b)), g(e, v), ie();
    }
    Ze([
        "focusin",
        "focusout",
        "keydown",
        "click"
    ]);
    const Cu = {
        TURBO_NAVIGATION_HAPPENED: "home:turbo-navigation-happened"
    }, ku = {
        SURVIVES_TURBONAV: "home-survives-turbonav"
    };
    function Eu(e, t) {
        let n = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]);
        _r(e, Xa(()=>n, {
            children: (r, a)=>{
                He(r, {});
            },
            $$slots: {
                default: !0
            }
        }));
    }
    var Su = Ra('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="currentColor"><path d="M0 0v10.667L8 5.333Z" fill="currentColor" fill-opacity="0.4"></path><path d="M0 10.667v10.667L8 16Z" fill="currentColor" fill-opacity="0.6"></path><path d="M8 5.333v10.667L16 10.667Z" fill="currentColor"></path></svg>');
    function xu(e, t) {
        let n = Le(t, "size", 3, "1em");
        var r = Su();
        V(()=>{
            re(r, "width", n()), re(r, "height", n());
        }), g(e, r);
    }
    var Tu = A('<a href="/profile" class="svelte-6ux6nr"><img width="30" height="30"/></a> <!>', 1), Iu = A('<div><a href="/" class="svelte-6ux6nr">Home</a> <form id="page-search-form" action="/search" method="GET" class="svelte-6ux6nr"><!></form> <span class="filler svelte-6ux6nr"></span> <a target="_blank" class="icon-link svelte-6ux6nr"><!></a> <a target="_blank" class="icon-link svelte-6ux6nr"><!></a> <!> <!></div>');
    function Au(e, t) {
        oe(t, !0);
        let n = Q(()=>X.profile), r = Q(()=>$n(X.viewer)), a = q(!1), o = (x)=>{
            x.preventDefault(), F(a, !0);
        }, i = ()=>{
            F(a, !1);
        }, s = ()=>`/login/logout?return_to=${pr()}`, u = q(!1), l = (x)=>{
            x.preventDefault(), F(u, !0), window.location.href = s();
        };
        var c = Iu(), f = S(k(c), 2), d = k(f);
        wu(d, {});
        var p = S(f, 4), v = k(p);
        ke(v, {
            get src () {
                return Et;
            },
            size: "2em"
        });
        var m = S(p, 2), _ = k(m);
        xu(_, {
            size: "2em"
        });
        var C = S(m, 2);
        {
            var b = (x)=>{
                var T = Tu(), w = N(T), I = k(w), M = S(w, 2);
                te(M, {
                    get loading () {
                        return h(u);
                    },
                    get disabled () {
                        return h(u);
                    },
                    label: "Log out",
                    class: "secondary",
                    onclick: l,
                    onkeydown: l,
                    secondary: !0
                }), V(()=>{
                    Te(I, 1, `avatar ${h(r) ? `tier-${h(r)}` : ""}`, "svelte-6ux6nr"), re(I, "src", h(n).avatar_url), re(I, "alt", `Avatar for ${h(n).name ?? ""}`);
                }), g(x, T);
            }, y = (x)=>{
                te(x, {
                    label: "Log in",
                    class: "secondary",
                    onclick: o,
                    onkeydown: o
                });
            };
            L(C, (x)=>{
                h(n) ? x(b) : x(y, !1);
            });
        }
        var E = S(C, 2);
        Eu(E, {
            get visible () {
                return h(a);
            },
            onclose: i
        }), V(()=>{
            Te(c, 1, dr([
                "container",
                ku.SURVIVES_TURBONAV
            ]), "svelte-6ux6nr"), re(p, "href", Is), re(m, "href", As);
        }), g(e, c), ie();
    }
    var Mu = (e, t)=>t(), Lu = (e, t)=>t(), Pu = A('and <a href="#" role="button" tabindex="0"><span id="more-sponsors-count"> </span> more</a>', 1), Fu = A('<span id="visible-sponsors"><!> <!></span>'), Du = A('<span id="all-sponsors"></span>'), Nu = A('<p class="svelte-d63cf9"><!> <!> <!></p>');
    function qr(e, t) {
        oe(t, !0);
        let n = Le(t, "prefix", 3, "Thanks to my sponsors: "), r = q(!1), a = ()=>{
            F(r, !h(r));
        }, o = ue([
            ...window.home.sponsors
        ].sort(()=>Math.random() - .5)), i = 20;
        var s = W(), u = N(s);
        {
            var l = (c)=>{
                var f = Nu(), d = k(f);
                {
                    var p = (b)=>{
                        var y = fe();
                        V(()=>G(y, n())), g(b, y);
                    };
                    L(d, (b)=>{
                        n() && b(p);
                    });
                }
                var v = S(d, 2);
                {
                    var m = (b)=>{
                        var y = Fu(), E = k(y);
                        Ne(E, 17, ()=>o.slice(0, i), De, (w, I, M)=>{
                            var P = fe();
                            V(()=>G(P, `${h(I) ?? ""}${M < i - 1 ? ", " : ""}`)), g(w, P);
                        });
                        var x = S(E, 2);
                        {
                            var T = (w)=>{
                                var I = Pu(), M = S(N(I));
                                M.__keydown = [
                                    Mu,
                                    a
                                ], M.__click = [
                                    Lu,
                                    a
                                ];
                                var P = k(M), R = k(P);
                                V(()=>G(R, o.length - i)), g(w, I);
                            };
                            L(x, (w)=>{
                                o.length > i && w(T);
                            });
                        }
                        g(b, y);
                    };
                    L(v, (b)=>{
                        h(r) || b(m);
                    });
                }
                var _ = S(v, 2);
                {
                    var C = (b)=>{
                        var y = Du();
                        Ne(y, 21, ()=>o, De, (E, x, T)=>{
                            var w = fe();
                            V(()=>G(w, `${h(x) ?? ""}${T < o.length - 1 ? ", " : ""}`)), g(E, w);
                        }), g(b, y);
                    };
                    L(_, (b)=>{
                        h(r) && b(C);
                    });
                }
                g(c, f);
            };
            L(u, (c)=>{
                o.length > 0 && c(l);
            });
        }
        g(e, s), ie();
    }
    Ze([
        "keydown",
        "click"
    ]);
    var Ru = A('<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe title="YouTube video player" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>');
    function Ou(e, t) {
        var n = Ru(), r = k(n);
        V(()=>re(r, "src", `https://www.youtube.com/embed/${t.videoId ?? ""}`)), g(e, n);
    }
    const Zt = 43200, Wr = 1440, $r = Symbol.for("constructDateFrom");
    function mr(e, t) {
        return typeof e == "function" ? e(t) : e && typeof e == "object" && $r in e ? e[$r](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
    }
    function Je(e, t) {
        return mr(e, e);
    }
    let zu = {};
    function ju() {
        return zu;
    }
    function Yr(e) {
        const t = Je(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
        return n.setUTCFullYear(t.getFullYear()), +e - +n;
    }
    function yr(e, ...t) {
        const n = mr.bind(null, e || t.find((r)=>typeof r == "object"));
        return t.map(n);
    }
    function nn(e, t) {
        const n = +Je(e) - +Je(t);
        return n < 0 ? -1 : n > 0 ? 1 : n;
    }
    function Vu(e) {
        return mr(e, Date.now());
    }
    function Uu(e, t, n) {
        const [r, a] = yr(n?.in, e, t), o = r.getFullYear() - a.getFullYear(), i = r.getMonth() - a.getMonth();
        return o * 12 + i;
    }
    function Hu(e) {
        return (t)=>{
            const r = (e ? Math[e] : Math.trunc)(t);
            return r === 0 ? 0 : r;
        };
    }
    function Bu(e, t) {
        return +Je(e) - +Je(t);
    }
    function qu(e, t) {
        const n = Je(e);
        return n.setHours(23, 59, 59, 999), n;
    }
    function Wu(e, t) {
        const n = Je(e), r = n.getMonth();
        return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
    }
    function $u(e, t) {
        const n = Je(e);
        return +qu(n) == +Wu(n);
    }
    function Yu(e, t, n) {
        const [r, a, o] = yr(n?.in, e, e, t), i = nn(a, o), s = Math.abs(Uu(a, o));
        if (s < 1) return 0;
        a.getMonth() === 1 && a.getDate() > 27 && a.setDate(30), a.setMonth(a.getMonth() - i * s);
        let u = nn(a, o) === -i;
        $u(r) && s === 1 && nn(r, o) === 1 && (u = !1);
        const l = i * (s - +u);
        return l === 0 ? 0 : l;
    }
    function Gu(e, t, n) {
        const r = Bu(e, t) / 1e3;
        return Hu(n?.roundingMethod)(r);
    }
    const Xu = {
        lessThanXSeconds: {
            one: "less than a second",
            other: "less than {{count}} seconds"
        },
        xSeconds: {
            one: "1 second",
            other: "{{count}} seconds"
        },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
            one: "less than a minute",
            other: "less than {{count}} minutes"
        },
        xMinutes: {
            one: "1 minute",
            other: "{{count}} minutes"
        },
        aboutXHours: {
            one: "about 1 hour",
            other: "about {{count}} hours"
        },
        xHours: {
            one: "1 hour",
            other: "{{count}} hours"
        },
        xDays: {
            one: "1 day",
            other: "{{count}} days"
        },
        aboutXWeeks: {
            one: "about 1 week",
            other: "about {{count}} weeks"
        },
        xWeeks: {
            one: "1 week",
            other: "{{count}} weeks"
        },
        aboutXMonths: {
            one: "about 1 month",
            other: "about {{count}} months"
        },
        xMonths: {
            one: "1 month",
            other: "{{count}} months"
        },
        aboutXYears: {
            one: "about 1 year",
            other: "about {{count}} years"
        },
        xYears: {
            one: "1 year",
            other: "{{count}} years"
        },
        overXYears: {
            one: "over 1 year",
            other: "over {{count}} years"
        },
        almostXYears: {
            one: "almost 1 year",
            other: "almost {{count}} years"
        }
    }, Ku = (e, t, n)=>{
        let r;
        const a = Xu[e];
        return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
    };
    function zn(e) {
        return (t = {})=>{
            const n = t.width ? String(t.width) : e.defaultWidth;
            return e.formats[n] || e.formats[e.defaultWidth];
        };
    }
    const Ju = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
    }, Zu = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
    }, Qu = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    }, ec = {
        date: zn({
            formats: Ju,
            defaultWidth: "full"
        }),
        time: zn({
            formats: Zu,
            defaultWidth: "full"
        }),
        dateTime: zn({
            formats: Qu,
            defaultWidth: "full"
        })
    }, tc = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    }, nc = (e, t, n, r)=>tc[e];
    function Ft(e) {
        return (t, n)=>{
            const r = n?.context ? String(n.context) : "standalone";
            let a;
            if (r === "formatting" && e.formattingValues) {
                const i = e.defaultFormattingWidth || e.defaultWidth, s = n?.width ? String(n.width) : i;
                a = e.formattingValues[s] || e.formattingValues[i];
            } else {
                const i = e.defaultWidth, s = n?.width ? String(n.width) : e.defaultWidth;
                a = e.values[s] || e.values[i];
            }
            const o = e.argumentCallback ? e.argumentCallback(t) : t;
            return a[o];
        };
    }
    const rc = {
        narrow: [
            "B",
            "A"
        ],
        abbreviated: [
            "BC",
            "AD"
        ],
        wide: [
            "Before Christ",
            "Anno Domini"
        ]
    }, ac = {
        narrow: [
            "1",
            "2",
            "3",
            "4"
        ],
        abbreviated: [
            "Q1",
            "Q2",
            "Q3",
            "Q4"
        ],
        wide: [
            "1st quarter",
            "2nd quarter",
            "3rd quarter",
            "4th quarter"
        ]
    }, oc = {
        narrow: [
            "J",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D"
        ],
        abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    }, ic = {
        narrow: [
            "S",
            "M",
            "T",
            "W",
            "T",
            "F",
            "S"
        ],
        short: [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
        ],
        abbreviated: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
    }, sc = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        }
    }, lc = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        }
    }, uc = (e, t)=>{
        const n = Number(e), r = n % 100;
        if (r > 20 || r < 10) switch(r % 10){
            case 1:
                return n + "st";
            case 2:
                return n + "nd";
            case 3:
                return n + "rd";
        }
        return n + "th";
    }, cc = {
        ordinalNumber: uc,
        era: Ft({
            values: rc,
            defaultWidth: "wide"
        }),
        quarter: Ft({
            values: ac,
            defaultWidth: "wide",
            argumentCallback: (e)=>e - 1
        }),
        month: Ft({
            values: oc,
            defaultWidth: "wide"
        }),
        day: Ft({
            values: ic,
            defaultWidth: "wide"
        }),
        dayPeriod: Ft({
            values: sc,
            defaultWidth: "wide",
            formattingValues: lc,
            defaultFormattingWidth: "wide"
        })
    };
    function Dt(e) {
        return (t, n = {})=>{
            const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
            if (!o) return null;
            const i = o[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], u = Array.isArray(s) ? dc(s, (f)=>f.test(i)) : fc(s, (f)=>f.test(i));
            let l;
            l = e.valueCallback ? e.valueCallback(u) : u, l = n.valueCallback ? n.valueCallback(l) : l;
            const c = t.slice(i.length);
            return {
                value: l,
                rest: c
            };
        };
    }
    function fc(e, t) {
        for(const n in e)if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
    }
    function dc(e, t) {
        for(let n = 0; n < e.length; n++)if (t(e[n])) return n;
    }
    function vc(e) {
        return (t, n = {})=>{
            const r = t.match(e.matchPattern);
            if (!r) return null;
            const a = r[0], o = t.match(e.parsePattern);
            if (!o) return null;
            let i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
            i = n.valueCallback ? n.valueCallback(i) : i;
            const s = t.slice(a.length);
            return {
                value: i,
                rest: s
            };
        };
    }
    const hc = /^(\d+)(th|st|nd|rd)?/i, pc = /\d+/i, _c = {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
    }, gc = {
        any: [
            /^b/i,
            /^(a|c)/i
        ]
    }, mc = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
    }, yc = {
        any: [
            /1/i,
            /2/i,
            /3/i,
            /4/i
        ]
    }, bc = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    }, wc = {
        narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i
        ],
        any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i
        ]
    }, Cc = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    }, kc = {
        narrow: [
            /^s/i,
            /^m/i,
            /^t/i,
            /^w/i,
            /^t/i,
            /^f/i,
            /^s/i
        ],
        any: [
            /^su/i,
            /^m/i,
            /^tu/i,
            /^w/i,
            /^th/i,
            /^f/i,
            /^sa/i
        ]
    }, Ec = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    }, Sc = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i
        }
    }, xc = {
        ordinalNumber: vc({
            matchPattern: hc,
            parsePattern: pc,
            valueCallback: (e)=>parseInt(e, 10)
        }),
        era: Dt({
            matchPatterns: _c,
            defaultMatchWidth: "wide",
            parsePatterns: gc,
            defaultParseWidth: "any"
        }),
        quarter: Dt({
            matchPatterns: mc,
            defaultMatchWidth: "wide",
            parsePatterns: yc,
            defaultParseWidth: "any",
            valueCallback: (e)=>e + 1
        }),
        month: Dt({
            matchPatterns: bc,
            defaultMatchWidth: "wide",
            parsePatterns: wc,
            defaultParseWidth: "any"
        }),
        day: Dt({
            matchPatterns: Cc,
            defaultMatchWidth: "wide",
            parsePatterns: kc,
            defaultParseWidth: "any"
        }),
        dayPeriod: Dt({
            matchPatterns: Ec,
            defaultMatchWidth: "any",
            parsePatterns: Sc,
            defaultParseWidth: "any"
        })
    }, Tc = {
        code: "en-US",
        formatDistance: Ku,
        formatLong: ec,
        formatRelative: nc,
        localize: cc,
        match: xc,
        options: {
            weekStartsOn: 0,
            firstWeekContainsDate: 1
        }
    };
    function Ic(e, t, n) {
        const r = ju(), a = n?.locale ?? r.locale ?? Tc, o = 2520, i = nn(e, t);
        if (isNaN(i)) throw new RangeError("Invalid time value");
        const s = Object.assign({}, n, {
            addSuffix: n?.addSuffix,
            comparison: i
        }), [u, l] = yr(n?.in, ...i > 0 ? [
            t,
            e
        ] : [
            e,
            t
        ]), c = Gu(l, u), f = (Yr(l) - Yr(u)) / 1e3, d = Math.round((c - f) / 60);
        let p;
        if (d < 2) return n?.includeSeconds ? c < 5 ? a.formatDistance("lessThanXSeconds", 5, s) : c < 10 ? a.formatDistance("lessThanXSeconds", 10, s) : c < 20 ? a.formatDistance("lessThanXSeconds", 20, s) : c < 40 ? a.formatDistance("halfAMinute", 0, s) : c < 60 ? a.formatDistance("lessThanXMinutes", 1, s) : a.formatDistance("xMinutes", 1, s) : d === 0 ? a.formatDistance("lessThanXMinutes", 1, s) : a.formatDistance("xMinutes", d, s);
        if (d < 45) return a.formatDistance("xMinutes", d, s);
        if (d < 90) return a.formatDistance("aboutXHours", 1, s);
        if (d < Wr) {
            const v = Math.round(d / 60);
            return a.formatDistance("aboutXHours", v, s);
        } else {
            if (d < o) return a.formatDistance("xDays", 1, s);
            if (d < Zt) {
                const v = Math.round(d / Wr);
                return a.formatDistance("xDays", v, s);
            } else if (d < Zt * 2) return p = Math.round(d / Zt), a.formatDistance("aboutXMonths", p, s);
        }
        if (p = Yu(l, u), p < 12) {
            const v = Math.round(d / Zt);
            return a.formatDistance("xMonths", v, s);
        } else {
            const v = p % 12, m = Math.trunc(p / 12);
            return v < 3 ? a.formatDistance("aboutXYears", m, s) : v < 9 ? a.formatDistance("overXYears", m, s) : a.formatDistance("almostXYears", m + 1, s);
        }
    }
    function Ac(e, t) {
        return Ic(e, Vu(e), t);
    }
    var Mc = A('<span class="timestamp svelte-1ep5iqz"> <span class="tooltip svelte-1ep5iqz"> </span></span>');
    Lc = function(e, t) {
        oe(t, !0);
        let n = new Date(t.date);
        const r = ()=>Ac(n, {
                addSuffix: !0
            });
        let a = q(ue(r()));
        mn(()=>{
            let l = setInterval(()=>{
                F(a, r(), !0);
            }, 1e3);
            return ()=>{
                clearInterval(l);
            };
        });
        var o = Mc(), i = k(o), s = S(i), u = k(s);
        V((l)=>{
            G(i, `${h(a) ?? ""} `), G(u, l);
        }, [
            ()=>n.toLocaleString([], {
                    dateStyle: "full",
                    timeStyle: "medium"
                })
        ]), g(e, o), ie();
    };
    var Pc = A(`You're <span class="person svelte-16454j8"><img class="avatar svelte-16454j8" width="30" height="30"/> </span>`, 1);
    function to(e, t) {
        oe(t, !0);
        let n = Q(()=>X.profile);
        var r = W(), a = N(r);
        {
            var o = (s)=>{
                var u = Pc(), l = S(N(u)), c = k(l), f = S(c);
                V(()=>{
                    re(c, "src", h(n).avatar_url), re(c, "alt", `Avatar for ${h(n).name ?? ""}`), G(f, ` ${h(n).name ?? ""}`);
                }), g(s, u);
            }, i = (s)=>{
                var u = fe("No profile :(");
                g(s, u);
            };
            L(a, (s)=>{
                h(n) ? s(o) : s(i, !1);
            });
        }
        g(e, r), ie();
    }
    var Fc = A(`and as a <strong>Silver</strong> tier supporter, you have early access to articles and
                videos, and you have access to bonus content!`, 1), Dc = A("and as a <strong>Bronze</strong> tier supporter, you have access to bonus content!", 1), Nc = A('<div class="paragraph-like buttons svelte-1tz5cof"><!> or <!></div>'), Rc = A("<p>Subscribe to the <!> to get early access to this content.</p> <!> <p>Did you just upgrade? &nbsp; <!></p>", 1), Oc = A("<p><!> <!></p> <!>", 1), zc = A("<p>This article will unlock <!>.</p>"), jc = A('<p>Alternatively, it is also available right now <a target="_blank">in video form</a>:</p> <!>', 1), Vc = A('<!> <p>Subscribe to the <!> to get early access to this content.</p> <!> <div class="login-innards-spacer"><!></div> <!>', 1), Uc = A('<p>You need to be logged in to see this page.</p> <div class="login-innards-spacer"><!></div>', 1), Hc = A('<!> <!> <div class="login-innards-spacer"><!></div>', 1);
    function no(e, t) {
        oe(t, !0);
        let n = [
            "nice",
            "rad",
            "cool",
            "awesome",
            "fantastic",
            "amazing",
            "excellent",
            "wonderful",
            "great",
            "superb",
            "stellar",
            "epic",
            "sweet",
            "brilliant",
            "marvelous",
            "splendid",
            "terrific",
            "fabulous",
            "incredible",
            "perfect"
        ], a = ue(n[Math.floor(Math.random() * n.length)]), o = Qe(t, [
            "$$slots",
            "$$events",
            "$$legacy"
        ]), { context: i, youtube: s } = o, u = Q(()=>X.viewer), l = Q(()=>X.profile), c = Q(()=>X.user_info);
        var f = W(), d = N(f);
        {
            var p = (m)=>{
                var _ = W(), C = N(_);
                {
                    var b = (E)=>{}, y = (E)=>{
                        var x = Oc(), T = N(x), w = k(T);
                        to(w, {});
                        var I = S(w, 2);
                        {
                            var M = (O)=>{
                                var B = Fc();
                                g(O, B);
                            }, P = (O)=>{
                                var B = W(), D = N(B);
                                {
                                    var z = (H)=>{
                                        var J = Dc();
                                        g(H, J);
                                    }, j = (H)=>{
                                        var J = fe();
                                        V(()=>G(J, `— ${a ?? ""}!`)), g(H, J);
                                    };
                                    L(D, (H)=>{
                                        h(u).has_bronze ? H(z) : H(j, !1);
                                    }, !0);
                                }
                                g(O, B);
                            };
                            L(I, (O)=>{
                                h(u).has_silver ? O(M) : O(P, !1);
                            });
                        }
                        var R = S(T, 2);
                        {
                            var U = (O)=>{
                                var B = Rc(), D = N(B), z = S(k(D));
                                Ht(z, {
                                    tier: "silver"
                                });
                                var j = S(D, 2);
                                {
                                    var H = (Z)=>{
                                        var he = Nc(), se = k(he);
                                        Xn(se, {
                                            get userInfo () {
                                                return h(c);
                                            }
                                        });
                                        var ee = S(se, 2);
                                        te(ee, {
                                            href: "/profile",
                                            target: "_blank",
                                            label: "Learn more",
                                            inlineflex: !0,
                                            secondary: !0
                                        }), g(Z, he);
                                    };
                                    L(j, (Z)=>{
                                        h(c) && Z(H);
                                    });
                                }
                                var J = S(j, 2), K = S(k(J));
                                gr(K, {
                                    onUpgrade: ()=>{
                                        (i === "extras" || i === "playwall") && window.location.reload();
                                    }
                                }), g(O, B);
                            };
                            L(R, (O)=>{
                                h(u).has_silver || O(U);
                            });
                        }
                        g(E, x);
                    };
                    L(C, (E)=>{
                        i == "end-of-page" ? E(b) : E(y, !1);
                    });
                }
                g(m, _);
            }, v = (m)=>{
                var _ = W(), C = N(_);
                {
                    var b = (E)=>{
                        var x = Vc(), T = N(x);
                        {
                            var w = (D)=>{
                                var z = zc(), j = S(k(z));
                                Lc(j, {
                                    get date () {
                                        return t.exclusiveUntil;
                                    }
                                }), g(D, z);
                            };
                            L(T, (D)=>{
                                t.exclusiveUntil && D(w);
                            });
                        }
                        var I = S(T, 2), M = S(k(I));
                        Ht(M, {
                            tier: "silver"
                        });
                        var P = S(I, 2);
                        qr(P, {
                            prefix: "You will join people like:"
                        });
                        var R = S(P, 2), U = k(R);
                        He(U, {});
                        var O = S(R, 2);
                        {
                            var B = (D)=>{
                                var z = jc(), j = N(z), H = S(k(j)), J = S(j, 2);
                                Ou(J, {
                                    get videoId () {
                                        return s;
                                    }
                                }), V(()=>re(H, "href", `https://youtu.be/${s ?? ""}`)), g(D, z);
                            };
                            L(O, (D)=>{
                                s && D(B);
                            });
                        }
                        g(E, x);
                    }, y = (E)=>{
                        var x = W(), T = N(x);
                        {
                            var w = (M)=>{
                                var P = Uc(), R = S(N(P), 2), U = k(R);
                                He(U, {}), g(M, P);
                            }, I = (M)=>{
                                var P = Hc(), R = N(P);
                                qr(R, {
                                    prefix: "Thanks to my sponsors:"
                                });
                                var U = S(R, 2);
                                Kn(U);
                                var O = S(U, 2), B = k(O);
                                He(B, {
                                    returnTo: "profile"
                                }), g(M, P);
                            };
                            L(T, (M)=>{
                                i == "extras" ? M(w) : M(I, !1);
                            }, !0);
                        }
                        g(E, x);
                    };
                    L(C, (E)=>{
                        t.context == "playwall" ? E(b) : E(y, !1);
                    }, !0);
                }
                g(m, _);
            };
            L(d, (m)=>{
                h(l) && h(u) ? m(p) : m(v, !1);
            });
        }
        g(e, f), ie();
    }
    var Bc = A("<p><!>, and you have access to extras!</p>"), qc = A('<h1 class="page-title">Extras</h1> <!>', 1);
    function Wc(e, t) {
        oe(t, !0);
        let n = Q(()=>X.viewer), r = Q(()=>X.profile);
        var a = qc(), o = S(N(a), 2);
        {
            var i = (u)=>{
                var l = Bc(), c = k(l);
                to(c, {}), g(u, l);
            }, s = (u)=>{
                no(u, {
                    context: "extras"
                });
            };
            L(o, (u)=>{
                h(n)?.has_bronze && h(r) ? u(i) : u(s, !1);
            });
        }
        g(e, a), ie();
    }
    function Gr(e) {
        if (e) {
            const t = e.indexOf("#");
            return t !== -1 ? e.slice(t) : null;
        }
        return null;
    }
    function $c() {
        let e = document.querySelector(".table-of-contents");
        if (!e) return;
        let t = document.querySelector("main .page-markup");
        if (!t) {
            console.warn("no main markup container");
            return;
        }
        let n = [];
        for (let c of t.querySelectorAll("& > a.anchor"))if (a(c)) {
            let f = Gr(c.href);
            f && n.push({
                href: f,
                a: c
            });
        }
        let r = new Map(n.map((c)=>[
                c.href,
                c
            ]));
        function a(c) {
            return !!c && c.tagName === "A";
        }
        function o(c) {
            return !!c && c.tagName === "LI";
        }
        let i = document.getElementById("playwall"), s = [];
        for (let c of e.querySelectorAll("li")){
            if (!o(c)) continue;
            let f = c.querySelector("& > a");
            if (!a(f)) continue;
            let d = Gr(f.href);
            if (!d) {
                console.debug("toc anchor without href", f);
                continue;
            }
            f.onclick = (m)=>{
                m.preventDefault();
                const _ = f.href.split("#")[1];
                document.getElementById(_)?.scrollIntoView({
                    behavior: "instant"
                }), window.history.pushState({}, "", `#${_}`);
            };
            let p = r.get(d);
            if (!p) {
                if (i) f.href = "#playwall";
                else {
                    console.debug("toc anchor without body anchor", f), console.debug("href was ", d);
                    for (let [m, _] of r)console.debug("had body anchor ", m);
                }
                continue;
            }
            let v = parseInt(c.dataset.level ?? "-1", 10);
            v >= 0 && s.push({
                tocLI: c,
                tocAnchor: f,
                bodyAnchor: p,
                level: v,
                href: d
            });
        }
        let u = -1, l = xs(()=>{
            let c = 0, f = 35;
            for(let d = 0; d < s.length; d++)s[d].bodyAnchor.a.getBoundingClientRect().top < f && (c = d);
            if (c != u) {
                u = c;
                for(let d = 0; d < s.length; d++){
                    let p = s[d];
                    if (d == c) {
                        p.tocLI.classList.add("reading"), p.level - 1;
                        for(let v = d - 1; v >= 0; v--)s[v].tocLI.classList.add("past");
                    } else p.tocLI.classList.remove("reading", "past");
                }
            }
        }, 16);
        window.addEventListener("scroll", l), window.addEventListener("resize", l), l();
    }
    const Xr = 5, Kr = .8;
    function Yc() {
        const e = document.querySelectorAll(".reading-time");
        let t = 0, n = null, r = ()=>{
            t++, console.log(`Click registered. Click count: ${t}`), t === Xr && (console.log(`${Xr} clicks reached, activating prez mode`), document.documentElement.classList.add("prez"), t = 0);
        }, a = ()=>{
            console.log("Mouse down detected"), n = window.setTimeout(()=>{
                console.log(`${Kr} second timeout reached, activating prez mode`), document.documentElement.classList.add("prez");
            }, Kr * 1e3);
        }, o = ()=>{
            console.log("Mouse up detected"), n && (console.log("Clearing press timer"), clearTimeout(n), n = null);
        };
        for (const i of e)i.addEventListener("click", r), i.addEventListener("mousedown", a), i.addEventListener("mouseup", o), i.addEventListener("mouseleave", o);
    }
    const Jn = Gt("app:main");
    let Gc = [
        {
            inputPath: "/content/admin.md",
            doImport: ()=>et(()=>import("./index.svelte-BbdTeiJT.js"), __vite__mapDeps([0,1,2]))
        },
        {
            inputPath: "/content/articles/all-color-is-best-effort/_index.md",
            doImport: ()=>et(()=>import("./index.svelte-D7FENdb1.js").then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), __vite__mapDeps([3,4,1,5]))
        },
        {
            inputPath: "/content/articles/the-science-of-loudness/_index.md",
            doImport: ()=>et(()=>import("./index.svelte-Dr5U7zWH.js").then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), __vite__mapDeps([6,4,1,7]))
        },
        {
            inputPath: "/content/articles/the-virtue-of-unsynn/_index.md",
            doImport: ()=>et(()=>import("./index.svelte-NzjLBdGi.js"), __vite__mapDeps([8,9,1,10]))
        },
        {
            inputPath: "/content/articles/introducing-facet-reflection-for-rust/_index.md",
            doImport: ()=>et(()=>import("./index.svelte-CXSPELPL.js"), __vite__mapDeps([11,9,1,12]))
        },
        {
            inputPath: "/content/articles/making-our-own-spectrogram/_index.md",
            doImport: ()=>et(()=>import("./index.svelte-Bn4CWvrF.js").then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), __vite__mapDeps([13,4,1,14]))
        },
        {
            inputPath: "/content/articles/making-our-own-spectrogram/video.md",
            doImport: ()=>et(()=>import("./index.svelte-Bn4CWvrF.js").then(async (m)=>{
                        await m.__tla;
                        return m;
                    }), __vite__mapDeps([13,4,1,14]))
        }
    ];
    {
        let e = ue({
            visible: !1,
            onclose: ()=>{
                e.visible = !1;
            }
        });
        fr(fu, {
            target: document.body,
            props: e
        }), document.addEventListener("click", (t)=>{
            t.target.closest(".exclusive-star") && (Jn("Exclusive star clicked, showing explainer"), t.preventDefault(), e.visible = !0);
        });
    }
    function Jr() {
        let e = document.querySelectorAll(".git-repo-svelte-component");
        for(let s = 0; s < e.length; s++){
            let u = e[s];
            const l = u.getAttribute("data-repo-name") ?? "";
            tt(eo, {
                target: u,
                props: {
                    repoName: l
                }
            });
        }
        let t = document.getElementById("page-topnav");
        t && (t.innerHTML = "", tt(Au, {
            target: t,
            props: {}
        }));
        let n = document.getElementById("login-page");
        n && (n.innerHTML = "", tt(He, {
            target: n,
            props: {}
        })), document.querySelectorAll(".login-island").forEach((s)=>{
            s.innerHTML = "", tt(He, {
                target: s,
                props: {}
            });
        }), document.querySelectorAll(".gentle-nudge-island").forEach((s)=>{
            let u = s;
            u.innerHTML = "";
            const l = u.dataset.context, c = u.dataset.exclusiveUntil, f = u.dataset.customMessage;
            if (l !== "end-of-page" && l !== "extras" && l !== "playwall" && l !== "profile") throw console.error("Invalid context for element:", u), console.error("Element's outer HTML:", u.outerHTML), new Error(`Invalid context: ${l}. Valid contexts are: end-of-page, extras, playwall`);
            tt(no, {
                target: u,
                props: {
                    context: l,
                    exclusiveUntil: c ?? "",
                    customMessage: f,
                    youtube: u.dataset.youtube,
                    repoName: u.dataset.repoName
                }
            });
        }), document.querySelectorAll(".extras-island").forEach((s)=>{
            let u = s;
            u.innerHTML = "", tt(Wc, {
                target: u,
                props: {}
            });
        });
        let i = document.getElementById("svelte-component-profile-page");
        i && (i.innerHTML = "", tt(uu, {
            target: i,
            props: {}
        })), Xc(), $c(), Di(), Ni();
    }
    function Xc() {
        let e = document.querySelector('meta[property="home:page-path"]')?.getAttribute("content") || "";
        const t = Gc.find((n)=>e === n.inputPath);
        t ? (Jn("Found page collection for input path", e), t.doImport().then((n)=>{
            n.main();
        })) : Jn("No page collection for input path", e);
    }
    function Kc() {
        Ks(), Yc(), new URLSearchParams(window.location.search).has("fusion") && fs(), Jr(), window.addEventListener(Cu.TURBO_NAVIGATION_HAPPENED, (e)=>{
            Jr();
        });
    }
    Kc();
})();
export { sn as $, fe as A, De as B, nf as C, ef as D, $a as E, Ke as F, Ss as G, Jc as H, ke as I, Ir as J, ti as K, Ga as L, _r as M, _t as N, Vt as O, Ya as P, ja as Q, Lc as R, tf as S, Ra as T, dr as U, qt as V, Qc as W, Mo as X, At as Y, It as Z, ge as _, g as a, ne as a0, ya as a1, ce as a2, gt as a3, Qe as a4, mi as a5, af as a6, rf as a7, Oi as a8, gi as a9, tt as aa, A as b, W as c, k as d, Te as e, N as f, vr as g, G as h, L as i, oe as j, un as k, ie as l, Ze as m, q as n, ue as o, Le as p, mn as q, h as r, S as s, V as t, F as u, ut as v, Et as w, Ne as x, Q as y, re as z, __tla };
