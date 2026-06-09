import { PROMO_CAMPAIGNS } from '../_lib/promotions-data';
import { PromoCampaignCard } from './promo-campaign-card';

export function PromoCampaignGrid() {
  const featured = PROMO_CAMPAIGNS[0];
  const sideCampaigns = PROMO_CAMPAIGNS.slice(1, 3);
  const bottomCampaigns = PROMO_CAMPAIGNS.slice(3);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        <PromoCampaignCard campaign={featured} featured />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {sideCampaigns.map((campaign) => (
            <PromoCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bottomCampaigns.map((campaign) => (
          <PromoCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
