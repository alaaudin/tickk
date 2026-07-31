/// <reference types="chrome" />

let isTickkEnabled = true;

const injectToggle = (composeWindow: HTMLElement) => {
  // Prevent duplicate injection
  if (composeWindow.querySelector('.tickk-host-container')) return;

  const sendButtonTable = composeWindow.querySelector('.gU.Up');
  if (!sendButtonTable) return;

  // ─── Main Shadow DOM Host Container ───
  const hostContainer = document.createElement('div');
  hostContainer.className = 'tickk-host-container';
  hostContainer.style.all = 'initial';
  hostContainer.style.display = 'inline-flex';
  hostContainer.style.alignItems = 'center';
  hostContainer.style.marginLeft = '12px';
  hostContainer.style.position = 'relative';

  const shadowRoot = hostContainer.attachShadow({ mode: 'open' });

  // ─── Inject CSS into Shadow DOM ───
  const style = document.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .tickk-container {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    /* ─── Pill Badge ─── */
    .tickk-pill-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: #09090b; /* Zinc 950 */
      color: #e4e4e7;
      border: 1px solid #27272a; /* Zinc 800 */
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      outline: none;
      line-height: 1;
      letter-spacing: 0.01em;
    }
    .tickk-pill-badge:hover {
      border-color: rgba(16, 185, 129, 0.5);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(16, 185, 129, 0.15);
    }
    .tickk-pill-badge:active {
      transform: scale(0.97);
    }

    .tickk-pill-label {
      font-weight: 500;
      color: #d4d4d8;
    }

    .tickk-pill-icon {
      color: #10b981; /* Emerald 500 */
      font-weight: 700;
      font-size: 11px;
      letter-spacing: -0.5px;
    }

    /* ─── Status Dot ─── */
    .tickk-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
    }
    .tickk-dot--active {
      background-color: #10b981; /* Emerald 500 */
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
      animation: tickk-pulse-dot 2s ease-in-out infinite;
    }
    .tickk-dot--inactive {
      background-color: #52525b;
      box-shadow: none;
      animation: none;
    }

    @keyframes tickk-pulse-dot {
      0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(16, 185, 129, 0.35); }
      50% { opacity: 0.6; box-shadow: 0 0 12px rgba(16, 185, 129, 0.35); }
    }

    /* ─── Floating Popup ─── */
    .tickk-popup {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) scale(0.96);
      background: #09090b; /* Zinc 950 */
      border: 1px solid #27272a; /* Zinc 800 */
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      padding: 12px;
      min-width: 180px;
      display: none;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .tickk-popup--visible {
      display: block;
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    /* ─── Popup Row ─── */
    .tickk-popup-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 4px 0;
    }
    .tickk-popup-label {
      color: #e4e4e7;
      font-size: 13px;
      font-weight: 500;
      user-select: none;
    }

    /* ─── Toggle Switch ─── */
    .tickk-switch {
      width: 28px;
      height: 16px;
      background-color: #3f3f46;
      border-radius: 999px;
      position: relative;
      transition: background-color 0.2s ease;
      cursor: pointer;
      flex-shrink: 0;
    }
    .tickk-switch--on {
      background-color: #10b981; /* Emerald 500 */
    }
    .tickk-switch-thumb {
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    }
    .tickk-switch--on .tickk-switch-thumb {
      left: 14px;
    }

    /* ─── Stealth Footer Hint ─── */
    .tickk-stealth-footer {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid #27272a; /* Zinc 800 */
      font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
      font-size: 9px;
      color: #71717a;
      letter-spacing: 0.02em;
      line-height: 1.4;
      text-align: center;
    }
  `;
  shadowRoot.appendChild(style);

  const container = document.createElement('div');
  container.className = 'tickk-container';

  // ─── Pill Badge Button ───
  const pillBadge = document.createElement('button');
  pillBadge.className = 'tickk-pill-badge';

  const statusDot = document.createElement('div');
  statusDot.className = `tickk-dot ${isTickkEnabled ? 'tickk-dot--active' : 'tickk-dot--inactive'}`;
  
  const pillText = document.createElement('span');
  pillText.className = 'tickk-pill-label';
  pillText.innerText = 'Tickk';

  const checkIcon = document.createElement('span');
  checkIcon.className = 'tickk-pill-icon';
  checkIcon.innerText = '✓✓';

  pillBadge.appendChild(statusDot);
  pillBadge.appendChild(pillText);
  pillBadge.appendChild(checkIcon);

  // ─── Floating Pop-up ───
  const popup = document.createElement('div');
  popup.className = 'tickk-popup';

  // Toggle row
  const toggleRow = document.createElement('div');
  toggleRow.className = 'tickk-popup-row';

  const toggleLabel = document.createElement('span');
  toggleLabel.className = 'tickk-popup-label';
  toggleLabel.innerText = 'Track Opens';

  const toggleTrack = document.createElement('div');
  toggleTrack.className = `tickk-switch ${isTickkEnabled ? 'tickk-switch--on' : ''}`;

  const toggleThumb = document.createElement('div');
  toggleThumb.className = 'tickk-switch-thumb';

  toggleTrack.appendChild(toggleThumb);
  toggleRow.appendChild(toggleLabel);
  toggleRow.appendChild(toggleTrack);
  popup.appendChild(toggleRow);

  // Stealth hint
  const stealthHint = document.createElement('div');
  stealthHint.className = 'tickk-stealth-footer';
  stealthHint.textContent = "🤫 Silent Proxy Active — Recipient won't see a thing.";
  popup.appendChild(stealthHint);

  // ─── Interaction Logic ───
  pillBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('tickk-popup--visible');
  });

  // To close when clicking outside, we listen on document
  document.addEventListener('click', () => {
    popup.classList.remove('tickk-popup--visible');
  });

  popup.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  toggleRow.addEventListener('click', () => {
    isTickkEnabled = !isTickkEnabled;
    toggleTrack.classList.toggle('tickk-switch--on', isTickkEnabled);
    statusDot.className = `tickk-dot ${isTickkEnabled ? 'tickk-dot--active' : 'tickk-dot--inactive'}`;
  });

  container.appendChild(pillBadge);
  container.appendChild(popup);
  shadowRoot.appendChild(container);
  
  sendButtonTable.appendChild(hostContainer);
  
  interceptSendButton(composeWindow);
};

const interceptSendButton = (composeWindow: HTMLElement) => {
  const sendButton = composeWindow.querySelector('.dC [role="button"], .gU.Up [role="button"]') as HTMLElement;
  if (!sendButton) return;

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
