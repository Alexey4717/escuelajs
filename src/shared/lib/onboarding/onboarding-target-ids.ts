/**
 * Единственный источник значений для `data-onboarding` (онбординг Joyride).
 * Не дублировать строки в JSX вне этого объекта.
 */
export const ONBOARDING_TARGET_IDS = {
  sidebarNavProducts: 'onboarding-sidebar-nav-products',
  sidebarNavUsers: 'onboarding-sidebar-nav-users',
  sidebarNavAdmin: 'onboarding-sidebar-nav-admin',
  catalogFilters: 'onboarding-catalog-filters',
  catalogFirstProductCart: 'onboarding-catalog-first-product-cart',
  catalogSecondProductLink: 'onboarding-catalog-second-product-link',
  productDetailCart: 'onboarding-product-detail-cart',
  topbarCart: 'onboarding-topbar-cart',
  cartCheckout: 'onboarding-cart-checkout',
  cartPickOnMapButton: 'onboarding-cart-pick-on-map-button',
  cartPlaceOrderButton: 'onboarding-cart-place-order-button',
  mapDemoPickupPoint: 'onboarding-map-demo-pickup-point',
  homeContactForm: 'onboarding-home-contact-form',
  adminPanelGrid: 'onboarding-admin-panel-grid',
  adminPanelAddCategory: 'onboarding-admin-panel-add-category',
  adminPanelAddProduct: 'onboarding-admin-panel-add-product',
  categoryCreateSubmitButton: 'onboarding-category-create-submit-button',
  productCreateSubmitButton: 'onboarding-product-create-submit-button',
  categoriesList: 'onboarding-categories-list',
  productsList: 'onboarding-products-list',
  productsListAdminDemoProductLink:
    'onboarding-products-list-admin-demo-product-link',
  productDetailAdminActions: 'onboarding-product-detail-admin-actions',
  usersTable: 'onboarding-users-table',
} as const;

export type OnboardingTargetId =
  (typeof ONBOARDING_TARGET_IDS)[keyof typeof ONBOARDING_TARGET_IDS];
