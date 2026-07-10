import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

// TODO: Replace with API data
const testimonials: Testimonial[] = [
  {
    name: "Fatima Begum",
    quote:
      "MediFlow made booking an appointment so easy. I found a specialist in minutes and the whole experience was smooth from start to finish.",
    rating: 5,
  },
  {
    name: "Ariful Islam",
    quote:
      "The video consultation feature is a lifesaver. I got a prescription without leaving home. Highly recommend this platform.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    quote:
      "My son's pediatrician was booked solid everywhere, but MediFlow had an available slot the same day. Truly a blessing for busy parents.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            What our patients say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Real stories from people who trust MediFlow for their healthcare
            needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {/* Rating stars */}
              <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-warning text-warning"
                        : "fill-none text-border"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-sm leading-relaxed text-text-secondary">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="text-sm font-semibold text-text-primary">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
