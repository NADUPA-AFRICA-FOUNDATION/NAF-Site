import { definePage } from "../types";

// Section bodies use simple formatting: blank line = new paragraph,
// "### " = subheading, "- " = bullet point.
export const privacyPage = definePage({
  key: "privacy",
  label: "Privacy Policy",
  path: "/privacy",
  sections: [
    {
      title: "Header",
      fields: [
        { key: "hero.title", label: "Heading", type: "text", max: 120 },
        { key: "hero.subtitle", label: "Subheading", type: "text", max: 300 },
        {
          key: "effectiveDate",
          label: "Effective date",
          type: "text",
          max: 60,
        },
        {
          key: "notice.title",
          label: "Notice heading",
          type: "text",
          max: 120,
        },
        {
          key: "notice.text",
          label: "Notice text",
          type: "textarea",
          rows: 4,
          max: 2000,
        },
      ],
    },
    {
      title: "Sections",
      fields: [
        {
          key: "sections",
          label: "Sections",
          type: "list",
          itemLabel: "Section",
          maxItems: 40,
          help: 'Blank line = new paragraph, start a line with "### " for a subheading or "- " for a bullet point.',
          fields: [
            { key: "title", label: "Title", type: "text", max: 200 },
            {
              key: "body",
              label: "Text",
              type: "textarea",
              rows: 12,
              max: 20000,
            },
          ],
        },
      ],
    },
    {
      title: "Footer",
      fields: [
        {
          key: "contactIntro",
          label: "Contact text",
          type: "textarea",
          rows: 2,
          max: 400,
        },
        {
          key: "lastUpdated",
          label: "Last updated / version line",
          type: "text",
          max: 200,
        },
      ],
    },
  ],
  defaults: {
    hero: {
      title: "Privacy Policy",
      subtitle: "How we collect, use and protect your personal data",
    },
    effectiveDate: "October 6, 2026",
    notice: {
      title: "Our Commitment to Privacy",
      text: "NADUPA AFRICA FOUNDATION processes personal data in line with the Data Protection Act, 2019 of Kenya and its regulations. This policy explains what we collect through this website, why, who we share it with, how long we keep it, and the rights you have.",
    },
    sections: [
      {
        title: "Who We Are",
        body: "NADUPA AFRICA FOUNDATION, a Public Benefit Organization registered in Kenya under the Public Benefit Organizations Act, 2013, is the data controller for personal data collected through this website. Our office is in Kajiado-West, Kajiado County, Kenya.\n\nFor any privacy question or request, contact us at info@nadupaafricafoundation.org or +254 796 093 465.",
      },
      {
        title: "Information We Collect",
        body: "We only collect what you choose to give us through the forms on this website.\n\n### Contact form:\n\n- First and last name, email address, phone number (optional), subject and message\n\n### Donation interest form:\n\n- Full name, email address, the amount you would like to give and your preferred payment method\n- We do not take payments on this website and never ask for card or bank details here. We contact you by email to arrange your gift.\n\n### Volunteer application form:\n\n- First and last name, email address, phone number (optional), your motivation, areas of interest, availability, skills and any additional information you add\n\n### Technical information:\n\n- Our hosting provider records basic request information (such as IP address, browser type and the page requested) in short-lived server logs to keep the website secure and running.\n- We do not use analytics, advertising or tracking tools.",
      },
      {
        title: "Why We Use Your Information and Our Lawful Basis",
        body: "- To reply to your message or enquiry: your consent when you submit the form, and our legitimate interest in responding\n- To arrange your donation: steps you ask us to take before giving\n- To assess your volunteer application and contact you about it: steps you ask us to take, and our legitimate interest in placing volunteers safely\n- To send you a confirmation email for each form you submit\n- To keep the website secure and prevent misuse: our legitimate interest\n- To meet our legal and regulatory obligations, for example financial record-keeping\n\nWe do not use your data for marketing, profiling or automated decision-making, and we never sell or rent it.",
      },
      {
        title: "Who We Share It With",
        body: "Only our staff and authorised volunteers who need it can see your submissions. We use these service providers to run the website. They process data only on our instructions:\n\n- Vercel Inc. (USA): website hosting and server logs\n- Convex, Inc. (USA): secure database and file storage for form submissions, website content and our document library\n- Resend (USA): sends form confirmation and notification emails\n- Google LLC (USA): sign-in for our own administrators only\n\nWe may also disclose information where the law requires it, for example to a court or regulator.",
      },
      {
        title: "Transfers Outside Kenya",
        body: "The service providers listed above store and process data on servers outside Kenya, mainly in the United States. We transfer data only to providers that give appropriate safeguards for its security and protection, as required by sections 48 to 50 of the Data Protection Act, 2019. You can ask us for details of these safeguards.",
      },
      {
        title: "How Long We Keep It",
        body: "We keep personal data only for as long as we need it for the purpose it was collected for, and delete it once that lawful purpose has lapsed:\n\n- Messages and enquiries: until your enquiry is resolved and any follow-up is complete\n- Donation interest: until your gift is arranged or you tell us you no longer wish to give; records of gifts actually received are kept as long as financial and tax law requires\n- Volunteer applications: while your application is being considered and, if you volunteer with us, for as long as you volunteer\n- Server logs: kept by our hosting provider for a short period only\n\nWe review the data we hold regularly and delete what we no longer need.",
      },
      {
        title: "How We Protect It",
        body: "- All connections to this website are encrypted (HTTPS)\n- Submissions are stored in an access-controlled database that can only be reached through our server\n- Admin access requires a sign-in link to an authorised email address plus two-factor authentication\n- Access is limited to people who need it for their role\n\nIf a personal data breach is likely to put your rights at risk, we will notify the Office of the Data Protection Commissioner within 72 hours of becoming aware of it, and tell you without undue delay, as required by section 43 of the Act.",
      },
      {
        title: "Your Rights",
        body: "Under the Data Protection Act, 2019 you have the right to:\n\n- Be informed of how your personal data is used\n- Access the personal data we hold about you\n- Have inaccurate or misleading data corrected\n- Have your data deleted\n- Object to our processing of your data\n- Withdraw your consent at any time, without affecting processing that took place before\n- Receive your data in a commonly used, machine-readable format (data portability)\n\nTo use any of these rights, email info@nadupaafricafoundation.org. We may need to confirm your identity first, and we will respond within the time the law requires.\n\n### Complaints:\n\nIf you are unhappy with how we handle your data, please contact us first. You also have the right to complain to the Office of the Data Protection Commissioner (ODPC), www.odpc.go.ke.",
      },
      {
        title: "Cookies",
        body: "This website does not use analytics, advertising or tracking cookies, so we do not ask for cookie consent.\n\n- Visitors: our hosting provider may set a strictly necessary security cookie to protect the site against automated attacks.\n- Administrators: when our own staff sign in to the admin area, we use strictly necessary cookies to keep them signed in securely.\n\nYou can block or delete cookies in your browser settings. This does not affect your use of the public website.",
      },
      {
        title: "Children",
        body: "Our website forms are intended for adults. Under Kenyan law a child is anyone under 18. We do not knowingly collect personal data from children without the consent of a parent or guardian. If you believe a child has sent us their details, contact us and we will delete them.",
      },
      {
        title: "Changes to This Policy",
        body: "We may update this policy when our practices or the law change. The current version is always on this page, with its effective date at the top. If we make a significant change that affects how we use data you have already given us, we will tell you by email where we can.",
      },
    ],
    contactIntro:
      "For questions, concerns or requests about this Privacy Policy or your personal data, please contact us:",
    lastUpdated:
      "Last updated: October 6, 2026 | Version: 2.0 | Next review: October 2027",
  },
});
