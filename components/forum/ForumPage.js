import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {  Modal } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import ForumPageStyles from "./ForumPage.module.css";

import searchIcon from "../../assets/forum/search.svg";

import Navbar from "../navbar";

import { db } from "../../firebases";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Updates } from "../../action";

function ForumPage({ Session }) {
  const router = useRouter();
  const TextRef = useRef(null);
  const Tag1Ref = useRef(null);
  const Tag2Ref = useRef(null);
  const Tag3Ref = useRef(null);
  const State = useSelector((state) => state.updates);
  const [forumData, setFourmData] = useState(null);
  const searchBarInputRef = React.useRef();
  const dispatch = useDispatch();
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = React.useState(false);
  useEffect(() => {
    if (searchBarInputRef?.current?.value != "") {
      getDocs(
        query(
          collection(db, "question"),
          where("tags", "array-contains", searchBarInputRef?.current.value)
        )
      ).then((snap) => {
        let list = [];

        snap.forEach((post) => {
          list.push({ ...post.data(), id: post.id });
        });
        console.log(list);
        setFourmData(list);
      });
    }
  }, [searchBarInputRef?.current?.value]);
  useEffect(() => {
    if (searchBarInputRef?.current?.value == "") {
      getDocs(collection(db, "question")).then((snap) => {
        let list = [];

        snap.forEach((post) => {
          list.push({ ...post.data(), id: post.id });
        });
        setFourmData(list);
      });
    }
  }, [State]);

  // console.log(forumData)

  useEffect(() => {
    if (router.query.q) {
     searchBarInputRef.current.value = router.query.q;
    }
  }, [router.query]);

  return (
    <div className={ForumPageStyles.forum_page_primary_wrapper}>
      <div
        className={ForumPageStyles.learning_path_create_button}
        onClick={() => {
          setIsDeletePopUpOpen(true);
        }}
      >
        New question
      </div>
      <Navbar userDetails={Session.user} />
      <div className={ForumPageStyles.forum_page_upper_sec_wrapper}>
        <form
          className={ForumPageStyles.forum_page_search_bar_wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(Updates());
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
            onChange={(e) => {
              searchBarInputRef.current.value = e.target.value.replace(" ", "");
              console.log(e.target.value);
            }}
            placeholder="Search something..."
            ref={searchBarInputRef}
          />
        </form>
      </div>
      <div className={ForumPageStyles.forum_page_questions_list_wrapper}>
        {forumData?.map((question, index) => (
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
      <Modal
        isOpen={isDeletePopUpOpen}
        toggle={() => {
          setIsDeletePopUpOpen(!isDeletePopUpOpen);
        }}
        centered={true}
        className={
          ForumPageStyles.forum_page_new_question_popup_primary_wrapper
        }
      >
        <form
          className={
            ForumPageStyles.forum_page_new_question_popup_secondary_wrapper
          }
          onSubmit={(e) => {
            e.preventDefault();
            console.log({
              question: TextRef.current.value,
              author: {
                name: Session.user.name,
                image: Session.user.image,
              },
              tags: [
                Tag1Ref.current.value,
                Tag2Ref.current.value,
                Tag3Ref.current.value,
              ],
            });
            addDoc(collection(db, "question"), {
              question: TextRef.current.value,
              author: {
                name: Session.user.name,
                image: Session.user.image,
              },
              tags: [
                Tag1Ref.current.value,
                Tag2Ref.current.value,
                Tag3Ref.current.value,
              ],
            }).then(() => {
              setIsDeletePopUpOpen(false);
            });
          }}
        >
          <div className={ForumPageStyles.forum_page_new_question_popup_header}>
            Question :
          </div>
          <input
            ref={TextRef}
            required
            type="text"
            placeholder={"Type to add question"}
            className={ForumPageStyles.forum_page_new_question_popup_input}
          />
          <div
            className={
              ForumPageStyles.forum_page_new_question_popup_header +
              " " +
              ForumPageStyles.forum_page_new_question_popup_header_tag
            }
          >
            Tags (3 Tags are required )
          </div>
          <input
            ref={Tag1Ref}
            required
            type="text"
           
            placeholder="#"
            className={ForumPageStyles.forum_page_new_question_popup_input}
          />
          <input
            ref={Tag2Ref}
            required
            type="text"
            
            placeholder="#"
            className={ForumPageStyles.forum_page_new_question_popup_input}
          />
          <input
            ref={Tag3Ref}
            required
            type="text"
           
            placeholder="#"
            className={ForumPageStyles.forum_page_new_question_popup_input}
          />
          <button
            type="submit"
            className={
              ForumPageStyles.forum_page_new_question_popup_submit_button
            }
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ForumPage;
