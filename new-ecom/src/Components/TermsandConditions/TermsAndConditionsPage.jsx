import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./TermsAndConditionsPage.module.scss";

const TermsAndConditionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Acquaso</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Acquaso, covering agreements, rights, and obligations for users and our services."
        />
      </Helmet>

      <div className="container">
        <main className={s.termsPage} id="terms-page">
          <h1>Terms and Conditions</h1>
          <p className={s.updatedDate}>Last updated on April 17th, 2024</p>

          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the <strong>Acquaso</strong> website, you
              agree to be bound by these Terms and Conditions. If you disagree
              with any part of these terms, you must not use the website.
            </p>
          </section>

          <section>
            <h2>2. Use of Services</h2>
            <p>
              You may use the <strong>Acquaso</strong> website only for lawful
              purposes and in accordance with these Terms. Unauthorized or
              improper use may result in termination of your access.
            </p>
          </section>

          <section>
            <h2>3. Product Information</h2>
            <p>
              We strive to ensure all product information, including
              descriptions, pricing, and availability, is accurate. However, we
              do not guarantee that the information is error-free.
            </p>
          </section>

          <section>
            <h2>4. Limitation of Liability</h2>
            <p>
              Acquaso is not responsible for any direct, indirect, or incidental
              damages resulting from the use or inability to use our website or
              services.
            </p>
          </section>

          <section>
            <h2>5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Your continued use of the website constitutes your agreement
              to the updated terms.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
