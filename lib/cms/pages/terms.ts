import { definePage } from "../types";

// Section bodies use simple formatting: blank line = new paragraph,
// "### " = subheading, "- " = bullet point.
export const termsPage = definePage({
  key: "terms",
  label: "Terms & Conditions",
  path: "/terms",
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
      title: "Terms and Conditions",
      subtitle: "Legal framework governing our services and your participation",
    },
    effectiveDate: "June 11, 2025",
    notice: {
      title: "Important Notice",
      text: "By accessing our website, making donations, volunteering, or participating in any of our programs or services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of our services immediately.",
    },
    sections: [
      {
        title: "Acceptance of Terms",
        body: 'By using this website, mobile application, or engaging with NADUPA AFRICA FOUNDATION ("we," "our," "us," or "the Foundation"), you agree to be legally bound by these Terms and Conditions, our Privacy Policy, Volunteer Code of Conduct, and any other policies referenced herein.\n\nThese terms constitute a legally binding agreement between you and NADUPA AFRICA FOUNDATION. Your continued use of our services after any modifications to these terms constitutes acceptance of such changes.',
      },
      {
        title: "Eligibility and Age Requirements",
        body: "### General Eligibility:\n\n- Participation in volunteer programs is open to individuals aged 18 years or older\n- Website use and donations are open to individuals aged 16 years or older\n- All participants must have legal capacity to enter into binding agreements\n\n### Minors (Under 18):\n\n- Must have written parental or legal guardian consent\n- Must be accompanied by a parent/guardian during volunteer activities\n- Are subject to additional safety protocols and supervision requirements\n- May have restricted access to certain programs or activities\n\n### International Volunteers:\n\n- Must possess valid travel documents and appropriate visas\n- Must comply with Kenyan immigration laws and regulations\n- Are responsible for their own travel insurance and medical coverage",
      },
      {
        title: "Comprehensive Volunteer Code of Conduct",
        body: "### Respect and Dignity:\n\n- Treat all individuals with respect, dignity, and compassion regardless of race, gender, religion, or social status\n- Respect local customs, traditions, and cultural practices\n- Maintain appropriate professional boundaries with beneficiaries and community members\n- Use respectful language and behavior at all times\n\n### Professional Standards:\n\n- Follow all instructions and guidelines provided by NADUPA AFRICA FOUNDATION staff and community leaders\n- Maintain punctuality and reliability in all commitments\n- Dress appropriately and modestly according to local customs\n- Maintain personal hygiene and health standards\n- Report any incidents, concerns, or safety issues immediately\n\n### Prohibited Conduct:\n\n- Any form of discrimination, harassment, or abuse (physical, verbal, emotional, or sexual)\n- Use of alcohol or illegal substances during volunteer activities or while representing the Foundation\n- Engaging in romantic or sexual relationships with beneficiaries or community members\n- Accepting gifts, money, or favors from beneficiaries or community members\n- Sharing confidential information about the Foundation, its beneficiaries, or operations\n- Taking photographs or videos without proper consent and authorization\n- Proselytizing or promoting personal religious or political beliefs\n\n### Consequences of Violations:\n\nViolation of this code may result in immediate dismissal from programs, termination of volunteer status, legal action where applicable, and reporting to relevant authorities. Serious violations may also result in permanent ban from all Foundation activities.",
      },
      {
        title: "Website Use and Digital Conduct",
        body: "### Acceptable Use:\n\n- Use the website for legitimate purposes related to our mission\n- Provide accurate and truthful information in all forms and communications\n- Respect the privacy and rights of other users\n- Report any technical issues or security concerns promptly\n\n### Prohibited Activities:\n\n- Uploading or transmitting harmful, malicious, or illegal content\n- Attempting to gain unauthorized access to our systems or data\n- Violating intellectual property rights of the Foundation or third parties\n- Collecting personal data of other users without explicit consent\n- Using automated systems (bots, scrapers) to access our website\n- Interfering with the proper functioning of the website\n- Impersonating Foundation staff or other users",
      },
      {
        title: "Donations and Financial Contributions",
        body: "### Donation Policy:\n\n- All donations are voluntary and made without expectation of goods or services in return\n- Donations are generally non-refundable except in cases of processing errors\n- Donors may request refunds within 30 days for technical errors or unauthorized transactions\n- The Foundation reserves the right to refuse or return donations at its discretion\n\n### Use of Funds:\n\n- Funds will be used to support the Foundation's mission and programs\n- Administrative costs are kept to a minimum (target: under 15% of total donations)\n- Designated donations will be used for specified purposes where possible\n- If designated purposes cannot be fulfilled, donors will be contacted for alternative allocation\n\n### Transparency and Reporting:\n\n- Annual financial reports are available upon request\n- Major donors may request detailed impact reports\n- All financial activities are subject to independent audit\n- Tax receipts are provided where applicable under Kenyan law",
      },
      {
        title: "Privacy and Data Protection",
        body: "### Data Collection and Use:\n\n- Personal information is collected only for legitimate Foundation purposes\n- Data is processed in accordance with Kenyan data protection laws\n- Information is stored securely and access is limited to authorized personnel\n- Data retention periods are established based on legal and operational requirements\n\n### Data Sharing:\n\n- Personal data is not shared with third parties without explicit consent\n- Exceptions include legal requirements, safety concerns, or authorized service providers\n- Anonymized data may be used for research and reporting purposes\n- Users have the right to access, correct, or delete their personal information\n\nFor detailed information about our data practices, please refer to our comprehensive Privacy Policy.",
      },
      {
        title: "Intellectual Property Rights",
        body: "### Foundation Content:\n\n- All website content, including text, images, logos, videos, and documents, is owned by NADUPA AFRICA FOUNDATION\n- Content is protected by copyright, trademark, and other intellectual property laws\n- Unauthorized use, reproduction, or distribution is strictly prohibited\n- Limited use for educational or promotional purposes may be permitted with written consent\n\n### User-Generated Content:\n\n- Users retain ownership of content they create and submit\n- By submitting content, users grant the Foundation a license to use it for promotional purposes\n- Users warrant that their content does not infringe on third-party rights\n- The Foundation reserves the right to remove inappropriate content\n\n### Third-Party Content:\n\n- Third-party content is used with permission or under fair use provisions\n- Users must respect third-party intellectual property rights\n- Any infringement claims will be addressed promptly",
      },
      {
        title: "Limitation of Liability and Risk Acknowledgment",
        body: "### General Limitations:\n\n- NADUPA AFRICA FOUNDATION is not liable for direct, indirect, incidental, or consequential damages\n- Participation in programs and activities is at your own risk\n- The Foundation's liability is limited to the maximum extent permitted by law\n- These limitations apply regardless of the cause of action or theory of liability\n\n### Specific Risk Acknowledgments:\n\n- Volunteer activities may involve physical risks and exposure to rural environments\n- Medical facilities may be limited in remote areas where we operate\n- Travel to and from program sites carries inherent risks\n- Cultural differences may lead to misunderstandings or discomfort\n- Weather conditions and natural events may affect program activities\n\n### Insurance and Medical Coverage:\n\n- Volunteers are strongly encouraged to obtain comprehensive travel and health insurance\n- The Foundation does not provide medical insurance for volunteers\n- Emergency medical evacuation costs are the responsibility of the individual\n- Pre-existing medical conditions must be disclosed and may affect participation",
      },
      {
        title: "Modifications and Updates",
        body: "### Right to Modify:\n\n- The Foundation reserves the right to update these Terms and Conditions at any time\n- Changes may be made to reflect legal requirements, operational needs, or policy updates\n- Material changes will be communicated through our website and email notifications\n- Users will have 30 days to review changes before they take effect\n\n### Notification Process:\n\n- Updates will be posted on our website with the new effective date\n- Registered users will receive email notifications of significant changes\n- Continued use of services after changes constitutes acceptance\n- Users who disagree with changes may discontinue use of services",
      },
      {
        title: "Governing Law and Dispute Resolution",
        body: "### Applicable Law:\n\n- These Terms are governed by the laws of the Republic of Kenya\n- Any disputes will be subject to the jurisdiction of Kenyan courts\n- International volunteers acknowledge Kenyan legal jurisdiction\n\n### Dispute Resolution Process:\n\n- Initial disputes should be addressed through direct communication with Foundation management\n- Formal complaints may be submitted in writing to our board of directors\n- Mediation will be attempted before pursuing legal action\n- Legal proceedings will be conducted in Kajiado County or Nairobi, Kenya\n\n### Severability:\n\nIf any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. Invalid provisions will be replaced with enforceable terms that most closely reflect the original intent.",
      },
    ],
    contactIntro:
      "For questions, concerns, or clarifications regarding these Terms and Conditions, please contact us:",
    lastUpdated:
      "Last Updated: June 11, 2025 | Version: 2.0 | Next Review: June 11, 2026",
  },
});
