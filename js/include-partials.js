document.addEventListener('DOMContentLoaded', function () {
  const includes = document.querySelectorAll('[data-include]');
  const promises = [];
  includes.forEach(function (el) {
    const url = el.getAttribute('data-include');
    if (!url) return;
    const p = fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Network response not ok');
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        console.error('Include failed:', url, err);
      });
    promises.push(p);
  });

  // Cuando todas las inclusiones terminen, despachamos un evento
  Promise.all(promises).then(function () {
    document.dispatchEvent(new CustomEvent('partialsLoaded'));
  });
});
