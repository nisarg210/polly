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
const SMTPClient = require('smtp-client').SMTPClient;
const prisma = new PrismaClient();
import * as net from 'net';
import * as tls from 'tls';

interface SmtpConfig {
  host: string;
  port: number;
  useTLS: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface MailData {
  from: string;
  subject: string;
  body: string;
}

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const {emaillist } = event.body as any;
  const smtpConfig: SmtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    useTLS: true,
    auth: {
      user: `${process.env.MAIL_USERNAME}`,
      pass: `${process.env.MAIL_PASSWORD}`,
    },
  };
  
  const mailData: MailData = {
    from: 'simplii043@gmail.com',
    subject: 'Test Email',
    body: 'Hello, this is a test email!',
  };
  function sendEmailToRecipient(recipient: string) {
    const connectionOptions: net.TcpSocketConnectOpts = {
      port: smtpConfig.port,
      host: smtpConfig.host,
    };
  
    const client = smtpConfig.useTLS ? tls.connect(connectionOptions) : net.connect(connectionOptions);
  
    client.on('data', (data) => {
      const response: string = data.toString();
      console.log(response);
  
      if (response.startsWith('220')) {
        client.write(`EHLO ${smtpConfig.host}\r\n`);
      }
  
      if (response.startsWith('250')) {
        client.write(`AUTH LOGIN\r\n`);
      }
  
      if (response.startsWith('334')) {
        client.write(`${Buffer.from(smtpConfig.auth.user).toString('base64')}\r\n`);
      }
  
      if (response.startsWith('334')) {
        client.write(`${Buffer.from(smtpConfig.auth.pass).toString('base64')}\r\n`);
      }
  
      if (response.startsWith('235')) {
        client.write(`MAIL FROM:<${mailData.from}>\r\n`);
      }
  
      if (response.startsWith('250')) {
        client.write(`RCPT TO:<${recipient}>\r\n`);
      }
  
      if (response.startsWith('250')) {
        client.write('DATA\r\n');
      }
  
      if (response.startsWith('354')) {
        client.write(`Subject: ${mailData.subject}\r\n`);
        client.write(`From: ${mailData.from}\r\n`);
        client.write(`To: ${recipient}\r\n`);
        client.write('\r\n');
        client.write(`${mailData.body}\r\n`);
        client.write('.\r\n');
      }
  
      if (response.startsWith('250')) {
        client.write('QUIT\r\n');
      }
    });
  
    client.on('close', () => {
      console.log(`Connection closed for ${recipient}`);
    });
  
    client.on('error', (err) => {
      console.error(`Error for ${recipient}:`, err);
    });
  }
  for (const recipient of emaillist) {
    sendEmailToRecipient(recipient);
  }
  return {
    body: JSON.stringify({
        emailStatus:"sent"
    }),
    statusCode: 200,
  }
})

handler
  .use(httpJsonBodyParser())
//   .use(checkAuth())
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler;




