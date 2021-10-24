import { getSession, useSession } from "next-auth/react";
import AddButton from "../components/AddButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { rdb, db } from "../firebases";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  QuerySnapshot,
  where,
} from "@firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { query } from "@firebase/database";
import { useSelector } from "react-redux";
import LearningPathsPage from "../components/learning_path/index";
function Paths({ Session }) {
  const [Paths, setData] = useState([]);
  const [SharedPaths, setShared] = useState([]);
  let path = [];
  let Sharedpath = [];
  const UpdateState = useSelector((state) => state.update);

  useEffect(() => {
    const q = getDocs(
      query(
        collection(db, "path"),
        where("email", "==", Session.user.email.split("@")[0])
      )
    )
      .then((querySnapshot) => {
        querySnapshot.forEach((Data) => path.push(Data.data()));
      })
      .then(() => {
        setData(path);
      });
      const Shared = getDocs(
        query(
          collection(db, "path"),
          where("user", "array-contains", Session.user.email.split("@")[0])
        )
      )
        .then((querySnapshot) => {
          querySnapshot.forEach((Data) => Sharedpath.push(Data.data()));
        })
        .then(() => {
          setShared(Sharedpath);
        });
  }, [UpdateState]);

  useEffect(() => {
  
  }, [Paths]);
  return (
    <div>
      {/* <AddButton Session={Session} /> */}
      {
        Session &&
        <LearningPathsPage Session={Session} pathsData={Paths} SharedPaths={SharedPaths}/>

      }
    </div>
  );
}

export default Paths;
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
