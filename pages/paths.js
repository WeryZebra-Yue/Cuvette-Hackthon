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
function learning({ Session }) {
  const [Paths, setData] = useState([]);
  let path = [];
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
  }, [UpdateState]);

  useEffect(() => {
  
  }, [Paths]);
  return (
    <div>
      {/* <AddButton Session={Session} /> */}
      <LearningPathsPage Session={Session} pathsData={Paths} />
    </div>
  );
}

export default learning;
export async function getServerSideProps(context) {
  const Session = await getSession(context);
  return {
    props: {
      Session,
    },
  };
}
