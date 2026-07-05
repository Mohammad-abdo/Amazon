import LegalLayout, { LegalSection } from '@/Components/LegalLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const Privacy = () => {
  const { t } = useLanguage()

  return (
    <LegalLayout titleKey="privacy.title">
      <LegalSection title={t('privacy.s1Title')}>
        <p>{t('privacy.s1Body')}</p>
      </LegalSection>
      <LegalSection title={t('privacy.s2Title')}>
        <p>{t('privacy.s2Body')}</p>
      </LegalSection>
      <LegalSection title={t('privacy.s3Title')}>
        <p>{t('privacy.s3Body')}</p>
      </LegalSection>
    </LegalLayout>
  )
}

export default Privacy
