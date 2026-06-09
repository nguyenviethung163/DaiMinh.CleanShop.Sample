import { CONTACT_CHANNELS } from '@/store/lib/storeinfo-data';
import { StoreContainer } from '@/store/components/store-container';
import { ContactChannelCard } from './contact-channel-card';

export function ContactChannelsStrip() {
  return (
    <section className="bg-white">
      <StoreContainer className="relative z-[2] -mt-10">
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-[0_20px_50px_rgba(11,42,91,0.12)] sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CHANNELS.map((channel, index) => (
            <ContactChannelCard key={channel.name} channel={channel} highlighted={index === 0} />
          ))}
        </div>
      </StoreContainer>
    </section>
  );
}
