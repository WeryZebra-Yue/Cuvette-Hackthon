import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { getSession, signOut, useSession,getProviders} from 'next-auth/react'
import Link from 'next/link'
import SignButton from '../components/SignButton';
import LandingPage from './../components/landing/Index';
import { useEffect, useState } from 'react';
import { rdb } from '../firebases';
import { ref, set } from '@firebase/database';
import Navbar from '../components/navbar';


export default function Home({Session}) {
  const [fact,setText] = useState("")
   
  console.log(Session)
  if(!Session)return(
    <LandingPage/>
    );
    
   useEffect(()=>{
     set(ref(rdb,'user/'+ Session.user.email.split('@')[0]),{
      username : Session.user.name,
      image : Session.user.image 
    })
    userAction()
   
   },[])
      const userAction = async () => {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const myJson = await response.json(); //extract JSON from the http response
      setText(myJson.text)
    }
 
  return (
    <div>
      <Navbar/>
    Home Page 
    <div>Profile Name : {Session.user.name}</div> 
    
     <div>Profile Image : </div>
     <Image src={Session.user.image} height={40} width={40} />
     <div onClick={signOut}>Sign out</div>
     {fact &&
      <div>{fact}</div>
      
    }
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

