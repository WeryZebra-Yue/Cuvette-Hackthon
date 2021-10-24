import { getSession } from "next-auth/react";
import ForumPage from "./../components/forum/";

export default function forum({ Session }) {
  return (
    <>
      <ForumPage Session={Session} />
    </>
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
