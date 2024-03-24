  //Create custom hook to share state from different file
  export default function YoutubeDetailHook() {

    /* Adds new row to list (These parameters should take in the current streamer count, the current streamer list, a name input, and a streamer channel input) */
    async function createNewStreamer(name, streamerChannelID, apiKey, streamerCount, streamerList){

        //get channel ID of streamer
        const channelId = await getChannelID(streamerChannelID, apiKey)
        .then((id) => {
            return id;
        })
        .catch(() => {
            alert(`Could not fetch channel ID from Youtube API. Please make sure that you typed in a valid YouTube Channel ID.`);
        });

        //next, fetch JSON data about Youtube Channel's live stream status and save into variable
        const streamStatus = await getData(channelId, apiKey).then((json) => {
            return json.pageInfo.totalResults; //return json's pageInfo's totalResults attribute (either 0 or 1)
        })
        .catch(() => {
            alert(`Could not fetch data from Youtube API. Please try again.`)
        });

        //third, fetch channel's youtube profile picture 
        const channelImageLink = await getChannelImage(channelId, apiKey).then((json) => {
            //access json object to get the "default" thumbnail (88x88 px)
            let imageURL = String(json.items[0].snippet.thumbnails.default.url); //get url as string
                console.log(imageURL);
                return imageURL;
        });

        //fourth, create a streamer object depending on if the channel ID starts with '@' or not.
        let newStreamer;

        //if channel ID starts with @
        if(String(streamerChannelID).indexOf('@') === 0){
            if(streamStatus === 1){ //if currently streaming
                newStreamer = {id : Math.random(), name : name, streamStatus : "Currently Streaming", link: "https://youtube.com/".concat(streamerChannelID, "/live"), imgLink: channelImageLink};
            }
            else{ //if not currently streaming
                newStreamer = {id : Math.random(), name : name, streamStatus : "Not Currently Streaming", link: "https://youtube.com/".concat(streamerChannelID, "/live"), imgLink: channelImageLink};
            }
        }

        //else if channel ID doesn't start w/ '@'
        else{
            if(streamStatus === 1){
                newStreamer = {id : Math.random(), name : name, streamStatus : "Currently Streaming", link: "https://youtube.com/channel/".concat(streamerChannelID, "/live"), imgLink: channelImageLink};
            }
            else{
                newStreamer = {id : Math.random(), name : name, streamStatus : "Not Currently Streaming", link: "https://youtube.com/channel/".concat(streamerChannelID, "/live"), imgLink: channelImageLink};
            }
        }

        /*lastly, update the state of the component*/
        //increment streamer count by 1
        const newStreamerCount = streamerCount + 1;

        //add to list of streamers
        const newStreamerList = [...streamerList, newStreamer];

        //down here, we should return an array with the streamerCount, the updated streamer list, and the newStreamer object to do DB insert.
        return [newStreamerCount, newStreamerList, newStreamer];
    };

    /* Get YouTube channel's official Channel ID */
    async function getChannelID(streamerChannelID, apiKey) {

        //we are searching the youtube API w/ inputs of type="channel", fields="items%2Fsnippet%2FchannelId", q=${streamerChannelID}, key=${apiKey}, and maxResults="1" that returns a JSON object that contains the requested youtube channel ID
        let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&fields=items%2Fsnippet%2FchannelId&q=${streamerChannelID}&key=${apiKey}&maxResults=1`); 
        
        //convert json into text
        const text = await response.text();
        
        //parse into js object
        let jsonObject = JSON.parse(text); 

        //return promise w/ channel ID as string
        return jsonObject.items[0].snippet.channelId;
    }

    /* Get YouTube channel's Profile Image */
    async function getChannelImage(channelId, apiKey){
        //fetch from API for json data containing image link
        let channelImage = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&fields=items(id%2Csnippet%2Fthumbnails)&key=${apiKey}`); 

        //convert response to json
        const json = await channelImage.json(); 

        //return json as promise
        return json; 
    }

    /* Get YouTube channel's livestreaming status */
    async function getData(channelID, apiKey){
        try{
            //search the youtube API for videos that are currently live (Livestreams) based on channel ID
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&type=video&eventType=live&key=${apiKey}`);

            //convert data into JS object
            const json = await response.json() 

            //return promise w/ js object
            return json; 
        }
        catch{
            console.log("Something went wrong!");
        }
    }

    /* Delete Row */
    const deleteRow = (id, currentStreamerList, currentStreamerCount) => { //should take in current streamerList, and current streamerCount and return those values to be set in main view.
        //First, filter out the streamer WE WANT to delete (This will be used for our DB DELETE method call)
        const streamerToDelete = currentStreamerList.filter((streamer) => streamer.id === id);
        
        //filter out streamer list using array.filter(), adding each streamer to the new array that doesn't equal the id of the streamer row we want to delete
        const newStreamerList = currentStreamerList.filter((streamer) => streamer.id !== id);
        const newStreamerCount = currentStreamerCount - 1;

        //return the newStreamerList and the new streamerCount
        return [newStreamerCount, newStreamerList, streamerToDelete];
    };

    /* Handles API Key Submission */
    const handleSubmit = (apiKeyRef) => {        
        //Returns the API key from the referenced component's value.
        return apiKeyRef.current.value;
    };

    return [createNewStreamer, deleteRow, handleSubmit] //returns three functions for us to use.
  }