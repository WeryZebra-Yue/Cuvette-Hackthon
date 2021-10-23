import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'



export default function Home({Session}) {
 
   if(!Session)return(
   <Link href="/auth/signin">Sign In</Link>
   )
     
 
  return (
    <div>
    Home Page 
    <div>Profile Name : {Session.user.name}</div> 
     <div>Profile Image : </div>
     <Image src={Session.user.image} height={40} width={40} />
    </div>
  )
}
export async function getServerSideProps(context){
  const Session = await getSession(context) || null;
  return {
    props:{Session }
  }
}

