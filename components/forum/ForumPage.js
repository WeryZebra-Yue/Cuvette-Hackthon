import React, { useEffect , useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardHeader, Modal } from "reactstrap";

import ForumPageStyles from "./ForumPage.module.css";

import searchIcon from "../../assets/forum/search.svg";

import Navbar from "../navbar";
import { db } from "../../firebases";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Updates } from "../../action";

function ForumPage({
  Session,
    
}) {

  const router = useRouter();
  const TextRef = useRef(null);
  const Tag1Ref = useRef(null);
  const Tag2Ref = useRef(null);
  const Tag3Ref = useRef(null);
  const State = useSelector(state=>state.updates)
  const [forumData,setFourmData] = useState(null);
  const searchBarInputRef = React.useRef();
  const dispatch = useDispatch()
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = React.useState(false);
  useEffect(()=>{
    
    getDocs(query(collection(db,"question"),where("tags","array-contains",searchBarInputRef?.current.value))).then((snap)=>{
      let list = []
      
      snap.forEach((post)=>{
       list.push(post.data())
      })
      console.log(list)
      setFourmData(list)
   })
   
 
  },[searchBarInputRef?.current?.value])
  useEffect(()=>{
    if(searchBarInputRef?.current?.value==''){
      getDocs(collection(db,"question")).then((snap)=>{
        let list = []
        
        snap.forEach((post)=>{
         list.push(post.data())
       
        })
        setFourmData(list)
     })
    }
  
    
   
  },[State,searchBarInputRef?.current?.value])

  // console.log(forumData)

  useEffect(() => {
    if (router.query.q) {
      reactDom.findDOMNode(searchBarInputRef.current).value = router.query.q;
    }
  }, [router.query]);

  return (
    <div className={ForumPageStyles.forum_page_primary_wrapper}>
       <div
          className={ForumPageStyles.learning_path_create_button}
          onClick={() => {
            setIsDeletePopUpOpen(true);
          }}
        >New question</div>
      <Navbar userDetails={Session.user} />
      <div className={ForumPageStyles.forum_page_upper_sec_wrapper}>
        <form
          className={ForumPageStyles.forum_page_search_bar_wrapper}
          onSubmit={(e) => {

            e.preventDefault();
            dispatch(Updates())
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
            onChange={(e)=>{
             searchBarInputRef.current.value = e.target.value.replace(' ','')
             console.log(e.target.value )
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
      <Modal isOpen={isDeletePopUpOpen} toggle={() =>{
          setIsDeletePopUpOpen(!isDeletePopUpOpen)
      }}>
      <div className=" modal-body p-0">
        <Card className=" bg-secondary shadow border-0">
          <CardHeader className=" bg-white pb-5">
            <div className=" text-muted text-center mb-3 mt-3">
              <form onSubmit={(e)=>{
                e.preventDefault()
                console.log(
                  {
                    question : TextRef.current.value,
                    author :{ name : Session.user.name,
                    image : Session.user.image},
                    tags : [Tag1Ref.current.value,Tag2Ref.current.value,Tag3Ref.current.value]
                  }
              )
                addDoc(collection(db,"question"),{
                  question : TextRef.current.value,
                  author :{ name : Session.user.name,
                  image : Session.user.image},
                  tags : [Tag1Ref.current.value,Tag2Ref.current.value,Tag3Ref.current.value]
            
                }).then(()=>{
                  setIsDeletePopUpOpen(false)
                })
              }}>
               <div>Question : <input ref={TextRef} required   type="text" placeholder={'Type to add question'}/></div>
               <div>Tags (3 Tags are required ):   <input ref={Tag1Ref} required   type="text" className="m-1" placeholder="#"/>
               <input ref={Tag2Ref} required   type="text"  className="m-1" placeholder="#"/>
               <input ref={Tag3Ref} required   type="text"  className="m-1" placeholder="#"/>
             
               <br/>  
               <button type="submit">Add</button>
               </div>
               </form>

             
            </div>
          </CardHeader>
        </Card>
      </div>
    </Modal>
    </div>
  );
}

export default ForumPage;
