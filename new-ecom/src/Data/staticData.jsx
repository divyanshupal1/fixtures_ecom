import { v4 as uuid } from "uuid";
import {
  appleLogo,
  bkashCard,
  canonLogo,
  mastercard,
  betanew,
  papa,
  nagadCard,
  productImg1,
  productImg2,
  productImg3,
  russiaFlag,
  saudiFlag,
  usaFlag,
  visaCard,
} from "../Assets/Images/Images";

export const introductionSliderData = [
  {
    productName: "Iphone 14 Series",
    productImg: productImg1,
    logoImg: appleLogo,
    discountText: "Up to 10% off Voucher",
    id: uuid(),
  },
  {
    productName: "Canon EOS 5D MkII",
    productImg: productImg2,
    logoImg: canonLogo,
    discountText: "Up to 30% off Voucher",
    id: uuid(),
  },
  {
    productName: "MacBook Pro 16",
    productImg: productImg3,
    logoImg: appleLogo,
    discountText: "Up to 15% off Voucher",
    id: uuid(),
  },
  // {
  //   productName: "",
  //   productImg: "",
  //   logoImg: "",
  //   discountText: "Up to 10% off Voucher",
  //   id: uuid(),
  // },
];

export const categoriesData = [
  {
    iconName: "mobile",
    title: "Phones",
    id: uuid(),
  },
  {
    iconName: "computer",
    title: "Computers",
    id: uuid(),
  },
  {
    iconName: "smartWatch",
    title: "SmartWatch",
    id: uuid(),
  },
  {
    iconName: "camera",
    title: "Camera",
    id: uuid(),
  },
  {
    iconName: "headphone",
    title: "HeadPhones",
    id: uuid(),
  },
  {
    iconName: "gamepad",
    title: "Gaming",
    id: uuid(),
  },
  {
    iconName: "furniture",
    title: "Furniture",
    id: uuid(),
  },
  {
    iconName: "shirt",
    title: "Clothes",
    id: uuid(),
  },
  {
    iconName: "dogHand",
    title: "Animal",
    id: uuid(),
  },
  {
    iconName: "makeup",
    title: "makeup",
    id: uuid(),
  },
];

export const aboutCardsInfo = [
  {
    iconName: "shop",
    number: "GST",
    text: "Govt. Registered Company",
    id: uuid(),
  },
  {
    iconName: "dollarSign",
    number: "Razorpay",
    text: "Secure Payment Gateway",
    id: uuid(),
  },
  {
    iconName: "shoppingBag",
    number: "IEC",
    text: "Import Export Approved",
    id: uuid(),
  },
  {
    iconName: "moneyBag",
    number: "MSME",
    text: "Udyam Registered",
    id: uuid(),
  },
];

export const ourMembersData = [
  {
    name: "Aakash Gupta",
    jobTitle: "Director, Founder",
    img: betanew,
    socialMedia: {
      twitter: "https://twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
    },
    id: uuid(),
  },

  {
    name: "Kamlesh Kumar",
    jobTitle: "Director",
    img: papa,
    socialMedia: {
      twitter: "https://twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
    },
    id: uuid(),
  },
];

export const paymentCards = [
  {
    img: bkashCard,
    alt: "Bkash card",
    link: "https://www.bkash.com/en/products-services/visa-card-to-bkash",
    id: uuid(),
  },
  {
    img: visaCard,
    alt: "Visa card",
    link: "https://usa.visa.com/pay-with-visa/find-card/apply-credit-card",
    id: uuid(),
  },
  {
    img: mastercard,
    alt: "Mastercard",
    link: "https://www.mastercard.us/en-us.html",
    id: uuid(),
  },
  {
    img: nagadCard,
    alt: "Nagad card",
    link: "https://www.nagad.com.bd/services/?service=add-money-from-card",
    id: uuid(),
  },
];

export const LANGUAGES = [
  {
    lang: "English",
    flag: usaFlag,
  },
  {
    lang: "Russian",
    flag: russiaFlag,
  },
  {
    lang: "Arabic",
    flag: saudiFlag,
  },
];

export const categoryProductsCustomizations = {
  showDiscount: true,
  showFavIcon: true,
  showDetailsIcon: true,
  showNewText: true,
  showWishList: true,
};

export const allProductsCustomizations = {
  showDiscount: true,
  showFavIcon: true,
  showDetailsIcon: true,
  showNewText: true,
  showWishList: true,
};

export const wishListProductsCustomization = {
  showDiscount: true,
  showFavIcon: false,
  stopHover: true,
  showDetailsIcon: false,
  showRemoveIcon: true,
};

export const ourProductsCustomizations = {
  showDiscount: true,
  showFavIcon: true,
  stopHover: false,
  showDetailsIcon: true,
  showRemoveIcon: false,
  showNewText: true,
  showWishList: true,
  showColors: true,
};
