import Joi from 'joi';
import cors from '@middy/http-cors';
import { fetchRoomData } from './utils/fetchRoomData';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {  PrismaClient } from '@prisma/client'
import httpErrorHandler from '@middy/http-error-handler';
import { validateEventSchema } from './utils/validateEventSchema';
import { fetchAnalytics } from './utils/fetchAnalytics';
import { fetchQuestionText } from './utils/fetchQuestionText';

const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const {roomId } = event.body as any;
  
  const questionText = await fetchQuestionText(roomId, prisma);
  // console.log(questionData)
  await prisma.$disconnect();

  return {
    body: JSON.stringify({
        questionText
    }),
    statusCode: 200,
  }
})

handler
  .use(httpJsonBodyParser())
//   .use(checkAuth())
  .use(validateEventSchema(Joi.object({
    roomId: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler;




