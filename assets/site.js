/* VolleyTrack site — progressive enhancement.
   The site works without JS; this only improves two forms and the help filter.
   No analytics, no tracking, no third-party calls. */
(function () {
  'use strict';

  /* ---- Email/contact forms: build a mailto so they work with no backend ----
     Any <form data-mailto="addr" data-subject="…"> is intercepted. Fields are
     summarized into the mail body. A hidden honeypot ([name=company]) drops bots.
     data-confirm="<id>" reveals a confirmation panel and hides the form on submit. */
  function serialize(form) {
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.name === 'company') return;
      if (el.type === 'checkbox') {
        lines.push(labelFor(form, el) + ': ' + (el.checked ? 'Yes' : 'No'));
      } else if (el.value && el.value.trim()) {
        lines.push(labelFor(form, el) + ': ' + el.value.trim());
      }
    });
    return lines.join('\n');
  }

  function labelFor(form, el) {
    var lab = form.querySelector('label[for="' + el.id + '"]');
    var text = lab ? lab.textContent : el.name;
    return text.replace(/\s*\*\s*$/, '').replace(/\s+/g, ' ').trim();
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-mailto]'), function (form) {
    form.addEventListener('submit', function (e) {
      // Honeypot: a real user never fills this.
      var pot = form.querySelector('[name="company"]');
      if (pot && pot.value) { e.preventDefault(); return; }
      if (!form.checkValidity()) return; // let the browser show native validation
      e.preventDefault();

      var to = form.getAttribute('data-mailto');
      var subject = form.getAttribute('data-subject') || 'VolleyTrack';
      var body = serialize(form);
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      var confirmId = form.getAttribute('data-confirm');
      if (confirmId) {
        var panel = document.getElementById(confirmId);
        if (panel) { form.hidden = true; panel.hidden = false; panel.setAttribute('tabindex', '-1'); panel.focus(); }
      } else {
        form.reset();
      }
    });
  });

  /* ---- Help Center: filter the featured-article list as you type ----
     Filters only over titles that actually exist on the page — never fakes results. */
  var search = document.getElementById('help-search');
  if (search) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-article-title]'));
    var empty = document.getElementById('help-search-empty');
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (el) {
        var match = !q || el.getAttribute('data-article-title').toLowerCase().indexOf(q) !== -1;
        el.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = !(q && shown === 0);
    });
  }

  /* ---- Help article: acknowledge Yes/No feedback locally ----
     No endpoint is wired yet, so this only shows a thank-you — it does not
     log or transmit anything. Replace with a real event when analytics exist. */
  var feedbackBtns = document.querySelectorAll('[data-feedback]');
  if (feedbackBtns.length) {
    Array.prototype.forEach.call(feedbackBtns, function (btn) {
      btn.addEventListener('click', function () {
        var group = document.querySelector('[data-feedback-group]');
        var thanks = document.getElementById('article-feedback-thanks');
        if (group) group.hidden = true;
        if (thanks) thanks.hidden = false;
      });
    });
  }
})();
