import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Div({children}) {
    
    return (
        <>
            {
                children.map((child, i) => {
                    return (
                        <span key={`${i}-${Math.random()}`}>
                            {child}
                        </span>
                    );
                })
            }
        </>
    );
}

Div.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

function Moop({str}) {
    console.log(str);

    return (<p>{str}</p>);
}

Moop.propTypes = {
    str: PropTypes.string
}


function Parent({children}) {
    const [num, setNum] = useState(1);
    console.log('rendered parent')

    useEffect(() => console.log(num), [num]);

    return (<div><button onClick={() => setNum(prev => prev + 1)}>add</button>{children}</div>);
}

function Child() {
    console.log('rendered child');
    return (<div>child</div>);
}


export default function Test() {
    const [number, setNumber] = useState(1);

    return (
        <>
            <Div>
                <p>Hi</p>
                <p>Ho</p>
            </Div>
            <Moop str={'boobs'} />
            {/* <button onClick={() => setNumber(prev => prev + 1)}> add </button> */}
            {/* <button onClick={() => setStr(prev => prev + "newStr")}> str add </button> */}
            {/* <Child/> */}
            <Parent />
        </>

    );
}