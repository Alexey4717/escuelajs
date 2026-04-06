'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { HomeLandingDocument } from '@/shared/api/generated/graphql';
import { Separator } from '@/shared/ui/Separator/Separator';

import { ContactUsForm } from '@/features/contactUs';
import { HomeFaq } from '@/features/faq';
import { HomeTestimonials } from '@/features/testimonials';

import { Page } from '@/widgets/Page';

import {
  HOME_FEATURED_PRODUCTS_LIMIT,
  HOME_TESTIMONIAL_USERS_LIMIT,
} from '../constants';
import { HomeHero } from './components/HomeHero/HomeHero';
import { HomeHowItWorks } from './components/HomeHowItWorks';
import { HomeProducts } from './components/HomeProducts';

export const HomeRoute = () => {
  const { data } = useSuspenseQuery(HomeLandingDocument, {
    variables: {
      productsLimit: HOME_FEATURED_PRODUCTS_LIMIT,
      usersLimit: HOME_TESTIMONIAL_USERS_LIMIT,
      productsOffset: 0,
    },
  });

  return (
    <Page className="space-y-0">
      <HomeHero />
      <HomeProducts products={data.products} />
      <HomeTestimonials data={data} />
      <HomeHowItWorks />
      <Separator className="my-14" />
      <HomeFaq />
      <Separator className="my-14" />
      <ContactUsForm />
    </Page>
  );
};
