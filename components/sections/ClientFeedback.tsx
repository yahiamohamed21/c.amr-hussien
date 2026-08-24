"use client";

import { Star } from "lucide-react";

const feedbacks = [
  {
    name: "Romain sayed",
    date: "Aug 01, 2026",
    text: "I started with Amr because of knee pain caused by poor training, overload, and limited mobility. In just one month, he got me pain-free and back to my best, physically and mentally. Thanks for everything you're one of the best performance coaches I've worked with.",
    rating: 5,
  },
  {
    name: "Amr Tarek",
    date: "Jul 09, 2026",
    text: "dedicated Coach, he concentrates in each of your details as if you were his only client. Super-Friendly and yet very Professional.",
    rating: 5,
  },
  {
    name: "Farid shekh",
    date: "Jul 11, 2026",
    text: "الكابتن الوحيد الي بيتابع معاك برا الجيم وبيكون حريص على نظام يومك كامل الشكر والتوفيق كابتن عمرو.",
    rating: 5,
  },
  {
    name: "Anonymous Client",
    date: "2026",
    text: "I've tried countless times over the years to get in shape, but this is the first time I've followed a plan that was truly sustainable—and actually achieved the best results of my life. Working with Amr has helped me reach the best shape and strongest version of myself. My health markers have improved significantly, especially my cholesterol levels. My LDL has dropped remarkably through his combination of structured training and practical nutrition guidance.",
    rating: 5,
  },
  {
    name: "عميل",
    date: "2026",
    text: "عزيزي الكابتن عمرو المحترم، أتقدم بخالص الشكر والتقدير لكم على الجهد الكبير والاحترافية التي قدمتها لي خلال فترة التدريب. لقد بدأت التمارين وأنا أعاني من بعض مشاكل وآلام الظهر، وبفضل الله ثم بفضل البرنامج التدريبي المناسب والمتابعة المستمرة، لاحظت تحسنا كبيرا في حالتي الصحية والبدنية. ولم يقتصر الأمر على الشعور بالتحسن فقط، بل ظهرت نتائج إيجابية وواضحة أيضا في التحاليل والفحوصات الطبية. أشكرك على دعمك وأوصي بكل ثقة لكل من يبحث عن مدرب محترف يهتم بصحة المتدرب ونتائجه على المدى الطويل.",
    rating: 5,
  }
];

export function ClientFeedback() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-primary"></span>
            <span className="font-label-caps text-xs text-primary uppercase tracking-[0.4em]">
              Testimonials
            </span>
            <span className="w-12 h-[2px] bg-primary"></span>
          </div>

          <h2 className="font-display-xl text-[clamp(3rem,5vw,4.5rem)] leading-none uppercase tracking-tighter text-on-surface mb-6">
            Client <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container relative">
              FEEDBACK
              <span className="absolute inset-0 bg-primary/20 blur-[40px] -z-10"></span>
            </span>
          </h2>
          
          <p className="font-body-md text-on-surface-variant text-lg leading-relaxed max-w-2xl">
            Real stories from individuals who transformed their bodies, health, and mindset through elite coaching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <div 
              key={index} 
              className="bg-surface-container-high border border-black/10 dark:border-white/10 p-8 flex flex-col justify-between hover:border-primary/50 transition-colors duration-300 relative group"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p 
                  className={`font-body-md text-on-surface-variant text-base leading-relaxed mb-8 ${/[\u0600-\u06FF]/.test(feedback.text) ? 'text-right' : 'text-left'}`}
                  dir={/[\u0600-\u06FF]/.test(feedback.text) ? 'rtl' : 'ltr'}
                >
                  "{feedback.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-black/10 dark:border-white/10 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="font-label-caps text-primary text-sm">
                    {feedback.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-label-caps text-sm tracking-wider text-on-surface uppercase">{feedback.name}</h4>
                  <p className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase">{feedback.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
