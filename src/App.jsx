import React, {useState, useRef} from "react";

import styled from "styled-components";
import YoutubeDetailHook from "./Utils/YoutubeAPIFunctions";

import ApiInput from "./Components/ApiInput";
import StreamerApp from "./Components/StreamerApp";
 
const Container = styled.div`
    width : 100vw;
    height : fit-content;
    display : flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;

`;

const AppTitle = styled.h1`
  width : fit-content;
  height : fit-content;
  margin : 2% auto 2% auto;
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
    <Container className={streamerCount < 15 ? "containerDiv" : "containerDivFit"}>
      
      <AppTitle>Are They Live?</AppTitle>

      <ApiInput
        apiKey={apiKey}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
        setAPIKey={setAPIKey}
      />

      <StreamerApp
        apiKey={apiKey}
        nameInput={nameInput}
        setNameInput={setNameInput}
        streamerCount={streamerCount}
        streamerChannelInput={streamerChannelInput}
        setStreamerChannelInput={setStreamerChannelInput}
        streamerList={streamerList}
        handleDeleteRow={handleDeleteRow}
        handleCreateNewStreamer={handleCreateNewStreamer}
      />

    </Container>
  );
}

export default App;
