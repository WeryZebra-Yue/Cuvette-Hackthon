import React from "react";
import Image from "next/image";
import Link from "next/link";

import QuestionPageStyles from "./QuestionPage.module.css";

import PrimaryNavbar from "../navbar/Navbar";

function QuestionPage({
  Session,
  questionData = {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi malesuada faucibus duis. Bibendum vulputate felis nibh quam dui lacus tincidunt ac risus. Suspendisse consequat orci, ",
    tags: ["Web Dev", "MERN", "Next.js", "Firebase"],
    author: {
      name: "John Doe",
      image: Session.user.image,
    },
    answers: Array(10).fill({
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris elementum ut parturient. Fringilla vulputate dui at ut sed. Vivamus sollicitudin leo bibendum dolor nunc risus, venenatis id. Imperdiet nibh habitasse nunc tortor consequat bibendum duis eget. \n Amet molestie odio tortor facilisi pellentesque in eget lobortis. Sed malesuada sed sed mauris proin sed purus nascetur ut. Lectus interdum tellus urna aliquam facilisi. Et egestas cursus vel pellentesque. Congue amet consectetur integer sed pulvinar in sollicitudin senectus et.",
      user: {
        name: "John Doe",
        image: Session.user.image,
      },
    }),
  },
}) {
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
          let answer = e.target.answer.value;
          console.log(answer);
        }}
      >
        <textarea
          type="text"
          name="answer"
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
        {questionData.answers.map((answer, index) => (
          <div key={index} className={QuestionPageStyles.q_p_answer_wrapper}>
            <div className={QuestionPageStyles.q_p_answering_user_details}>
              <div className={QuestionPageStyles.q_p_answering_user_image}>
                <Image
                  src={answer.user.image}
                  height={"100%"}
                  width={"100%"}
                  layout="responsive"
                />
              </div>
              <h4 className={QuestionPageStyles.q_p_answering_user_name}>
                {answer.user.name}
              </h4>
            </div>
            <p className={QuestionPageStyles.q_p_answer_text}>
              {answer.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionPage;
