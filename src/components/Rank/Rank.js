import userEvent from "@testing-library/user-event";
import React from "react";
const Rank = ({name, entries}) => {
    return(
        <div>
            <div className='white f3 center'>
                {`${name}, you current entry count is...`}
            </div>
            <div className='white f1 center'>{entries}</div>
        </div>
    );
}

export default Rank;