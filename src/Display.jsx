import React from 'react';

const Display = (props) => {
    return (
        <div className='component-display'>
            <div>{props.value}</div>
        </div>
    );
};

export default Display;