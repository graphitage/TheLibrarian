import React, { useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import classes from './ContextMenu.module.css';

const ContextMenu = (props) => {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [menu, showMenu] = useState(false);

    const handleContextMenu = useCallback(
        event => {
            event.preventDefault();
            if (props.outerRef && props.outerRef.current.contains(event.target)) {
                setXPos(`${event.pageX}px`);
                setYPos(`${event.pageY}px`);
                showMenu(true);
            } else {
                showMenu(false);
            }
        },
        [showMenu, props.outerRef, setXPos, setYPos]
    );

    const { onCloseContextMenu, contextMenuIsOpen } = props;
    const handleClick = useCallback(() => {
        if (contextMenuIsOpen) {
            showMenu(false);
            onCloseContextMenu();
        }
    }, [onCloseContextMenu, showMenu, contextMenuIsOpen]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [handleClick, handleContextMenu]);


    if (menu && props.contextMenuIsOpen) {
        return (
            <ul className={classes.menu} style={{ top: yPos, left: xPos }}>
                <li onClick={() => console.log("Simple Expand")}>Simple Expand</li>
                <li>Expand by Dataset</li>
                <li>Expand by Library</li>
                <li>Expand by Keywords</li>
            </ul>
        );
    }
    return <></>;
};


const mapStateToProps = state => {
    return {
        contextMenuIsOpen: state.ui.contextMenu.isOpen,
        nodeId: state.ui.contextMenu.nodeId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenContextMenu: (nodeId) => dispatch(actionCreators.openContextMenu(nodeId)),
        onCloseContextMenu: () => dispatch(actionCreators.closeContextMenu()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);


