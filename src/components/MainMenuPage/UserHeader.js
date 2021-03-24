import React ,{useContext} from 'react'
import './UserHeader.css'
import { ClientContext } from '../../contexts/ClientContext'
import logo from './custom-cursor.png'


export default function UserHeader() {
    const {userName, tags} = useContext(ClientContext);
    return (
        <div className="user-header-wrapper">
            <h1 className='user-header'>
                <img className="logo" src={logo}></img>
                Welcome {userName}! 
                Your tags are {tags}
            </h1>
        </div>
    )
}
