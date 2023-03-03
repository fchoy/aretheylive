import React, {useState, useRef} from "react";
import styled from "styled-components";
//import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
 
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
`;

const StreamerImg = styled.img`
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

  //adds a new row
  const createNewStreamer = async (name, streamerChannelID, apiKey) => {

    //if we enter the channel ID starting with '@', then the newStreamer's link attribute start with "https://youtube.com/"
      if(String(streamerChannelID).indexOf(0) === '@'){
        //access streaming data that we get from fetch request, if json.pageInfo.totalResults === 1, then they are currently live
        getData(streamerChannelID, apiKey).then(
          (json) => {
            
            console.log(json); 

            let newStreamer;
            //create new streamer object that contains information to display based on stream status
            if(json.pageInfo.totalResults === 1){
              newStreamer = {id : Math.random(), name : name, streamStatus : "Currently Streaming", link: "https://youtube.com/".concat(streamerChannelID, "/live")};
            }
            else if(json.pageInfo.totalResults === 0){
              newStreamer = {id : Math.random(), name : name, streamStatus : "Not Currently Streaming", link: "https://youtube.com/".concat(streamerChannelID, "/live")};
            }
            else{
              throw new Error("Could not find any streaming information for this channel");
            }

            //increment streamer count by 1
            setStreamerCount((prevCount) => prevCount + 1);

            //add to list of streamers
            setStreamerList([...streamerList, newStreamer]);

            //reset nameInput
            setNameInput('');

            //reset streamerChannelInput
            setStreamerChannelInput('');
          }
        ).catch((err) => {
          alert(err);
        });
      }

      //if channel id does not begin with '@', then the newStreamer's link attribute start with "https://youtube.com/channel/"
      else{
        //access streaming data that we get from fetch request, if json.pageInfo.totalResults === 1, then they are currently live
        getData(streamerChannelID, apiKey).then(
          (json) => {
            
            console.log(json); 

            let newStreamer;
            //create new streamer object that contains information to display based on stream status
            if(json.pageInfo.totalResults === 1){
              newStreamer = {id : Math.random(), name : name, streamStatus : "Currently Streaming", link: "https://youtube.com/channel/".concat(streamerChannelID, "/live")};
            }
            else if(json.pageInfo.totalResults === 0){
              newStreamer = {id : Math.random(), name : name, streamStatus : "Not Currently Streaming", link: "https://youtube.com/channel/".concat(streamerChannelID, "/live")};
            }
            else{
              throw new Error("Could not find any streaming information for this channel");
            }

            //increment streamer count by 1
            setStreamerCount((prevCount) => prevCount + 1);

            //add to list of streamers
            setStreamerList([...streamerList, newStreamer]);

            //reset nameInput
            setNameInput('');

            //reset streamerChannelInput
            setStreamerChannelInput('');
          }
        ).catch((err) => {
          alert(err);
        });
      }
  };

  //function to get youtube channel ID to use in getData()
  async function getChannelID(streamerChannelID, apiKey){

    //we are searching the youtube API w/ inputs of type="channel", fields="items%2Fsnippet%2FchannelId", q=${streamerChannelID}, key=${apiKey}, and maxResults="1" that returns a JSON object that contains the requested youtube channel ID
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&fields=items%2Fsnippet%2FchannelId&q=${streamerChannelID}&key=${apiKey}&maxResults=1`); 
    
    //convert json into text
    const text = await response.text();
    
    //parse into js object
    let jsonObject = JSON.parse(text); 

    //return promise w/ channel ID as string
    return jsonObject.items[0].snippet.channelId;
  }

  //async function to fetch youtube channel's livestreaming status
  async function getData(streamerChannelID, apiKey){
    try{
      //return the channel ID as a string and stores into variable
      let channelID = await getChannelID(streamerChannelID, apiKey).then((string) => {return string}); 

      //search the youtube API for videos that are currently live (Livestreams) based on channel ID
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&eventType=live&type=video&key=${apiKey}`); 

      //convert data into json
      const json = await response.json() 

      //return promise w/ json data
      return json; 
    }
    catch{
      console.log("Something went wrong!");
    }
  }

  //delete row by using the random id assigned to each streamer row
  const deleteRow = (id) => {
    //filter out streamer list using array.filter(), adding each streamer to the new array that doesn't equal the id of the streamer row we want to delete
    const newStreamerList = streamerList.filter((streamer) => streamer.id !== id);

    setStreamerList(newStreamerList);

    setStreamerCount((prevCount) => prevCount - 1);
  };

  const handleSubmit = (apiKey) => {
    setAPIKey(apiKey)
  };

  return (
    <Container className={streamerCount < 15? "containerDiv" : "containerDivFit"}>
        <AppTitle>Are They Live?</AppTitle>

        <ApiKeyDiv style={apiKey.length > 0 ? {display : "none"} : {display : "flex"}}>
          <ApiKeyInput type="text" placeholder="Please enter your YouTube API key." ref={inputRef}/>
          <ApiKeySubmitButton type="button" value="Submit" onClick={() => {handleSubmit(inputRef.current.value);}}/>
          <InstructionsDiv>
            <InstructionsTitle>Instructions for creating your YouTube API Key (PLEASE READ!)</InstructionsTitle>
            <InstructionsSpan>
              <h2 style={{color : "red"}}>If you enter an invalid API Key, please restart the application by refreshing the page.</h2>
              1. Create a google account if you don't have one at <a href="https://accounts.google.com/signin">the google signin page.</a><br/>
              2. Login to your google account and go to the <a href="https://console.developers.google.com/">Google Developer's Console.</a><br/>
              3. Click on "Create Project". <br/>
              4. Go to the <a href="https://console.cloud.google.com/">API console</a> and select the project you just created from the top left drop down menu.<br/>
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
              {createNewStreamer(nameInput, streamerChannelInput, apiKey)}             
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
                  <StreamerImg/>
                </StreamerImgDiv>
                <StreamerName>{item.name}</StreamerName>
                <StreamerStatus href={item.link} target="_blank">{item.streamStatus}</StreamerStatus>         
                <ButtonDiv>
                  <CancelButton onClick={() => deleteRow(item.id)}/>
                </ButtonDiv>     
              </StreamerRow>)
          })
        }
      </AppDiv>
    </Container>
  );
}

export default App;
