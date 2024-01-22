import React, {useState, useRef} from "react";
import styled from "styled-components";
//import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import YoutubeDetailHook from "./Utils/YoutubeAPIFunctions";
 
const Container = styled.div`
    width : 100vw;
    height : fit-content;
    display : flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;

`;

const AppDiv = styled.div`
  &.appDiv{
      width : 70%;
      height : 0;
      background-color : #e0e0e0;
      display : flex;
      flex-direction : column;
      align-items: center;
    }

    &.appDivFit{
      width : 70%;
      height : fit-content;
      background-color : #e0e0e0;
      display : flex;
      flex-direction : column;
      align-items: center;
    }
`;

const AppTitle = styled.h1`
  width : fit-content;
  height : fit-content;
  margin : 2% auto 2% auto;
`;

const ApiKeyDiv = styled.div`
  height : fit-content;
  width : 50%;
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`;

const ApiKeyInput = styled.input`
  height : 3vh;
  width : 50%;
  text-align: center;
  font-size : 1.1em;
  margin-bottom : 4%;
`;

const ApiKeySubmitButton = styled.input`
  height : 4vh;
  width : 20%;
  font-size: 1.1em;
  margin-bottom : 4%;
`;

const InstructionsDiv = styled.div`
  width : 100%;
  display : flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
`;

const InstructionsTitle = styled.h1`
`;

const InstructionsSpan = styled.span`
  text-align: center;
  line-height: 300%;
`;

const InputDiv = styled.div`
  height : fit-content;
  display: flex;
  flex-direction : row;
  justify-content: center;
  align-items: center;
  margin-bottom : 2%;
`;

const StreamerNameInput = styled.input`
  height : fit-content;
  font-size : 1.5em;
  margin-right : 2%;
`;

const StreamerChannelInput = styled.input`
  height : fit-content;
  font-size : 1.5em;
`;

const AddStreamerButton = styled.button`
  width: 40%;
  height : 3em;
  font-size : 1.2em;
  margin-bottom : 2%;
  cursor : pointer;
  background-color: #80808088;
  border : 2px solid #8f8f8f;

  &:hover {
    opacity : 0.8;
  }
`;

//each row will have : 1. streamer picture, 2. status of streamer, 3. link to their stream, 4. edit button, 5. delete button
const StreamerRow = styled.div`
  width : 80%;
  height : 4em;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color : #cccccce8;
  margin-top : 1%;
  margin-bottom : 1%;
`;

const StreamerImgDiv = styled.div`
  width : 15%;
  height : 90%;
  display : flex;
  justify-content: center;
`;

const StreamerImg = styled.img`
  width: fit-content;
  height : 100%;
  margin : auto 0;
`;

const StreamerName = styled.span`
  width : 30%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StreamerStatus = styled.a`
  width : 30%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color : black;
  text-underline-offset: 2px;
`;

const ButtonDiv = styled.div`
  width : 30%;
  display: flex;
  flex-direction : row;
  justify-content: space-evenly;
  align-items: center;
`;

/*const EditButton = styled(EditOutlinedIcon)`
  &&{
    height : 3vh;
    width : fit-content;
    margin : auto 0;

    &:hover {
      cursor : pointer;
    }
  }
`;*/

const CancelButton = styled(CancelOutlinedIcon)`
  &&{
    height : 3vh;
    width : fit-content;
    margin : auto 0;

    &:hover {
      cursor : pointer;
    }
  }
