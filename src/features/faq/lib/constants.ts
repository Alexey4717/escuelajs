export const FAQ_ITEMS: Array<{
  id: string;
  q: string;
  a: string;
}> = [
  {
    id: 'auth',
    q: 'How do I sign in?',
    a: 'Open the Login page and enter the email and password from your registration. After a successful sign-in, your session stays in the browser; you can sign out from the header.',
  },
  {
    id: 'order',
    q: 'How do I order a product?',
    a: 'Pick a product in the catalog, open its page, and review the description and price. In this learning project the cart and checkout are not wired to a payment gateway — next steps depend on your backend setup.',
  },
  {
    id: 'admin-role',
    q: 'What does the administrator role include?',
    a: 'Administrators typically get access to managing products (create, edit), the users section, and other protected screens. The exact permissions are defined on the server.',
  },
  {
    id: 'guest-catalog',
    q: 'Can I browse the catalog without signing up?',
    a: 'Yes: home, categories, and product listings are available without signing in. Sign-up is required for profile and account features.',
  },
  {
    id: 'password',
    q: 'How do I change my password?',
    a: 'After signing in, open Profile — there is a form to change your password (current and new). Save your changes and sign in again if needed.',
  },
  {
    id: 'support',
    q: 'How do I contact support?',
    a: 'At the bottom of the home page there is a contact form (demo); in production you can connect it to email or a ticketing system. You can also add store contacts in the footer.',
  },
];
