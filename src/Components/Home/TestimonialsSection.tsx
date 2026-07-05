import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import { Testimonial } from '@/lib/externalApi'
import { useLanguage } from '@/contexts/LanguageContext'

const QUOTES = {
  en: [
    'Souqi made online shopping effortless. Fast delivery and premium quality every time.',
    'The best marketplace experience I have had. Beautiful products and smooth checkout.',
    'I love the curated selection. Everything feels hand-picked and trustworthy.',
    'Customer support responded within minutes. Souqi truly cares about shoppers.',
    'Great prices, elegant packaging, and reliable shipping across the region.',
    'My go-to store for tech and lifestyle products. Highly recommended!',
  ],
  ar: [
    'سوقي جعل التسوق الإلكتروني سهلاً. توصيل سريع وجودة ممتازة في كل مرة.',
    'أفضل تجربة تسوق إلكتروني. منتجات رائعة وعملية دفع سلسة.',
    'أحب التشكيلة المختارة. كل شيء يبدو موثوقاً وعالي الجودة.',
    'خدمة العملاء ردت خلال دقائق. سوقي يهتم فعلاً بالمتسوقين.',
    'أسعار ممتازة وتغليف أنيق وشحن موثوق في المنطقة.',
    'متجري المفضل للتقنية ومنتجات المنزل. أنصح به بشدة!',
  ],
}

interface props {
  testimonials: Testimonial[]
}

const TestimonialsSection = ({ testimonials }: props) => {
  const { language, t } = useLanguage()
  const quotes = QUOTES[language]

  if (testimonials.length === 0) return null

  return (
    <section className="mt-12 w-full">
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{t('home.testimonialsEyebrow')}</span>
        <h2 className="text-2xl font-bold text-brand-950 mt-1">{t('home.testimonialsTitle')}</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">{t('home.testimonialsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-6">
        {testimonials.slice(0, 6).map((item, idx) => (
          <div
            key={item.id}
            className="bg-white/90 border border-brand-100 rounded-3xl p-6 shadow-soft hover:shadow-card hover:border-brand-300 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xs ${i < item.rating ? 'text-amber-400' : 'text-cream'}`}
                />
              ))}
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-5">
              &ldquo;{quotes[idx % quotes.length]}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-cream">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-brand-100">
                <Image src={item.avatar} alt={item.name} fill className="object-cover" unoptimized />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-950">{item.name}</p>
                <p className="text-[11px] text-neutral-400">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
