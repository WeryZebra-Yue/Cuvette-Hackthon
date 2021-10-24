import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { getSession, signOut, useSession,getProviders} from 'next-auth/react'
import Link from 'next/link'
import SignButton from '../components/SignButton';
import LandingPage from './../components/landing/Index';
import { useEffect } from 'react';
import { rdb } from '../firebases';
import { ref, set } from '@firebase/database';
import Navbar from '../components/navbar';


export default function Home({Session}) {
  
  console.log(Session)
   if(!Session)return(
     <LandingPage/>
  );
   useEffect(()=>{
     set(ref(rdb,'user/'+ Session.user.email.split('@')[0]),{
      username : Session.user.name,
      image : Session.user.image 
    })
   })
     
 
  return (
    <div>
      <Navbar/>
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

