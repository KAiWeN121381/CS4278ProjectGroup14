import PostPreview from '../components/PostPreview'
import CustomLink from '../components/CustomLink'

// The global variables for login information can be put here or anywhere outside of functions

// This function also has {id} passed in like Edit and PostDisplay, which can be used for user id
export default function Profile() {
    return (
        <div className='left_right_separator'>
            <div>
                <h1>Profile</h1>
                <div>
                    <h3>Username: </h3>
                    <h3>Email: </h3>
                    <h3>Phone Number: </h3>
                </div>
            </div>
            <div>
                <h2>Your Posts</h2>
                
                <CustomLink to='/createpost'><button className='make-post-button'>Make a Post</button></CustomLink>
            </div>
        </div>
        
    )
}


// <PostPreview post={/*Replace this with the post information saved in the database*/}/>