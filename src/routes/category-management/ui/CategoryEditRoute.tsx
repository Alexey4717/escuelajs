'use client';

import { useParams } from 'next/navigation';

import { skipToken, useQuery } from '@apollo/client/react';

import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { Typography } from '@/shared/ui/Typography/Typography';

import { Page } from '@/widgets/Page';

import { categoryEditHeadingPage } from '../lib/constants';
import { CategoryEditPageParams } from '../lib/types';
import { CategoryEditLoadPage } from './CategoryEditLoadPage';
import { CategoryEditFormCard } from './components/CategoryEditFormCard';

export const CategoryEditRoute = () => {
  const params = useParams<CategoryEditPageParams>();
  const categoryId = params.id;

  const { data, loading, error } = useQuery(
    CategoryDetailsDocument,
    categoryId
      ? {
          variables: { id: categoryId },
        }
      : skipToken,
  );

  if (error || !categoryId) {
    return (
      <Page narrow heading={categoryEditHeadingPage}>
        <Typography variant="body1" component="p">
          Failed to load category data
        </Typography>
      </Page>
    );
  }

  if (loading || !data?.category) {
    return <CategoryEditLoadPage />;
  }

  return (
    <Page narrow heading={categoryEditHeadingPage}>
      <CategoryEditFormCard category={data.category} />
    </Page>
  );
};
