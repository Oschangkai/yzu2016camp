! function(a) {
    "use strict";

    function b(b, c) {
        var d = new XMLHttpRequest;
        (b.preventCache || null !== b.getAttribute("prevent-cache")) && (c += (/\?/.test(c) ? "&" : "?") + (new Date).getTime()), d.open("GET", c, !0), d.onreadystatechange = function() {
            var c, e, f;
            4 === d.readyState && (c = d.responseText || "", null !== b.parentNode ? b.outerHTML = c : b.content = c, e = new DOMParser, f = e.parseFromString(c, "text/xml"), Array.prototype.forEach.call(f.querySelectorAll("script"), function(b) {
                var c, d = b.getAttribute("src");
                a.addEventListener("beforeLoad", function() {
                    d && (c = document.createElement("script"), c.setAttribute("src", d), document.querySelector("head").appendChild(c)), d || eval.call(null, b.innerHTML)
                })
            }))
        }, d.send()
    }
    var c;
    ! function() {
        var b, c, d = new Event("DOMContentLoaded"),
            e = new Event("load"),
            f = new Event("beforeLoad"),
            g = !1;
        b = function(a) {
            a.stopImmediatePropagation(), g = !0
        }, c = function(h) {
            h.stopImmediatePropagation();
            var i = setInterval(function() {
                0 === document.body.querySelectorAll("html-include[src]").length && (clearInterval(i), document.removeEventListener("DOMContentLoaded", c, !0), a.removeEventListener("load", b, !0), a.dispatchEvent(f), document.dispatchEvent(d), g && a.dispatchEvent(e))
            }, 1)
        }, a.addEventListener("load", b, !0), document.addEventListener("DOMContentLoaded", c, !0)
    }(), c = Object.create(a.HTMLElement.prototype), c.attributeChangedCallback = function(a, b, c) {
        "src" === a && (this.src = c)
    }, c.attachedCallback = function() {
        this.content && (this.outerHTML = this.content)
    }, c.createdCallback = function() {
        var a, c = this;
        return (a = this.src || this.getAttribute("src") || !1) ? void b(this, a) : void Object.defineProperty(this, "src", {
            set: function(a) {
                b(c, a)
            },
            get: function() {
                return c.getAttribute("src") || ""
            }
        })
    }, document.registerElement("html-include", {
        prototype: c
    })
}(this);
