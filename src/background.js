function initializeContentScript() {
  chrome.storage.local.get("enabled", (data) => {
    const enabled = data.enabled !== false;

    chrome.scripting.unregisterContentScripts({ id: 'http-to-https-redirector' }, () => {
      if (enabled) {
        chrome.scripting.registerContentScripts([{
          id: 'http-to-https-redirector',
          matches: ['http://*/*'],
          js: ['content.js'],
          runAt: 'document_start'
        }]);
      }
    });
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) {
    initializeContentScript();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.notification) {
      chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',  // Ensure you have this icon file
          title: 'HTTP prevented! Redirected to HTTPS URL.',
          message: message.notification,
      });
  }
});


initializeContentScript();
