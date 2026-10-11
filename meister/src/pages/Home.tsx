import { CtaBand } from '../sections/CtaBand';
import { Audience } from '../sections/home/Audience';
import { Hero } from '../sections/home/Hero';
import { InsightsPreview } from '../sections/home/InsightsPreview';
import { Manifesto } from '../sections/home/Manifesto';
import { Playbook } from '../sections/home/Playbook';
import { ServicesPin } from '../sections/home/ServicesPin';
import { WorkPreview } from '../sections/home/WorkPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Audience />
      <ServicesPin />
      <Playbook />
      <WorkPreview />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}
