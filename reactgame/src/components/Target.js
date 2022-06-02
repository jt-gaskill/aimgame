export default function Target(props){
    const place = {
        top: props.position[0],
        right: props.position[1]
    }

    return(
        <div className="target" onClick={props.handleClick} style={place}>

        </div>
    )
}