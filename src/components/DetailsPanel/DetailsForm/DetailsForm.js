import React from "react"
import { connect } from 'react-redux';


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
