import PageHeader from "@/components/layout/PageHeader";
import Prose from "@/components/layout/Prose";
import { Container, Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Terms covering use of this website, plus the refund and cancellation policy
 * that Stripe checkout points at. Project-specific terms belong in the agreement
 * sent to each client. Have a professional review this before launch.
 */

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that apply to using the Better Built website, including how payments, refunds, and cancellations work.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        lines={["Terms of", "Service"]}
        lede="The terms that apply when you use this website, including how payments and refunds work."
      />

      <Section surface="void" size="tight">
        <Container>
          <Prose>
            <h2>Using this website</h2>
            <p>
              By using this website you agree to these terms. If you do not agree,
              please do not use the site.
            </p>

            <h2>What this website is</h2>
            <p>
              This site describes the design and development services Better Built
              offers, shows examples of design work, and provides a form for
              starting a conversation about a project.
            </p>

            <h2>Portfolio work</h2>
            <p>
              Designs shown on this website remain the property of Better Built
              and the businesses they were made for. Business names and details
              appearing inside portfolio screenshots are used to illustrate the
              design and are not an offer or endorsement.
            </p>

            <h2>Pricing and payment</h2>
            <p>
              Prices listed on this website describe our standard offering. The
              $1250 website is paid before work begins, and support plans are billed
              on a recurring basis until you cancel. Card payments are handled by
              Stripe — we never see or store your card details.
            </p>
            <p>
              The terms of any specific project — scope, schedule, and revisions —
              are set out in the agreement we send before work begins. That
              agreement governs the project. Where it says something different from
              this page about a particular project, the agreement wins.
            </p>

            <h2 id="refunds">Refunds and cancellations</h2>
            <p>
              We would rather refund you than keep money for work you are unhappy
              with. What you can get back depends on how far along the work is:
            </p>
            <ul>
              <li>
                <strong>The $1250 website.</strong> Full refund at any point before
                we send you the first design. After that and before the site goes
                live, half the fee is refundable — the other half covers design
                work already done. Once the site is live it is yours to keep, and
                the fee is no longer refundable.
              </li>
              <li>
                <strong>Website Updates, $125 per month.</strong> Cancel at any
                time. Cancelling stops the next payment. The month you have already
                paid for runs to its end and is not refunded part-way through.
              </li>
              <li>
                <strong>Domain and hosting.</strong> These are billed by the
                provider in your name, not by us, so their refund terms apply and
                not ours.
              </li>
            </ul>
            <p>
              To cancel a plan or ask for a refund, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> from the address you
              paid with. Approved refunds go back to the original card and usually
              appear within five to ten business days.
            </p>
            <p>
              If something has gone wrong, please email us before opening a dispute
              with your bank. We can almost always sort it out faster ourselves.
            </p>

            <h2>Submitting an enquiry</h2>
            <p>
              Sending the contact form does not create a contract or reserve a place
              in our schedule. Please give us accurate information so we can respond
              usefully.
            </p>

            <h2>Our content</h2>
            <p>
              The design, code, text, and images on this website belong to Better
              Built. You may not copy or reuse them without permission.
            </p>

            <h2>Availability</h2>
            <p>
              We aim to keep this website available and accurate, but we do not
              guarantee it will be uninterrupted or error-free. We may change or
              remove content at any time.
            </p>

            <h2>Links to other sites</h2>
            <p>
              Where this website links elsewhere, we are not responsible for the
              content or practices of those sites.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              If these terms change, the updated version will be posted here.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can go to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
