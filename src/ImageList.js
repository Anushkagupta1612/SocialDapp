import React from "react";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { create } from "ipfs-http-client";
import abi from './artifacts/contracts/socialdapp.sol/socialdapp.json';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import './ImageList.css'
import IndiImage from './IndiImage'

const contractABI = abi.abi;
const contractAddress = "0xA5bd1F73fc4004b7c2070a4925C4b8CED2d51f83";
const client = create( 'https://ipfs.infura.io:5001/api/v0' );

const ImageList = () => {
    const [ fileUrl, updateFileUrl ] = useState( `` );
    const [ arrDis, setArrDis ] = useState( [] );

    async function uploadImageHandler ( e ) {
        const file = e.target.files[ 0 ]
        try {
            const added = await client.add( file )
            const url = `https://ipfs.infura.io/ipfs/${ added.path }`
            updateFileUrl( url );
            const { ethereum } = window;

            if ( typeof ethereum !== 'undefined' ) {
                console.log( 'MetaMask is installed!' );
                const provider = new ethers.providers.Web3Provider( ethereum );
                const signer = provider.getSigner();
                const contract = new ethers.Contract( contractAddress, contractABI, signer );
                console.log( contract );
                console.log( added, url );
                await contract.addImages( added.path, url );
                displayImageHandler();
            }
            else {
                console.log( "Metamask not found" );
            }
        } catch ( error ) {
            console.log( 'Error uploading file: ', error )
        }
    }

    async function displayImageHandler ( e ) {
        const { ethereum } = window;

        if ( typeof ethereum !== 'undefined' ) {
            console.log( 'MetaMask is installed!' );
            const provider = new ethers.providers.Web3Provider( ethereum );
            const signer = provider.getSigner();
            const contract = new ethers.Contract( contractAddress, contractABI, signer );
            console.log( contract );
            const count = await contract.imgCount();
            const a = [];
            for ( let c = 1; c <= count; c++ ) {
                const obj = await contract.images( c );
                console.log( obj );
                a.push( obj );
            }

            setArrDis( a );

        }
        else {
            console.log( "Metamask not found" );
        }
    }

    return (
        <div className="imagelist">

            <div>Memes might take some time to lead, please wait!</div> <br />
            <Button className="glow-on-hover" onClick={ displayImageHandler }>Load more memes!</Button> <br />

            <div className="form">
                <Card style={ { width: '18rem' } } >
                    <Card.Body>
                        <Card.Title>Meme Dapp</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Upload your Web3 memes here!</Card.Subtitle>
                        <Card.Text>
                            Prepared as a minor project in Polygon Fellowship Class of 2022 for week 4
                        </Card.Text>
                        <Card.Link href="#"><input placeholder="Upload file" type="file" onChange={ uploadImageHandler } className="uploadImageButton"></input></Card.Link>
                        <Card.Link href="#">{ fileUrl && ( <div> { fileUrl } </div> ) }</Card.Link>
                    </Card.Body>
                </Card>
            </div>


            < br />

            {/* <input placeholder="Upload file" type="file" onChange={ uploadImageHandler }></input> */ }

            {
                fileUrl && (
                    <img src={ fileUrl } width="350 px" />
                )
            }

            < br />

            {
                fileUrl && (
                    <div className="box-shadow"> { fileUrl } </div>
                )
            }
            <br />

            {
                arrDis.map( ( item, i ) => (
                    <div >
                        <IndiImage imageObj={ item } />

                    </div>
                ) )
            }
        </div>
    );
};

export default ImageList;