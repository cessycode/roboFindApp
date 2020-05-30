import React from 'react';
import CardContents from './CardContents';

const Card = ({robots}) => {
    const robotsArray = robots.map((user, i) => {
        return (
            <CardContents 
                id={robots[i].id} 
                key = {robots[i].id + i}
                name={robots[i].name} 
                username={robots[i].username} 
                email={robots[i].email}
            />
        )
    })
    return (
        <div>
            {robotsArray}
        </div>
    )
}

export default Card;