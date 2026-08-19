import PageHeader from "@/components/layout/PageHeader";
import Prose from "@/components/layout/Prose";
import { Container, Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Describes only what this website actually does today: it renders static
 * pages and accepts a contact form. If analytics, cookies, chat widgets, or a
 * CRM are added later, update this page to match — and have a professional
 * review it before launch.
 */

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Better Built handles the information you send through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        lines={["Privacy", "Policy"]}
        lede="What we collect, why we collect it, and what we do with it."
      />

      <Section surface="void" size="tight">
        <Container>
          <Prose>
            <h2>What this page covers</h2>
            <p>
              This policy applies to {site.url.replace("https://", "")} and to
              information you send us through this website.
            </p>

            <h2>Information you give us</h2>
            <p>
              If you submit the contact form, we receive what you type into it:
              your name, business name, email address, phone number if you provide
              one, your industry, your current website if you have one, what you
              need, and any details you add.
            </p>
            <p>
              We use that information for one purpose — to reply to you and discuss
              the project. We do not sell it, rent it, or share it for advertising.
            </p>

            <h2>Information collected automatically</h2>
            <p>
              This website does not set cookies and does not run advertising or
              analytics trackers. Our hosting provider keeps standard server logs,
              which may include IP addresses and browser information, for security
              and reliability.
            </p>

            <h2>Service providers</h2>
            <p>
              We use third parties to host this website and to send and receive
              email. Those providers process information on our behalf and only as
              needed to deliver their service.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry details for as long as we are in contact about a
              project, and for a reasonable period afterward in case you come back
              to us. You can ask us to delete your information at any time.
            </p>

            <h2>Your choices</h2>
            <ul>
              <li>Ask what information we hold about you.</li>
              <li>Ask us to correct anything that is wrong.</li>
              <li>Ask us to delete your enquiry.</li>
              <li>Ask us to stop contacting you.</li>
            </ul>

            <h2>Children</h2>
            <p>
              This website is intended for businesses. We do not knowingly collect
              information from children.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes, the updated version will be posted here.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about privacy can go to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
