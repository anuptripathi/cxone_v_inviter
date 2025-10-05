# InterpVault On-Demand Video Call

A Next.js application for on-demand video calls with language interpretation services, migrated from a simple HTML/Express application.

## Features

- **Language Selection**: Choose from multiple languages for interpretation (English, Hindi, German, Spanish)
- **Gender Preference**: Select interpreter gender preference
- **Department Selection**: Choose medical department (Pediatrics, Cardiology, Dermatology)
- **MRN Entry**: Enter Medical Record Number
- **Real-time Clock**: Live clock display in header
- **Video Call Integration**: Integration with Twilio Video and NICE CXone
- **Room Status Polling**: Real-time room status checking
- **Responsive Design**: Modern UI with Tailwind CSS

## Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_API_KEY_SID=your_api_key_sid_here
   TWILIO_API_KEY_SECRET=your_api_key_secret_here

   # App Configuration
   NEXT_PUBLIC_LOGO_PATH=e9a34b33-0923-45d2-aa4d-929295bef4b8.png
   NEXT_PUBLIC_NIC_BUS_NUMBER=4604930
   NEXT_PUBLIC_CLUSTER_NIC=e32
   NEXT_PUBLIC_VIDEO_SIGNALER_URL=https://home-e32.niceincontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=Surfly_Signaler&bus_no=4604930&scriptId=273896001&skill_no=25161997&p1=&p2=&p3=&p4=&p5=&Guid=a8da6e64-6193-4866-b7db-419114c1d374
   NEXT_PUBLIC_TWILIO_BASE_URL=https://video-app-5022-7337-dev.twil.io?passcode=77753750227337
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Architecture

### Components

- **Header**: Contains logo, live clock, and user profile
- **LanguageSelection**: Screen 1 - Language selection with search functionality
- **GenderFormSelection**: Screen 2 - Gender preference, department, and MRN entry
- **VideoCallLoading**: Loading screen with room status polling and join button

### API Routes

- **`/api/room-status`**: GET endpoint to check Twilio room status and participant count

### Configuration

- **`src/config.ts`**: Centralized configuration for all app settings and skill number mappings

## Migration Notes

This application was migrated from a simple HTML/Express setup to a modern Next.js application with the following improvements:

- **Component-based Architecture**: Replaced static HTML with reusable React components
- **TypeScript Support**: Added type safety throughout the application
- **API Routes**: Moved Express server functionality to Next.js API routes
- **Modern Styling**: Replaced inline CSS with Tailwind CSS
- **State Management**: Implemented proper React state management
- **Environment Variables**: Proper environment variable handling for configuration

## Dependencies

- **Next.js 15.5.4**: React framework
- **React 19.1.0**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Twilio**: Video call integration
- **dotenv**: Environment variable management

## Browser Support

- Modern browsers with ES6+ support
- WebRTC support for video calls
- JavaScript enabled
