import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import QuestionPage from "../../components/question_page/QuestionPage";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebases";

function forum({ Session }) {
  // const router
  useEffect(()=>{
    
  })
  return (
    <div>
      <QuestionPage Session={Session} questionData={getDoc(doc(db,"question",))} />
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
