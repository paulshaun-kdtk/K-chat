import styled from "styled-components"
import {auth} from '../firebase'
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import Avatar  from "@mui/material/Avatar"
import { useCollection } from "react-firebase-hooks/firestore"
import {db} from '../firebase'
import { InsertEmoticon } from "@mui/icons-material"
import Message from './Message'
import { useState,useRef } from "react" 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import getRecEmail from "@/lib/getRecEmail"
import TimeAgo from "timeago-react"
//end imports 

function ChatPage({chat, messages}) {

  const endOfMSGref = useRef(null)
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth)
  const router = useRouter()  
  const [messagesSnapshot] = useCollection(
    db.collection('chats').doc(router.query.id).collection('messages')
    .orderBy('timestamp', 'asc')
  );


  const [recepientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecEmail(chat.users, user))
  )



  const showMessages = () => {

    if(messagesSnapshot){
    return messagesSnapshot.docs.map((message) => (
      
      <Message key={message.id} 
      user={message.data().user}
      message={{...message.data(), 
        timestamp: message.data().timestamp?.toDate().getTime(),
      } }
     />

    )); 
  } else{
    return JSON.parse(messages).map(message => (
              <Message key={message.id} user={message.user} message={message} />
    ))
  }
      }
      
      const scrollToBtm = () => {
          endOfMSGref.current.scrollIntoView({ behavior: "smooth", block:'start' });
      }


      const sendMessage = (e) => {
        e.preventDefault();

        //update the last seen
        db.collection("users").doc(user.id).set({
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});
      
        
        db.collection('chats').doc(router.query.id).collection('messages').add({
                  user: user.email,
                  message: input,
                  photoURL: user.photoURL,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                setInput('');
                scrollToBtm();
      };

  const recipient = recepientSnapshot?.docs?.[0]?.data();    
  const recipientEmail = getRecEmail(chat.users, user);    
  const toHome = () => router.push(`/`)

return (

 <Container>
   
    <Header>
      {
        recipient ? (<Avatar src='/K.png' />) : (<Avatar>{recipientEmail[0]}</Avatar>)
      }
      <HeaderInfo>
    <RecMailSpan> {recipientEmail} </RecMailSpan>  

      <Home onClick={toHome}>Exit chat</Home>
      {
        recepientSnapshot? (
        <h6> online: {' '} 
        {recipient?.lastSeen?.toDate() ? (
        <TimeAgo datetime={recipient.lastSeen?.toDate()} />
              ):<span>never <span style={{color:'orange', fontSize:"12px", fontWeight:"200", }}>  'please ensure that the email you entered belongs to a person registered to this application' </span> </span>}
              </h6>
              ): (
                <p>loading status...</p>
              )
            }
    </HeaderInfo>
    </Header>


    <MessageContainer>
      {showMessages()}
      <EndOfMessage ref={endOfMSGref}/>
    </MessageContainer>




    <InputContainer>
    <InsertEmoticon />
    <Input value={input} onChange={e => setInput(e.target.value)} />
    <button hidden disabled={!input} type='submit' onClick={sendMessage} >Send Message</button>
    </InputContainer>
  
  </Container>
 ) 
}

export default ChatPage


//styles
const Home = styled.button`
border:none;
background-color: transparent;
backdrop-filter: blur(3px);
color: #fff;
:hover {
  background-color: red;
};
cursor:pointer;
margin-left:460px;
margin-bottom: 20px;
`


const Container = styled.div`
flex:0.45;
margin-top:-10px;
overflow-y: scroll;
::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: fixed;
bottom:10px;
background-color: rgba(205, 202, 221,0.5);
z-index:100;
width:800px;
left:597px;
z-index:1;
backdrop-filter: blur(6px);
`




const Input = styled.input`
flex:1;
outline:0;
border: none;
border-radius: 15px;
background-color: rgba(218, 221, 226, 0.8);
backdrop-filter:blur(8px);
padding: 15px;
color: green;
backdrop-filter: blur(6px);
`

const Header = styled.div`
width:800px;
height:85px;
background-color:rgb(136, 159, 165);
/* backdrop-filter: blur(6px); */
color:black;
display: flex;
position:sticky;
align-items:last baseline;
border-right: 1px solid #0a7e8c;
justify-content:bottom;
`

const HeaderInfo = styled.div`
margin-left: 15px;
flex: 1;

> h3 {
  margin-bottom:3px;
}

> h6 {
  top:0;
  font-size:14;
  color: #0a7e8c;
  font-weight:1800px;
  margin:10px 0 10px 0;
}
`

const MessageContainer = styled.div`
  /* padding: 30px;
  background-image: url("C:/Users/user/Downloads/K.png"); */
  background-color:rgb(255, 255, 255) ;
  min-height: 90vh;
  max-height: 100vh;
`;

const EndOfMessage = styled.div`
margin-bottom:50px;
`

const RecMailSpan = styled.span`
color: #0a7e8c;
font-family: 'Lucida Sans', Lucida Sans Regular, Lucida Grande,;
font-size:  20px;
font-weight: 400;
`

