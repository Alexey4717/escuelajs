'use client';

import dynamic from 'next/dynamic';

const HomeHowItWorks = dynamic(() =>
  import('./components/HomeHowItWorks').then((m) => m.HomeHowItWorks),
);
const HomeFaq = dynamic(() => import('@/features/faq').then((m) => m.HomeFaq));
const ContactUsForm = dynamic(() =>
  import('@/features/contactUs').then((m) => m.ContactUsForm),
);

export const HomeBelowFold = () => (
  <>
    <HomeHowItWorks />
    <HomeFaq />
    <ContactUsForm />
  </>
);
