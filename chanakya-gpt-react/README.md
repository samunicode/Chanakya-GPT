# ChanakyaGPT - React Version

A modern React.js migration of the ChanakyaGPT application, combining ancient wisdom with modern AI technology.

## Features

- **Modern React Architecture**: Migrated from vanilla JavaScript to React.js with hooks and functional components
- **Firebase Authentication**: Secure Google OAuth integration
- **Gemini AI Integration**: Powered by Google's Gemini 2.0 Flash model
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Environment Variables**: Secure API key management
- **Real-time Chat**: Interactive chat interface with Chanakya's persona

## Security Improvements

- ✅ Removed custom handshake encryption
- ✅ Implemented proper environment variable management
- ✅ API keys are now stored securely in `.env` file
- ⚠️ **Note**: In production, the Gemini API key should be moved to a backend service

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd chanakya-gpt-react
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your Firebase and Gemini API keys.

4. Start the development server
```bash
npm start
```

The application will open at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

```
src/
├── components/
│   ├── HomePage.js          # Landing page with features and FAQ
│   ├── ChatPage.js          # Chat interface
│   └── AuthFailedPage.js    # Authentication failure page
├── firebase.js              # Firebase configuration
├── App.js                   # Main application component
├── App.css                  # Global styles
└── index.js                 # Application entry point
```

## Key Changes from Original

1. **Architecture**: Migrated from vanilla JavaScript to React.js
2. **Security**: Removed custom encryption, using environment variables
3. **State Management**: Using React hooks for state management
4. **Authentication**: Modern Firebase v9+ SDK
5. **API Integration**: Direct Gemini API calls (should be moved to backend)
6. **Styling**: Maintained original design with improved responsive behavior

## Production Recommendations

1. **Move API Keys to Backend**: Create a backend service to handle Gemini API calls
2. **Implement Rate Limiting**: Add rate limiting for API calls
3. **Add Error Boundaries**: Implement React error boundaries
4. **Add Analytics**: Integrate analytics for user behavior tracking
5. **Optimize Bundle**: Implement code splitting and lazy loading

## Technologies Used

- React.js
- Firebase Authentication
- Google Gemini AI
- Tailwind CSS
- Modern JavaScript (ES6+)

## License

This project maintains the same license as the original ChanakyaGPT project.