/**
 * PulseSync Main Application Controller (Mocks Emilio Integration)
 */

import { AuthService, ROLES } from './auth.js';
import { initPWA } from './pwa.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize PWA service worker
  initPWA();

  // App Elements
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const passwordInput = document.getElementById('password-input');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const logoutBtn = document.getElementById('logout-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitBtn = document.getElementById('submit-btn');

  // Check existing session
  const currentUser = AuthService.getCurrentUser();
  if (currentUser) {
    renderDashboard(currentUser);
  } else {
    showLoginView();
  }

  // Dynamic Role Switcher Update (Mocks Emilio Script Logic)
  const roleRadios = document.querySelectorAll('input[name="user-role"]');
  roleRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateRoleTheme(radio.value);
    });
  });

  function updateRoleTheme(roleId) {
    if (!submitBtnText || !submitBtn) return;

    if (roleId === 'admin') {
      submitBtnText.textContent = 'Entrar como Admin';
      submitBtn.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)';
      submitBtn.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
    } else if (roleId === 'trainer') {
      submitBtnText.textContent = 'Entrar como Coach';
      submitBtn.style.background = 'linear-gradient(135deg, #185FA5 0%, #17223b 100%)';
      submitBtn.style.boxShadow = '0 6px 20px rgba(24, 95, 165, 0.4)';
    } else {
      submitBtnText.textContent = 'Entrar como Atleta';
      submitBtn.style.background = 'linear-gradient(135deg, #1D9E75 0%, #059669 100%)';
      submitBtn.style.boxShadow = '0 6px 20px rgba(29, 158, 117, 0.4)';
    }
  }

  // Set initial theme for default checked radio
  const checkedRadio = document.querySelector('input[name="user-role"]:checked');
  if (checkedRadio) updateRoleTheme(checkedRadio.value);

  // Password Visibility Toggle
  togglePasswordBtn?.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
  });

  // Demo Presets Quick Fill Buttons
  document.querySelectorAll('[data-preset-role]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const roleId = button.getAttribute('data-preset-role');
      const emailInput = document.getElementById('email-input');
      const roleRadio = document.querySelector(`input[name="user-role"][value="${roleId}"]`);

      if (roleId === 'admin') {
        emailInput.value = 'admin@pulsesync.io';
        passwordInput.value = 'AdminSecret2026!';
      } else if (roleId === 'trainer') {
        emailInput.value = 'coach.carlos@pulsesync.io';
        passwordInput.value = 'CoachPass123';
      } else {
        emailInput.value = 'atleta.sofia@pulsesync.io';
        passwordInput.value = 'AthletePro2026';
      }

      if (roleRadio) {
        roleRadio.checked = true;
        updateRoleTheme(roleId);
      }

      showToast(`Preset cargado para: ${ROLES[roleId.toUpperCase()]?.name}`, 'info');
    });
  });

  // Login Form Submission
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailOrUser = document.getElementById('email-input').value.trim();
    const password = passwordInput.value.trim();
    const selectedRoleInput = document.querySelector('input[name="user-role"]:checked');
    const selectedRole = selectedRoleInput ? selectedRoleInput.value : 'trainer';

    try {
      const user = AuthService.login(emailOrUser, password, selectedRole);
      showToast(`¡Bienvenido/a, ${user.username}!`, 'success');
      renderDashboard(user);
    } catch (err) {
      showToast(err.message || 'Error al iniciar sesión', 'error');
    }
  });

  // Logout Action
  logoutBtn?.addEventListener('click', () => {
    AuthService.logout();
    showToast('Sesión cerrada correctamente', 'info');
    showLoginView();
  });
});

function showLoginView() {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');

  if (loginView && dashboardView) {
    dashboardView.classList.add('hidden');
    loginView.classList.remove('hidden');
    loginView.classList.add('animate-fade-in');
  }
}

