import { ContactChannelsStrip } from './contact-channels-strip';
import { ContactFaqSection } from './contact-faq-section';
import { ContactFormSection } from './contact-form-section';
import { ContactHero } from './contact-hero';
import { ContactShowroomsSection } from './contact-showrooms-section';

export function ContactView() {
  return (
    <div>
      <ContactHero />
      <ContactChannelsStrip />
      <ContactFormSection />
      <ContactShowroomsSection />
      <ContactFaqSection />
    </div>
  );
}
