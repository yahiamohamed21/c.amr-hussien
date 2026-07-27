export function Statistics() {
  return (
    <section className="bg-surface-container-lowest py-20 border-y border-outline-variant/10">
      <div className="px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
        <div className="border-r border-outline-variant/10 last:border-none">
          <div className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-background">10+</div>
          <div className="font-label-caps text-label-caps text-primary uppercase">Years Exp.</div>
        </div>
        <div className="border-r border-outline-variant/10 last:border-none">
          <div className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-background">2X</div>
          <div className="font-label-caps text-label-caps text-primary uppercase">Top Trainer</div>
        </div>
        <div className="border-r border-outline-variant/10 last:border-none">
          <div className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-background">10000+</div>
          <div className="font-label-caps text-label-caps text-primary uppercase">Sessions</div>
        </div>
        <div className="last:border-none">
          <div className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-background">100+</div>
          <div className="font-label-caps text-label-caps text-primary uppercase">Transformations</div>
        </div>
      </div>
    </section>
  );
}
