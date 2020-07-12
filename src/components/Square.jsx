import React from 'react';
import { render } from '@testing-library/react';

// class Square extends React.Component {
//     // // constructor(props) {
//     // //     super(props);
//     // //     this.state = { value: null };
//     // // }
//     render() {
//         return (
//             <button className="square" onClick={() => { this.props.onClick(); }}>
//                 // { TODO }
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className={`square ${props.winBox}`} onClick={() => { props.onClick(); }}>
            {/* {TODO} */}
            {props.value}
        </button>
    );
}

export default Square;