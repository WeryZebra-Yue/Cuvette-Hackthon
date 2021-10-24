import React from "react";
import { getSession } from "next-auth/react";
import QuestionPage from "../../components/question_page/QuestionPage";

function forum({ Session }) {
  return (
    <div>
      <QuestionPage Session={Session} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const Session = await getSession(context);
  if (!Session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      Session,
    },
  };
}
export default forum;
