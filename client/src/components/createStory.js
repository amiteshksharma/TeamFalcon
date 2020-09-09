import React from "react";
import Authorization from './session/Authorization';

function createStory(){
    return(
        <div>Create Story</div>
    );
}

const condition = authUser => !!authUser;

export default Authorization(condition)(createStory);