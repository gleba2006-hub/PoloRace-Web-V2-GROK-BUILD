type PolaroidProps = {
  src: string;
  alt: string;
  caption: string;
  tilt?: "left" | "right" | "none";
  priority?: boolean;
};

const tiltClass = {
  left: "-rotate-3",
  right: "rotate-2",
  none: "rotate-0",
} as const;

export function Polaroid({ src, alt, caption, tilt = "none", priority = false }: PolaroidProps) {
  return (
    <figure
      className={`bg-card shadow-polaroid w-full p-2 pb-8 ${tiltClass[tilt]} transition-transform duration-200 hover:rotate-0`}
    >
      <img
        src={src}
        alt={alt}
        width={640}
        height={800}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="aspect-4/5 w-full bg-sky object-cover"
      />
      <figcaption className="text-ink mt-2 text-center text-sm font-semibold">{caption}</figcaption>
    </figure>
  );
}
