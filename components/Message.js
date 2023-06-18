import { useAuthState } from 'react-firebase-hooks/auth';
import styled from  'styled-components'
import {auth} from '../firebase'
import moment from 'moment'

//end imports

function Message({user, message}) {
  const [userLogged] = useAuthState(auth)

  const MessageType = user === userLogged.email ? Sender : Receiver;

  return (
   <Container>
    <MessageType>{message.message}
    <Timestamp>
    {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
    </Timestamp>
    </MessageType>
   </Container>
  )
}

export default Message;

const Container = styled.div``

const MessageEl = styled.p`
width: fit-content;
padding: 15px;
margin:10px;
min-width: 60px;
padding-bottom: 26px;
position:relative;
text-align: right;
font-size: 18px;
`

const Sender = styled(MessageEl)`
margin-left:auto;
margin-right:50px;
background-color: #005A34;
color: white;
font-family: cursive, Verdana;
text-align: left;
max-width: 400px;
border-radius: 20px 20px 0 20px;
`
const Receiver = styled(MessageEl)`
background-color: #DADDE2;
text-align: left;
margin-left: 60px;
border-radius: 20px 20px 20px 0px;
max-width: 400px;
`

const Timestamp = styled.span`
color:#0a7e8c;
padding:10px;
font-size:9px;
position:absolute;
bottom:0;
text-align:right;
right:0;`