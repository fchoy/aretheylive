import React from 'react'
import styled from "styled-components";
//import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const StreamerAppContainer = styled.div`
    height : fit-content;
    width : 100%;
    display : flex;
    flex-direction : column;
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


const StreamerApp = ({apiKey, nameInput, setNameInput, streamerCount, streamerChannelInput, setStreamerChannelInput, streamerList, handleDeleteRow, handleCreateNewStreamer}) => {
  
  return (
    <StreamerAppContainer>
        <InputDiv style={apiKey.length === 0 ? {display : "none"} : {display : "flex"}}>
            <StreamerNameInput type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Name"/>
            <StreamerChannelInput type="text" value={streamerChannelInput} onChange={(e) => setStreamerChannelInput(e.target.value)} placeholder="Youtube Channel ID"/>
        </InputDiv>

        <AddStreamerButton style={apiKey.length === 0 ? {display : "none"} : {display : "initial"}} onClick={() => 
            {
            if(nameInput.length > 0 && streamerChannelInput.length > 0) 
                {handleCreateNewStreamer()} //uses custom YoutubeDetailHook        
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
    </StreamerAppContainer>

  )
}

export default StreamerApp