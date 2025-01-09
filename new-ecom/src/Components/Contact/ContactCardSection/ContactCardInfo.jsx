import s from "./ContactCardInfo.module.scss";
import ContactInfo from "./ContactInfo"

const ContactInfoCard = () => {
  return (
    <div className={s.contactInfo}>
      <ContactInfo iconName="email2" title="Write To Us">
        <p>Fill out our form and we will contact you within 48 hours.</p>
        <p>
          Emails:{" "}
          <a href="mailto:support@acquaso.com">support@acquaso.com</a>
        </p>
      </ContactInfo>
    </div>
  );
};
export default ContactInfoCard;
