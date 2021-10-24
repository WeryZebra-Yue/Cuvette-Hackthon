import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { getSession, signOut, useSession,getProviders} from 'next-auth/react'
import Link from 'next/link'
import SignButton from '../components/SignButton';
import LandingPage from './../components/landing/Index';


export default function Home({Session}) {
  
  console.log(Session)
   if(!Session)return(
     <LandingPage/>
  );
   
     
 
  return (
    <div>
    Home Page 
    <div>Profile Name : {Session.user.name}</div> 
     <div>Profile Image : </div>
     <Image src={Session.user.image} height={40} width={40} />
     <div onClick={signOut}>Sign out</div>
    </div>
  )
}
export async function getServerSideProps(context){
  const Session = await getSession(context);
  return {
    props:{
      Session
    }
  }
} 

