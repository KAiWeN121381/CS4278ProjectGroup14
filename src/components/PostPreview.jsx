import * as React from 'react';
import CustomLink from './CustomLink';


export default function PostPreview(props) {
    return (
        <CustomLink to='/postdisplay'>
            <div className="post">
                <img
                    src={props.post.img}
                    alt="Temp photo">
                </img>
                <h1 className='text-overlay'>
                    {props.post.title}
                </h1>
            </div>
            
        </CustomLink>
    )
}