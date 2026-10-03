import { useState } from "react";
import { AuthExperience } from "./components/AuthExperience";
import { CaretakerWorkspace } from "./components/CaretakerWorkspace";
import { PatientWorkspace } from "./components/PatientWorkspace";
import { clearDemoSession, getStoredSession, saveDemoSession, type DemoSession } from "./services/authService";
import type { UserRole } from "./types";

function App() {
  const [session, setSession] = useState<DemoSession | null>(() => getStoredSession());

  const signIn = (role: UserRole, name?: string) => {
    const nextSession: DemoSession = {
      role,
      name: name ?? (role === "caregiver" ? "Anitha" : "Ravi"),
    };
    saveDemoSession(nextSession);
    setSession(nextSession);
  };

  const signOut = () => {
    clearDemoSession();
    setSession(null);
  };

  if (!session) {
    return (
      <AuthExperience
        onAuthenticated={signIn}
      />
    );
  }

  return session.role === "caregiver" ? (
    <CaretakerWorkspace onSignOut={signOut} />
  ) : (
    <PatientWorkspace userName={session.name} onSignOut={signOut} />
  );
}

export default App;