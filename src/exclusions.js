document.addEventListener('DOMContentLoaded', () => {
    const exclusionListTextarea = document.getElementById('exclusion-list');
  
    // Load existing exclusions
    chrome.storage.local.get("exclusions", (data) => {
      exclusionListTextarea.value = (data.exclusions || []).join("\n");
    });
  
    // Save exclusions
    document.getElementById('save-exclusions').addEventListener('click', () => {
      const exclusions = exclusionListTextarea.value.split("\n").map(e => e.trim()).filter(e => e);
      chrome.storage.local.set({ exclusions });
      alert('Exclusions saved.');
    });
  });
  