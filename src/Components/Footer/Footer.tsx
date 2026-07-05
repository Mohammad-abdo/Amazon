import React from 'react'
import Logo from '@/Components/Logo'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-brand-950 text-brand-100 border-t border-brand-900">
      <div className="mx-auto w-full max-w-screen-xl p-6 py-12 lg:py-16">
        <div className="md:flex md:justify-between gap-12">
          <div className="mb-8 md:mb-0 max-w-sm">
            <Link href="/" className="flex items-center mb-4">
              <Logo variant="dark" showTagline />
            </Link>
            <p className="text-sm text-brand-200/80 leading-relaxed mt-4">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 md:justify-items-end">
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.shopPages')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/" className="hover:text-brand-300 transition-colors duration-200">{t('footer.home')}</Link></li>
                <li><Link href="/categories" className="hover:text-brand-300 transition-colors duration-200">{t('footer.categories')}</Link></li>
                <li><Link href="/deals" className="hover:text-brand-300 transition-colors duration-200">{t('footer.deals')}</Link></li>
                <li><Link href="/brands" className="hover:text-brand-300 transition-colors duration-200">{t('footer.brands')}</Link></li>
                <li><Link href="/gift-cards" className="hover:text-brand-300 transition-colors duration-200">{t('footer.giftCards')}</Link></li>
                <li><Link href="/cart" className="hover:text-brand-300 transition-colors duration-200">{t('footer.shoppingCart')}</Link></li>
                <li><Link href="/favorites" className="hover:text-brand-300 transition-colors duration-200">{t('footer.favoritesWishlist')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.support')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/track-order" className="hover:text-brand-300 transition-colors duration-200">{t('footer.trackOrder')}</Link></li>
                <li><Link href="/shipping" className="hover:text-brand-300 transition-colors duration-200">{t('footer.shipping')}</Link></li>
                <li><Link href="/returns" className="hover:text-brand-300 transition-colors duration-200">{t('footer.returns')}</Link></li>
                <li><Link href="/contact" className="hover:text-brand-300 transition-colors duration-200">{t('footer.contactUs')}</Link></li>
                <li><Link href="/faq" className="hover:text-brand-300 transition-colors duration-200">{t('footer.faq')}</Link></li>
                <li><Link href="/account" className="hover:text-brand-300 transition-colors duration-200">{t('footer.myAccount')}</Link></li>
                <li><Link href="/account/orders" className="hover:text-brand-300 transition-colors duration-200">{t('footer.orderHistory')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.company')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/about" className="hover:text-brand-300 transition-colors duration-200">{t('footer.aboutUs')}</Link></li>
                <li><Link href="/magazine" className="hover:text-brand-300 transition-colors duration-200">{t('footer.magazine')}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold text-white uppercase tracking-wider">{t('footer.legal')}</h2>
              <ul className="text-sm space-y-3">
                <li><Link href="/privacy" className="hover:text-brand-300 transition-colors duration-200">{t('footer.privacy')}</Link></li>
                <li><Link href="/terms" className="hover:text-brand-300 transition-colors duration-200">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-brand-800" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs text-brand-300/70 sm:text-center">
            © {new Date().getFullYear()} Souqi. {t('footer.copyright')}
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            <a href="#" className="text-brand-300/70 hover:text-brand-300 transition-colors duration-200" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 8 19"><path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/></svg>
            </a>
            <a href="#" className="text-brand-300/70 hover:text-brand-300 transition-colors duration-200" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 17"><path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
