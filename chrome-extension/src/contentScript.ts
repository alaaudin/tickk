/// <reference types="chrome" />

let isTickkEnabled = true;

const injectToggle = (composeWindow: HTMLElement) => {
  // Prevent duplicate injection
  if (composeWindow.querySelector('.tickk-toggle-container')) return;

  const sendButtonTable = composeWindow.querySelector('.gU.Up');
  if (!sendButtonTable) return;

  // Create Toggle UI matching Tickk Dashboard tokens
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'tickk-toggle-container';
  toggleContainer.style.display = 'inline-flex';
  toggleContainer.style.alignItems = 'center';
  toggleContainer.style.marginLeft = '16px';
  toggleContainer.style.cursor = 'pointer';
  toggleContainer.style.fontFamily = 'Inter, -apple-system, sans-serif';
  toggleContainer.style.fontSize = '13px';
  toggleContainer.style.color = '#52525b';
  toggleContainer.style.fontWeight = '500';
  toggleContainer.style.userSelect = 'none';

  const toggleTrack = document.createElement('div');
  toggleTrack.style.width = '32px';
  toggleTrack.style.height = '18px';
  toggleTrack.style.backgroundColor = isTickkEnabled ? '#000000' : '#e4e4e7';
  toggleTrack.style.borderRadius = '999px';
  toggleTrack.style.position = 'relative';
  toggleTrack.style.marginRight = '8px';
  toggleTrack.style.transition = 'background-color 0.2s';

  const toggleThumb = document.createElement('div');
  toggleThumb.style.width = '14px';
  toggleThumb.style.height = '14px';
  toggleThumb.style.backgroundColor = '#ffffff';
  toggleThumb.style.borderRadius = '50%';
  toggleThumb.style.position = 'absolute';
  toggleThumb.style.top = '2px';
  toggleThumb.style.left = isTickkEnabled ? '16px' : '2px';
  toggleThumb.style.transition = 'left 0.2s';
  toggleThumb.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';

  toggleTrack.appendChild(toggleThumb);

  const toggleLabel = document.createElement('span');
  toggleLabel.innerText = `Track Mail: ${isTickkEnabled ? 'ON' : 'OFF'}`;
  
  toggleContainer.appendChild(toggleTrack);
  toggleContainer.appendChild(toggleLabel);

  toggleContainer.addEventListener('click', () => {
    isTickkEnabled = !isTickkEnabled;
    toggleTrack.style.backgroundColor = isTickkEnabled ? '#000000' : '#e4e4e7';
    toggleThumb.style.left = isTickkEnabled ? '16px' : '2px';
    toggleLabel.innerText = `Track Mail: ${isTickkEnabled ? 'ON' : 'OFF'}`;
  });

  sendButtonTable.appendChild(toggleContainer);
  
  interceptSendButton(composeWindow);
};

const interceptSendButton = (composeWindow: HTMLElement) => {
  // Find the primary send button. Gmail classes often change, but .dC > .J-J5-Ji or aria-label starting with Send is common.
  const sendButton = composeWindow.querySelector('.dC [role="button"], .gU.Up [role="button"]') as HTMLElement;
  if (!sendButton) return;

  // We need to intercept the click in the capture phase
  sendButton.addEventListener('click', async (e) => {
    if (!isTickkEnabled || sendButton.hasAttribute('data-tickk-processing')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    sendButton.setAttribute('data-tickk-processing', 'true');
    const originalText = sendButton.innerText;
    sendButton.innerText = "Tracking...";

    try {
      const apiKeyResult = await new Promise<{ tickk_api_key?: string }>((resolve) => {
        chrome.storage.local.get(['tickk_api_key'], resolve);
      });

      if (!apiKeyResult.tickk_api_key) {
        console.warn("Tickk: No API key found. Skipping tracking.");
        resumeSend(sendButton, originalText);
        return;
      }

      // Extract details
      const toField = composeWindow.querySelector('[name="to"]') as HTMLInputElement;
      const toElement = composeWindow.querySelector('.agP.aFw') || composeWindow.querySelector('.vO');
      const subjectField = composeWindow.querySelector('[name="subjectbox"]') as HTMLInputElement;
      
      let recipient = toField ? toField.value : '';
      if (!recipient && toElement) recipient = toElement.textContent || '';
      const subject = subjectField ? subjectField.value : '';

      const response = await fetch("https://tickk-backend.onrender.com/api/track/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKeyResult.tickk_api_key
        },
        body: JSON.stringify({
          recipient: recipient || 'Unknown',
          subject: subject || '(No Subject)'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.id) {
          const bodyElement = composeWindow.querySelector('.Am.Al.editable');
          if (bodyElement) {
            const pixel = document.createElement('img');
            pixel.src = `https://tickk-backend.onrender.com/api/track/pixel?id=${data.id}`;
            pixel.width = 1;
            pixel.height = 1;
            pixel.style.display = 'none';
            bodyElement.appendChild(pixel);
          }
        }
      }
    } catch (err) {
      console.error("Tickk tracking error:", err);
    }

    resumeSend(sendButton, originalText);
  }, true); // capture phase
};

const resumeSend = (sendButton: HTMLElement, originalText: string) => {
  sendButton.innerText = originalText;
  // Programmatically click again to let Gmail handle it
  sendButton.click();
  // Remove the attribute so it doesn't block future sends in same session
  setTimeout(() => {
    sendButton.removeAttribute('data-tickk-processing');
  }, 1000);
};

// Observe DOM for compose windows
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of Array.from(mutation.addedNodes)) {
      if (node instanceof HTMLElement) {
        // Gmail compose window container often uses role="dialog"
        if (node.getAttribute('role') === 'dialog' || node.classList.contains('M9') || node.querySelector('.M9')) {
          const composeWindow = node.getAttribute('role') === 'dialog' ? node : (node.querySelector('[role="dialog"]') || node);
          injectToggle(composeWindow as HTMLElement);
        } else if (node.classList.contains('gU') || node.querySelector('.gU.Up')) {
          // Sometimes the footer is injected later
          const composeWindow = node.closest('[role="dialog"]') as HTMLElement;
          if (composeWindow) injectToggle(composeWindow);
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
