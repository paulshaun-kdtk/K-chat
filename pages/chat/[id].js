import Head from 'next/head'
import styled from 'styled-components'

import Sidebar from '@/components/Sidebar'
import {db,auth,} from '../../firebase'
import ChatPage from '../../components/ChatPage'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecEmail from '@/lib/getRecEmail'

function Chat({chat, messages}) {
const [user] = useAuthState(auth);



  return (
   <Container>
    <Head>
    <title>Kchat with: {getRecEmail(chat.users, user)}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/K.png" />
    </Head> 
    <Sidebar />
    <ChatContainer>
    <ChatPage chat={chat} messages={messages}/>
    </ChatContainer> 
    </Container>
  )
}

export default Chat

export async function  getServerSideProps(context){
 const ref = db.collection('chats').doc(context.query.id);   

 const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

 const messages = messagesRes.docs.map((doc) => ({
   id: doc.id,
   ...doc.data()
 })).map(messages => ({
    ...messages, 
    timestamp: messages.timestamp.toDate().getTime()
 }));

 //Chat

const chatRes = await ref.get();
const chat = {
  id: chatRes.id,
  ...chatRes.data()
}
// console.log(chat,messages)

return {
  props: {
    messages: JSON.stringify(messages),
    chat: chat
  }
}

}



//styles

const Container = styled.div`
display:flex;`

const ChatContainer = styled.div`
flex: 1;
overflow:scroll;
height: 100vh;
::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`