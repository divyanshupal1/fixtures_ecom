import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./ShippingAndDeliveryPage.module.scss";

const ShippingAndDeliveryPage = () => {
  return (
    <>
      <Helmet>
        <title>Shipping and Delivery Policy - Acquaso</title>
        <meta
          name="description"
          content="Learn about the shipping and delivery process of Acquaso, including timelines, charges, and locations served."
        />
      </Helmet>

      <div className="container">
        <main className={s.shippingPage} id="shipping-page">
          <h1>Shipping and Delivery Policy</h1>
          <p className={s.updatedDate}>Last updated on April 17th, 2024</p>

          <section>
            <h2>1. Shipping Timeline</h2>
            <p>
              Orders are processed within 2-3 business days. Delivery timelines
              vary by location and will be provided during checkout.
            </p>
          </section>

          <section>
            <h2>2. Shipping Charges</h2>
            <p>
              Shipping charges are calculated based on the weight of the order
              and the delivery location. These charges will be displayed before
              completing your purchase.
            </p>
          </section>

          <section>
            <h2>3. Delivery Locations</h2>
            <p>
              We currently ship across major cities and towns. Please check our
              serviceable locations at checkout.
            </p>
          </section>

          <section>
            <h2>4. Tracking</h2>
            <p>
              Once your order is shipped, a tracking number will be sent to your
              email to monitor delivery progress.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default ShippingAndDeliveryPage;
