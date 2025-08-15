export interface IFaqData {
  question: string;
  paragraph: string;
  bulletTitle?: string;
  bullets?: string[];
  note?: string;
  linkText?: string;
  linkUrl?: string;
}

export const faqData: IFaqData[] = [
  {
    question: "Why do we have your contact details?",
    paragraph:
      "Our platform allows users to upload and sync their contacts — such as names, phone numbers, and email addresses — to help them connect with friends and colleagues.",
    bulletTitle: "Your contact details might be in our system if:",
    bullets: [
      "Someone who has your phone number or email in their contacts joined our platform",
      "That person chose to sync their contacts with the app",
    ],
  },
  {
    question: "How do we use this information?",
    paragraph: "We use your contact information to:",
    bulletTitle: "",
    bullets: [
      "Recommend people you might know",
      "Help users connect with their existing network",
      "Enhance the overall experience on our platform",
    ],
    note: "We never sell your contact details to advertisers and do not share them publicly.",
  },
  {
    question: "Can you request removal of your contact information?",
    paragraph:
      "Yes. If you want your contact information removed from our system, you can submit a request at:",
    linkText: "Request Data Removal",
    linkUrl: "/delete-contact-info",
  },
  {
    question: "How can you manage contact syncing?",
    paragraph: "You can:",
    bulletTitle: "",
    bullets: [
      "Disable contact syncing in your account settings",
      "Delete any previously uploaded contacts through the privacy section of your profile",
    ],
  },
  {
    question: "Need more help?",
    paragraph:
      "Reach out to us at support@yourappname.com and we’ll be happy to assist.",
  },
];

