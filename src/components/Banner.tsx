type BannerProps = {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
};

const BANNER_ENTRIES = [
  { label: '推荐', value: '' },
  { label: '动作', value: 'Action' },
  { label: '科幻', value: 'Sci-Fi' }
];

export function Banner({ activeCategory, onCategorySelect }: BannerProps) {
  return (
    <section className="banner" aria-label="分类入口">
      {BANNER_ENTRIES.map((entry) => (
        <button
          key={entry.label}
          type="button"
          className={`banner-entry ${activeCategory === entry.value ? 'active' : ''}`}
          onClick={() => onCategorySelect(entry.value)}
        >
          {entry.label}
        </button>
      ))}
    </section>
  );
}
