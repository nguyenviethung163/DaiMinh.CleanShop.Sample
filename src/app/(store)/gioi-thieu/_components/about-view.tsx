import { AboutCtaSection } from './about-cta-section';
import { AboutHero } from './about-hero';
import { AboutShowroomsSection } from './about-showrooms-section';
import { AboutStatsBar } from './about-stats-bar';
import { AboutStorySection } from './about-story-section';
import { AboutTeamSection } from './about-team-section';
import { AboutTimelineSection } from './about-timeline-section';
import { AboutValuesSection } from './about-values-section';

export function AboutView() {
  return (
    <div>
      <AboutHero />
      <AboutStatsBar />
      <AboutStorySection />
      <AboutTimelineSection />
      <AboutValuesSection />
      <AboutShowroomsSection />
      <AboutTeamSection />
      <AboutCtaSection />
    </div>
  );
}
