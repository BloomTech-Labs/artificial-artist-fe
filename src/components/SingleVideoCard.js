import React from "react";
import style from "styled-components";



export  const SingleVideoCard = props => {

    function getYoutubeThumb(link){
        let youtubeID = link.replace('https://www.youtube.com/watch?v=', '');
        let thumbnailHQ = `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`;
        let thumbnailSD =`https://img.youtube.com/vi/${youtubeID}/sddefault.jpg`
      return [thumbnailHQ, thumbnailSD, youtubeID] ;
    }
const [thumbnailHQ,thumbnailSD,youtubeID]=getYoutubeThumb(props.video.location)
	return (
        <>

<ul>
<li>props.video.title</li>
<li>props.video.artist_name</li>
<img src={thumbnailHQ} alt={thumbnailSD ||`${props.video.title} by ${props.video.artist_name}`}/>
</ul>

        </>
    );
 }

