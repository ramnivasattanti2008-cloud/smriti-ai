# SMRITI AI — SYSTEM ARCHITECTURE

## 1. OVERVIEW

SMRITI AI is an AI-powered cognitive gaming and memory assistance platform designed for elderly users.

The system must prioritize:

- Accessibility
- Simplicity
- Personalization
- Privacy
- Offline functionality
- Reliability
- AI-assisted interaction

The system is a supportive platform and NOT a medical diagnosis system.

---

# 2. HIGH-LEVEL ARCHITECTURE

User
  ↓
React Frontend
  ↓
Application Services
  ↓
┌────────────────────────────────────┐
│                                    │
│ Cognitive Engine                   │
│ Memory Service                     │
│ Reminder Service                   │
│ Voice Service                      │
│ Analytics Service                  │
│ Localization Service               │
│ Offline Sync Service               │
│                                    │
└────────────────────────────────────┘
  ↓
Firebase / IndexedDB
  ↓
Cloud / Local Data

AI services should be used only where AI provides meaningful value.

---

# 3. FRONTEND

Technology:

- React
- TypeScript
- Vite
- Tailwind CSS

Suggested structure:

src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── utils/
├── types/
├── data/
├── games/
└── assets/

---

# 4. USER ROLES

The system supports three primary roles.

## Elder

Can:

- Play cognitive games
- View memories
- Use voice assistant
- View reminders
- View daily activities
- Interact with personalized content

## Caregiver

Can:

- View elder activity
- View engagement trends
- Manage reminders
- Add memories
- Review activity summaries
- Manage selected preferences

## Health Worker

Can:

- View authorized activity trends
- Review engagement information
- Review non-diagnostic activity summaries
- Support caregivers

The system must respect authorization boundaries.

---

# 5. ELDER MODE

Elder Mode is the primary experience.

Design principles:

- Large typography
- Large buttons
- High contrast
- Simple navigation
- Minimal choices
- Clear feedback
- Voice assistance
- Tablet-first layout

Main areas:

Home
Games
Memories
Reminders
Assistant
Profile

---

# 6. COGNITIVE GAME ENGINE

The game engine should support multiple game types.

Possible games:

- Memory matching
- Sequence recall
- Pattern recognition
- Word association
- Picture recall
- Number sequence
- Attention exercises

Each game should produce structured activity data.

Example:

{
  gameType,
  difficulty,
  score,
  accuracy,
  responseTime,
  mistakes,
  completionRate,
  timestamp
}

Do not interpret the result as a medical diagnosis.

---

# 7. ADAPTIVE COGNITIVE ENGINE

The adaptive engine determines future activity recommendations.

Inputs:

- Accuracy
- Response time
- Mistakes
- Completion rate
- Previous difficulty
- Recent activity

Outputs:

- Recommended game
- Recommended difficulty
- Activity suggestion
- Engagement recommendation

Example logic:

If performance is consistently strong:

Increase difficulty gradually.

If performance decreases:

Reduce difficulty or provide a simpler activity.

If engagement decreases:

Recommend shorter or more familiar activities.

The engine must avoid medical claims.

---

# 8. AI LAYER

Gemini may be used for:

- Natural language interaction
- Voice assistant responses
- Personalized activity suggestions
- Memory-related conversational assistance
- Caregiver summaries
- Content generation where appropriate

AI output must be controlled.

AI must not:

- Diagnose disease
- Give medical diagnosis
- Make unsupported medical predictions
- Replace healthcare professionals

Deterministic application logic should handle:

- Authentication
- Permissions
- Game scoring
- Difficulty calculations
- Database validation
- Reminders

---

# 9. MEMORY ASSISTANCE

The memory system allows authorized users to create memory items.

Memory item:

- Title
- Description
- Image
- Audio
- Person
- Relationship
- Date
- Tags

Example:

"My Daughter's Birthday"

The elder can interact with memories using:

- Images
- Text
- Voice
- Simple questions

Privacy must be maintained.

---

# 10. REMINDER SYSTEM

Reminder types:

- Medication reminder
- Appointment reminder
- Meal reminder
- Water reminder
- Activity reminder
- Family event reminder

Important:

The platform should not provide medical advice.

Medication reminders should simply remind the user of information configured by an authorized caregiver.

---

# 11. VOICE ASSISTANT

