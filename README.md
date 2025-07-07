# Angel Assistant - Mobile Chat & Translation App

## Overview

Angel Assistant is a mobile-first chat and translation application built with React and Node.js. The app features a friendly angel mascot and provides real-time chat functionality with AI assistance and text translation capabilities. The application is designed specifically for mobile devices with a focus on user-friendly interaction and a warm, inviting UI theme.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom angel-themed color palette
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Mobile Optimization**: Touch-friendly interface with responsive design

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Integration**: OpenAI GPT-4o for AI responses and translation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Key Design Decisions
The application separates concerns with a clear client/server/shared structure. The frontend uses React Query for efficient data fetching and caching, while the backend provides RESTful API endpoints. The mobile-first design prioritizes touch interactions and visual clarity.

## Key Components

### Database Schema
- **Users Table**: Stores user information including username and avatar color
- **Messages Table**: Stores chat messages with sender information and timestamps
- **Shared Types**: Type-safe schema definitions using Drizzle Zod integration

### Frontend Components
- **Home Page**: Landing page with angel mascot and navigation
- **Chat Interface**: Real-time messaging with AI assistant integration
- **Translation Interface**: Text input and translation display
- **Message Components**: Message bubbles, input fields, and user avatars
- **UI Components**: Comprehensive shadcn/ui component library

### Backend Services
- **Message Management**: CRUD operations for chat messages
- **AI Integration**: OpenAI GPT-4o integration for chat responses
- **Translation Service**: AI-powered text translation with emotional transformation
- **User Management**: User creation and retrieval
- **Database Operations**: Abstracted storage layer with Drizzle ORM

## Data Flow

1. **User Registration**: Users create accounts with unique usernames and avatar colors
2. **Message Creation**: Users send messages through the chat interface
3. **AI Response Generation**: System automatically generates AI responses using OpenAI API
4. **Translation Flow**: Users input text for translation, system processes and returns English translations
5. **Real-time Updates**: Frontend polls for new messages every 3 seconds
6. **Data Persistence**: All messages and user data stored in PostgreSQL database

## External Dependencies

### Core Dependencies
- **Database**: Neon Database for serverless PostgreSQL hosting
- **AI Services**: OpenAI API for GPT-4o model access
- **UI Framework**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS for utility-first styling
- **Build Tools**: Vite for frontend bundling, esbuild for server bundling

### Development Environment
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16
- **Deployment**: Replit autoscale deployment target
- **Development Server**: Vite dev server with HMR

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized React application to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static Assets: Served from the built frontend directory

### Environment Configuration
- **Development**: Uses Vite dev server with Express backend
- **Production**: Serves static files from Express with API routes
- **Database**: Requires `DATABASE_URL` environment variable for Neon connection
- **AI Services**: Requires `OPENAI_API_KEY` for GPT-4o access

### Replit Configuration
- Modules: nodejs-20, web, postgresql-16
- Build Command: `npm run build`
- Start Command: `npm run start`
- Development: `npm run dev`
- Port Configuration: Internal 5000, External 80

## Changelog

Changelog:
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
