import { useState } from "react";
import { Heart, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "../components";

type Role = "patient" | "caretaker";

type WelcomeProps = {
  onSelectRole: (role: Role) => void;
};

export default function Welcome({
  onSelectRole,
}: WelcomeProps) {
  const [hoveredRole, setHoveredRole] =
    useState<Role | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Decorative floating elements */}
      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[18%]
          h-3
          w-3
          rounded-full
          bg-[#718866]/40
          smriti-float
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-[24%]
          h-2
          w-2
          rounded-full
          bg-[#c6a76b]/50
          smriti-pulse
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[20%]
          left-[18%]
          h-2
          w-2
          rounded-full
          bg-[#718866]/30
          smriti-pulse
        "
      />

      {/* Navigation */}
      <header
        className="
          mx-auto
          flex
          w-[min(1200px,calc(100%-32px))]
          items-center
          justify-between
          py-6
          sm:py-8
        "
      >
        <button
          type="button"
          className="
            group
            flex
            items-center
            gap-3
            rounded-full
            px-2
            py-1
            transition-transform
            duration-300
            hover:scale-105
          "
          onClick={() => window.scrollTo({
            top: 0,
            behavior: "smooth",
          })}
        >
          <span
            className="
              grid
              h-10
              w-10
              place-items-center
              rounded-full
              bg-[#52674a]
              text-lg
              font-semibold
              text-white
              shadow-lg
              shadow-[#52674a]/20
              transition-transform
              duration-500
              group-hover:rotate-6
            "
          >
            S
          </span>

          <span
            className="
              text-sm
              font-bold
              tracking-[0.25em]
              text-[#172018]
            "
          >
            SMRITI
          </span>
        </button>

        <div
          className="
            hidden
            items-center
            gap-2
            rounded-full
            border
            border-[#172018]/10
            bg-white/60
            px-4
            py-2
            text-xs
            text-[#647064]
            shadow-sm
            backdrop-blur-xl
            sm:flex
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#718866]
              smriti-pulse
            "
          />
          Always here for you
        </div>
      </header>

      {/* Hero */}
      <section
        className="
          mx-auto
          grid
          min-h-[calc(100vh-100px)]
          w-[min(1200px,calc(100%-32px))]
          items-center
          gap-12
          pb-16
          pt-6
          lg:grid-cols-[1.05fr_.95fr]
          lg:gap-20
        "
      >
        {/* Text */}
        <div className="smriti-page-enter">
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#718866]/15
              bg-white/60
              px-4
              py-2
              text-[10px]
              font-bold
              tracking-[0.18em]
              text-[#718866]
              shadow-sm
              backdrop-blur-xl
            "
          >
            <Sparkles size={13} />
            YOUR DIGITAL COMPANION
          </div>

          <h1
            className="
              max-w-4xl
              text-5xl
              font-medium
              leading-[.95]
              tracking-[-0.055em]
              text-[#172018]
              sm:text-6xl
              md:text-7xl
              lg:text-[82px]
            "
          >
            Life feels better
            <br />

            <span className="text-[#718866]">
              when you're remembered.
            </span>
          </h1>

          <p
            className="
              mt-7
              max-w-xl
              text-base
              leading-8
              text-[#647064]
              sm:text-lg
            "
          >
            SMRITI brings memories, daily routines,
            wellbeing, family connection, safety,
            entertainment and an AI companion into
            one friendly space.
          </p>

          {/* Trust indicators */}
          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[#172018]/8
                bg-white/60
                px-4
                py-2
                text-xs
                text-[#647064]
                backdrop-blur-xl
              "
            >
              <Heart
                size={14}
                className="text-[#718866]"
              />
              Personal
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[#172018]/8
                bg-white/60
                px-4
                py-2
                text-xs
                text-[#647064]
                backdrop-blur-xl
              "
            >
              <ShieldCheck
                size={14}
                className="text-[#718866]"
              />
              Privacy focused
            </div>
          </div>
        </div>

        {/* Companion */}
        <div
          className="
            relative
            mx-auto
            flex
            h-[380px]
            w-full
            max-w-[500px]
            items-center
            justify-center
            lg:h-[540px]
          "
        >
          {/* Outer rings */}
          <div
            className="
              absolute
              h-[300px]
              w-[300px]
              rounded-full
              border
              border-[#718866]/10
              sm:h-[360px]
              sm:w-[360px]
              smriti-breathe
            "
          />

          <div
            className="
              absolute
              h-[390px]
              w-[390px]
              rounded-full
              border
              border-[#718866]/8
              sm:h-[460px]
              sm:w-[460px]
              smriti-pulse
            "
          />

          {/* Orbiting dot */}
          <div
            className="
              absolute
              h-[340px]
              w-[340px]
              animate-[spin_18s_linear_infinite]
              rounded-full
              sm:h-[410px]
              sm:w-[410px]
            "
          >
            <span
              className="
                absolute
                left-1/2
                top-0
                h-3
                w-3
                -translate-x-1/2
                rounded-full
                bg-[#718866]
                shadow-lg
                shadow-[#718866]/40
              "
            />
          </div>

          {/* Companion */}
          <div
            className="
              relative
              grid
              h-52
              w-52
              place-items-center
              rounded-full
              bg-[radial-gradient(circle_at_32%_25%,#f1f5eb,#a9ba9f_28%,#65755c_55%,#34402f_78%,#182017)]
              shadow-[0_30px_100px_rgba(82,103,74,.25)]
              sm:h-64
              sm:w-64
              smriti-breathe
            "
          >
            {/* Inner glass */}
            <div
              className="
                grid
                h-20
                w-20
                place-items-center
                rounded-full
                border
                border-white/40
                bg-white/10
                text-2xl
                font-semibold
                text-white
                shadow-[0_0_40px_rgba(255,255,255,.15)]
                backdrop-blur-xl
              "
            >
              S
            </div>

            {/* Particles */}
            <span
              className="
                absolute
                left-8
                top-16
                h-2
                w-2
                rounded-full
                bg-white/70
                smriti-pulse
              "
            />

            <span
              className="
                absolute
                bottom-14
                right-10
                h-3
                w-3
                rounded-full
                bg-[#dce8d5]
                smriti-float
              "
            />

            <span
              className="
                absolute
                right-7
                top-20
                h-1.5
                w-1.5
                rounded-full
                bg-white/60
                smriti-pulse
              "
            />
          </div>

          {/* Caption */}
          <div
            className="
              absolute
              bottom-2
              left-1/2
              flex
              -translate-x-1/2
              items-center
              gap-2
              rounded-full
              border
              border-white/50
              bg-white/60
              px-4
              py-2
              text-xs
              text-[#647064]
              shadow-lg
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#718866]
                smriti-pulse
              "
            />

            SMRITI is here
          </div>
        </div>
      </section>

      {/* Role selection */}
      <section
        className="
          mx-auto
          w-[min(1000px,calc(100%-32px))]
          pb-20
        "
      >
        <div className="mb-6 text-center">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#8b9589]
            "
          >
            Choose your experience
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-semibold
              tracking-tight
              text-[#172018]
              sm:text-3xl
            "
          >
            How would you like to continue?
          </h2>
        </div>

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {/* Patient */}
          <button
            type="button"
            onMouseEnter={() =>
              setHoveredRole("patient")
            }
            onMouseLeave={() =>
              setHoveredRole(null)
            }
            onClick={() =>
              onSelectRole("patient")
            }
            className={`
              group
              relative
              min-h-[230px]
              overflow-hidden
              rounded-[30px]
              border
              p-7
              text-left
              transition-all
              duration-500
              ${
                hoveredRole === "patient"
                  ? "border-[#718866]/30 bg-[#718866]/10 shadow-2xl shadow-[#718866]/10 -translate-y-2"
                  : "border-[#172018]/8 bg-white/65 shadow-lg shadow-[#172018]/5"
              }
            `}
          >
            <div
              className="
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-[#dce8d5]/60
                blur-3xl
                transition-transform
                duration-700
                group-hover:scale-150
              "
            />

            <div
              className="
                relative
                grid
                h-14
                w-14
                place-items-center
                rounded-2xl
                bg-[#dce8d5]
                text-[#52674a]
                transition-transform
                duration-500
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              <Heart size={25} />
            </div>

            <div className="relative mt-8">
              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.18em]
                  text-[#8b9589]
                "
              >
                FOR ME
              </span>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-[#172018]
                "
              >
                I'm using SMRITI
              </h3>

              <p
                className="
                  mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-[#647064]
                "
              >
                A simple, friendly space for
                memories, routines, wellbeing,
                activities and connection.
              </p>
            </div>

            <ArrowRight
              className="
                absolute
                bottom-7
                right-7
                text-[#718866]
                transition-transform
                duration-500
                group-hover:translate-x-2
              "
            />
          </button>

          {/* Caretaker */}
          <button
            type="button"
            onMouseEnter={() =>
              setHoveredRole("caretaker")
            }
            onMouseLeave={() =>
              setHoveredRole(null)
            }
            onClick={() =>
              onSelectRole("caretaker")
            }
            className={`
              group
              relative
              min-h-[230px]
              overflow-hidden
              rounded-[30px]
              border
              p-7
              text-left
              transition-all
              duration-500
              ${
                hoveredRole === "caretaker"
                  ? "border-[#c6a76b]/30 bg-[#c6a76b]/10 shadow-2xl shadow-[#c6a76b]/10 -translate-y-2"
                  : "border-[#172018]/8 bg-white/65 shadow-lg shadow-[#172018]/5"
              }
            `}
          >
            <div
              className="
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-[#eadfca]/60
                blur-3xl
                transition-transform
                duration-700
                group-hover:scale-150
              "
            />

            <div
              className="
                relative
                grid
                h-14
                w-14
                place-items-center
                rounded-2xl
                bg-[#eadfca]
                text-[#826a3c]
                transition-transform
                duration-500
                group-hover:-rotate-6
                group-hover:scale-110
              "
            >
              <ShieldCheck size={25} />
            </div>

            <div className="relative mt-8">
              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.18em]
                  text-[#8b9589]
                "
              >
                FOR SOMEONE I CARE FOR
              </span>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-[#172018]
                "
              >
                I'm a caretaker
              </h3>

              <p
                className="
                  mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-[#647064]
                "
              >
                Stay connected with location,
                reminders, notes, wellbeing,
                safety and daily activity.
              </p>
            </div>

            <ArrowRight
              className="
                absolute
                bottom-7
                right-7
                text-[#a4834a]
                transition-transform
                duration-500
                group-hover:translate-x-2
              "
            />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="
          mx-auto
          flex
          w-[min(1200px,calc(100%-32px))]
          flex-col
          justify-between
          gap-3
          border-t
          border-[#172018]/8
          py-6
          text-[10px]
          uppercase
          tracking-[0.15em]
          text-[#8b9589]
          sm:flex-row
        "
      >
        <span>SMRITI AI</span>

        <span>
          Memory · Care · Connection · Wellbeing
        </span>

        <span>2026</span>
      </footer>
    </main>
  );
}