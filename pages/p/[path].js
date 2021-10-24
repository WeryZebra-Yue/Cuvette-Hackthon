import { get, ref } from "@firebase/database";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { query as Q, where } from "firebase/firestore";
import { getSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IndividualPathPage from "../../components/path_data/IndividualPathPage";
import { db, rdb } from "../../firebases";

function Path({ Session }) {
  const router = useRouter();
  const [query, setquery] = useState(null);
  const [Share, setShare] = useState(null);
  const [People, setPeople] = useState(null);
  const [data, setData] = useState(null);
  const ShareState = useSelector((state) => state.access);
  useEffect(() => {
    if (router.pathname != null) {
      setquery(router.query.path);

      getDoc(doc(db, "path", `${router.query.path}`)).then((snapshot) => {
        setData(snapshot.data());
      });
    }
  }, [router]);

  useEffect(() => {
    // console.log(data);
  }, [data]);
  useEffect(() => {
    if (query != null) {
      getDoc(doc(db, "path", query)).then((snapshot) => {
        snapshot.data()?.user?.forEach((mail) => {
          if (mail == Session?.user.email.split("@")[0]) {
            setShare(true);
          }
        });

        if (setShare == null) setShare(false);
      });
    }
  }, [ShareState, query]);
  useEffect(() => {
    console.log(People);
  }, [People]);
  useEffect(() => {
    loadPeopleData();
  }, [data]);

  async function loadPeopleData() {
    let list = [];
    if (data != null) {
      let uset = [data.email.slice()];

      console.log(data.user);
      for (let index = 0; index < data.user?.length; index++) {
        uset.push(data.user[index]);
      }
      console.log(uset.length);
      for (let i = 0; i < uset.length; i++) {
        const tempVar = await get(ref(rdb, "user/" + uset[i]));
        list.push(tempVar.val());
      }

      console.log(list);
      setPeople(list);
    }
  }

  return (
    <div>
      {data ? (
        <IndividualPathPage
          Session={Session}
          Querye={query}
          isShared={Share}
          // pathData = {data}
          pathDatax={data}
          people={People} //
          isOwner={Session?.user.email.split("@")[0] === query.split("-")[0]}
          //   Shared = {}
        />
      ) : null}
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

export default Path;
