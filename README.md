# Financial Tracker Frontend (Vue 3)

[![Vue.js Version](https://img.shields.io/badge/Vue.js-^3.5-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-^6.0-blueviolet.svg)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-^3.0-yellow.svg)](https://pinia.vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-^4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project is the frontend user interface for the **Financial Tracker Web Application**, built with Vue 3, Pinia, and Tailwind CSS. It interacts with a dedicated [backend service](https://github.com/andreichernetskii/FinTrackerBackEnd) built with Java and Spring Boot.

This is primarily a **portfolio project** showcasing skills in modern frontend development practices using the Vue 3 Composition API and related ecosystem tools.

## Table of Contents

*   [Live Demo](#live-demo)
*   [Key Features](#key-features)
*   [Technology Stack](#technology-stack)
*   [Deployment](#deployment)
*   [License](#license)


## Live Demo

A live version of the application (frontend + backend) is deployed and accessible here:

**URL:** [https://finman-project.duckdns.org/](https://finman-project.duckdns.org/)

**Demo Credentials:**
*   **Login:** `demo@demo`
*   **Password:** `demo`


## Key Features

*   **User Authentication:** Secure Login and Registration interface.
*   **Transaction Management:** Intuitive UI for creating, viewing, updating, and deleting income and expense transactions.
*   **Limit Management:** Interface to set, view, update, and delete spending limits for different categories.
*   **Real-time Alerts:** Displays alerts instantly when spending limits are exceeded, utilizing Server-Sent Events (SSE) pushed from the backend.
*   **Centralized State Management:** Uses Pinia for predictable and maintainable application state.
*   **Responsive Design:** Built with Tailwind CSS for adaptability across different screen sizes.
*   **Single Page Application (SPA):** Provides a smooth user experience without full page reloads (Note: Does not use Vue Router for view routing).


## Technology Stack

*   **Framework:** [Vue.js ^3.5](https://vuejs.org/) (using Composition API)
*   **Build Tool:** [Vite ^6.0](https://vitejs.dev/)
*   **State Management:** [Pinia ^3.0](https://pinia.vuejs.org/)
*   **Styling:** [Tailwind CSS ^4.0](https://tailwindcss.com/)
*   **HTTP Client:** [Axios ^1.7](https://axios-http.com/) (configured instance in `src/axiosInstance.js`)
*   **Date Utility:** [vue-date-fns ^2.0](https://github.com/logustra/vue-date-fns#readme) (Wrapper around date-fns)
*   **Real-time Updates:** Native EventSource API for Server-Sent Events (SSE) (managed via `src/stores/sse.js`)
*   **Language:** JavaScript
*   **Linting:** [ESLint](https://eslint.org/) (configured in `eslint.config.js`)
*   **Formatting:** [Prettier](https://prettier.io/)
*   **Package Manager:** npm
*   **Containerization:** Docker

## Deployment

The combined application (frontend + backend) is currently deployed on a VPS (Ubuntu 22.04) using Docker Compose and Traefik as a reverse proxy. The frontend container serves static files via Nginx. Refer to the [Backend Deployment Overview](https://github.com/andreichernetskii/FinTrackerBackEnd#deployment-overview) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
