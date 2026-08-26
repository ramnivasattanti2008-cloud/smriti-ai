import { useState } from "react";
import Welcome from "./pages/Welcome";

type Role = "patient" | "caretaker";

function App() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return (
      <Welcome
        onSelectRole={(selectedRole) => {
          setRole(selectedRole);
        }}
      />
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f7f1]
        p-8
      "
    >
      <div
        className="
          mx-auto
          max-w-4xl
          rounded-[32px]
          border
          border-black/5
          bg-white/70
          p-8
          shadow-xl
          backdrop-blur-xl
          smriti-page-enter
        "
      >
        <button
          type="button"
          onClick={() => setRole(null)}
          className="
            mb-8
            rounded-full
            bg-[#718866]
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#52674a]
          "
        >
          ← Back
        </button>

        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            text-[#718866]
          "
        >
          {role === "patient"
            ? "Patient experience"
            : "Caretaker experience"}
        </p>

        <h1
          className="
            mt-3
            text-4xl
            font-semibold
            tracking-tight
            text-[#172018]
          "
        >
          {role === "patient"
            ? "Welcome to your SMRITI space."
            : "Welcome to the Caretaker space."}
        </h1>

        <p
          className="
            mt-4
            max-w-xl
            leading-7
            text-[#647064]
          "
        >
          This is the next screen we'll replace with
          the complete animated{" "}
          {role === "patient"
            ? "Patient Login"
            : "Caretaker Login"}{" "}
          experience.
        </p>
      </div>
    </main>
  );
}

export default App;