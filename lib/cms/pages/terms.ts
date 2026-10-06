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
    effectiveDate: "October 6, 2026",
    notice: {
      title: "Important Notice",
      text: "By using our website, making a donation, volunteering or taking part in our programs, you agree to these Terms and Conditions. If you do not agree with them, please do not use our services.",
    },
    sections: [
      {
        title: "Acceptance of Terms",
        body: 'By using this website or engaging with NADUPA AFRICA FOUNDATION ("we", "our", "us" or "the Foundation"), you agree to these Terms and Conditions and our Privacy Policy. Volunteers also agree to the Volunteer Code of Conduct below.\n\nIf you do not agree with these terms, please do not use this website or our services.',
      },
      {
        title: "Eligibility and Age Requirements",
        body: "### General Eligibility:\n\n- Our website forms are intended for adults aged 18 or over\n- Participation in volunteer programs is open to individuals aged 18 or over\n- Under Kenyan law a child is anyone under 18; we do not knowingly accept forms from children without a parent's or guardian's consent\n\n### Minors (Under 18) in Supervised Activities:\n\n- Must have written parental or legal guardian consent\n- Must be accompanied by a parent or guardian during volunteer activities\n- Are subject to additional safety and supervision requirements\n- May not be able to take part in some programs or activities\n\n### International Volunteers:\n\n- Must hold valid travel documents and the appropriate visa or permit\n- Must comply with Kenyan immigration laws and regulations\n- Are responsible for their own travel insurance and medical cover",
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
        body: "### How Donations Work:\n\n- This website does not process payments. The donation form records your interest, and we contact you by email to arrange your gift through M-Pesa, bank transfer or another agreed method\n- All donations are voluntary and made without expectation of goods or services in return\n- If a donation is made in error (for example a wrong amount or duplicate payment), contact us within 30 days and we will refund it\n- We may decline or return a donation where accepting it would conflict with our mission, the law or our policies\n\n### Use of Funds:\n\n- Funds are used to support the Foundation's mission and programs\n- Donations for a specific purpose are used for that purpose where possible; if that is not possible, we will contact you to agree an alternative\n\n### Reporting and Tax:\n\n- Financial reports are published on our Transparency page as they become available, and can be requested by email\n- Our tax-exempt status is pending. Until it is confirmed, donations may not be tax-deductible, and we will tell you if this changes",
      },
      {
        title: "Privacy and Data Protection",
        body: "We process personal data in line with the Data Protection Act, 2019 of Kenya.\n\n- We collect only what you submit through our forms and use it only for the purpose you gave it for\n- We share it only with the service providers that run this website (named in our Privacy Policy), or where the law requires\n- We keep it only until the lawful purpose for holding it has lapsed\n- You have the right to access, correct or delete your data, to object to processing, and to complain to the Office of the Data Protection Commissioner\n\nFull details are in our Privacy Policy.",
      },
      {
        title: "Intellectual Property Rights",
        body: "### Foundation Content:\n\n- Unless stated otherwise, the text, images, logos and documents on this website belong to NADUPA AFRICA FOUNDATION or are used with permission\n- You may share our public pages and documents for non-commercial purposes if you credit the Foundation and do not change them\n- Any other use needs our written permission\n\n### Content You Send Us:\n\n- You keep ownership of anything you send us\n- We will not publish your messages, photos or stories without your permission\n- You confirm that anything you send does not infringe anyone else's rights",
      },
      {
        title: "Limitation of Liability and Risk Acknowledgment",
        body: "### Website:\n\n- We work to keep the information on this website accurate and up to date, but it is provided for general information and may change\n- We are not responsible for the content of external websites we link to\n\n### Programs and Volunteering:\n\n- Volunteer activities may involve physical activity, travel and work in rural areas where medical facilities may be limited\n- Weather and other events may affect or cancel activities\n- Volunteers should obtain suitable travel and health insurance; the Foundation does not provide medical insurance for volunteers\n- Please tell us about any medical condition that may affect your safety, so we can plan for it\n\n### Our Liability:\n\nTo the extent permitted by Kenyan law, the Foundation is not liable for indirect or consequential loss arising from your use of this website or participation in our activities. Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot be excluded by law, and nothing affects your rights under the Consumer Protection Act, 2012.",
      },
      {
        title: "Modifications and Updates",
        body: "We may update these Terms and Conditions to reflect changes in the law or in how we work. The current version is always on this page with its effective date. Changes apply from that date and do not affect anything that happened before. If you continue to use the website after a change, the updated terms apply.",
      },
      {
        title: "Governing Law and Dispute Resolution",
        body: "### Applicable Law:\n\n- These Terms are governed by the laws of the Republic of Kenya\n- Any disputes will be subject to the jurisdiction of Kenyan courts\n- International volunteers acknowledge Kenyan legal jurisdiction\n\n### Dispute Resolution Process:\n\n- Initial disputes should be addressed through direct communication with Foundation management\n- Formal complaints may be submitted in writing to our board of directors\n- Mediation will be attempted before pursuing legal action\n- Legal proceedings will be conducted in Kajiado County or Nairobi, Kenya\n\n### Severability:\n\nIf any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect. ",
      },
    ],
    contactIntro:
      "For questions, concerns, or clarifications regarding these Terms and Conditions, please contact us:",
    lastUpdated:
      "Last updated: October 6, 2026 | Version: 3.0 | Next review: October 2027",
  },
});
