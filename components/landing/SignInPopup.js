import React from "react";
import { signIn } from "next-auth/react";

import { Button, Card, CardHeader, Modal, Row, Col } from "reactstrap";

function SignInPopup({ isPopupOpen, toggleFunction }) {
  return (
    <div>
      <Modal isOpen={isPopupOpen} toggle={toggleFunction}>
        <div className=" modal-body p-0">
          <Card className=" bg-secondary shadow border-0">
            <CardHeader className=" bg-white pb-5">
              <div className=" text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div className=" btn-wrapper text-center">
                <Button
                  className=" btn-neutral btn-icon"
                  color="default"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <span className=" btn-inner--icon"></span>
                  <span className=" btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

export default SignInPopup;
