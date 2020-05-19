import React ,{useContext} from 'react'
import { ClientContext } from '../../contexts/ClientContext'
import { findAllByDisplayValue } from '@testing-library/react';

export default function MainMenu() {
    const {userName, hasUserName} = useContext(ClientContext);
    function display(){
        if(hasUserName){
            return (<h1>Welcome Home {userName}</h1>);
        }
    }
    return (
            <div>{display()}</div>
        );
}
