const buildSuffix = (url?: {
  query?: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >;
  hash?: string;
}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = (() => {
    if (!query) return '';

    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, String(item)));
      } else {
        params.set(key, String(value));
      }
    });

    return `?${params.toString()}`;
  })();
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  admin_panel: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/admin-panel' as const,
      hash: url?.hash,
      path: `/admin-panel${buildSuffix(url)}`,
    }),
  },
  categories: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/categories' as const,
      hash: url?.hash,
      path: `/categories${buildSuffix(url)}`,
    }),
  },
  products: {
    _id: (id: string | number) => ({
      edit: {
        $url: (url?: { hash?: string }) => ({
          pathname: '/products/[id]/edit' as const,
          query: { id },
          hash: url?.hash,
          path: `/products/${id}/edit${buildSuffix(url)}`,
        }),
      },
      $url: (url?: { hash?: string }) => ({
        pathname: '/products/[id]' as const,
        query: { id },
        hash: url?.hash,
        path: `/products/${id}${buildSuffix(url)}`,
      }),
    }),
    create: {
      $url: (url?: { hash?: string }) => ({
        pathname: '/products/create' as const,
        hash: url?.hash,
        path: `/products/create${buildSuffix(url)}`,
      }),
    },
    $url: (url?: { hash?: string }) => ({
      pathname: '/products' as const,
      hash: url?.hash,
      path: `/products${buildSuffix(url)}`,
    }),
  },
  profile: {
    edit: {
      $url: (url?: { hash?: string }) => ({
        pathname: '/profile/edit' as const,
        hash: url?.hash,
        path: `/profile/edit${buildSuffix(url)}`,
      }),
    },
    $url: (url?: { hash?: string }) => ({
      pathname: '/profile' as const,
      hash: url?.hash,
      path: `/profile${buildSuffix(url)}`,
    }),
  },
  users: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/users' as const,
      hash: url?.hash,
      path: `/users${buildSuffix(url)}`,
    }),
  },
  forbidden: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/forbidden' as const,
      hash: url?.hash,
      path: `/forbidden${buildSuffix(url)}`,
    }),
  },
  login: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/login' as const,
      hash: url?.hash,
      path: `/login${buildSuffix(url)}`,
    }),
  },
  register: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/register' as const,
      hash: url?.hash,
      path: `/register${buildSuffix(url)}`,
    }),
  },
  $url: (url?: { hash?: string }) => ({
    pathname: '/' as const,
    hash: url?.hash,
    path: `/${buildSuffix(url)}`,
  }),
};

export type PagesPath = typeof pagesPath;
