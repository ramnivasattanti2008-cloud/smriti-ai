# SMRITI AI — DEVELOPMENT RULES

## 1. GENERAL RULE

Before changing code:

1. Read AI_CONTEXT/PROJECT.md
2. Read AI_CONTEXT/RULES.md
3. Inspect the existing code.
4. Understand the current architecture.
5. Make the smallest safe change.

Do not blindly rewrite existing code.

---

## 2. MEDICAL SAFETY

SMRITI AI is NOT a medical diagnosis system.

Never claim that the application can:

- Diagnose dementia
- Detect dementia
- Confirm Alzheimer's disease
- Predict a medical condition
- Replace a doctor

Never create a "Dementia Score" or "Disease Score".

Use:

- Cognitive Activity
- Game Performance
- Engagement
- Response Time
- Activity Trend
- Activity Insights

---

## 3. ELDER USER INTERFACE

The elderly interface must prioritize accessibility.

Use:

- Large text
- Large buttons
- High contrast
- Simple navigation
- Large touch targets
- Clear icons
- Minimal screens
- Simple language
- Voice assistance where useful

Avoid:

- Tiny text
- Tiny buttons
- Complex menus
- Excessive animations
- Cluttered dashboards
- Unnecessary popups

The application should be tablet-first.

---

## 4. DESIGN

The UI should look:

- Modern
- Premium
- Calm
- Trustworthy
- Accessible
- Professional

Do not make the interface look like a generic student project.

Maintain consistent:

- Typography
- Spacing
- Buttons
- Cards
- Icons
- Colors
- Navigation

---

## 5. AI USAGE

Use AI where it provides real value.

Good AI use cases:

- Personalized activity recommendations
- Natural language interaction
- Voice assistant
- Personalized content
- Memory assistance
- Caregiver summaries

Do NOT use AI unnecessarily for deterministic operations.

Use normal application logic for:

- Authentication
- Game scoring
- Data validation
- Reminders
- Permissions
- Database operations

---

## 6. ADAPTIVE COGNITIVE ENGINE

The adaptive engine may consider:

- Accuracy
- Response time
- Mistakes
- Completion rate
- Previous difficulty
- Recent activity

It can determine:

- Next activity
- Difficulty
- Activity recommendation
- Engagement suggestion

Do not represent these outputs as medical diagnoses.

---

## 7. OFFLINE-FIRST

Core functionality should continue working when internet connectivity is unavailable.

Offline functionality should include:

- Cognitive games
- Local game results
- Basic reminders
- Basic memory access

Use local storage/IndexedDB where appropriate.

When connectivity returns:

1. Detect connection.
2. Synchronize pending data.
3. Handle conflicts safely.
4. Confirm successful synchronization.

---

## 8. SECURITY

Never:

- Hardcode API keys
- Hardcode passwords
- Commit secrets
- Expose private credentials
- Store sensitive credentials in frontend source code

Use environment variables.

Validate user input.

Use proper authentication.

Use proper authorization.

Follow Firebase security rules.

---

## 9. CODE QUALITY

Use:

- TypeScript
- Reusable components
- Clear naming
- Modular architecture
- Proper error handling
- Loading states
- Empty states
- Error states

Avoid:

- Giant components
- Duplicate code
- Unnecessary dependencies
- Hardcoded repeated values
- Unused code
- Temporary hacks

---

## 10. COMPONENT RULE

Create reusable components when appropriate.

For example:

- Button
- Card
- Modal
- Navigation
- GameCard
- ProgressCard
- ReminderCard
- MemoryCard

Do not duplicate the same UI code across multiple pages.

---

## 11. TESTING

After implementing a feature:

1. Run the application.
2. Check the browser console.
3. Test the feature.
4. Test error cases.
5. Test loading states.
6. Test empty states.
7. Test responsive layout.
8. Fix problems.
9. Test again.

Never say a feature is complete without testing it.

---

## 12. BROWSER TESTING

Use the browser testing capability whenever appropriate.

Check:

- Buttons
- Navigation
- Forms
- Layout
- Responsiveness
- Accessibility
- Console errors
- Loading behavior
- Error behavior

---

## 13. GITHUB

Create a Git commit after completing a stable milestone.

Use meaningful commit messages.

Examples:

Initial project setup

Add elder dashboard

Add cognitive game engine

Add Firebase authentication

Add offline synchronization

Fix caregiver dashboard

---

## 14. ARCHITECTURE

Do not make major architecture changes without first checking:

AI_CONTEXT/ARCHITECTURE.md

If a major change is required:

1. Explain why.
2. Identify affected components.
3. Check for breaking changes.
4. Update the architecture documentation.
5. Then implement.

---

## 15. SIH DEMO

The application must be demo-friendly.

Important flows should be easy to demonstrate.

The demo should clearly show:

1. Elder experience
2. Cognitive game
3. Adaptive personalization
4. Memory assistance
5. Reminder
6. Caregiver view
7. Analytics
8. AI capability
9. Offline capability

---

## 16. DO NOT OVERBUILD

Do not add unnecessary features.

Prioritize:

1. Working features
2. Reliability
3. Accessibility
4. AI usefulness
5. UI quality
6. Offline capability
7. Security
8. SIH presentation quality

A smaller working feature is better than a large broken feature.

---

## 17. WHEN UNSURE

If requirements are unclear:

Do not invent critical behavior.

Inspect:

- PROJECT.md
- ARCHITECTURE.md
- TODO.md
- Existing source code

Then choose the safest implementation that preserves the existing architecture.

---

## 18. FINAL RULE

Every AI agent working on this project must treat:

AI_CONTEXT/PROJECT.md
AI_CONTEXT/RULES.md
AI_CONTEXT/ARCHITECTURE.md
AI_CONTEXT/TODO.md
AI_CONTEXT/QA.md

as the shared project context.

Never ignore the existing project documentation.