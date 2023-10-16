import DefaultHouse from '../assets/defaulthouse.png'

export const Post = 
    (title='No title', _id='', img=DefaultHouse, price='123456', text='') => 
    { return { title : title, img : img, price : price, text : text, available : true, _id : _id} }