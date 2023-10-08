import * as React from 'react';
import Lhouse from '../assets/luxuryhouse.png'


export default function Post(props) {
    return (
        <a href="https://chat.openai.com/" style={{textDecoration: 'none'}}>
            <div className="post">
                <img
                    src={Lhouse}
                    alt="Temp photo">
                </img>
                <h1 className='text-overlay'>
                    {props.title}
                </h1>
            </div>
            
        </a>
    )
}