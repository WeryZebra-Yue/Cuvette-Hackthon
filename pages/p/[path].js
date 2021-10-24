import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { getSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import IndividualPathPage from "../../components/path_data/IndividualPathPage";
import { db } from "../../firebases";

function path({ Session }) {
  const router = useRouter();
  const [query, setquery] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (router.pathname != null) {
      setquery(router.query.path);
      getDoc(doc(db, "path", `${router.query.path}`)).then((snapshot) => {
        setData(snapshot.data());
      });
    }
  }, [router]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {data ? (
        <IndividualPathPage
          Session={Session}
          isOwner={Session.user.email.split("@")[0] === query.split("-")[0]}
        />
      ) : null}
    </div>
  );
}
export async function getServerSideProps(context) {
  const Session = await getSession(context);
  return {
    props: {
      Session,
    },
  };
}
export default path;
