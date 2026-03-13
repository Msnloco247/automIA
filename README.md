# 🧪 E2E Playwright Framework - SauceDemo

Este es un framework de pruebas automatizadas End-to-End (E2E) profesional construido con **Playwright** y **TypeScript**, diseñado siguiendo las mejores prácticas de la industria como el patrón **Page Object Model (POM)**, inyección de dependencias mediante **Fixtures**, y reportes avanzados.

---

## 🛠️ Tecnologías y Herramientas

- **[Playwright](https://playwright.dev/)**: Framework core para la automatización de pruebas.
- **[TypeScript](https://www.typescriptlang.org/)**: Lenguaje principal para un desarrollo tipado y seguro.
- **[Winston](https://github.com/winstonjs/winston)**: Logger avanzado con soporte para múltiples transportes e iconos.
- **[Allure Report](https://allurereport.org/)**: Reportes interactivos y detallados con historial.
- **[Dotenv](https://github.com/motdotla/dotenv)**: Gestión de variables de entorno seguras.
- **[GitHub Actions](https://github.com/features/actions)**: Pipeline de CI/CD integrado.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado de manera modular para garantizar escalabilidad y mantenibilidad:

```text
src/
├── config/             # Configuración de variables de entorno tipadas.
├── data/               # Datos de prueba y constantes (TS).
├── fixtures/           # Fixtures personalizados para login automático y POMs.
├── pages/              # Clases Page Object (POM) con lógica de UI.
│   ├── BasePage.ts     # Wrapper de Playwright con logging y steps de Allure.
│   └── ...             # Objetos de cada página.
├── tests/              # Escenarios de prueba (@positive y @negative).
└── utils/              # Utilidades de logger, validación de API y setup global.
```

---

## 🚀 Características Principales

### 1. Page Object Model (POM) con BasePage
Cada página del sitio tiene su propia clase. Todas heredan de `BasePage`, la cual encapsula las acciones comunes (click, fill, navigate) e integra automáticamente:
- **Logging**: Registra cada paso en consola y archivos.
- **Allure Steps**: Genera pasos legibles en el reporte final.

### 2. Sistema de Logging Profesional
Utilizamos **Winston** para generar logs detallados:
- **Separación**: `success.log` y `error.log` generados en cada ejecución.
- **Iconografía**: ✅ (Éxito), ℹ️ (Paso), ❌ (Error), ⚠️ (Advertencia).
- **Identificación**: Cada log incluye el nombre del test que lo generó, ideal para ejecuciones en paralelo.
- **Privacidad**: Las contraseñas se ocultan automáticamente (`******`).

### 3. Contingencia contra Flaky Tests
- **Retries**: Se reintenta 1 vez ante fallos inesperados.
- **Evidencias**: Se guardan **Screenshots** y **Videos** únicamente cuando un test falla.
- **Traces**: Grabación de trazas de ejecución en el primer reintento.

### 4. Validación de Salud (API Health Check)
Antes de iniciar los tests, el framework realiza una llamada a la API del sitio para verificar que el entorno esté disponible. Si la API falla, la suite se detiene preventivamente.

### 5. CI/CD y Reportes en QA
Configurado con **GitHub Actions** para ejecutarse en el entorno de **QA**:
- **Historial de Allure**: Los reportes se despliegan en **GitHub Pages** manteniendo la tendencia histórica.
- **Propiedades del Entorno**: El reporte muestra metadatos como el Ambiente (QA), URL y Navegador.

---

## 🏃 Cómo Empezar

### Requisitos Previos
- Node.js (LTS)
- npm

### Instalación
```bash
# Clonar el repositorio e instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install --with-deps
```

### Configuración
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=tu_usuario
SAUCE_PASSWORD=tu_password
LOCKED_OUT_USER=locked_out_user
```

### Ejecución de Tests
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests positivos
npx playwright test --grep @positive

# Ejecutar tests negativos
npx playwright test --grep @negative

# Generar y ver reporte de Allure localmente
npm run report:allure
```

---

## 📊 Reportes en GitHub
Los reportes están disponibles en la sección de **Actions** de GitHub y se despliegan automáticamente en la rama `gh-pages` para visualización online.
