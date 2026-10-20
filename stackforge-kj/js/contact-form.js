(function () {
    var CONFIG = { accessKey: "58e8a87b-52ba-4a68-93ff-0fa40e3a0b68", endpoint: "https://api.web3forms.com/submit", fallbackEmail: "consultkingss@gmail.com" };
    var form = document.getElementById("contact-form"); if (!form) return;
    var statusEl = document.getElementById("form-status"), btn = form.querySelector("[type=submit]"), label = btn.textContent, busy = false;
    var rules = {
        name: function (v) { return v.length < 2 ? "Please enter your name (at least 2 characters)." : "" },
        email: function (v) { return !v ? "Please enter your email address." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Please enter a valid email address." : "" },
        message: function (v) { return v.length < 10 ? "Please write at least 10 characters." : v.length > 2000 ? "Message is too long (2000 characters maximum)." : "" }
    };
    function check(n) { var f = form.elements[n], m = rules[n](f.value.trim()); document.getElementById(n + "-error").textContent = m; f.setAttribute("aria-invalid", m ? "true" : "false"); return m }
    function show(type, html) { statusEl.hidden = false; statusEl.setAttribute("data-state", type); statusEl.innerHTML = html }
    Object.keys(rules).forEach(function (n) {
        var f = form.elements[n];
        f.addEventListener("blur", function () { if (f.value || f.getAttribute("aria-invalid") === "true") check(n) });
        f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") check(n) });
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (busy) return;
        if (form.elements.botcheck.checked) return;
        var bad = Object.keys(rules).filter(function (n) { return check(n) });
        if (bad.length) { form.elements[bad[0]].focus(); show("error", "Please fix the highlighted fields and try again."); return }
        var mail = '<a href="mailto:' + CONFIG.fallbackEmail + '">' + CONFIG.fallbackEmail + '</a>';
        if (CONFIG.accessKey.indexOf("YOUR_") === 0) { show("error", "The form is not connected yet. Please email me directly at " + mail + "."); return }
        busy = true; btn.disabled = true; btn.textContent = "Sending..."; show("info", "Sending your message...");
        fetch(CONFIG.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: CONFIG.accessKey, subject: "New message from your portfolio", from_name: "STACKFORGE-KJ Portfolio", name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), message: form.elements.message.value.trim() }) })
            .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d } }) })
            .then(function (x) {
                if (x.ok && x.d.success) { form.reset(); show("success", "Thank you. Your message was sent and I will reply soon.") }
                else show("error", "Your message could not be sent. Please try again or email " + mail + ".");
            })
            .catch(function () { show("error", "Network problem. Please check your connection and try again, or email " + mail + ".") })
            .then(function () { busy = false; btn.disabled = false; btn.textContent = label });
    });
})();
