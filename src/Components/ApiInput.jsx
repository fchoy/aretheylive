import React from 'react'
import styled from "styled-components";

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

const ApiInput = ({apiKey, inputRef, handleSubmit, setAPIKey}) => {
  
  return (
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
  )
}

export default ApiInput