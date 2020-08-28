import React, { useState } from 'react';
import {useTransition, animated} from 'react-spring'


const LoginTitle = () => {

    const [items, set] = useState([
        {key: 1, text: "B"},
        {key: 2, text: "U"},
        {key: 3, text: "B"},
        {key: 4, text: "B"},
        {key: 5, text: "L"},
        {key: 6, text: "E"}
    ]);
    const transitions = useTransition(items, item => item.key, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
    })

    return(
        <div className="row">
            {transitions.map(({ item, props, key }) =>
                <animated.div 
                    key={key} 
                    style={props}
                >
                <p style={{ color: 'gray', fontSize: '25px', fontWeight: 'bolder' }}>{item.text}</p>
                </animated.div>
            )}
        </div>
    )
}

export default LoginTitle;