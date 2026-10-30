export default function SuggestionChips({
  items,
  onPick,
}: {
  items: readonly string[];
  onPick: (item: string) => void;
}) {
  if (!items.length) return null;

  return (
    <ul className="mobile-chips" aria-label="Suggested questions">
      {items.map((item) => (
        <li key={item}>
          <button
            type="button"
            className="mobile-chip"
            onClick={() => onPick(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
