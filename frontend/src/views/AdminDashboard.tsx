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
import { AppContext } from '../components/App'
import { useContext, useEffect, useState } from 'react'
import '../assets/styles/createRoom.css'
import createNewRoom from '../util/createNewRoom'
import { RouteComponentProps } from 'react-router'
import { fetchRoomAnalytics } from '../util/fetchRoomAnalytics'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import React from 'react';

interface IAnalytics {
  [key: string]: {
    id: number;
    description: string;
    count: number;
  }[]
}

export default function AdminDashboard({ history }: RouteComponentProps) {

  const { hostId, setHostId, name, setName, title, setTitle, roomId, roomKey, setRoomId, setRoomKey} =
    useContext(AppContext)

  const [analytics, setAnalytics] = useState<IAnalytics>();
  const [graph, setGraph] = useState('doughnut');

  useEffect(() => {
    (async function () {
      const _roomId = localStorage.getItem('roomId');
      const _roomKey = localStorage.getItem('roomKey');
      _roomId && setRoomId(_roomId);
      _roomKey && setRoomKey(_roomKey);
      const playerName = localStorage.getItem('playerName');
      playerName && setName(playerName);
      const data = await fetchRoomAnalytics({ roomId });
      // console.log(data);
      setAnalytics(data.analytics)
      setInterval(async ()=> {

        const data = await fetchRoomAnalytics({roomId})
        setAnalytics(data.analytics)},
        5000);
    })();
  },[]);

  let doughnutCharts = <></>
  let barCharts = <></>

  if(analytics) {
    Object.values(analytics).map((options) => {
      const mapped = options.map((option) => {
        return {
          text: option.description,
          value: option.count,
        }
      
      }
      
      )

      doughnutCharts = 
        (<div>
          <Doughnut
            data={{
              labels: mapped.map((c) => c.text),
              datasets: [
                {
                  label: '# of votes',
                  data: mapped.map((c) => c.value),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                  ],
                  borderWidth: 1
                }
              ]
            }}
          />
        </div>)

      barCharts = (<div>
        <Bar
          data={{
            labels: mapped.map((c) => c.text),
            datasets: [
              {
                label: '# of votes',
                data: mapped.map((c) => c.value),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(255, 159, 64, 0.7)',
                  'rgba(255, 205, 86, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                ],
                borderWidth: 1
              }
            ]
          }}
        />
      </div>) 


    })
  }

  // Email sending functonality begins
  const [emailList, setEmailList] = useState('');
  const [link, setLink] = useState('');
  
  const handleEmailListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailList(e.target.value);
  }

  const sendLink = () => {
    const emailAddresses = emailList.split(',').map(email => email.trim());
    // Replace this with your link generation logic
    const generatedLink = roomKey;

    // Send the link to all email addresses (you can implement this part)
    emailAddresses.forEach(email => {
      // You can send the email or perform other actions here
      console.log(`Sending link ${generatedLink} to ${email}`);
    });

    setLink(generatedLink);
  }



  // Email sending functionality ends

  return (
    <>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">PollMe</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="/contactus">Contact</a></li>
                            <li className="nav-item"><a className="nav-link" href="/login-user">Login</a> </li>
                        </ul>
                    </div>
                </div>
    </nav>


    <section className="py-5 border-bottom" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5">

                    <div className="col-lg-6">
                 <div className="card2 card border-0 px-4 py-5">
                    <div className="row mb-4 px-3">
                        <h2 className="mb-0 mr-4 mt-2">Click on the button below to add another question to your room</h2>
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                    </div>
                    <div className="row px-3">
                      <div
                        className="get-started btn btn-primary btn-lg px-4 me-sm-3 hover:shadow-lg ease-linear transition-all duration-150"
                        onClick={() => {
                                    history.push('/create-questions');
                                  }}
                      >
                        Create a question!
                      </div>
                    </div>
                
                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                    </div>
                    <div className="row mb-4 px-3">
                     <h2 className="mb-0 mr-4 mt-2">Share your personal room</h2>
                    </div>
                    <div className="row mb-4 px-3">
                        <div className="flex flex-row mt-2">
                            <div className='p-2 text-lg ' style={{background: '#DFDEED'}}>{process.env.REACT_APP_FRONT_END_BASE_URL + '/enter-room?code=' + roomKey}</div>
                            <div className="ml-3 cursor-pointer border-2 text-gray-400 flex flex-col items-center justify-center items-center" onClick={() => {
                              navigator.clipboard.writeText(process.env.REACT_APP_FRONT_END_BASE_URL + '/enter-room?code=' + roomKey);
                            }} >  <div>Copy</div>  </div>
                        </div>
                    </div>

                    
                    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css"></link>

                    <div id="mc_embed_signup">
                      <form action="https://gmail.us9.list-manage.com/subscribe/post?u=406cd0357a3b2c5b1a7b8bd45&amp;id=5b7af67200&amp;f_id=0041c3e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
                          <div id="mc_embed_signup_scroll"><h2>Subscribe</h2>
                              <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
                              <div className="mc-field-group"><label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label><input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required={true} value=""></input><span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span></div>
                          <div id="mce-responses" className="clear foot">
                              <div className="response" id="mce-error-response" ></div>
                              <div className="response" id="mce-success-response" ></div>
                          </div>
                      <div  aria-hidden="true">
                          /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
                          <input type="text" name="b_406cd0357a3b2c5b1a7b8bd45_5b7af67200" tabIndex={-1} value=""></input>
                      </div>
                          <div className="optionalParent">
                              <div className="clear foot">
                                  <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe"></input>
                                  <p ><a href="http://eepurl.com/iCaPWA" title="Mailchimp - email marketing made easy and fun"><span ><img className="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp"></img></span></a></p>
                              </div>
                          </div>
                      </div>
                    </form>
                  </div>

                  <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {(window as any).fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>

                    
                    
                    

                 {/*
                  <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center">Login</button> </div>
                 */}  

                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                    </div>
                    <div className='row mb-3 px-3'>
                        <div
                            className="get-started btn btn-primary btn-lg px-4 me-sm-3 hover:shadow-lg ease-linear transition-all duration-150"
                            onClick={async () => {
                                                    const data = await fetchRoomAnalytics({ roomId });
                                                    console.log(data);
                                                    setAnalytics(data.analytics)
                                                    
                                                  }}
                        >
                        Refresh
                        </div>
                    </div>
                
                </div>
            </div>


            <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5">
                    <h2 className="mb-0 mr-4 mt-2">Analytics</h2>
                    <div className="row px-3">
                    <div className="row px-3 mb-4">
                    <div className="line"></div>
                    </div>
                    <div
                        className="get-started btn btn-primary btn-lg px-4 me-sm-3 hover:shadow-lg ease-linear transition-all duration-150"
                        onClick={() => {
                          setGraph('bar')
                        }
                      }
                      >
                        Bar Chart
                    </div>
                    <div className="row px-3 mb-4">
                    <div className="line"></div>
                    </div>
                    <div
                        className="get-started btn btn-primary btn-lg px-4 me-sm-3 hover:shadow-lg ease-linear transition-all duration-150"
                        onClick={() => {
                          setGraph('doughnut')
                        }
                      }
                      >
                        Doughnut Chart
                    </div>
                  </div>            
                    
                    <div className="row px-3 justify-content-left mt-4 mb-5 border-line">  </div>
                    {
                      graph === 'doughnut' ? (
                      <div className="row" id="doughnutChart">
                        {doughnutCharts}
                    </div>
                      ) :
                      (
                        <div className="row" id="barChart">
                          {barCharts}
                        </div>
                      )
                    }
                </div>
            </div>

              </div>
            </div>
    </section>



    </>
  )
}