import React from "react"
import { connect } from 'react-redux';

// import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


// const stringFromArray = (array, sep = ", ") => {
//     return array.reduce((acc, cur, index) => {
//         return acc + cur + sep;
//     }, "")
// }

// const pFromArray = (array, key, htmlEl = "p") => {
//     if (htmlEl === "p") {
//         return array.reduce((acc, cur, index) => {
//             acc.push((<p key={key + String(index)}>{cur}</p>))
//             return acc;
//         }, [])
//     } else if (htmlEl === "list") {
//         const listArr = array.reduce((acc, cur, index) => {
//             acc.push((<li key={key + String(index)}>{cur}</li>))
//             return acc;
//         }, []);

//         return (<ul>{listArr}</ul>)
//     }

// }




const Details = (props) => {
    return (

        <div className="Details">
            {
                props.dtl.content
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        dtl: state.details
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details); 
