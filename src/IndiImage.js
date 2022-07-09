import React from "react";
import Card from 'react-bootstrap/Card';
import './IndiImage'

const IndiImage = ( props ) => {
    const imageURL = props.imageObj.des;
    const author = props.imageObj.author;
    const cid = props.imageObj.cid;
    return (
        <div classNAme="CardThingy">
            <Card style={ { width: '20rem' } } className="d-flex m-2 p-3" >
                <Card.Img variant="top" src={ imageURL } className='CardImage' />
                <Card.Body>
                    <Card.Title>Author</Card.Title>
                    <Card.Title>{ author }</Card.Title>
                    <Card.Text>
                        This is the cid { cid } of the image uploaded to IPFS
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* <div>
                <img src={ imageURL } /> <br />
                <div> Author: { author }</div> <br />
                <div> CID: { cid }</div> <br />
            </div>

            <br />
            <br /> */}
        </div> );
};

export default IndiImage;
