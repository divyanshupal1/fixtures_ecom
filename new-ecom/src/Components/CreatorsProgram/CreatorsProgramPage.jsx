import React from "react";
import { Helmet } from "react-helmet-async";
import s from "./CreatorProgramPage.module.scss";

const CreatorsProgramPage = () => {
  return (
    <div className={s.container}>
      <Helmet>
        <title>Creators Program</title>
      </Helmet>
      <div className={s.formContainer}>
        <h1 className={s.heading}>Creator Program</h1>
        <p className={s.subheading}>
          Opportunities for Creators, Influencers, and Advertisers.
        </p>
        {/* Form submission using Formspark */}
        <form
          className={s.form}
          action="https://submit-form.com/yFBezpL86" // Formspark endpoint
          method="POST"
        >
          <label className={s.label}>
            Name:
            <input type="text" className={s.input} name="name" placeholder="Enter your name" required />
          </label>
          <label className={s.label}>
            Phone:
            <input type="tel" className={s.input} name="phone" placeholder="Enter your phone number" required />
          </label>
          <label className={s.label}>
            Email:
            <input type="email" className={s.input} name="email" placeholder="Enter your email" required />
          </label>
          <label className={s.label}>
            Social ID:
            <div className={s.socialInput}>
              <input
                type="text"
                className={s.input}
                name="social_id"
                placeholder="Enter your social ID"
                required
              />
              <select className={s.select} name="platform" required>
                <option value="">Select Platform</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="behance">Behance</option>
              </select>
            </div>
          </label>
          <label className={s.label}>
            Website:
            <input type="url" className={s.input} name="website" placeholder="Enter your website (if any)" />
          </label>
          <label className={s.label}>
            Category of Content:
            <input type="text" className={s.input} name="category" placeholder="Enter content category" required />
          </label>
          <button type="submit" className={s.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatorsProgramPage;
