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
- [x] Adaptación de la pantalla de inicio basada en `Mocks Emilio/Pantalla Inicio V1/Pantalla Inicio .html` (Logo badge, slogan "Entrena con propósito", selectores de tipo de cuenta dinámicos "Coach", "Atleta", "Admin" y footer de registro).

## 📋 Features Futuras
- [ ] Creación de entidades/modelos base en C# (Superusuario, Coach, Atleta).
- [ ] Configuración inicial del `DbContext` y conexión a `PulseSyncDB`.
- [ ] Reemplazo del mock de login por un `AuthController` real en el backend.
- [ ] Maquetado de la vista principal del Coach basándose en `Mocks Emilio/Interfaz Coach/Interfaz Principal Coach`.

## ⚠️ Deuda Técnica (Technical Debt)
- [ ] Reemplazar la lógica simulada de `auth.js` por llamadas `fetch` a la API.
- [ ] Definir el almacenamiento seguro de sesión (Ej. JWT) para reemplazar el `localStorage` básico actual.

## 📝 Notas de Desarrollo
- **Regla:** Code (el agente IA) debe leer este archivo antes de iniciar nuevas tareas para mantener el contexto general del proyecto.
- **Regla:** Actualizar este archivo al completar features, detectar deuda técnica o planificar nuevos módulos.
