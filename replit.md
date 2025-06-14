# NepaliLove - Nepali Dating App

## Overview

NepaliLove is a full-stack real-time dating application designed specifically for Nepali users. The app provides a modern dating experience with Tinder-style swiping, real-time messaging, profile preferences, and secure authentication. Built with modern web technologies, it offers both responsive design and native-like mobile experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite for fast development and hot module replacement
- **Styling**: Tailwind CSS with custom Nepal-themed color palette (nepal-red, nepal-pink, nepal-blue)
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Real-time Communication**: WebSocket integration for live messaging

### Backend Architecture
- **Server**: Express.js with TypeScript for type safety
- **Database**: PostgreSQL with Drizzle ORM for type-safe database queries
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL session store
- **File Uploads**: Multer middleware for handling profile photos and videos
- **Real-time Features**: WebSocket server for instant messaging

### Database Schema
The application uses a relational database structure with the following key entities:
- **Users**: Core user information with Replit Auth integration
- **Profiles**: Detailed user profiles with photos, bio, preferences
- **Preferences**: User dating preferences (age range, gender, location)
- **Swipes**: Like/dislike actions between users
- **Matches**: Mutual likes creating potential connections
- **Conversations**: Chat containers for matched users
- **Messages**: Individual messages within conversations
- **Sessions**: Secure session storage for authentication

## Key Components

### Authentication Flow
- Replit Auth with OpenID Connect for secure user authentication
- Session-based authentication with PostgreSQL session store
- Automatic user profile creation and management
- Secure logout and session cleanup

### Profile Management
- Comprehensive profile setup with photos, videos, and personal information
- Age verification and validation
- Location-based matching capabilities
- Bio and preference customization

### Discovery System
- Tinder-style card-based swiping interface
- Touch and mouse gesture support for swipe actions
- Preference-based profile filtering
- Real-time swipe processing and match detection

### Messaging System
- Real-time WebSocket communication
- Conversation management for matched users
- Message history and persistence
- Typing indicators and read receipts

### File Upload System
- Secure file upload handling for profile media
- Image and video support with file type validation
- File size limits and security measures
- Static file serving for uploaded content

## Data Flow

1. **User Registration**: New users authenticate via Replit Auth and are redirected to profile setup
2. **Profile Creation**: Users complete their profile with photos, bio, and preferences
3. **Discovery**: Users swipe through potential matches based on their preferences
4. **Matching**: When two users like each other, a match is created
5. **Messaging**: Matched users can start conversations through real-time chat
6. **Profile Updates**: Users can modify their profiles and preferences at any time

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **openid-client**: OpenID Connect implementation for Replit Auth
- **ws**: WebSocket implementation for real-time messaging
- **multer**: File upload middleware for profile media

### UI Dependencies
- **@radix-ui/***: Accessible UI primitive components
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation for forms and API requests
- **date-fns**: Date manipulation and formatting
- **lucide-react**: Icon library for consistent iconography

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

### Development Environment
- **Runtime**: Node.js 20 with ES modules
- **Build Tool**: Vite for fast development and building
- **Development Server**: Concurrent frontend and backend development
- **Hot Reload**: Automatic code reloading for development efficiency

### Production Deployment
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Static Files**: Frontend assets served from Express static middleware
- **Database**: PostgreSQL database with automatic migrations via Drizzle
- **Environment Variables**: Secure configuration management for sensitive data

### Scaling Considerations
- **Auto-scaling**: Configured for Replit's autoscale deployment target
- **Session Storage**: PostgreSQL-based sessions for horizontal scaling
- **WebSocket Handling**: Stateless WebSocket connections for scalability
- **File Storage**: Local file storage with potential for cloud storage migration

## Changelog

Changelog:
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.