import { beta } from "../../../Assets/Images/Images";
import s from "./AboutHeroSection.module.scss";

const AboutHeroSection = () => {
  return (
    <section className={s.heroSection}>
      <section className={s.content}>
        <h2>Our Story</h2>

        <p>
          At Acquaso, we blend style with utility to transform your kitchens and
          bathrooms into sanctuaries of design and function. Specializing
          exclusively in premium bathroom and kitchen accessories, we offer
          everything from robust faucets and shower panels to chic towel racks
          and durable sinks. Founded on the belief that even the smallest
          details matter, Acquaso is committed to enhancing your most-used
          spaces with products that are as innovative as they are reliable.
          Whether it's a sleek shower panel that turns your daily rinse into a
          five-star experience or sturdy water taps that stand the test of time,
          we bring together quality and design to create spaces that inspire.
        </p>

        <p>
          At the heart of Acquaso lies a passion for excellence and a commitment
          to our customers. Every product, from UPVC fittings to brass
          accessories, is crafted with precision and care, ensuring it meets the
          highest standards of durability and elegance. But we’re more than just
          a brand—we’re a community that celebrates beautiful, functional
          spaces. With a focus on integrity, innovation, and a splash of fun,
          we’re here to help you create kitchens and bathrooms that feel as good
          as they look. Join us on our journey to make everyday spaces
          extraordinary—because good things truly come to those who renovate!
        </p>
      </section>

      <div className={s.imgHolder}>
        <img src={beta} alt="two young women happy with shopping" />
      </div>
    </section>
  );
};
export default AboutHeroSection;
