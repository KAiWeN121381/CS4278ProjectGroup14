import DefaultHouse from '../assets/defaulthouse.png'

export const Post = 
    (title='No title', img=DefaultHouse, text='') => 
    { return { title : title, img : img, text : text} }