The voice assistant should provide simple conversational interaction.

Possible actions:

- Read reminders
- Start a game
- Open memories
- Explain an activity
- Answer basic application questions
- Provide navigation assistance

Voice interaction should be optional.

---

# 12. LOCALIZATION

Support regional languages relevant to the North Eastern Region.

Architecture should allow additional languages without rewriting the application.

Use a localization layer rather than hardcoding text throughout components.

---

# 13. OFFLINE-FIRST ARCHITECTURE

Core features should work without internet.

Local storage:

IndexedDB

Offline-capable features:

- Games
- Game results
- Basic memories
- Reminders
- User preferences

When internet returns:

Local data
  ↓
Sync Queue
  ↓
Firebase
  ↓
Sync confirmation

The system must handle failed synchronization safely.

---

# 14. FIREBASE

Firebase services may include:

Firebase Authentication
Firestore
Firebase Storage
Firebase Hosting where appropriate

Suggested collections:

users
elderProfiles
caregivers
healthWorkers
games
gameSessions
memories
reminders
routines
cognitiveMetrics
contentItems

Use Firebase Security Rules.

---

# 15. DATA MODEL

Users:

users/{userId}

Elder:

elderProfiles/{elderId}

Game session:

gameSessions/{sessionId}

Memory:

memories/{memoryId}

Reminder:

reminders/{reminderId}

Activity metrics:

cognitiveMetrics/{metricId}

All data must contain appropriate ownership and authorization information.

---

# 16. ANALYTICS

Analytics should focus on activity and engagement.

Possible metrics:

- Games completed
- Average response time
- Accuracy
- Completion rate
- Activity frequency
- Preferred game types
- Difficulty progression
- Engagement trend

Do not label analytics as medical diagnosis.

---

# 17. CAREGIVER DASHBOARD

Dashboard should provide:

- Elder profile
- Recent activity
- Engagement trend
- Game history
- Reminders
- Memories
- Recommendations
- Notifications where appropriate

Keep the dashboard understandable.

---

# 18. HEALTH-WORKER DASHBOARD

Show only authorized information.

Possible information:

- Activity trends
- Engagement
- Game participation
- Non-diagnostic summaries

Avoid presenting medical conclusions.

---

# 19. SECURITY

Security principles:

- Authentication required
- Role-based authorization
- Firestore security rules
- Environment variables
- No API keys in frontend source
- Input validation
- Secure data access

---

# 20. ERROR HANDLING

Every important operation should handle:

- Loading
- Success
- Empty state
- Error
- Offline state

Users should receive simple understandable messages.

Avoid technical error messages for elderly users.

---

# 21. UI ARCHITECTURE

Reusable components should include:

Button
Card
Modal
Navigation
GameCard
MemoryCard
ReminderCard
ProgressCard
VoiceButton
LoadingState
ErrorState
EmptyState

Avoid duplicated UI.

---

# 22. TESTING ARCHITECTURE

Testing should include:

Unit testing
Component testing
Integration testing
Browser testing
Responsive testing
Accessibility testing

Critical flows:

- Login
- Elder dashboard
- Start game
- Complete game
- Save result
- View memory
- Create reminder
- Voice interaction
- Caregiver dashboard

---

# 23. DEMO MODE

A demo mode should allow judges to experience the system quickly.

Demo should include fictional users.

Suggested flow:

Login
↓
Select Elder
↓
Elder Dashboard
↓
Cognitive Game
↓
Result
↓
Adaptive Recommendation
↓
Memory Assistance
↓
Reminder
↓
Caregiver Dashboard
↓
Analytics

---

# 24. DEVELOPMENT PRINCIPLE

Build incrementally.

Recommended order:

1. Project foundation
2. Design system
3. Elder UI
4. Cognitive games
5. Game scoring
6. Adaptive engine
7. Memory system
8. Reminder system
9. Voice assistant
10. Caregiver dashboard
11. Health-worker dashboard
12. Localization
13. Offline functionality
14. Firebase integration
15. Analytics
16. Security
17. Testing
18. Demo polish

---

# 25. IMPORTANT RULE

Do not implement everything at once.

Each milestone must be:

Designed
↓
Implemented
↓
Tested
↓
Reviewed
↓
Fixed
↓
Committed

This architecture is the source of truth unless a deliberate architectural decision changes it.