import React, { useRef, useState } from "react";
import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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

const EditButton = styled(EditOutlinedIcon)`
  &&{
    height : 3vh;
    width : fit-content;
    margin : auto 0;

    &:hover {
      cursor : pointer;
    }
  }
`;

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
  const [streamerChannelInput, setStreamerChannelInput] = useState('');

  //add new row
  const createNewStreamer = (name) => {
    //fetch from youtube API (figure this out)

    //create a streamer object with random id, the name of streamer entered, streamer status, and link to streamer's stream
    let newstreamer = {id : Math.random(), name : name, streamStatus : "Unknown", link: "https://youtube.com/"};

    //increment streamer count by 1
    setStreamerCount((prevCount) => prevCount + 1);

    //add to list of streamers
    setStreamerList([...streamerList, newstreamer]);

    //reset nameInput
    setNameInput('');
  };

  //async function to fetch youtube data
  async function getData(){
    try{
      const userData = await fetch('https://jsonplaceholder.typicode.com/todos/1'); //wait for function to fetch from youtube api
      const info = await userData.json(); //await the info to be returned in json
      console.log(info.id); //log out json object as string
    }
    catch{
      console.log("Something went wrong!");
    }
  }

  //delete row by using the random id assigned to each streamer row
  const deleteRow = (id) => {
    //filter out streamer list using array.filter(), adding each streamer that doesn't equal the id of the want we want to delete
    const newStreamerList = streamerList.filter((streamer) => streamer.id !== id);

    setStreamerList(newStreamerList);

    setStreamerCount((prevCount) => prevCount - 1);
  };

  return (
    <Container className={streamerCount < 15? "containerDiv" : "containerDivFit"}>
        <AppTitle>Are They Live?</AppTitle>
        <InputDiv>
          <StreamerNameInput type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Name"/>
          <StreamerChannelInput type="text" value={streamerChannelInput} onChange={(e) => setStreamerChannelInput(e.target.value)} placeholder="Youtube Channel ID"/>
        </InputDiv>
        <AddStreamerButton onClick={() => 
          {
            if(nameInput.length > 0) 
              {createNewStreamer(nameInput)} 
            else {
              alert("Please input a streamer name.")
              return false;
            }
          }}>
          Add Streamer
          </AddStreamerButton> 
      <AppDiv className={streamerCount < 1? "appDiv" : "appDivFit"}>
        {
          streamerList && streamerList.length ? '' : 'Nobody is live... Add some streamers to track them!'
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
                  <EditButton/>
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
