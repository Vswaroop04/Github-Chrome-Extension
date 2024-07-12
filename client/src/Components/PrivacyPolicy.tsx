import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          our Chrome extension. Please read this Privacy Policy carefully. If
          you do not agree with the terms of this Privacy Policy, please do not
          access the extension.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">
          We may collect information about you in a variety of ways. The
          information we may collect via the extension includes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Personal Data: Personally identifiable information, such as your
            name, email address, and other details that you voluntarily provide
            to us.
          </li>
          <li>
            Derivative Data: Information our servers automatically collect when
            you access the extension, such as your IP address, browser type,
            operating system, access times, and the pages you have viewed
            directly before and after accessing the extension.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">Use of Your Information</h2>
        <p className="mb-4">
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the extension to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>
            Generate a personal profile about you to make future visits to the
            extension more personalized.
          </li>
          <li>
            Monitor and analyze usage and trends to improve your experience with
            the extension.
          </li>
          <li>Notify you of updates to the extension.</li>
          <li>
            Request feedback and contact you about your use of the extension.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          Disclosure of Your Information
        </h2>
        <p className="mb-4">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            By Law or to Protect Rights: If we believe the release of
            information about you is necessary to respond to legal process, to
            investigate or remedy potential violations of our policies, or to
            protect the rights, property, and safety of others, we may share
            your information as permitted or required by any applicable law,
            rule, or regulation.
          </li>
          <li>
            Third-Party Service Providers: We may share your information with
            third parties that perform services for us or on our behalf,
            including payment processing, data analysis, email delivery, hosting
            services, customer service, and marketing assistance.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          Security of Your Information
        </h2>
        <p className="mb-4">
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other type of misuse.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Policy for Children</h2>
        <p className="mb-4">
          We do not knowingly solicit information from or market to children
          under the age of 13. If we learn that we have collected information
          from a child under age 13 without verification of parental consent, we
          will delete that information as quickly as possible. If you become
          aware of any data we have collected from children under age 13, please
          contact us.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal, or regulatory reasons.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this Privacy Policy, please
          contact us at: vswaroop04@gmail.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
