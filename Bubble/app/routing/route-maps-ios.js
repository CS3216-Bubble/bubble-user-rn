// Views
import { ChatListView } from '../views/chat-list-view';
import { ChatView } from '../views/chat-view.js';
import { ContactListView } from '../views/contact-list-view';
import { CreateChatView } from '../views/create-chat-view';
import { CreateSOSChatView } from '../views/create-sos-chat-view';
import { LandingView } from '../views/landing-view';
import { OnboardingView } from '../views/onboarding-view';
import { ProfileView } from '../views/profile-view';
import { SettingsView } from '../views/settings-view';

// Describe the IOS Navigation Bar for every view / scene
export var IOSRoutes = {
    ChatListView: {
        component: ChatListView,
        title: 'Chat List View',
        passProps: { title: 'Chat List View' },
        leftButtonTitle: '',
        rightButtonTitle: 'Settings',
    }, 
    
    //...

};