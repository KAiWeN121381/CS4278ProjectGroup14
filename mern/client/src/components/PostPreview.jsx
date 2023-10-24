import * as React from 'react';
import CustomLink from './CustomLink';


export default function PostPreview(props) {
    let linkname = `/postdisplay/${props.post._id}`;

    return (
        <CustomLink to={linkname}>
            <div className="post-preview">
                <img
                    src={props.post.file}>
                </img>
                <h1 className='text-overlay'>
                    {props.post.title}
                </h1>
            </div>
            
        </CustomLink>
    )
}