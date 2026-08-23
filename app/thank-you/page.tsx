import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { processSteps } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Where Stripe sends people after they pay. Set each Payment Link's
 * confirmation page to redirect here so nobody's last impression of the studio
 * is a bare receipt.
 *
 * Nothing is submitted from this page — the enquiry was delivered when the form
 * was sent, before checkout.
 */
export const metadata = pageMeta({
  title: "Payment received",
  description: "Your payment went through and your project is in the queue.",
  path: "/thank-you",
  index: false,
});

export default function ThankYouPage() {
  return (
    <>
      <PageHeader
        eyebrow="Payment received"
        lines={["That's it.", "We're on."]}
        lede="Thanks — the payment went through and your project is in the queue."
      />

      <Section surface="void" size="tight">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="rounded-lg border border-line bg-card p-[clamp(1.75rem,4vw,3rem)]">
                <p className="label-mono text-accent-lift">Received</p>
                <h2 className="display-lg mt-6 max-w-[18ch] text-chalk">
                  Your receipt is in your inbox.
                </h2>
                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate">
                  We have your details from the form and your payment from Stripe.
                  Next we&rsquo;ll come back with questions, a plan, and a timeline
                  — usually the same day.
                </p>
                <p className="mt-8 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dim">
                  Anything you forgot to mention can go straight to{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-chalk transition-colors duration-300 hover:text-accent-lift"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-5 lg:pl-8">
              <Reveal delay={100}>
                <div className="border-t border-line pt-6">
                  <p className="label-mono text-dim">What happens next</p>
                  <ol className="mt-5 space-y-4">
                    {processSteps.map((step) => (
                      <li key={step.title} className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-3 shrink-0 bg-accent"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-slate">
                          {step.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-10 border-t border-line pt-6">
                  <p className="label-mono text-dim">While you wait</p>
                  <div className="mt-5">
                    <ButtonLink
                      href="/work"
                      variant="secondary"
                      withArrow
                      className="label-mono"
                    >
                      See the work
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
