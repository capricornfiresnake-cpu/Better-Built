/**
 * Shown only beside a button that takes a card, so nobody is told about
 * secure checkout on a button that just opens a form.
 */
export default function SecureNote() {
  return (
    <span className="label-mono-sm inline-flex items-center gap-2 text-dim">
      <svg
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="h-3 w-3 shrink-0 text-accent-lift"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="2.2" y="5.2" width="7.6" height="5.2" />
        <path d="M4 5.2V3.6a2 2 0 0 1 4 0v1.6" />
      </svg>
      Secure checkout by Stripe
    </span>
  );
}
