import { Card, Fade } from "react-bootstrap";

const CardFade = ({ text, open, id }) => {
    return (
        <div style={{ display: open ? 'block' : 'none', height: '100%' }}>
            <Fade in={open}>
                <div id={id}>
                    <Card body style={{ width: '100%' }}>
                        {text}
                    </Card>
                </div>
            </Fade>
        </div>
    )
}

export default CardFade;