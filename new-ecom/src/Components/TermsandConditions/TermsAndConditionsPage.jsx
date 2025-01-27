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
            <h2>Welcome to Acquaso.com</h2>
            <p>
              These Terms and Conditions ("Terms") govern your use of Acquaso.com ("Website"), operated by Acquaso Solutions LLP ("Company", "we", "us", "our"). By accessing or using the Website, you agree to comply with and be bound by these Terms.
            </p>
          </section>

          <section>
            <h2>Company Information</h2>
            <p><strong>Company Name:</strong> Acquaso Solutions LLP</p>
            <p><strong>Registered Address:</strong> Bhupatipur Road, Patna, Bihar, India</p>
          </section>

          <section>
            <h2>Definitions</h2>
            <p>
              <strong>"User"</strong> refers to anyone who accesses the Website.
            </p>
            <p>
              <strong>"Vendor"</strong> refers to sellers who offer products on the Website.
            </p>
            <p>
              <strong>"Product"</strong> includes all items listed for sale on the Website, including but not limited to water taps, cocks, valves, showers, shower panels, sinks, soap dishes, tumblers, towel rods, towel racks, shelves, angle valves, internal fittings, spares, waste pipes, couplings, UPVC and CPVC fittings, and brass/PVC/PTMT accessories.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Website. Continued use of the Website following changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <p><strong>Account Creation:</strong> Users may need to create an account to make purchases or use certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
            <p><strong>Prohibited Actions:</strong> Users must not:</p>
            <ul>
              <li>Copy, reproduce, or distribute any content from the Website without authorization.</li>
              <li>Use the Website for any unlawful purpose or engage in any fraudulent activities.</li>
              <li>Post or transmit any material that infringes on the intellectual property rights of others.</li>
              <li>Attempt to interfere with the operation of the Website or attempt unauthorized access to any part of the Website.</li>
            </ul>
          </section>

          <section>
            <h2>Product Information</h2>
            <p><strong>Product Listings:</strong> All products listed on the Website are subject to availability and may be withdrawn or modified at our discretion.</p>
            <p><strong>Warranties:</strong> Product warranties are provided by the manufacturers. We are not liable for warranty issues but may assist in directing you to the appropriate manufacturer for warranty claims.</p>
          </section>

          <section>
            <h2>Payment and Shipping</h2>
            <p>
              <strong>Payment Methods:</strong> We accept various payment methods, including debit/credit cards, UPI, and net banking.
            </p>
            <p>
              <strong>Shipping Costs:</strong> Shipping charges may vary based on the product and its category. Details will be provided at checkout. Free delivery is available on orders over ₹999, subject to conditions and availability. Heavy or oversized products may incur additional shipping charges despite the order value exceeding ₹999.
            </p>
            <p>
              <strong>Order Fulfilment:</strong> Orders will be processed and shipped based on availability. Shipping times are estimates and may vary.
            </p>
            <p>
              <strong>Discounts:</strong> A 10% discount on the first order is available by subscribing to our newsletter, with a maximum discount of ₹199 on the order.
            </p>
          </section>

          <section>
            <h2>Returns and Refunds</h2>
            <p>
              <strong>Return Policy:</strong> Returns are accepted if the product is in its original condition and packaging. We reserve the right to refuse returns if the product is found to be tampered with or replaced with a different or fake product.
            </p>
            <p>
              <strong>Refunds:</strong> Refunds will be processed based on the return verification. All refunds are subject to a review process.
            </p>
          </section>

          <section>
            <h2>Unethical Purchase & Cancellation Policy</h2>
            <p>
              <strong>1. Unethical Purchases:</strong> In the event that an order is placed using unethical means, such as exploiting technical glitches, misusing offer terms, guidelines, or discount codes, Acquaso Solutions LLP reserves the right to cancel the order. No refund will be issued for such orders.
            </p>
            <p>
              <strong>2. Bulk Orders:</strong> For customers who place multiple or bulk orders and subsequently return or cancel those orders, Acquaso reserves the right to charge a substantial return or cancellation fee. This fee may include, but is not limited to, the entire order amount, depending on the circumstances.
            </p>
            <p>
              <strong>3. Misuse of Offers:</strong> If it is determined that a customer has misused an offer by falsifying their Email ID, Mobile Number, or any other information, the order will be cancelled, and no refund will be processed.
            </p>
          </section>

          <section>
            <h2>Legal and Compliance</h2>
            <p>
              <strong>Copyright and Trademarks:</strong> All content on the Website, including logos and trademarks, is protected by copyright and trademark laws. Unauthorized use of any content or trademarks is prohibited and may result in legal action.
            </p>
            <p>
              <strong>Scams and Fraud:</strong> Any attempts to scam or commit fraud, including tampering with orders or returning fake products, will result in legal action.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              For any questions or concerns regarding these Terms, please contact us at:
            </p>
            <p>Email: <a href="mailto:support@acquaso.com">support@acquaso.com</a></p>
            <p>Address: Bhupatipur Road, Patna, Bihar, India</p>
          </section>
        </main>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
