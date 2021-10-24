import { getSession } from "next-auth/react";
import ForumPage from "./../components/forum/ForumPage";

export default function forum({ Session }) {
  return (
    <>
      <ForumPage Session={Session} />
    </>
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
