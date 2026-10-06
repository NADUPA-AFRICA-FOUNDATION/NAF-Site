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
      subtitle: "How we collect, use, and protect your personal information",
    },
    effectiveDate: "June 11, 2025",
    notice: {
      title: "Our Commitment to Privacy",
      text: "NADUPA AFRICA FOUNDATION is committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, store, and protect your data in accordance with Kenyan data protection laws and international best practices.",
    },
    sections: [
      {
        title: "Information We Collect",
        body: "### Personal Information:\n\n- Name, email address, phone number, and mailing address\n- Date of birth and nationality (for volunteer applications)\n- Professional background and skills (for volunteer matching)\n- Emergency contact information (for program participants)\n- Payment information (for donations, processed securely by third parties)\n\n### Technical Information:\n\n- IP address, browser type, and device information\n- Website usage patterns and preferences\n- Cookies and similar tracking technologies\n- Location data (with your consent)\n\n### Program-Related Information:\n\n- Volunteer application details and references\n- Program participation records and feedback\n- Photos and videos (with explicit consent)\n- Health and safety information (where necessary)",
      },
      {
        title: "How We Use Your Information",
        body: "### Program Operations:\n\n- Processing volunteer applications and matching skills to needs\n- Coordinating program activities and communications\n- Ensuring safety and security of participants\n- Providing program updates and impact reports\n\n### Communication:\n\n- Responding to inquiries and providing customer support\n- Sending newsletters and program updates (with consent)\n- Sharing impact stories and organizational news\n- Emergency communications related to programs\n\n### Legal and Administrative:\n\n- Complying with legal obligations and reporting requirements\n- Maintaining accurate records for audit purposes\n- Processing donations and issuing receipts\n- Protecting against fraud and ensuring security",
      },
      {
        title: "Information Sharing and Disclosure",
        body: "### We DO NOT sell or rent your personal information to third parties.\n\n### Limited Sharing Occurs Only When:\n\n- You provide explicit consent for specific purposes\n- Required by law or legal process\n- Necessary for program safety and security\n- Working with trusted service providers (under strict confidentiality agreements)\n\n### Trusted Partners Include:\n\n- Payment processors for secure donation handling\n- Email service providers for communications\n- Cloud storage providers for data backup\n- Government agencies when legally required",
      },
      {
        title: "Data Security and Protection",
        body: "### Security Measures:\n\n- SSL encryption for all data transmission\n- Secure cloud storage with regular backups\n- Access controls and user authentication\n- Regular security audits and updates\n- Staff training on data protection practices\n\n### Data Retention:\n\n- Personal data retained only as long as necessary\n- Volunteer records kept for 7 years after program completion\n- Donation records maintained per legal requirements\n- Website analytics data anonymized after 2 years\n\n### Data Breach Protocol:\n\nIn the unlikely event of a data breach, we will notify affected individuals within 72 hours and take immediate steps to secure the data and prevent further unauthorized access.",
      },
      {
        title: "Your Rights and Choices",
        body: "### You Have the Right To:\n\n- Access your personal information we hold\n- Correct inaccurate or incomplete data\n- Request deletion of your personal information\n- Withdraw consent for data processing\n- Receive a copy of your data in portable format\n- Object to certain types of data processing\n\n### Communication Preferences:\n\n- Opt out of marketing communications at any time\n- Choose frequency of program updates\n- Select preferred communication channels\n- Unsubscribe from newsletters with one click\n\n### To Exercise Your Rights:\n\nContact us at info@nadupaafricafoundation.org or use the contact information provided below.",
      },
      {
        title: "Cookies and Tracking Technologies",
        body: "### Types of Cookies We Use:\n\n- Essential Cookies: Required for website functionality\n- Analytics Cookies: Help us understand website usage\n- Preference Cookies: Remember your settings and choices\n- Marketing Cookies: Used with your consent for targeted content\n\n### Managing Cookies:\n\n- You can control cookies through your browser settings\n- Disabling cookies may affect website functionality\n- We provide cookie preference controls on our website\n- Third-party cookies are governed by respective privacy policies",
      },
      {
        title: "International Data Transfers",
        body: "As an organization operating in Kenya, we primarily store and process data within Kenya. However, some of our service providers may be located in other countries. When data is transferred internationally, we ensure:\n\n- Adequate protection measures are in place\n- Service providers meet international data protection standards\n- Contractual safeguards protect your information\n- Transfers comply with Kenyan data protection laws",
      },
      {
        title: "Children's Privacy",
        body: "We are committed to protecting the privacy of children. Our services are not directed to children under 16, and we do not knowingly collect personal information from children under 16 without parental consent.\n\n### For Minors (Under 18) Participating in Programs:\n\n- Parental or guardian consent is required\n- Additional privacy protections apply\n- Limited data collection focused on safety and program needs\n- Parents can access and control their child's information",
      },
      {
        title: "Changes to This Privacy Policy",
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes:\n\n- We will post the updated policy on our website\n- We will notify you of significant changes via email\n- The effective date will be updated\n- You will have 30 days to review changes before they take effect",
      },
    ],
    contactIntro:
      "For questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:",
    lastUpdated:
      "Last Updated: June 11, 2025 | Version: 1.0 | Next Review: June 11, 2026",
  },
});
