import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./PrivacyPage.module.scss";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Acquaso</title>
        <meta
          name="description"
          content="Read the privacy policy of Acquaso, ensuring transparency on how we collect, use, and protect your data while providing premium steel bathroom appliances."
        />
      </Helmet>

      <div className="container">
        <main className={s.privacyPolicyPage} id="privacy-policy-page">
          <h1>Privacy Policy</h1>
          <p className={s.updatedDate}>Last updated on April 17th, 2024</p>

          <section>
            <p>
              Thank you for using <strong>Acquaso</strong>, a website designed
              to provide information and purchase options for premium steel
              products for bathroom appliances. Your privacy and security are
              important to us. This Privacy Policy outlines the information we
              collect, how we use it, and the choices you have regarding your
              information.
            </p>
          </section>

          <section>
            <h2>1. Information We Collect</h2>
            <article>
              <h3>1.1 Personal Information:</h3>
              <p>
                When you register for an account on <strong>Acquaso</strong>, we
                may collect personal information such as your name, email
                address, and contact number. This information is collected for
                account creation, purchase processing, and to enhance your user
                experience.
              </p>
            </article>
            <article>
              <h3>1.2 Purchase Information:</h3>
              <p>
                To process your orders, we may collect billing details, shipping
                addresses, and payment information. This data is used solely
                for transaction purposes and is securely stored.
              </p>
            </article>
            <article>
              <h3>1.3 Usage Information:</h3>
              <p>
                We may collect information about how you interact with the{" "}
                <strong>Acquaso</strong> website, including the pages you visit,
                the products you browse, and the actions you take. This
                information helps us improve the website and provide a better
                shopping experience.
              </p>
            </article>
          </section>

          <section>
            <h2>2. Use of Information</h2>
            <article>
              <h3>2.1 Personalization:</h3>
              <p>
                We may use the information collected to personalize your
                experience on the <strong>Acquaso</strong> website, such as
                recommending products based on your interests.
              </p>
            </article>
            <article>
              <h3>2.2 Communication:</h3>
              <p>
                We may use your email address and contact number to communicate
                with you about account-related matters, order updates,
                promotional offers, and product updates.
              </p>
            </article>
            <article>
              <h3>2.3 Security:</h3>
              <p>
                Your information may be used to enhance the security of the{" "}
                <strong>Acquaso</strong> website and to prevent fraudulent
                activity.
              </p>
            </article>
          </section>

          <section>
            <h2>3. Sharing of Information</h2>
            <article>
              <h3>3.1 Third-Party Service Providers:</h3>
              <p>
                We may share your information with third-party service
                providers who assist us in processing orders, delivering
                products, and maintaining the <strong>Acquaso</strong> website.
                These service providers are contractually obligated to protect
                your information and only use it for the purposes specified by
                us.
              </p>
            </article>
            <article>
              <h3>3.2 Legal Compliance:</h3>
              <p>
                We may disclose your information if required to do so by law or
                in response to a valid legal request, such as a court order or
                subpoena.
              </p>
            </article>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We take the security of your information seriously and implement
              appropriate technical and organizational measures to protect it
              against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
          </section>

          <section>
            <h2>5. Your Choices</h2>
            <article>
              <h3>5.1 Account Information:</h3>
              <p>
                You may review, update, or delete the personal information
                associated with your <strong>Acquaso</strong> account at any
                time by accessing your account settings.
              </p>
            </article>
            <article>
              <h3>5.2 Communication Preferences:</h3>
              <p>
                You can choose to opt out of receiving promotional emails or SMS
                messages from us by following the instructions provided in the
                messages or by contacting us directly.
              </p>
            </article>
          </section>

          <section>
            <h2>6. Children’s Privacy</h2>
            <p>
              The <strong>Acquaso</strong> website is not intended for use by
              children under the age of 13. We do not knowingly collect personal
              information from children under 13 years of age. If you believe
              that we have inadvertently collected information from a child
              under 13, please contact us immediately so that we can take
              appropriate action.
            </p>
          </section>

          <section>
            <h2>7. Changes to this Privacy Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at
              any time. If we make material changes to this Privacy Policy, we
              will notify you by email or by posting a notice on the{" "}
              <strong>Acquaso</strong> website prior to the changes taking
              effect. Your continued use of the <strong>Acquaso</strong> website
              after the effective date of the revised Privacy Policy constitutes
              your acceptance of the changes.
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our privacy practices, please contact us at{" "}
              <a href="mailto:support@acquaso.com">support@acquaso.com</a>.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
