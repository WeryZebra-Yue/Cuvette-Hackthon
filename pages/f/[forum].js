import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import QuestionPage from "../../components/question_page/QuestionPage";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebases";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Forum({ Session }) {
  const router = useRouter();
  const [data,setData] = useState(null);
  const State = useSelector(state=>state.updates)
  const [query,setquery] = useState(null)
  useEffect(()=>{
    setquery(router.query.forum)
   
  },[router])
 useEffect(()=>{
   if(query!=null){
        getDoc(doc(db,"question",query)).then((snap)=>{
        setData(snap.data())
     })
   }
   
 },[query, State])
  return (
    <div>
       {
        data && 

       <QuestionPage Session={Session}  questionData={data} query={query} />
      
      } 
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
export default Forum;
