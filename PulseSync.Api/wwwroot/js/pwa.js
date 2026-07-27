/**
 * PulseSync PWA Registration & Install Handler
 */

export function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registrado exitosamente en el scope:', reg.scope);
        })
        .catch((error) => {
          console.error('[PWA] Fallo al registrar el Service Worker:', error);
        });
    });
  }

  // PWA Deferred Install Prompt Listener
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner(deferredPrompt);
  });
}

function showInstallBanner(promptEvent) {
  const existingBanner = document.getElementById('pwa-install-banner');
  if (existingBanner) return;

  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.className = 'pwa-banner animate-fade-in';
  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 1.25rem;">📱</span>
      <div>
        <strong style="font-size: 0.85rem; display: block; color: var(--text-main);">Instalar PulseSync App</strong>
        <span style="font-size: 0.75rem; color: var(--text-secondary);">Accede rápidamente desde tu pantalla de inicio</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <button id="pwa-install-btn" class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem; width: auto;">Instalar</button>
      <button id="pwa-dismiss-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.1rem; padding: 4px;">✕</button>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      console.log(`[PWA] Install prompt outcome: ${outcome}`);
    }
    banner.remove();
  });

  document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
    banner.remove();
  });
}
