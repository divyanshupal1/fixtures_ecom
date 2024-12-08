import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./CancellationAndReturnPage.module.scss";

const CancellationAndReturnPage = () => {
  return (
    <>
      <Helmet>
        <title>Cancellation and Return Policy - Acquaso</title>
        <meta
          name="description"
          content="Understand the cancellation and return policy of Acquaso, including refund eligibility and conditions."
        />
      </Helmet>

      <div className="container">
        <main className={s.policyPage} id="cancellation-return-page">
          <h1>Cancellation and Return Policy</h1>
          <p className={s.updatedDate}>Last updated on April 17th, 2024</p>

          <section>
            <h2>1. Cancellation Policy</h2>
            <p>
              You may cancel your order within 24 hours of placing it, provided
              the order has not been shipped. To cancel, contact us at{" "}
              <a href="mailto:contact@acquaso.com">contact@acquaso.com</a>.
            </p>
          </section>

          <section>
            <h2>2. Return Policy</h2>
            <p>
              We accept returns within 14 days of delivery if the product is
              unused, in its original packaging, and with a valid receipt.
            </p>
          </section>

          <section>
            <h2>3. Refunds</h2>
            <p>
              Once your return is received and inspected, we will notify you of
              the approval or rejection of your refund. Approved refunds will be
              processed to your original payment method within 7 business days.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default CancellationAndReturnPage;
