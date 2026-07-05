import LegalLayout, { LegalSection } from '@/Components/LegalLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const Terms = () => {
  const { t } = useLanguage()

  return (
    <LegalLayout titleKey="terms.title">
      <LegalSection title={t('terms.s1Title')}>
        <p>{t('terms.s1Body')}</p>
      </LegalSection>
      <LegalSection title={t('terms.s2Title')}>
        <p>{t('terms.s2Body')}</p>
      </LegalSection>
      <LegalSection title={t('terms.s3Title')}>
        <p>{t('terms.s3Body')}</p>
      </LegalSection>
    </LegalLayout>
  )
}

export default Terms
