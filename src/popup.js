document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const forceHttpLocalhost = document.getElementById('force-http-localhost');
  const analyticsSpan = document.getElementById('analytics');
  const contactButton = document.getElementById('contact-us');

  chrome.storage.local.get(["enabled", "forceHttpLocalhost", "redirectCount"], (data) => {
    toggle.checked = data.enabled !== false;
    forceHttpLocalhost.checked = data.forceHttpLocalhost === true;
    analyticsSpan.textContent = data.redirectCount || 0;
  });

  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });

  forceHttpLocalhost.addEventListener('change', () => {
    chrome.storage.local.set({ forceHttpLocalhost: forceHttpLocalhost.checked });
  });

  document.getElementById('manage-exclusions').addEventListener('click', () => {
    chrome.tabs.create({ url: 'exclusions.html' });
  });

  contactButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'contact.html' });
  });
});
