import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import QuestionPageStyles from "./QuestionPage.module.css";

import PrimaryNavbar from "../navbar/Navbar";
import { db } from "../../firebases";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { Updates } from "../../action";
import { set } from "@firebase/database";

function QuestionPage({
  Session,
  questionData,
  query
}) 

{ const [Answer,setAnswer] =  useState(questionData.answer)
  useEffect(() => {
   console.log(questionData)
  }, [questionData])
  
  const dispatch = useDispatch();
  const TextRef = useRef();
  
  return (
    <div className={QuestionPageStyles.q_p_primary_wrapper}>
      <PrimaryNavbar userDetails={Session.user} />
      <div className={QuestionPageStyles.q_p_question_details_wrapper}>
        <h3 className={QuestionPageStyles.q_p_question_details_title}>
          {questionData.question}
        </h3>
        <div className={QuestionPageStyles.q_p_question_details_tags}>
          {questionData.tags.map((tag, index) => (
            <span
              key={index}
              className={QuestionPageStyles.q_p_question_details_tag}
              >
              {tag}
            </span>
          ))}
        </div>
        <div className={QuestionPageStyles.q_p_author_details}>
          <div className={QuestionPageStyles.q_p_author_details_image}>
            <Image
              src={questionData.author.image}
              height={"100%"}
              width={"100%"}
              layout="responsive"
            />
          </div>
          <h4 className={QuestionPageStyles.q_p_author_details_name}>
            {questionData.author.name}
          </h4>
        </div>
      </div>
      <form
        className={QuestionPageStyles.q_p_add_answer_wrapper}
        onSubmit={(e) => {
          e.preventDefault();
            getDoc(doc(db,"question",query)).then((snap)=>{
            const answer = snap.data().answer?(snap.data().answer):[];
            answer.push({ answer : TextRef.current.value , author : Session.user.name , image : Session.user.image})
         
              setDoc(doc(db,"question",query),{
                answer:answer
              },{merge:true}).then(()=>{
                TextRef.current.value = ""
                setAnswer(answer)
                dispatch(Updates())
              })
          })
          
        }}
      >
        <textarea
        required
          type="text"
          name="answer"
          ref = {TextRef}
          placeholder="Add your answer.."
          className={QuestionPageStyles.q_p_add_answer_input}
        />
        <button
          type="submit"
          className={QuestionPageStyles.q_p_add_answer_submit_button}
        >
          Add Answer
        </button>
      </form>
      <div className={QuestionPageStyles.q_p_answers_wrapper}>
        {Answer?.map((answerx, index) => (
          <div key={index} className={QuestionPageStyles.q_p_answer_wrapper}>
            <div className={QuestionPageStyles.q_p_answering_user_details}>
              <div className={QuestionPageStyles.q_p_answering_user_image}>
                <Image
                  src={answerx.image}
                  height={"100%"}
                  width={"100%"}
                  layout="responsive"
                  />
              </div>
              <h4 className={QuestionPageStyles.q_p_answering_user_name}>
                {answerx.author}
              </h4>
            </div>
            <p className={QuestionPageStyles.q_p_answer_text}>
              {answerx.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

}

export default QuestionPage;
