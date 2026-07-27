/**
 * PulseSync Authentication & Role Management Service (Mock)
 */

const STORAGE_KEY = 'pulsesync_session';

export const ROLES = {
  ADMIN: {
    id: 'admin',
    name: 'Superusuario (Administrador)',
    shortName: 'Administrador',
    badgeClass: 'admin',
    icon: '👑'
  },
  TRAINER: {
    id: 'trainer',
    name: 'Entrenador',
    shortName: 'Entrenador',
    badgeClass: 'trainer',
    icon: '📋'
  },
  ATHLETE: {
    id: 'athlete',
    name: 'Atleta',
    shortName: 'Atleta',
    badgeClass: 'athlete',
    icon: '⚡'
  }
};

export class AuthService {
  /**
   * Mock login function saving session to localStorage
   */
  static login(emailOrUsername, password, roleId) {
    if (!emailOrUsername || !password) {
      throw new Error('Por favor complete todos los campos obligatorios.');
    }

    const matchedRole = Object.values(ROLES).find(r => r.id === roleId) || ROLES.ATHLETE;

    const userSession = {
      username: emailOrUsername.split('@')[0] || 'Usuario',
      email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@pulsesync.io`,
      role: matchedRole,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userSession));
    return userSession;
  }

  /**
   * Get current active session user
   */
  static getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading session data:', e);
      return null;
    }
  }

  /**
   * Logout user and clear session
   */
  static logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Check if user is currently authenticated
   */
  static isAuthenticated() {
    return !!this.getCurrentUser();
  }
}
