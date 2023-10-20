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

import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/styles/tailwind.css";
import App from './components/App';
import CreateRoom from './views/CreateRoom';
import CreateQuestion from './views/CreateQuestion';
import EnterRoom from './views/EnterRoom';
import PlayerPlays from './views/PlayerPlays';
import PlayerResults from './views/PlayerResults'
import Index from './views/Index';
import AdminDashboard from './views/AdminDashboard';
import axios from 'axios';
import LoginUser from "./views/LoginUser";
import ContactUs from "./views/ContactUs";
import FrequentPollers from "./views/FrequentPollers";


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  console.log('headers are ', config.headers, 'token is', token);

  config.headers['AUTH_TOKEN'] = token;

  return config;
  
})

ReactDOM.render(
  <App>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/create-room" component={CreateRoom} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/create-questions" component={CreateQuestion} />
        <Route path="/enter-room" component={EnterRoom} />
        <Route path="/player-plays" component={PlayerPlays} />
        <Route path="/player-results" component={PlayerResults} />
        <Route path="/login-user" component={LoginUser} />
        <Route path="/frequent-pollers" component={FrequentPollers} />

        <Route path="/" exact component={Index} />

        <Route path="/contactus" component={ContactUs} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </App>,
  document.getElementById("root")
);
