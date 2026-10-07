export function formatMonth(value: string) {
  const [year, month] = value.slice(0, 7).split("-").map(Number);
  return new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(
    new Date(year, month - 1, 1),
  );
}

export function formatDateRange(startDate: string, endDate: string | null) {
  return `${formatMonth(startDate)} — ${endDate ? formatMonth(endDate) : "Present"}`;
}
