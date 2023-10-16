import DefaultHouse from '../assets/defaulthouse.png'

export const Post = 
    (title='No title', img=DefaultHouse, price='123456', text='', ID='') => 
    { return { title : title, img : img, price : price, text : text, available : true, ID : ID} }