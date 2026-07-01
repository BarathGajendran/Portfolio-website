export function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-blob absolute -left-32 top-10 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.18 295 / 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-blob absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full [animation-delay:-6s]"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.16 75 / 0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-80 w-80 rounded-full [animation-delay:-12s]"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.18 295 / 0.12) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