`;

function App() {

  const [streamerCount, setStreamerCount] = useState(0); //keeps track of # of rows
  const [streamerList, setStreamerList] = useState([]); //hold information of each row
  const [nameInput, setNameInput] = useState(''); //holds the name of streamer that user enters
  const [streamerChannelInput, setStreamerChannelInput] = useState(''); //holds name of youtube channel's handle (ex. @irys in https://youtube.com/@irys)
  const [apiKey, setAPIKey] = useState(''); //stores the user's API key

  const inputRef = useRef(null); //used to reference the api key input to get its value

  const [createNewStreamer, deleteRow, handleSubmit] = YoutubeDetailHook(); //custom hook functions

  //wrapper function for executing createNewStreamer function in our custom hook and setting our state values.
  const handleCreateNewStreamer = async () => {
    const streamerValues = await createNewStreamer(nameInput, streamerChannelInput, apiKey, streamerCount, streamerList); //returns an array that contains streamerCount and streamerList after running createNewStreamer() and the promise resolves.
    
    //set our new streamer count 
    setStreamerCount(streamerValues[0]); 

    //set our new streamer list
    setStreamerList(streamerValues[1]);
      
    //reset nameInput
    setNameInput('');
            
    //reset streamerChannelInput
    setStreamerChannelInput('');
  };

  //wrapper function for executing deleteRow function from custom hook and setting our state values.
  const handleDeleteRow = (id) => {
    //sets new streamer list and streamer count from array return from deleteRow function in custom hook
    const deleteRowValues = deleteRow(id, streamerList, streamerCount);

    //set new streamer count
    setStreamerCount(deleteRowValues[0]);

    //set new streamer list
    setStreamerList(deleteRowValues[1]);
  };

  return (
    <Container className={streamerCount < 15? "containerDiv" : "containerDivFit"}>
        <AppTitle>Are They Live?</AppTitle>

        <ApiKeyDiv style={apiKey.length > 0 ? {display : "none"} : {display : "flex"}}>
          <ApiKeyInput type="text" placeholder="Please enter your YouTube API key." ref={inputRef}/>
          <ApiKeySubmitButton type="button" value="Submit" onClick={() => {setAPIKey(handleSubmit(inputRef));}}/>
          <InstructionsDiv>
            <InstructionsTitle>Instructions for creating your YouTube API Key (PLEASE READ!)</InstructionsTitle>
            <InstructionsSpan>
              <h2 style={{color : "red"}}>If you enter an invalid API Key, please restart the application by refreshing the page.</h2>
              1. Create a google account if you don't have one at <a href="https://accounts.google.com/signin" target="_blank" rel="noreferrer">the google signin page.</a><br/>
              2. Login to your google account and go to the <a href="https://console.developers.google.com/" target="_blank" rel="noreferrer">Google Developer's Console.</a><br/>
              3. Click on "Create Project". <br/>
              4. Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">API console</a> and select the project you just created from the top left drop down menu.<br/>
              5. In the search bar at the top, search for "Youtube Data API v3", visit the page, and then click "enable".<br/>
              6. Next, click on "Credentials" on the left hand menu.<br/>
              7. Click "Create Credentials" and then click on "API Key".<br/>
              8. Copy your API key and paste it into the input box of the app. Then click submit. <br/>
              9. Congrats! You can now keep track of your favorite youtube streamers to see if they're currently live streaming. <br/>
              <h1 style={{color : "orange"}}>Keep this API key somewhere safe! You can use it as many times as you want!</h1>
            </InstructionsSpan>
          </InstructionsDiv>
        </ApiKeyDiv>

        <InputDiv style={apiKey.length === 0 ? {display : "none"} : {display : "flex"}}>
          <StreamerNameInput type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Name"/>
          <StreamerChannelInput type="text" value={streamerChannelInput} onChange={(e) => setStreamerChannelInput(e.target.value)} placeholder="Youtube Channel ID"/>
        </InputDiv>

        <AddStreamerButton style={apiKey.length === 0 ? {display : "none"} : {display : "initial"}} onClick={() => 
          {
            if(nameInput.length > 0 && streamerChannelInput.length > 0) 
              {handleCreateNewStreamer()}             
            else {
              alert("Please input the streamer's name and their YouTube channel ID.")
              return false;
            }
          }}>
          Add Streamer
          </AddStreamerButton> 

      <AppDiv className={streamerCount < 1? "appDiv" : "appDivFit"}>
        {
          (streamerList && streamerList.length > 0) || apiKey.length === 0 ? '' : 'Nobody is live... Add some streamers to track them!'
        }
        {
          streamerList && streamerList.map((item) => {
            return(
              <StreamerRow key={item.id}>
                <StreamerImgDiv>
                  <StreamerImg src={item.imgLink}/>
                </StreamerImgDiv>
                <StreamerName>{item.name}</StreamerName>
                <StreamerStatus href={item.link} target="_blank">{item.streamStatus}</StreamerStatus>         
                <ButtonDiv>
                  <CancelButton onClick={() => handleDeleteRow(item.id)}/>
                </ButtonDiv>     
              </StreamerRow>)
          })
        }
      </AppDiv>
    </Container>
  );
}

export default App;
