import React from "react";
import Image from "next/image";
import Link from "next/link";

import landingPageStyle from "./landing.module.css";

import logo from "../../assets/_logo/logo.svg";
import landingPrimaryGraphic from "../../assets/landing/graphic.svg";

import SignInPopup from "./SignInPopup";

function LandingPage() {
  const [isSignInPopupOpen, setIsSignInPopupOpen] = React.useState(false);

  return (
    <div className={landingPageStyle.landing_primary_wrapper}>
      <nav className={landingPageStyle.landing_nav}>
        <Link href="/">
          <div className={landingPageStyle.landing_nav_logo}>
            <Image src={logo} layout="responsive" />
          </div>
        </Link>
        <div
          className={`${landingPageStyle.sign_in_button} bg_change_hover`}
          onClick={() => setIsSignInPopupOpen(true)}
        >
          Sign In
        </div>
      </nav>
      <div className={landingPageStyle.landing_content_wrapper}>
        <h3 className={landingPageStyle.landing_title}>
          Learn and grow with sprioc
        </h3>
        <div
          className={`${landingPageStyle.landing_start_learning_now_button} bg_change_hover`}
          onClick={() => setIsSignInPopupOpen(true)}
        >
          Start learning now
        </div>
        <div className={landingPageStyle.landing_primary_graphic}>
          <Image src={landingPrimaryGraphic} layout="responsive" />
        </div>
      </div>

      <SignInPopup
        isPopupOpen={isSignInPopupOpen}
        toggleFunction={() => setIsSignInPopupOpen(!isSignInPopupOpen)}
      />
    </div>
  );
}

export default LandingPage;
