interface Stat {
  value: string;
  label: string;
}

// TODO: Replace with API data
const stats: Stat[] = [
  { value: "50+", label: "Doctors" },
  { value: "10k+", label: "Patients Treated" },
  { value: "15", label: "Departments" },
  { value: "24/7", label: "Support" },
];

export function StatsBar() {
  return (
    <section className="bg-primary-dark" aria-label="Hospital statistics">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-3xl font-bold tracking-tight text-accent md:text-4xl lg:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-white/80 md:text-base">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
