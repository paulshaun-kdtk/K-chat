import styled from "styled-components"
import { Avatar} from "@mui/material"; 
import SearchIcon from '@mui/icons-material/Search'
import Button from "@mui/material/Button";
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from "./Chat";

//end imports

function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatSnapShot] = useCollection(userChatRef)
   
    const createChat = () => {
        const input = prompt('Please enter the email of the client you want to chat with?');
        if (!input) return null    
        

        if(EmailValidator.validate(input)&&
        !chatAlreadyExists(input)&&
        input !== user.email){
            //chats from DB chat collection
        db.collection('chats').add({
           users: [user.email, input],
        });
        }
    };

    const chatAlreadyExists = (recepientEmail) => {
        !!chatSnapShot?.docs.find((chat) => chat.data().users.find((user)=>
         user === recepientEmail)?.length > 0);
    }
   
    
    //app


  return (
    <Container>
    <Header>
    <UserAvatar src={user?.photoURL} onClick={()=>{
       auth.signOut()
    }} /> <Signout>signout</Signout>
    </Header>

    
    <SideBarButton onClick={createChat} style={{color:'#0a7e8c'}}>
        NEW CONVERSATION
    </SideBarButton>

    <Search>    
        <SearchIcon />
        <SearchInput placeholder="Search by ID"/>
    </Search>

    {/* chats */}

{chatSnapShot?.docs.map((chat)=>(
<Chat key={chat.id} id={chat.id} users={chat.data().users}
/>
    ))}

   </Container>
  )
}

export default Sidebar


//styles

const Container = styled.div`
flex:0.45;
border-right: solid 1px whitesmoke;
height:1000px;
width:250px;
margin-left:-15px;
margin-top:-7px;
overflow-y: scroll;
::-webkit-scrollbar {
    display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;
background-color: #889FA5;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
font-size:21px;
`;


const Header = styled.div`
display: flex;
position: sticky;
background-color: #889FA5;
justify-content: space-between;
align-items: center;
padding: 15px;
`;

const UserAvatar = styled(Avatar)`
    margin-top:3px;
  margin-bottom:7px;
  margin-right: 10px;
  cursor: pointer;
  
  :hover {
    opacity: 0.6;
  }
  
  `;

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
flex: 1;
`;

const SideBarButton = styled(Button)`
width: 100%; 
background-color: transparent;
&&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
};
`;

const Signout = styled.span`
color:gray;
padding:10px;
font-size:9px;
font-weight: 300;
position:absolute;
top:0;
text-align:left;
left:0;`

//end styles