function renderDashboard(user) {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const userAvatar = document.getElementById('nav-user-avatar');
  const userName = document.getElementById('nav-user-name');
  const roleTag = document.getElementById('nav-role-tag');
  const dashContainer = document.getElementById('role-dashboard-content');

  if (loginView && dashboardView) {
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
    dashboardView.classList.add('animate-fade-in');
  }

  // Update navbar user profile
  if (userAvatar) userAvatar.textContent = user.username.charAt(0).toUpperCase();
  if (userName) userName.textContent = user.username;
  
  if (roleTag) {
    roleTag.textContent = user.role.shortName;
    roleTag.className = `role-tag ${user.role.badgeClass}`;
  }

  // Render role-specific body dashboard content
  if (dashContainer) {
    dashContainer.innerHTML = getDashboardHTMLForRole(user);
  }
}

function getDashboardHTMLForRole(user) {
  const roleId = user.role.id;

  if (roleId === 'admin') {
    return `
      <div class="dash-header">
        <div class="dash-welcome-row">
          <div>
            <h1 class="dash-title">Panel de Control <span class="text-gradient">Superusuario</span></h1>
            <p class="dash-subtitle">Monitoreo global de la infraestructura, organizaciones y usuarios de PulseSync.</p>
          </div>
          <span class="role-tag admin" style="font-size: 0.85rem; padding: 6px 14px;">👑 Modo Administrador Activo</span>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card cyan glass-panel">
          <div class="metric-top">
            <span class="metric-label">Usuarios Activos Totales</span>
            <div class="metric-icon-box">👥</div>
          </div>
          <div class="metric-value">2,845</div>
          <div class="metric-trend trend-up">↑ +14.2% este mes</div>
        </div>

        <div class="metric-card purple glass-panel">
          <div class="metric-top">
            <span class="metric-label">Clubes & Equipos</span>
            <div class="metric-icon-box">🏆</div>
          </div>
          <div class="metric-value">128</div>
          <div class="metric-trend trend-up">↑ +8 organizaciones activas</div>
        </div>

        <div class="metric-card emerald glass-panel">
          <div class="metric-top">
            <span class="metric-label">Estado de Servidores</span>
            <div class="metric-icon-box">⚡</div>
          </div>
          <div class="metric-value">99.98%</div>
          <div class="metric-trend trend-up">● Todos los nodos operacionales</div>
        </div>

        <div class="metric-card blue glass-panel">
          <div class="metric-top">
            <span class="metric-label">Telemetría de Datos (24h)</span>
            <div class="metric-icon-box">📊</div>
          </div>
          <div class="metric-value">1.4M</div>
          <div class="metric-trend trend-up">↑ Lecturas de pulso procesadas</div>
        </div>
      </div>

      <div class="dashboard-panels-grid">
        <div class="panel-card glass-panel">
          <div class="panel-title">
            <span>Gestión de Sistema & Permisos</span>
            <button class="btn-secondary">⚙️ Configuración Global</button>
          </div>
          <div class="data-list">
            <div class="data-item">
              <div class="data-item-left">
                <span>🛡️</span>
                <div>
                  <div class="data-item-title">Políticas de Roles & RBAC</div>
                  <div class="data-item-sub">Superusuario, Coach, Atleta configurados correctamente.</div>
                </div>
              </div>
              <span class="trend-up">Activo</span>
            </div>
          </div>
        </div>

        <div class="panel-card glass-panel">
          <div class="panel-title">Auditoría Reciente</div>
          <div class="data-list">
            <div class="data-item">
              <div>
                <div class="data-item-title">Inicio de sesión Superusuario</div>
                <div class="data-item-sub">${user.email} (Ahora)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (roleId === 'trainer') {
    return `
      <div class="dash-header">
        <div class="dash-welcome-row">
          <div>
            <h1 class="dash-title">Panel de <span class="text-gradient">Coach</span></h1>
            <p class="dash-subtitle">Monitoreo de carga de trabajo, fatiga y métricas del equipo.</p>
          </div>
          <span class="role-tag trainer" style="font-size: 0.85rem; padding: 6px 14px;">🎯 Vista de Coach</span>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card blue glass-panel">
          <div class="metric-top">
            <span class="metric-label">Atletas Asignados</span>
            <div class="metric-icon-box">🏃</div>
          </div>
          <div class="metric-value">24</div>
          <div class="metric-trend trend-up">● 18 entrenando ahora</div>
        </div>

        <div class="metric-card cyan glass-panel">
          <div class="metric-top">
            <span class="metric-label">Carga Media Semanal</span>
            <div class="metric-icon-box">📈</div>
          </div>
          <div class="metric-value">745 <span style="font-size: 1rem; color: var(--text-secondary);">TSS</span></div>
          <div class="metric-trend trend-up">↑ Rango óptimo alcanzado</div>
        </div>

        <div class="metric-card emerald glass-panel">
          <div class="metric-top">
            <span class="metric-label">Rendimiento Promedio</span>
            <div class="metric-icon-box">🔥</div>
          </div>
          <div class="metric-value">92%</div>
          <div class="metric-trend trend-up">↑ +3.5% vs semana previa</div>
        </div>

        <div class="metric-card purple glass-panel">
          <div class="metric-top">
            <span class="metric-label">Alertas de Fatiga</span>
            <div class="metric-icon-box">⚠️</div>
          </div>
          <div class="metric-value">2</div>
          <div class="metric-trend trend-down">↓ Atletas requieren descanso</div>
        </div>
      </div>

      <div class="dashboard-panels-grid">
        <div class="panel-card glass-panel">
          <div class="panel-title">
            <span>Plantilla de Atletas Destacados</span>
            <button class="btn-secondary">➕ Asignar Rutina</button>
          </div>
          <div class="data-list">
            <div class="data-item">
              <div class="data-item-left">
                <span style="font-size: 1.2rem;">🏅</span>
                <div>
                  <div class="data-item-title">Sofía Martínez (Triatlón)</div>
                  <div class="data-item-sub">HRV: 78ms | FC Reposo: 48 bpm | Recuperación: 95%</div>
                </div>
              </div>
              <span class="role-tag athlete">Óptimo</span>
            </div>
            <div class="data-item">
              <div class="data-item-left">
                <span style="font-size: 1.2rem;">🚴</span>
                <div>
                  <div class="data-item-title">Mateo Benítez (Ciclismo)</div>
                  <div class="data-item-sub">HRV: 62ms | FC Reposo: 54 bpm | Recuperación: 88%</div>
                </div>
              </div>
              <span class="role-tag athlete">Listo</span>
            </div>
          </div>
        </div>

        <div class="panel-card glass-panel">
          <div class="panel-title">Próximos Entrenamientos</div>
          <div class="data-list">
            <div class="data-item">
              <div>
                <div class="data-item-title">Sesión de Series VO2 Max</div>
                <div class="data-item-sub">Hoy - 16:30 PM (Pista Central)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Default: Athlete Role
  return `
    <div class="dash-header">
      <div class="dash-welcome-row">
        <div>
          <h1 class="dash-title">Hola, <span class="text-gradient">${user.username}</span> 👋</h1>
          <p class="dash-subtitle">Tu estado de preparación fisiológica y entrenamiento de hoy.</p>
        </div>
        <span class="role-tag athlete" style="font-size: 0.85rem; padding: 6px 14px;">🏊 Atleta de Alto Rendimiento</span>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card cyan glass-panel">
        <div class="metric-top">
          <span class="metric-label">Puntaje de Recuperación</span>
          <div class="metric-icon-box">❤️</div>
        </div>
        <div class="metric-value">94%</div>
        <div class="metric-trend trend-up">● Excelente estado fisiológico</div>
      </div>

      <div class="metric-card emerald glass-panel">
        <div class="metric-top">
          <span class="metric-label">Variabilidad Cardíaca (HRV)</span>
          <div class="metric-icon-box">🫀</div>
        </div>
        <div class="metric-value">82 <span style="font-size: 1rem; color: var(--text-secondary);">ms</span></div>
        <div class="metric-trend trend-up">↑ +6ms sobre tu media habitual</div>
      </div>

      <div class="metric-card purple glass-panel">
        <div class="metric-top">
          <span class="metric-label">Frecuencia Cardiaca Reposo</span>
          <div class="metric-icon-box">📉</div>
        </div>
        <div class="metric-value">46 <span style="font-size: 1rem; color: var(--text-secondary);">bpm</span></div>
        <div class="metric-trend trend-up">● Ritmo óptimo de recuperación</div>
      </div>
    </div>
  `;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
