export default function Post(props) {
    return (
        <div className="rectangle">
            <h1>{props.title}</h1>
            <img 
                src="https://legacy.reactjs.org/logo-og.png" 
                alt="Temp photo" 
                height={100}
                weight={100}
                />
            <p>{props.text}</p>
        </div>
    )
}