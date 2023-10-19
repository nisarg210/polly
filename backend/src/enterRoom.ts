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

import { PrismaClient } from '@prisma/client';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkAuth } from './utils/checkAuth';
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import cors from '@middy/http-cors';
import { enterRoomCore } from './utils/enterRoomCore';
const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name, roomKey } = event.body as any;
  
  const {token, questionData} = await enterRoomCore(playerId, name, roomKey, prisma);

  await prisma.$disconnect();

  return {
    body: JSON.stringify({
      token,
      questionData
    }),
    statusCode: 200,
  }
})

handler
  .use(httpJsonBodyParser())
  .use(checkAuth())
  .use(validateEventSchema(Joi.object({
    playerId: Joi.string(),
    name: Joi.string().required(),
    roomKey: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler;