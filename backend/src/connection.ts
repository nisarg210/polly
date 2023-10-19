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

import middy, { MiddlewareObj } from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import redis from 'redis';
import { setPlayerConnectionId } from './utils/setPlayerConnectionId';

const client = redis.createClient({
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
})

let handler = middy(async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const body: any = event.body;
  const { connectionId, routeKey } = event.requestContext;
  const { playerId } = event.body as any;

  switch(routeKey) {
    case '$connect':
      setPlayerConnectionId(playerId, connectionId!, client);
      break;
    case '$disconnect':
      // unsetPlayer socket data
    case '$default':
      console.log('Default socket event triggered');
      
  }

  return {
    statusCode: 200,
    body: 'Hello',
  }
})

handler
  .use(
    httpJsonBodyParser()
  )
module.exports.handler = handler
