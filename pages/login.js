import { provider, auth } from '../firebase';
//end imports


function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

  return (
    
   <center style={{ display: "grid", placeItems:"center", height:"100vh" }} > 
   
   
   <div style={{backgroundImage:"url('/K.png')", color:"green", backdropFilter:"blur('15px')"}}> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSFGahd1DnpAciRt-BSO-nHp4LH4RnrFKmrQ&usqp=CAU" style={{width:"550px"}}/>
    <p style={{fontSize:"15px", fontFamily:"sans" }}>
      login to proceed to <span style={{color:"blue"}}>
        Kchat </span>
    </p>
    </div>
      <button onClick={signIn} variant='outlined' style={{
  color: "#fff",
  background: "linear-gradient(to bottom, #4CAF50, #2E8B57)",
  padding: "15px",
  border:"none",
  borderRadius: "20px",
  fontSize: "15px",
  marginBottom: "90px",
  cursor: "pointer",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
}}>Login with google</button>
    

    <h6 style={{color:"lightblue", marginLeft:"1190px", marginBottom: "-50px",}}>© Oacey 2023. All rights reserved</h6>
      </center>
   
   
  )
}

export default Login

//styles 




