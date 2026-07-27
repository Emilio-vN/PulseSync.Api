# 🧠 Contexto de Proyecto: PulseSync (Memoria de Code)

## 📌 Información General
- **Proyecto:** PulseSync PWA + ASP.NET Core API
- **Base de Datos:** `PulseSyncDB` (SQL Server)
- **Diseño UI/UX:** Referenciado desde la carpeta `Mocks Emilio` (Se trabajará vista por vista).

## 🚀 Estado Actual (Completado)
- [x] Estructura base de la PWA (index.html, manifest.json, service-worker.js).
- [x] UI Responsiva y Pantalla de Login (Mobile-first).
- [x] Simulación de Roles (Superusuario, Coach, Atleta) mediante presets.
- [x] Integración de frontend estático (`wwwroot`) servido desde el backend ASP.NET Core.
- [x] Configuración de `launchSettings.json` para autostart del navegador en la ruta raíz.
- [x] Implementación de la Pantalla de Inicio V1 basada en Mocks Emilio (Logo badge, slogan "Entrena con propósito", fondo claro y footer de registro).
- [x] Lógica reactiva de UI para selección de roles (Coach, Atleta, Admin) con colores dinámicos.
- [x] Primer commit de hito arquitectónico realizado en Git.

## 📋 Features Futuras
- [ ] Backend: Creación de entidades/modelos base en C# (Superusuario, Entrenador, Atleta).
- [ ] Backend: Configuración del DbContext y conexión a SQL Server (PulseSyncDB).
- [ ] Frontend: Maquetar la siguiente vista del dashboard desde la carpeta `Mocks Emilio`.

## ⚠️ Deuda Técnica (Technical Debt)
- [ ] Reemplazar la lógica simulada de `auth.js` por llamadas `fetch` a la API.
- [ ] Definir el almacenamiento seguro de sesión (Ej. JWT) para reemplazar el `localStorage` básico actual.

## 📝 Notas de Desarrollo
- **Regla:** Code (el agente IA) debe leer este archivo antes de iniciar nuevas tareas para mantener el contexto general del proyecto.
- **Regla:** Actualizar este archivo al completar features, detectar deuda técnica o planificar nuevos módulos.
