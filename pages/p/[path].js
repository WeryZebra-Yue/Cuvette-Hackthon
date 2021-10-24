
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { db } from "../../firebases";

function path() {
    const router = useRouter();
    const [query,setquery] = useState(null); 
    const [data,setData] = useState(null); 
    useEffect(() => {
        if(router.pathname!=null){
            setquery(router.query.path)
            getDoc(doc(db, "path" , `${router.query.path}`)).then((snapshot)=>{
               setData (snapshot.data());
              
            })
        }
       
      
       
    }, [router])
   
    return (
        <div>
            {
                data &&
                <div>{data.Title}</div> 
            }
        </div>
    )
}

export default path
