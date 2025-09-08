# Project Agents.md Guide

This file provides comprehensive guidance for AI agents working with this codebase.

## Project Overview

This is a Jekyll-based website for **Metadatapp**, a metadata management platform. It uses the "Minimal Mistakes" theme. The primary purpose of the site is to serve as a landing page and provide information about the product, team, and vision.

## Project Structure

The project follows a standard Jekyll directory structure. Here are the key files and directories:

*   **`_config.yml`**: The main configuration file for the Jekyll site. It contains site-wide settings like the title, description, author information, theme skin, and social media links. Most global settings are managed here.
*   **`index.md`**: The homepage and main landing page for the website. It contains the primary marketing copy and an overview of the platform.
*   **`about.md`**: The "About" page. It currently provides a brief overview and links to the team section on the homepage.
*   **`contact.md`**: The "Contact" page, providing contact information.
*   **`_data/`**: This directory holds structured data files.
    *   `ui-text.yml`: Contains user interface text and labels for internationalization (i18n).
*   **`_includes/`**: Contains reusable HTML snippets that are included in layouts and pages.
    *   `comments.html`: Logic for embedding different comment providers.
    *   `social-share.html`: HTML for social media sharing buttons.
*   **`_sass/`**: Contains the SCSS source files for styling. The site uses the Minimal Mistakes theme's styling as a base.
    *   `minimal-mistakes/_forms.scss`: Example of form styling.
*   **`assets/`**: Holds static assets.
    *   `images/`: Contains all images used on the site, like logos and profile pictures.
    *   `js/`: Contains JavaScript files. It uses jQuery and various plugins like `magnific-popup.js`.
*   **`.github/`**: Contains GitHub-specific configuration files.
    *   `ISSUE_TEMPLATE/`: Templates for creating new GitHub issues.
    *   `CONTRIBUTING.md`: Guidelines for contributing to the project.

## Coding Conventions

### Content and Pages
*   **Language**: Pages are written in Markdown (`.md`).
*   **Front Matter**: All pages and posts must start with YAML Front Matter to set the layout and other page-specific variables (e.g., `title`, `permalink`).
*   **HTML in Markdown**: For complex layouts that Markdown doesn't support (e.g., flexbox for team member profiles), raw HTML is used directly within the Markdown files. This is an accepted practice in this project.

### Styling
*   **Framework**: The site uses the **Minimal Mistakes** Jekyll theme. Customizations should be done by overriding theme SASS variables or adding new SCSS files.
*   **Custom CSS**: Custom button styles like `btn--mapp-primary` and `btn--mapp-accent` are used. When adding new styles, try to follow the existing BEM-like naming convention.

### Configuration
*   All site-wide settings, navigation links, and author details should be managed in `_config.yml`. Avoid hardcoding these values in pages or layouts.

### JavaScript
*   The site uses **jQuery**. Any new client-side scripting should also use jQuery to maintain consistency.
*   JavaScript files are located in `assets/js/`. The main minified file is `main.min.js`.