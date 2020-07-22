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
            {props.dtl.Paper &&
                <div>
                    <h2>{props.dtl.Paper && props.dtl.Paper.title}</h2>
                    <div className="body">
                        {props.dtl.Paper.authors &&
                            <div className="authors">
                                <p>Authors: {props.dtl.Paper.authors}</p>
                            </div>
                        }
                        {
                            props.dtl.Paper.content &&
                            <div className="content">
                                {props.dtl.Paper.content.map(obj => (
                                    <div>
                                        <h3>{obj.sectionTitle}</h3>
                                        <p>{obj.text}</p>
                                    </div>
                                ))
                                }
                            </div>
                        }
                    </div>
                </div>
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
