export function Statistics() {
  return (
    <section className="bg-surface-container-lowest py-20 border-y border-outline-variant/10">
      <div className="px-4 md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-gutter text-center">
        <div className="border-r border-outline-variant/10">
          <div className="font-display-lg text-4xl sm:text-headline-lg-mobile md:text-display-lg text-on-background">10+</div>
          <div className="font-label-caps text-[10px] md:text-label-caps text-primary uppercase mt-2">Years Exp.</div>
        </div>
        <div className="border-r-0 md:border-r border-outline-variant/10">
          <div className="font-display-lg text-4xl sm:text-headline-lg-mobile md:text-display-lg text-on-background">2X</div>
          <div className="font-label-caps text-[10px] md:text-label-caps text-primary uppercase mt-2">Top Trainer</div>
        </div>
        <div className="border-r border-outline-variant/10">
          <div className="font-display-lg text-4xl sm:text-headline-lg-mobile md:text-display-lg text-on-background">10000+</div>
          <div className="font-label-caps text-[10px] md:text-label-caps text-primary uppercase mt-2">Sessions</div>
        </div>
        <div className="">
          <div className="font-display-lg text-4xl sm:text-headline-lg-mobile md:text-display-lg text-on-background">100+</div>
          <div className="font-label-caps text-[10px] md:text-label-caps text-primary uppercase mt-2">Transformations</div>
        </div>
      </div>
    </section>
  );
}
