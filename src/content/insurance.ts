/**
 * INSURANCE & PAYMENT — descriptions are general and educational.
 * `participation` must be confirmed by the facility's business office.
 * Do not list specific managed care / commercial plans until contracts are verified.
 */
export interface PaymentOption {
  id: string;
  title: string;
  summary: string;
  details: string[];
  verified: boolean;
}

export const paymentOptions: PaymentOption[] = [
  {
    id: "medicare",
    title: "Medicare",
    summary: "Medicare Part A may cover a limited period of skilled nursing and rehabilitation care when specific eligibility requirements are met.",
    details: [
      "Coverage generally depends on medical necessity and other Medicare requirements, including criteria related to a qualifying hospital stay.",
      "Medicare coverage for skilled nursing facility care is limited in duration and may involve coinsurance after a certain number of days.",
      "Medicare does not generally cover long-term custodial care.",
      "Our admissions team can help explain how Medicare may apply to a specific situation.",
    ],
    verified: false,
  },
  {
    id: "medicaid",
    title: "Medicaid",
    summary: "Illinois Medicaid may help cover long-term nursing home care for people who meet financial and medical eligibility requirements.",
    details: [
      "Eligibility is determined by the State of Illinois, not the facility.",
      "The application process can take time; our team can share general guidance and point families toward resources.",
      "Medicaid managed care plans may also be involved; please ask about specific plans.",
    ],
    verified: false,
  },
  {
    id: "managed-care",
    title: "Medicare Advantage & Managed Care",
    summary: "Many people have Medicare Advantage or other managed care plans that require authorization and network participation.",
    details: [
      "Coverage depends on the specific plan, its network, and its authorization requirements.",
      "Our team can work with the plan to verify benefits and obtain authorization when applicable.",
      "Please contact admissions to confirm whether a specific plan is currently accepted.",
    ],
    verified: false,
  },
  {
    id: "commercial",
    title: "Commercial Insurance",
    summary: "Some private health insurance policies include benefits for skilled nursing or rehabilitation care.",
    details: [
      "Benefits vary widely by policy.",
      "Pre-authorization is typically required before admission.",
      "Our team can help verify benefits when you provide policy information by phone.",
    ],
    verified: false,
  },
  {
    id: "private-pay",
    title: "Private Pay",
    summary: "Families may choose to pay privately for care, either for the full stay or for services not covered by insurance.",
    details: [
      "Our business office can explain current rates and what is included.",
      "Long-term care insurance policies may reimburse some costs; check your policy terms.",
      "Veterans benefits may be available to eligible veterans and surviving spouses through the VA.",
    ],
    verified: false,
  },
];

export const insuranceDisclaimer =
  "Insurance participation, coverage, and eligibility vary by plan and by individual circumstances, and can change over time. The information on this page is general and is not a guarantee of coverage or acceptance. Please contact our admissions team to verify current plan participation and your individual benefits.";
