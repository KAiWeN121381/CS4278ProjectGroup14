import * as React from 'react';
import CustomLink from './CustomLink';


export default function PostPreview(props) {
    let linkname = '/postdisplay';

    return (
        <CustomLink to={linkname}>
            <div className="post-preview">
                <img
                    src={props.post.img}>
                </img>
                <h1 className='text-overlay'>
                    {props.post.title}
                </h1>
            </div>
            
        </CustomLink>
    )
}