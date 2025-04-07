# Ellis App

Ellis is a relationship and service manager application designed for service providers to meet the needs of marginalized communities more efficiently and effectively. It enables service providers to manage client relationships, make referrals to services, track client progress, and coordinate care across organizations.

## Project Overview

Ellis helps service providers by:
- Managing client profiles and relationships
- Making service referrals to other organizations
- Tracking client progress through different services
- Creating and managing notes about client interactions
- Providing a directory of available services in the community

## Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (Authentication and Data Storage)
- **State Management**: React Context API
- **Navigation**: React Navigation
- **UI Components**: Native components and custom-built components
- **External APIs**: Google Sheets API integration

## Project Structure

```
App/
├── api/                  # API clients and mock data
├── assets/               # Images, fonts and static resources
├── context/              # React Context providers
├── filtering/            # Filtering utilities for search
├── HMIS/                 # HMIS (Homeless Management Information System) integration
├── routes/               # Navigation configuration
├── screens/              # Screen components organized by feature
│   ├── amenityPages/     # Amenity-related screens
│   ├── chatPages/        # Chat interface screens
│   ├── coachReferPages/  # Referral coaching screens
│   ├── directoryPages/   # Service directory screens
│   ├── messagesPages/    # Messaging screens
│   ├── onboarding/       # User onboarding screens
│   ├── plusNavigatorButton/ # Additional actions screens
│   ├── profilePages/     # User profile screens
│   ├── referralFlowPages/ # Service referral flow
│   ├── relationshipsPages/ # Relationship management screens
│   ├── settingsPage/     # App settings screens
├── shared/               # Shared components and utilities
```

## Key Features

### User Authentication

Ellis uses Supabase for authentication with email-based OTP (One-Time Password) login flow.

### Client Management

- Create and maintain client profiles
- Track client demographics and needs
- Manage relationships with clients
- Document client interactions through notes

### Service Directory

- Browse services by category and subcategory
- Search for services and organizations
- View service details including availability and contact information
- Make referrals to services

### Referral System

Ellis includes a comprehensive referral system that allows service providers to:
- Refer clients to specific services
- Track the status of referrals
- Document outcomes of referrals
- Share client information with service providers (with consent)

### HMIS Integration

The app includes integration with the Homeless Management Information System (HMIS) to:
- Export client data in the HMIS CSV format
- Map app data to HMIS data elements
- Support federal program requirements (HUD, HHS, VA, etc.)

## Getting Started

### Prerequisites

- Node.js (recommended version: 16.x or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/ellis-app.git
cd ellis-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
expo start
# or
npm start
```

### Environment Variables

Create a `.env` file in the App directory with the following variables:

```
AUTH_SUPABASE_URL=your_auth_supabase_url
AUTH_SUPABASE_ANON_KEY=your_auth_supabase_anon_key
DATA_SUPABASE_URL=your_data_supabase_url
DATA_SUPABASE_ANON_KEY=your_data_supabase_anon_key
```

## Development

### Project Configuration

The app.json file contains the Expo configuration for the project, including:
- App name and version
- Icon and splash screen
- Platform-specific settings

### Adding New Features

1. Create new components in the appropriate directory
2. Add navigation routes in the routes directory
3. Update context providers if needed

### Building for Production

```bash
expo build:android  # For Android
expo build:ios      # For iOS
```

## HMIS Integration

The app includes comprehensive support for the Homeless Management Information System (HMIS) data elements, including:

- Universal Data Elements (UDEs)
- Project Descriptor Data Elements (PDDEs)
- Program-specific data elements for:
  - HUD-CoC (Continuum of Care)
  - HUD-HOPWA (Housing Opportunities for Persons With AIDS)
  - HHS-PATH (Projects for Assistance in Transition from Homelessness)
  - HHS-RHY (Runaway and Homeless Youth)
  - VA (Veterans Affairs) programs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request

## License

This project is licensed under the [MIT License](LICENSE).