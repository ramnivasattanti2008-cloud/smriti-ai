type AnimatedBackgroundProps = {
  variant?: "default" | "calm" | "warm";
};

export default function AnimatedBackground({
  variant = "default",
}: AnimatedBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none
        fixed
        inset-0
        -z-10
        overflow-hidden
        ${
          variant === "calm"
            ? "bg-[#f3f7ef]"
            : variant === "warm"
              ? "bg-[#f8f5ed]"
              : "bg-[#f5f7f1]"
        }
      `}
    >
      <div
        className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-[#dce8d5]/60
          blur-3xl
          animate-[smriti-float_9s_ease-in-out_infinite]
        "
      />

      <div
        className="
          absolute
          -right-32
          top-1/4
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-[#e9dfc8]/40
          blur-3xl
          animate-[smriti-float_12s_ease-in-out_infinite_reverse]
        "
      />

      <div
        className="
          absolute
          bottom-[-10rem]
          left-1/3
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-[#d8e5d2]/40
          blur-3xl
          animate-[smriti-breathe_10s_ease-in-out_infinite]
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          bg-[radial-gradient(#172018_1px,transparent_1px)]
          bg-[size:22px_22px]
        "
      />
    </div>
  );
}