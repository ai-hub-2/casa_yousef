# Sky CASA - Medical Laboratory System (Web Version)

A modern web-based clone of the Sky CASA medical laboratory desktop application, built with React, TypeScript, and Material-UI.

## Features

### 🔐 Authentication
- Secure login system with default credentials
- Session management with local storage
- Protected routes for authenticated users

### 📊 Dashboard
- Interactive table selection and data viewing
- Support for multiple database tables:
  - Patients
  - Admin users
  - Lab results
  - Appointments
- Real-time data loading with loading indicators
- Modern data grid with pagination and sorting

### 👥 Patient Management
- Complete CRUD operations for patient records
- Add, edit, and delete patient information
- Form validation and error handling
- Responsive patient data grid
- Patient search and filtering capabilities

### 🎨 Modern UI/UX
- Material Design components
- Responsive design for all screen sizes
- Professional color scheme and typography
- Smooth animations and transitions
- Accessibility-compliant interface

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI) v6
- **Data Grid**: MUI X Data Grid
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Navigate to the web application directory:**
   ```bash
   cd web/webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

### Default Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Application Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication component
│   ├── Dashboard.tsx   # Main dashboard
│   ├── PatientManagement.tsx  # Patient CRUD interface
│   └── ProtectedRoute.tsx     # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared interfaces and types
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Key Features Comparison

| Feature | Desktop App | Web App |
|---------|-------------|---------|
| User Authentication | ✅ SQLite DB | ✅ Local Storage |
| Table Selection | ✅ ComboBox | ✅ Select Dropdown |
| Data Loading | ✅ DataGridView | ✅ MUI DataGrid |
| Patient Management | ✅ Forms | ✅ Modal Forms |
| Database Tables | ✅ SQLite | ✅ Mock Data |
| Responsive Design | ❌ Desktop Only | ✅ All Devices |

## Sample Data

The web application includes sample data for demonstration:

- **Patients**: 5 sample patient records with complete information
- **Admin Users**: 2 administrative accounts
- **Lab Results**: Sample test results linked to patients
- **Appointments**: Sample appointment data with different statuses

## Security Features

- Protected routes requiring authentication
- Session timeout handling
- Input validation and sanitization
- XSS protection through React's built-in security

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Notes

### Authentication
The current implementation uses local storage for session management. In a production environment, this should be replaced with:
- JWT tokens with proper expiration
- HTTP-only cookies
- Server-side session validation

### Data Management
Currently uses mock data for demonstration. For production deployment:
- Integrate with REST API or GraphQL endpoints
- Implement proper database connectivity
- Add data validation and error handling

### Future Enhancements
- Real-time data synchronization
- Advanced search and filtering
- Data export capabilities
- Multi-language support
- Dark mode theme
- Mobile app version

## Deployment

### Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Container**: Docker with Nginx
- **CDN**: AWS CloudFront, Azure CDN

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new features
3. Include proper error handling
4. Write descriptive commit messages
5. Test on multiple browsers and screen sizes

## License

This project is licensed under the same terms as the original Sky CASA desktop application.

## Support

For issues related to the web version, please check:
1. Browser console for JavaScript errors
2. Network tab for API call failures
3. Local storage for authentication issues

---

**Note**: This is a web-based clone of the original Sky CASA desktop application, designed to provide the same functionality in a modern, accessible web interface.