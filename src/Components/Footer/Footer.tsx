import React from 'react'
import Logo from '@/Components/Logo'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-orange-gradient text-white border-t border-brand-400/30 mt-8">
      <div className="mx-auto w-full max-w-page p-6 py-12 lg:py-16 xl:px-12 2xl:px-16">
        <div className="md:flex md:justify-between gap-12">
          <div className="mb-8 md:mb-0 max-w-sm">
            <Link href="/" className="flex items-center mb-4">
              <Logo variant="dark" showTagline />
            </Link>
            <p className="text-sm text-brand-50/90 leading-relaxed mt-4">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 md:justify-items-end">
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.shopPages')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.home')}</Link></li>
                <li><Link href="/categories" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.categories')}</Link></li>
                <li><Link href="/deals" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.deals')}</Link></li>
                <li><Link href="/brands" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.brands')}</Link></li>
                <li><Link href="/gift-cards" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.giftCards')}</Link></li>
                <li><Link href="/cart" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.shoppingCart')}</Link></li>
                <li><Link href="/favorites" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.favoritesWishlist')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.support')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/track-order" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.trackOrder')}</Link></li>
                <li><Link href="/shipping" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.shipping')}</Link></li>
                <li><Link href="/returns" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.returns')}</Link></li>
                <li><Link href="/contact" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.contactUs')}</Link></li>
                <li><Link href="/faq" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.faq')}</Link></li>
                <li><Link href="/account" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.myAccount')}</Link></li>
                <li><Link href="/account/orders" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.orderHistory')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.company')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/about" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.aboutUs')}</Link></li>
                <li><Link href="/magazine" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.magazine')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.legal')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/privacy" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.privacy')}</Link></li>
                <li><Link href="/terms" className="text-brand-50/90 hover:text-white transition-colors duration-200">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-white/20" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs text-brand-100/80 sm:text-center">
            © {new Date().getFullYear()} Souqi. {t('footer.copyright')}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
