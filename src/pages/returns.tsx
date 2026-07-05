import LegalLayout, { LegalSection } from '@/Components/LegalLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const Returns = () => {
  const { t } = useLanguage()

  return (
    <LegalLayout titleKey="returns.title">
      <LegalSection title={t('returns.s1Title')}>
        <p>{t('returns.s1Body')}</p>
      </LegalSection>
      <LegalSection title={t('returns.s2Title')}>
        <p>{t('returns.s2Body')}</p>
      </LegalSection>
      <LegalSection title={t('returns.s3Title')}>
        <p>{t('returns.s3Body')}</p>
      </LegalSection>
    </LegalLayout>
  )
}

export default Returns
