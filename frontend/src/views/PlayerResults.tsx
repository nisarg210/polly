/*
MIT License

Copyright (c) 2023 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF,
OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*eslint-disable*/
import React, { useState } from "react";
import "../assets/styles/createRoom.css";
import createNewRoomCallback from "../util/createNewRoom";

export default function PlayerResults() {

    const [name, setName] = useState('')
    return (
        <>
    <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
        <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="flex flex-col justify-center items-center">
                <div className="font-semibold text-4xl text-blueGray-600" >
                Player Results!!
                </div>
                <div className="font-semibold text-4xl text-blueGray-600" >
                <div className="flex flex-col justify-center items-center">
{/* 
                <form className="container flex flex-col justify-center items-center">
                    <div className="row flex flex-col justify-center items-center">
                        <br/>
                        <label className="create-room-text flex flex-col justify-center items-center">Question</label>
                        <input className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                    </div>
                    
                    <div className="row flex flex-col justify-center items-center">
                        <br/>
                        <label className="create-room-text flex flex-col justify-center items-center">Possible Answers</label>
                        <input className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"  ></input>
                        <input className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                        <input className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                        <input className="create-room-input get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"></input>
                    </div>
                    <div className="row flex flex-col justify-center items-center">
                        <br/>
                    </div>
                    

                </form> */}
                </div>
                </div>

            </div>
        </div>
        </div>

        <img
        className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
        src={require("assets/img/pattern_react.png").default}
        alt="..."
        />
    </section>
    </>
    );
}