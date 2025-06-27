# Dashboard Homepage - Wandernest

## Overview
A modern, responsive dashboard homepage built with React + TypeScript that provides users with a comprehensive overview of their travel profile and statistics.

## Features

### 🎯 User Profile Management
- **Profile Picture Upload**: Click the camera icon to upload and preview a new profile image
- **Editable Fields**: Click the edit icon next to any field to modify user information
- **Real-time Updates**: Changes are reflected immediately in the UI
- **Form Validation**: Email and phone number fields have proper validation

### 📊 Travel Statistics
- **Trips Taken**: Display total number of trips
- **Hotels Booked**: Show hotel booking count
- **Cars Rented**: Display vehicle rental statistics
- **Average Rating**: Show user's average rating

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Clean Layout**: Professional card-based design with subtle shadows
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Color Scheme**: Consistent with the Wandernest brand colors

## Components

### Main Components
- `DashboardHome`: Main dashboard container
- `UserInfoCard`: Profile information display and editing
- `DashboardStats`: Travel statistics cards
- `ImageUploader`: Profile picture upload functionality
- `EditableField`: Reusable editable field component

### Key Features
- **Modular Design**: Components are reusable and well-organized
- **TypeScript**: Full type safety with interfaces and proper typing
- **React Hooks**: Uses useState, useEffect, and useRef for state management
- **Error Handling**: Image upload validation and error messages
- **Keyboard Shortcuts**: Enter to save, Escape to cancel editing

## Usage

### Navigation
- Access the dashboard via `/dashboard` route
- Use the sidebar navigation to switch between different sections
- The dashboard is accessible from the main sidebar menu

### Editing Profile
1. Click the camera icon on the profile picture to upload a new image
2. Click the edit icon next to any field to enter edit mode
3. Make your changes and press Enter or click the save button
4. Press Escape or click the cancel button to discard changes

### Image Upload
- Supported formats: All image types (JPEG, PNG, GIF, etc.)
- Maximum file size: 5MB
- Real-time preview after upload
- Error handling for invalid files

## Technical Details

### Dependencies
- React 18.2.0
- TypeScript 4.9.5
- React Icons 5.5.0
- React Router DOM 6.30.1

### File Structure
```
src/components/
├── DashboardHome.tsx          # Main dashboard component
├── DashboardHome.module.css   # Dashboard styles
└── Sidebar.tsx               # Navigation sidebar
```

### State Management
- Uses React useState for local component state
- Mock data for user information (can be replaced with API calls)
- Real-time state updates for immediate UI feedback

### Styling
- CSS Modules for scoped styling
- Responsive design with mobile-first approach
- Consistent color scheme and typography
- Smooth transitions and hover effects

## Future Enhancements
- Integration with backend API for persistent data storage
- Real-time data synchronization
- Additional dashboard widgets (recent trips, upcoming bookings)
- Advanced image editing capabilities
- Export profile data functionality
- Dark mode support

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance
- Optimized for fast loading
- Efficient re-rendering with React hooks
- Image compression for uploads
- Responsive images for different screen sizes 