import About from "../Components/About/About";
import AccountPage from "../Components/AccountPage/AccountPage";
import Cart from "../Components/Cart/Cart";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import Contact from "../Components/Contact/Contact";
import FavoritePage from "../Components/FavoritePage/FavoritePage";
import Home from "../Components/Home/Home";
import LogIn from "../Components/LogIn/LogIn";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../Components/ProductDetailsPage/ProductDetailsPage";
import ProductsCategoryPage from "../Components/ProductsCategory/ProductsCategoryPage";
import ProductsPage from "../Components/ProductsPage/ProductsPage";
import SearchPage from "../Components/Search/SearchPage";
import SignUp from "../Components/SignUp/SignUp";
import MoreCategories from "../Components/MoreCategories/MoreCategories";
import WishList from "../Components/WishList/WishList";
import PrivacyPolicyPage from "../Components/Privacy/PrivacyPage"
import TermsAndConditionsPage from "../Components/TermsandConditions/TermsAndConditionsPage";
import CancellationAndReturnPage from "../Components/Cancelliation/CancellationAndReturnPage";
import ShippingAndDeliveryPage from "../Components/Shipping/ShippingAndDeliveryPage";

export const ROUTES_CONFIG = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/privacy", element: <PrivacyPolicyPage /> },
  { path: "/termsandconditions", element: <TermsAndConditionsPage /> },
  { path: "/cancellation", element: <CancellationAndReturnPage /> },
  { path: "/shippinganddelivery", element: <ShippingAndDeliveryPage /> },
  { path: "/details", element: <ProductDetailsPage /> },
  { path: "/category", element: <ProductsCategoryPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/favorites", element: <FavoritePage /> },
  // { path: "/wishlist", element: <WishList /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <LogIn /> },
  { path: "/profile", element: <AccountPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/more-categories", element: <MoreCategories /> },
  { path: "*", element: <NotFoundPage /> },
];
