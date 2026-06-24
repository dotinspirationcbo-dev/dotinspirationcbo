# Dot Inspiration CBO

A production-grade NGO management system for Dot Inspiration CBO.

## Project Overview

This is a React + TypeScript (Vite) web application serving as the foundation for managing:
- Members
- Donations
- Projects

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for dev server and build
- **React Router v7** for client-side routing

## Project Structure

```
src/
  app/          # Entry points and app-level config (main.tsx, App.tsx, Providers.tsx, routes.tsx)
  components/   # Shared, reusable UI components
  features/     # Feature modules (members, donations, projects, etc.)
  services/     # API clients and external service calls
  hooks/        # Custom React hooks
  utils/        # Pure utility functions
  assets/       # Static assets (images, icons)
  types/        # Shared TypeScript types and interfaces
```

## Running the App

The dev server runs on port 5000. Use the "Start application" workflow.

## User Preferences

- Minimal, production-grade code — no sample data, no unnecessary UI
- Authentication to be added in a future step
