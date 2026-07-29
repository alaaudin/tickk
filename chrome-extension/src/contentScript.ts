/// <reference types="chrome" />

let isTickkEnabled = true;

const injectToggle = (composeWindow: HTMLElement) => {
  // Prevent duplicate injection
  if (composeWindow.querySelector('.tickk-toggle-container')) return;

  const sendButtonTable = composeWindow.querySelector('.gU.Up');
  if (!sendButtonTable) return;

  // Main container (relative for absolute positioning of popup)
  const container = document.createElement('div');
  container.className = 'tickk-toggle-container';
  container.style.position = 'relative';
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.marginLeft = '16px';
  container.style.fontFamily = 'Inter, -apple-system, sans-serif';

  // 1. Header Pill Badge
  const pillBadge = document.createElement('button');
  pillBadge.style.backgroundColor = 'rgba(24, 24, 27, 0.9)'; // bg-zinc-900/90
  pillBadge.style.color = '#e4e4e7'; // text-zinc-200
  pillBadge.style.border = '1px solid #27272a'; // border-zinc-800
  pillBadge.style.borderRadius = '9999px'; // rounded-full
  pillBadge.style.padding = '4px 12px'; // px-3 py-1
  pillBadge.style.fontSize = '12px'; // text-xs
  pillBadge.style.cursor = 'pointer';
  pillBadge.style.display = 'inline-flex';
  pillBadge.style.alignItems = 'center';
  pillBadge.style.gap = '6px';
  pillBadge.style.fontWeight = '500';
  pillBadge.style.transition = 'all 0.2s ease-in-out';
  // Note: Hover state is handled via event listeners below

  const statusDot = document.createElement('div');
  statusDot.style.width = '6px';
  statusDot.style.height = '6px';
  statusDot.style.borderRadius = '50%';
  statusDot.style.backgroundColor = isTickkEnabled ? '#10b981' : '#71717a'; // emerald-500 : zinc-500
  statusDot.style.transition = 'background-color 0.2s';
  
  const pillText = document.createElement('span');
  pillText.innerText = 'Tickk';

  pillBadge.appendChild(statusDot);
  pillBadge.appendChild(pillText);

  // Hover effects for Pill Badge
  pillBadge.addEventListener('mouseenter', () => {
    pillBadge.style.borderColor = 'rgba(16, 185, 129, 0.5)'; // hover:border-emerald-500/50
  });
  pillBadge.addEventListener('mouseleave', () => {
    pillBadge.style.borderColor = '#27272a';
  });

  // 2. Compose Floating Pop-up
  const popup = document.createElement('div');
  popup.style.position = 'absolute';
  popup.style.bottom = 'calc(100% + 8px)';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.backgroundColor = '#09090b'; // bg-zinc-950
  popup.style.border = '1px solid #27272a'; // border-zinc-800
  popup.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)'; // shadow-2xl
  popup.style.borderRadius = '12px'; // rounded-xl
  popup.style.padding = '12px'; // p-3
  popup.style.minWidth = '140px';
  popup.style.display = 'none'; // hidden initially
  popup.style.zIndex = '99999';

  // Toggle switch inside popup
  const toggleRow = document.createElement('div');
  toggleRow.style.display = 'flex';
  toggleRow.style.alignItems = 'center';
  toggleRow.style.justifyContent = 'space-between';
  toggleRow.style.cursor = 'pointer';

  const toggleLabel = document.createElement('span');
  toggleLabel.innerText = 'Track Opens';
  toggleLabel.style.color = '#e4e4e7';
  toggleLabel.style.fontSize = '13px';
  toggleLabel.style.fontWeight = '500';

  const toggleTrack = document.createElement('div');
  toggleTrack.style.width = '32px';
  toggleTrack.style.height = '18px';
  toggleTrack.style.backgroundColor = isTickkEnabled ? '#10b981' : '#3f3f46'; // emerald-500 or zinc-700
  toggleTrack.style.borderRadius = '999px';
  toggleTrack.style.position = 'relative';
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
  toggleRow.appendChild(toggleLabel);
  toggleRow.appendChild(toggleTrack);
  popup.appendChild(toggleRow);

  // Interaction Logic
  pillBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  popup.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  toggleRow.addEventListener('click', () => {
    isTickkEnabled = !isTickkEnabled;
    toggleTrack.style.backgroundColor = isTickkEnabled ? '#10b981' : '#3f3f46';
    toggleThumb.style.left = isTickkEnabled ? '16px' : '2px';
    statusDot.style.backgroundColor = isTickkEnabled ? '#10b981' : '#71717a';
  });

  container.appendChild(pillBadge);
  container.appendChild(popup);
  sendButtonTable.appendChild(container);
  
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
