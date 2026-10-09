type TagListProps = {
  items: string[];
  variant?: "tag" | "interest";
  label?: string;
  className?: string;
};

const itemStyles = {
  tag: "rounded-xl border border-border bg-white px-[9px] py-[4px] text-[10px] leading-[1.45] text-muted",
  interest:
    "rounded-xl border border-border bg-white px-3 py-2 text-[11px] font-semibold text-muted",
} as const;

export function TagList({
  items,
  variant = "tag",
  label,
  className = "",
}: TagListProps) {
  return (
    <ul
      className={`flex flex-wrap ${variant === "tag" ? "gap-1.5" : "gap-2"} ${className}`}
      aria-label={label}
    >
      {items.map((item) => (
        <li className={itemStyles[variant]} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
