# Ellis App

Ellis is a relationship and service manager application designed for service providers to meet the needs of marginalized communities more efficiently and effectively. It enables service providers to manage client relationships, make referrals to services, track client progress, and coordinate care across organizations.

## Project Overview

Ellis helps service providers by:
- Managing client profiles and relationships
- Making service referrals to other organizations
- Tracking client progress through different services
- Creating and managing notes about client interactions
- Providing a directory of available services in the community

## Project Structure

```
App/
├── api/                  # API clients and mock data
│   ├── ChatMessages.js   # Mock message data for chat functionality
│   ├── Chats.js          # Mock chat data for conversations
│   └── supabaseClient.js # Supabase client configuration
├── assets/               # Images, fonts and static resources
│   ├── fonts/            # Custom font files (Gabarito, Karla, JetBrainsMono)
│   └── images/           # App images including profile pictures and icons
├── context/              # React Context providers
│   └── userContext.js    # User authentication and profile context
├── filtering/            # Filtering utilities for search
│   ├── amenityFilter.js  # Filter amenities by category
│   ├── openNowFilter.js  # Filter services by current operational hours
│   └── sortByFiltering.js # Sort amenities by different criteria
├── HMIS/                 # Homeless Management Information System integration
│   ├── CSVBreakdown.md   # Documentation for HMIS CSV format
│   ├── FederalPartnerProgramData/ # Program-specific data requirements
│   │   ├── HHS-PATH.json # PATH program data elements
│   │   ├── HHS-RHY.json  # RHY program data elements
│   │   ├── HUD-CoC.json  # CoC program data elements
│   │   ├── HUD-HOPWA.json # HOPWA program data elements
│   │   └── VA.json       # VA program data elements
│   ├── HMISINTEGRATION.md # Documentation for HMIS integration process
│   ├── PDDEandUDETemplate.json # Template for Project and Universal Data Elements
│   └── ProgramSpecificData/ # Additional program-specific data structures
│       └── CommonProgramSpecificTemplate.json # Shared program elements
├── routes/               # Navigation configuration
│   ├── AppNavigator.js   # Main tab navigation
│   ├── FloatingActionMenu.js # Floating action button with menu
│   ├── MainScreenContainer.js # Container for main app screens
│   ├── OnboardingNavigator.js # Navigation for onboarding flow
│   └── RootNavigator.js  # Root navigation structure
├── screens/              # Screen components organized by feature
│   ├── amenityPages/     # Screens for viewing amenity details
│   │   └── AmenityPage.js # Detailed view of a service provider/amenity
│   ├── chatPages/        # Chat interface screens
│   │   └── ChatPage.js   # Message conversation screen
│   ├── coachReferPages/  # Referral coaching screens
│   │   └── selectMeetingTime.js # Schedule meeting time for referral coaching
│   ├── directoryPages/   # Service directory screens
│   │   ├── Directory.js  # Main directory screen with search and filters
│   │   ├── myClients.js  # List of current clients
│   │   ├── myHours.js    # Service provider hours tracking
│   │   ├── myServices.js # Services offered by the provider
│   │   └── recentReferral.js # Recent referral details
│   ├── messagesPages/    # Messaging interface
│   │   └── Messages.js   # List of message conversations
│   ├── onboarding/       # User onboarding screens
│   │   ├── AccountCreation.js # Create user account
│   │   ├── addServiceHours.js # Add service hours during onboarding
│   │   ├── addServicesPage.js # Add available services during onboarding
│   │   ├── CreateOrganization.js # Create new organization profile
│   │   ├── LoginPage.js  # User login
│   │   ├── Onboarding.js # Initial onboarding flow
│   │   └── RegisterPage.js # User registration
│   ├── plusNavigatorButton/ # Actions triggered by plus button
│   │   ├── client/       # Client management
│   │   │   ├── ClientInformation.js # Add/edit client information
│   │   │   └── CreateClient.js # Create new client profile
│   │   ├── notes/        # Note management
│   │   │   ├── CreateNote.js # Create new client note
│   │   │   └── NoteDetails.js # View note details
│   │   └── services/     # Service management
│   │       └── services.js # Add/edit services
│   ├── profilePages/     # User profile screens
│   │   └── ProfilePage.js # Client profile view
│   ├── referralFlowPages/ # Service referral workflow
│   │   ├── ConfirmReferral.js # Confirm referral details
│   │   ├── EnrollmentForm.js # Complete service enrollment form
│   │   ├── NonprofitTags.js # Browse nonprofits by tags
│   │   ├── ReferralSent.js # Confirmation of sent referral
│   │   ├── ReferToPerson.js # Refer client to specific staff member
│   │   ├── ReferToService.js # Refer client to specific service
│   │   ├── SelectClient.js # Select client for referral
│   │   ├── SelectClientWithReferralLocation.js # Select client with location
│   │   ├── SelectReferralFor.js # Select referral type 
│   │   ├── SelectReferralLocation.js # Select service location
│   │   ├── ServiceDetails.js # View service details
│   │   └── ServiceDirectory.js # Browse available services
│   ├── relationshipsPages/ # Relationship management
│   │   └── Relationships.js # List and manage client relationships
│   └── settingsPage/     # App settings
│       ├── AccountPage.js # User account settings
│       ├── HelpPage.js   # Help and support
│       ├── LogOutPage.js # Logout functionality
│       ├── NotificationsPage.js # Notification settings
│       ├── OrganizationProfile.js # Organization profile management
│       └── Settings.js   # Main settings screen
├── shared/               # Shared components and utilities
│   ├── Card.js           # Card component for consistent UI
│   ├── CustomBackButton.js # Custom back navigation button
│   ├── Dropdown.js       # Dropdown component
│   ├── getProfileImage.js # Helper for profile image management
│   ├── globalStyles.js   # Global style definitions
│   ├── ProgressBar.js    # Progress bar component
│   ├── RenderIconFunction.js # Helper for icon rendering
│   └── SearchHeader.js   # Search component
├── App.js                # Main app component
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── .env                  # Environment variables (not in repo)
└── package.json          # Package dependencies
```

