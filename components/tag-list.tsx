type TagListProps = {
  items: string[];
  variant?: "tag" | "interest";
  label?: string;
  className?: string;
};

const itemStyles = {
  tag: "rounded-[3px] border border-border px-[7px] py-[3px] text-[10px] leading-[1.45] text-[#535b66]",
  interest:
    "rounded-[3px] border border-border px-2.5 py-[7px] text-[11px] text-[#48505a]",
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
