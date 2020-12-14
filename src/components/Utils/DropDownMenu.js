import React from 'react'
import {DropDownWrapper} from './ClickMenu'
import {ClientContext} from '../../contexts/ClientContext'

function setDefaultItemStyles(items, itemStyles){
    items.forEach((item)=>{
        item.styles = itemStyles;
    })
        
    
}
export default function DropDownMenu(props) {
    console.log(props.theme);
    const itemStyles=`
        ;
        &:hover{
        background: #3486f9;
        color: black;
        };
    `;
    const menuStyles=`
        background-color: black;
        color: white;
        border: none;
        border-radius: 2px;
        box-shadow: 0.25em 0.25em 0.75em rgba(0,0,0,.25),
        0.125em 0.125em 0.25em rgba(0,0,0,.15);
    `;
    setDefaultItemStyles(props.items, itemStyles);


    return (
        <DropDownWrapper 
        menuStyles= {menuStyles}
        itemStyles={itemStyles}
        items = {props.items}
        >
            {props.children}
        </DropDownWrapper>
    )
}
