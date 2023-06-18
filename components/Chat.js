import styled from 'styled-components'
import {Alert, Avatar} from '@mui/material'
//import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import getRecEmail from '@/lib/getRecEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function Chat({id, users}) {

        const router = useRouter(); 
        const [user] = useAuthState(auth);
        const [recepientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecEmail(users, user)))

        const enterChat = () => {
            router.push(`/chat/${id}`)
        }


        const recepient = recepientSnapshot?.docs?.[0]?.data();
        const recepientEmail = getRecEmail(users, user);



        return  (
        <Container onClick={enterChat}>

        {recepient ? (
            <UserAvatar src={recepient?.photoURL} />
        ) : (
            // <UserAvatar>{recepientEmail[0]}</UserAvatar>
            <UserAvatar src='/Design.png'/>
        )}

        <h6>     {recepientEmail}  </h6>

        </Container>
    )

}

export default Chat


//styles

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
:hover{
    background-color: aliceblue;
}
`

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right:15px;
`
