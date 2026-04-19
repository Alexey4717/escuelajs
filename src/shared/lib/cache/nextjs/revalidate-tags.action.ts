'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

type RevalidateTagsActionArgs = {
  tags?: string[];
  paths?: string[];
};

export const revalidateTagsAction = async ({
  tags = [],
  paths = [],
}: RevalidateTagsActionArgs) => {
  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }

  for (const path of paths) {
    revalidatePath(path);
  }
};
