chrome.storage.local.get(["enabled", "exclusions", "forceHttpLocalhost"], (data) => {
  const enabled = data.enabled !== false;
  const exclusions = data.exclusions || [];
  const forceHttpLocalhost = data.forceHttpLocalhost === true;
  const currentDomain = window.location.hostname;

  // Check if the current domain is in the exclusions list
  const isExcluded = exclusions.some(domain => currentDomain.includes(domain));

  if (enabled && !isExcluded) {
    if (currentDomain === 'localhost' && forceHttpLocalhost) {
      // Do nothing if localhost and force HTTP is enabled
      return;
    }

    if (window.location.protocol === 'http:') {
      chrome.storage.local.get("redirectCount", (data) => {
        const redirectCount = (data.redirectCount || 0) + 1;
        chrome.storage.local.set({ redirectCount });
      });

      const httpsUrl = window.location.href.replace(/^http:/, 'https:');
      window.location.href = httpsUrl;
      chrome.runtime.sendMessage({ notification: `Redirected to ${httpsUrl}` });
    }
  }
});
