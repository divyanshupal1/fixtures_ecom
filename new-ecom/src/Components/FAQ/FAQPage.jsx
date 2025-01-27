import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./FAQPage.module.scss";

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions (FAQs) - Acquaso</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about Acquaso's products, services, return policies, payments, and more."
        />
      </Helmet>

      <div className="container">
        <main className={s.faqPage} id="faq-page">
          <h1>Frequently Asked Questions (FAQs)</h1>

          <section>
            <h2>1. Tell me about Acquaso Solutions LLP.</h2>
            <p>
              Acquaso Solutions LLP specializes in providing high-quality bathroom and kitchen accessories, including taps, shower panels, sinks, towel rods, and more. We are committed to delivering exceptional products that enhance the functionality and aesthetics of your home. Our registered office is located in Patna, Bihar, India.
            </p>
          </section>

          <section>
            <h2>2. Is user registration mandatory?</h2>
            <p>
              Yes, user registration is mandatory for shopping on our online platform. Registering with us helps you enjoy a personalized shopping experience, track orders easily, and access special offers and discounts.
            </p>
          </section>

          <section>
            <h2>3. Can I edit information about me?</h2>
            <p>
              Yes, you can update your personal information at any time after creating your account. Simply log in, go to your account settings, make the necessary changes, and click "Update."
            </p>
          </section>

          <section>
            <h2>4. How is my personal information safeguarded?</h2>
            <p>
              We take your privacy seriously and ensure that all personal information shared with us is kept confidential. We use industry-standard security measures to protect your data from unauthorized access.
            </p>
          </section>

          <section>
            <h2>5. My transaction was not successful, but the amount has been deducted. What should I do?</h2>
            <p>
              If your transaction was unsuccessful but the amount was deducted from your account, please contact us at <a href="mailto:support@acquaso.com">support@acquaso.com</a>. Provide your order details, and we will initiate a refund process immediately or initiate the order manually as per your requirements.
            </p>
          </section>

          <section>
            <h2>6. How do I receive my product?</h2>
            <p>
              Our courier partner will deliver your order to the address provided at checkout. Upon delivery, you or an authorized person may require to sign an acknowledgment receipt. Please ensure you have a valid ID proof, such as a PAN Card, Driving License, Passport, Voter ID Card, or Aadhar Card, to receive the product.
            </p>
          </section>

          <section>
            <h2>7. Can I cancel my order?</h2>
            <p>
              Yes, you can cancel orders that have not yet been processed, approved, or shipped. Please note that a cancellation fee may apply, ranging from 0.5% to 2.5% of the total order value, depending on the payment method used. Once an order has been processed or shipped, it cannot be cancelled.
            </p>
          </section>

          <section>
            <h2>8. How can I cancel my order?</h2>
            <p>
              To cancel your order, log in to your account, go to "My Orders," click on "Request Cancellation" next to the order you wish to cancel, fill in the required details, and submit your request. We will notify you of the action taken and initiate the refund process if applicable.
            </p>
          </section>

          <section>
            <h2>9. How can I get a refund for cancelled orders?</h2>
            <p>
              Once your cancellation request is approved, we will initiate the refund process. The refunded amount will be credited to the same account used for the original transaction within 10-15 working days. Please note that cancellation and shipping fees (if applicable) will be deducted from the total amount.
            </p>
          </section>

          <section>
            <h2>10. What should I do if I receive a wrong, faulty, or damaged product?</h2>
            <p>
              If you receive a wrong, faulty, or damaged product, please log in to your account and go to "My Orders." Click on "Request Replacement," fill in the details, and attach an image of the product. Once we confirm your request, we may arrange the return pickup of the product or you have to pack the product securely and courier it back to us within 2 days of receiving our confirmation. We will inspect the product and replace it if found to be faulty for no extra charges.
            </p>
          </section>

          <section>
            <h2>11. What are the terms and conditions for return/replacement?</h2>
            <p>
              You can request a replacement or refund within 7 days of delivery for eligible products. To qualify for a return/replacement:
            </p>
            <ul>
              <li>The product must be in its original condition, unused, and with all tags intact.</li>
              <li>Upon receipt, we will inspect the product to ensure it has not been altered or tampered with.</li>
              <li>If approved, we will initiate the replacement or refund process. If the product is unavailable, we will refund the full amount.</li>
            </ul>
          </section>

          <section>
            <h2>12. What payment methods do you accept?</h2>
            <p>
              We accept a variety of payment methods, including:
            </p>
            <ul>
              <li>Credit cards</li>
              <li>Debit cards</li>
              <li>Net banking (for all leading banks)</li>
              <li>UPI</li>
            </ul>
          </section>

          <section>
            <h2>13. How secure is my financial information during online payment?</h2>
            <p>
              Your financial information is handled by a secure third-party payment gateway that complies with PCI-DSS standards. We use SSL (Secure Socket Layer) technology to encrypt your data and ensure its confidentiality.
            </p>
          </section>

          <section>
            <h2>14. Can I track the status of my order?</h2>
            <p>
              Yes, you can track your order status by logging into your account and navigating to "My Orders." Click on "Track Order" to view the current status of your shipment.
            </p>
          </section>

          <section>
            <h2>15. Where do you deliver your products?</h2>
            <p>
              We deliver our products across most cities in India. If our courier partners do not serve your area, we apologize for the inconvenience.
            </p>
          </section>

          <section>
            <h2>16. Do you offer international shipping?</h2>
            <p>
              Currently, we only ship products within India. We do not offer international shipping at this time.
            </p>
          </section>

          <section>
            <h2>17. What are the shipping/delivery charges?</h2>
            <p>
              Shipping charges vary depending on the product and location. For orders over ₹999, standard delivery is free, but additional charges may apply for larger or heavier items.
            </p>
          </section>

          <section>
            <h2>18. How many days after delivery can returns be initiated?</h2>
            <p>
              We offer a 7-day No Questions Asked Return Policy, allowing customers to return products within 7 days of delivery unless otherwise specified on the product page. Please note that products with custom fittings or special features are not eligible for return.
            </p>
          </section>

          <section>
            <h2>19. What are the courier charges for return orders?</h2>
            <p>
              We mostly offer free returns and replacements for our customers, sometimes you have to bear with some costs, please contact the support team for more details. If a return pickup service is unavailable in your area, we will guide you on how to return the product at no additional cost.
            </p>
          </section>

          <section>
            <h2>20. How can I contact Acquaso Solutions LLP?</h2>
            <p>
              For any inquiries, you can reach out to us via email at <a href="mailto:support@acquaso.com">support@acquaso.com</a> or WhatsApp our customer support. We are here to assist you with any questions or concerns.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default FAQPage;
