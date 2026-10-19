(function () {
   var SOCIALS = {
      github: "https://github.com/Stackforge-KJ",
      telegram: "https://t.me/@wwwNuel ",
      slack: "https://YOUR_WORKSPACE.slack.com",
      x: "https://x.com/YOUR_USERNAME"
   };
   var NAMES = { telegram: "Telegram", slack: "Slack", x: "X" };
   var S = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
   var ICONS = {
      telegram: S + '<path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>',
      slack: S + '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>',
      x: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
   };
   document.querySelectorAll(".site-footer__social,.social").forEach(function (ul) {
      var mail = ul.querySelector('a[href^="mailto:"]'), before = mail ? mail.closest("li") : null;
      ["telegram", "slack", "x"].forEach(function (k) {
         if (ul.querySelector('[data-social="' + k + '"]')) return;
         var li = document.createElement("li");
         li.innerHTML = '<a class="icon-btn" data-social="' + k + '" target="_blank" rel="noopener noreferrer" aria-label="' + NAMES[k] + ' (opens in a new tab)">' + ICONS[k] + '</a>';
         ul.insertBefore(li, before);
      });
   });
   document.querySelectorAll("[data-social]").forEach(function (a) {
      var u = SOCIALS[a.getAttribute("data-social")]; if (u) a.setAttribute("href", u);
   });
})();
