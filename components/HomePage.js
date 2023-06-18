import styled from "styled-components"

function HomePage() {
  return (
    <center >
    <Container>
      <h1>
        Please Note this application is still in a development stage
        
      </h1>

      <h4>
        click on a chat to start a new Conversation
      </h4>

      <h6>
        and after that be patient 🥱
      </h6>
    </Container>
   </center>
  )
}

export default HomePage

//styles

const Container = styled.div`
display:flex;
flex-direction:column;
border-right: solid 1px whitesmoke;
height:300px;
margin-left:150px;
margin-top:-700px;
color: gray;

> h4{
    color: green;
}

> h6 {
    color: orange;
}
`