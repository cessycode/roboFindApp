import React from 'react';

const CardContents = (props) => {
    const {id, name, username, email} = props;
    return (
        <div className = 'tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'> 
            <img alt = 'robots' src={`https://robohash.org/${id}?200x200`}/>
            <div>
                <h2>{name}</h2>
                <p>{username}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default CardContents;