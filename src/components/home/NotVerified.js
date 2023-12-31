import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { sendEmailVerification } from "firebase/auth"

const NotVerified = () =>{
    const [waitCount, setwaitCount] = useState(null)
    const verifyEmail = () =>{

        if(!waitCount){
            setwaitCount(30)
            console.log(auth.currentUser)
            sendEmailVerification(auth.currentUser)
        }
    }
    
    useEffect(()=>{
        if(waitCount > 0){
            setTimeout(()=>{setwaitCount(waitCount-1)}, 1000)

        } else {
            setwaitCount(null)
        }
    }, [waitCount])
    return (
        <div>
            <div style={{height: '6vh', borderBottom: '1px solid #ff8a8a', width: '50vw', marginLeft: '25vw' }}>
                    <p style={{color:"white"}}>Email is not Verified</p>
                
            </div>
            <div style={{marginTop: '30vh',width: "20vw", marginLeft: '40vw'}}>
                <div onClick={verifyEmail} style={{userSelect: 'none' ,padding: '5px',border: '1px solid white', borderRadius: '5px',backgroundColor: 'white', width: '12vw', marginLeft: '5vw'}}>Resend Verification Email</div>
                {waitCount? <p style={{color:"white"}}>wait: {waitCount} to resend email</p>: <div></div>}
            </div>
        </div>
    )
}

export default NotVerified