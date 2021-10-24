import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import reactDom from "react-dom";

import ForumPageStyles from "./ForumPage.module.css";

import searchIcon from "../../assets/forum/search.svg";

import Navbar from "../navbar";

function ForumPage({
  Session,
  forumData = Array(20).fill({
    id: 0,
    tags: ["Web dev", "MERN", "Mongo"],
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi malesuada faucibus duis. Bibendum vulputate felis nibh quam dui lacus tincidunt ac risus. Suspendisse consequat orci, ",
  }),
}) {
  const router = useRouter();

  const searchBarInputRef = React.useRef();

  useEffect(() => {
    if (router.query.q) {
      reactDom.findDOMNode(searchBarInputRef.current).value = router.query.q;
    }
  }, [router.query]);

  return (
    <div className={ForumPageStyles.forum_page_primary_wrapper}>
      <Navbar userDetails={Session.user} />
      <div className={ForumPageStyles.forum_page_upper_sec_wrapper}>
        <form
          className={ForumPageStyles.forum_page_search_bar_wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            e.target.blur();
            router.push(`/forum?q=${e.target.elements[0].value}`);
          }}
        >
          <div
            className={ForumPageStyles.forum_page_search_bar_form_search_icon}
          >
            <Image src={searchIcon} layout="responsive" />
          </div>
          <input
            className={ForumPageStyles.forum_page_search_bar_input}
            type="text"
            placeholder="Search something..."
            ref={searchBarInputRef}
          />
        </form>
      </div>
      <div className={ForumPageStyles.forum_page_questions_list_wrapper}>
        {forumData.map((question, index) => (
          <div
            className={ForumPageStyles.forum_page_question_wrapper}
            key={index}
          >
            <Link href={`/f/${question.id}`}>
              <h5 className={ForumPageStyles.forum_page_question_title}>
                {question.question}
              </h5>
            </Link>
            <div className={ForumPageStyles.forum_page_question_tags_wrapper}>
              {question.tags.map((tag, index) => (
                <Link href={`/forum/?q=${tag}`} key={index}>
                  <div
                    className={ForumPageStyles.forum_page_question_tag}
                    key={index}
                  >
                    {tag}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumPage;
