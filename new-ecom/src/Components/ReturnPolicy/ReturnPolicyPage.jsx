import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./ReturnPolicy.module.scss";

const ReturnPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Return & Replacement Policy - Acquaso</title>
        <meta
          name="description"
          content="Learn about Acquaso's return and replacement policy, including eligibility, procedures, and refund processes for your purchases."
        />
      </Helmet>

      <div className="container">
        <main className={s.policyPage} id="return-policy-page">
          <h1>Return & Replacement Policy</h1>
          <p className={s.updatedDate}>Last updated on April 17th, 2024</p>

          <section>
            <h2>1. Eligibility for Returns</h2>
            <p><strong>Return Window:</strong> Customers can initiate a return within 3 days of receiving their order. After 3 days, we will be unable to process a return request.</p>
            <p><strong>Product Condition:</strong> The product must be in its original condition – unused, unaltered, and unsoiled. All original packaging, including tags, accessories, manuals, and any accompanying promotional items, must be intact.</p>
            <p><strong>Non-Returnable Items:</strong> The following products are not eligible for return:</p>
            <ul>
              <li>Custom-made products.</li>
              <li>Items marked as final sale or non-returnable on the product page.</li>
              <li>Products that have been used, altered, or damaged after delivery.</li>
            </ul>
          </section>

          <section>
            <h2>2. How to Initiate a Return</h2>
            <p><strong>Online Return Request:</strong></p>
            <ol>
              <li>Log in to your account on Acquaso.com.</li>
              <li>Navigate to <strong>My Account &gt; My Orders</strong>.</li>
              <li>Select the product you wish to return and click on <strong>Return</strong>.</li>
              <li>Fill in the return request form with necessary details and submit.</li>
            </ol>
            <p><strong>Confirmation & Shipping Instructions:</strong> After submitting your return request, our team will review and approve it if the product meets our return criteria. Upon approval, you will receive an email with detailed instructions on how to proceed, including packaging guidelines and shipping options.</p>
            <p><strong>Return Shipping:</strong></p>
            <ul>
              <li><strong>Free Return Shipping:</strong> If your pin code is serviceable by our logistics partners, we offer free reverse pickup.</li>
              <li><strong>Self-Shipping:</strong> If reverse pickup is unavailable at your location, you will need to self-ship the product to our returns address. We recommend using a reliable courier service, and we will reimburse self-shipping costs up to ₹100 upon receiving the product.</li>
            </ul>
          </section>

          <section>
            <h2>3. Replacement Policy</h2>
            <p><strong>Eligibility for Replacement:</strong> Replacements can be requested within 24 hours of delivery for products that are defective, damaged during transit, or different from what you ordered. To be eligible, the product must be in its original condition and packaging, with all accessories and tags intact.</p>
            <p><strong>Replacement Process:</strong></p>
            <ol>
              <li>Log in to your account and navigate to <strong>My Account &gt; My Orders</strong>.</li>
              <li>Select the product you wish to replace and click on <strong>Replacement</strong>.</li>
              <li>Provide the necessary details, including a clear image of the defective or damaged product.</li>
              <li>Upon approval, you will be instructed to pack the product securely and prepare it for courier pickup.</li>
              <li>Once we receive the product and verify its condition, we will process the replacement. If the product is unavailable, you may opt for a refund or choose an alternative product of equal value.</li>
            </ol>
          </section>

          <section>
            <h2>4. Refund Policy</h2>
            <p><strong>Refund Processing:</strong> Refunds will be initiated once we receive and inspect the returned product. If the product meets our return criteria, the refund will be processed within 7-10 business days.</p>
            <p><strong>Refunds will be credited to the original payment method used during the purchase.</strong> For COD (Cash on Delivery) orders, refunds will be processed via bank transfer or UPI.</p>
            <p><strong>Refund Amount:</strong> For products purchased on discount, the refund will reflect the amount paid at the time of purchase, not the original price. Non-Refundable Charges: COD fees, shipping charges, and gift-wrapping fees are non-refundable.</p>
            <p><strong>Refund for Cancelled Orders:</strong> If you cancel your order before it is processed or shipped, a full refund will be issued. If the order is already in transit, shipping charges may be deducted from the refund.</p>
          </section>

          <section>
            <h2>5. Self-Shipping Returns</h2>
            <p><strong>Shipping Instructions:</strong> If your location is not serviceable by our reverse pickup service, please self-ship the product to the following address:</p>
            <address>
              Acquaso Solutions LLP<br />
              Bhupatipur Road, Patna,<br />
              Bihar, India
            </address>
            <p>Ensure that the product is securely packed to prevent damage during transit. Please include your Order ID and registered mobile number on the packaging.</p>
            <p><strong>Shipping Cost Reimbursement:</strong> We will reimburse self-shipping costs up to ₹100 upon receiving and inspecting the returned product. Please keep the courier receipt as proof of shipment.</p>
          </section>

          <section>
            <h2>6. Conditions for Return/Replacement Rejection</h2>
            <p>Returns or replacements may be rejected if:</p>
            <ul>
              <li>The product is found to be used, altered, or damaged post-delivery.</li>
              <li>The product is returned without its original packaging, accessories, or tags.</li>
              <li>The product is returned in poor condition or without adherence to the return guidelines.</li>
            </ul>
          </section>

          <section>
            <h2>7. Cancellation Policy</h2>
            <p><strong>Order Cancellation:</strong> Orders can be cancelled before they enter the "Processing in Progress" stage. Once processing begins, cancellation requests will not be accepted.</p>
            <p>To cancel an order, log in to your account and navigate to <strong>My Orders</strong>. Select the order you wish to cancel and click on <strong>Cancel</strong>.</p>
            <p>A full refund will be issued for orders cancelled before shipping. If the product has already shipped, the refund will be processed after deducting shipping charges.</p>
          </section>

          <section>
            <h2>8. Customer Support</h2>
            <p>For any issues related to returns, replacements, or refunds, please contact our customer support team:</p>
            <p>Email: <a href="mailto:support@acquaso.com">support@acquaso.com</a></p>
            <p>Our customer support team is available from 9 AM to 6 PM, Monday to Saturday. We strive to respond to all inquiries within 7 working days.</p>
          </section>
        </main>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
