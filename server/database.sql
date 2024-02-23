create database StreamerInfo;

/*Creates a table called "streamers" and define our schema for the table.*/
create table streamers(
    streamer_id serial primary key,
    streamer_name varchar(255),
    streamer_status varchar(8),
    channel_link varchar(512),
    channel_image_link varchar(512)
);