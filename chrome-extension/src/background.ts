/// <reference types="chrome" />

chrome.runtime.onMessageExternal.addListener((request, _sender, sendResponse) => {
  if (request.type === 'TICKK_AUTH_SUCCESS' && request.apiKey) {
    chrome.storage.local.set({ tickk_api_key: request.apiKey }, () => {
      console.log('Tickk API Key saved from external auth flow');
      sendResponse({ success: true });
    });
    return true; // Keep the message channel open for async response
  }
});
