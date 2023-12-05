import * as React from 'react';
import CustomLink from './CustomLink';
import DefaultHouse from '../../src/assets/defaulthouse.png'


export default function PostPreview(props) {
    let linkname = `/postdisplay/${props.post._id}`;

    return (
        <CustomLink to={linkname}>
            <div className="post-preview">
                <img src={props.post.file ? props.post.file : DefaultHouse} alt='HousePhoto' style={{height:"100%", width:"100%"}}>
                </img>
                <h1 className='text-overlay'>
                    {props.post.title}
                </h1>
            </div> 
        </CustomLink>
    )
}