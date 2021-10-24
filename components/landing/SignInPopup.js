import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import SignInPopupStyles from "./SignInPopup.module.css";

import { Modal } from "reactstrap";

import googlelogo from "../../assets/landing/google.svg";

function SignInPopup({ isPopupOpen, toggleFunction }) {
  return (
    <div>
      <Modal
        isOpen={isPopupOpen}
        toggle={toggleFunction}
        centered={true}
        className={SignInPopupStyles.sign_in_popup}
      >
        <div className={SignInPopupStyles.s_p_primary_wrapper}>
          <div className={SignInPopupStyles.s_p_sign_in_with_text}>
            Sign in Options
          </div>
          <div
            className={SignInPopupStyles.sign_in_wih_google_button}
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <div className={SignInPopupStyles.s_p_google_logo_wrapper}>
              <Image
                width={"100%"}
                height={"100%"}
                src={googlelogo}
                layout="responsive"
              />
            </div>
            With Google
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignInPopup;