Each directory is organized around a specific feature or functionality of the app, making it easier to locate and manage related code. The structure follows a modular approach, where screens, components, and utilities are separated for better maintainability.

## Key Features

### User Authentication

Ellis uses Supabase for authentication with email-based OTP (One-Time Password) login flow.

- Implementation in `App/screens/onboarding/LoginPage.js` and `App/screens/onboarding/RegisterPage.js`
- Authentication state management in `App/context/userContext.js`
- Supabase client configuration in `App/api/supabaseClient.js`
- User profile creation in `App/screens/onboarding/AccountCreation.js`

### Client Management

- Create and maintain client profiles (`App/screens/plusNavigatorButton/client/CreateClient.js`)
- Track client demographics and needs (`App/screens/plusNavigatorButton/client/ClientInformation.js`)
- Manage relationships with clients (`App/screens/relationshipsPages/Relationships.js`)
- Document client interactions through notes (`App/screens/plusNavigatorButton/notes/CreateNote.js`, `App/screens/plusNavigatorButton/notes/NoteDetails.js`)
- View client profiles with detailed information (`App/screens/profilePages/ProfilePage.js`)
- Filter and search clients (`App/shared/SearchHeader.js`)

### Service Directory

- Browse services by category and subcategory (`App/screens/referralFlowPages/ServiceDirectory.js`)
- Search for services and organizations (`App/shared/SearchHeader.js`)
- View service details including availability and contact information (`App/screens/amenityPages/AmenityPage.js`)
- Filter services using various criteria (`App/filtering/amenityFilter.js`, `App/filtering/openNowFilter.js`, `App/filtering/sortByFiltering.js`)
- Support for different service categories with dynamic rendering (`App/screens/referralFlowPages/ServiceDetails.js`)

### Referral System

Ellis includes a comprehensive referral system that allows service providers to:
- Refer clients to specific services (`App/screens/referralFlowPages/ReferToService.js`)
- Refer clients to specific staff members (`App/screens/referralFlowPages/ReferToPerson.js`)
- Select appropriate referral locations (`App/screens/referralFlowPages/SelectReferralLocation.js`)
- Complete enrollment forms for services (`App/screens/referralFlowPages/EnrollmentForm.js`)
- Review and confirm referrals (`App/screens/referralFlowPages/ConfirmReferral.js`)
- Track referral status (`App/screens/referralFlowPages/ReferralSent.js`)
- View recent referrals (`App/screens/directoryPages/recentReferral.js`)

### Team and Communication

- Messaging between team members (`App/screens/messagesPages/Messages.js`, `App/screens/chatPages/ChatPage.js`)
- Team management and permissions (`App/screens/adminManagement.js`, `App/screens/adminPages/admins.js`)
- Organization profile management (`App/screens/settingsPage/OrganizationProfile.js`)

### HMIS Integration

The app includes integration with the Homeless Management Information System (HMIS) to:
- Export client data in the HMIS CSV format (`App/HMIS/CSVBreakdown.md`)
- Map app data to HMIS data elements (`App/HMIS/PDDEandUDETemplate.json`)
- Support federal program requirements through specialized data formats:
  - HUD-CoC (Continuum of Care) - `App/HMIS/FederalPartnerProgramData/HUD-CoC.json`
  - HUD-HOPWA (Housing Opportunities for Persons With AIDS) - `App/HMIS/FederalPartnerProgramData/HUD-HOPWA.json`
  - HHS-PATH (Projects for Assistance in Transition from Homelessness) - `App/HMIS/FederalPartnerProgramData/HHS-PATH.json`
  - HHS-RHY (Runaway and Homeless Youth) - `App/HMIS/FederalPartnerProgramData/HHS-RHY.json`
  - VA (Veterans Affairs) programs - `App/HMIS/FederalPartnerProgramData/VA.json`
- Comprehensive data structure documentation in `App/HMIS/HMISINTEGRATION.md`

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

## License

This project is licensed under the [MIT License](LICENSE).