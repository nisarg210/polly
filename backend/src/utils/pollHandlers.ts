import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy, { MiddlewareObject } from 'middy'; // Import Middy
import { checkAuth, checkAuthInput } from './checkAuth';

// type for the middleware
type MiddlewareType = middy.MiddlewareObject<APIGatewayProxyEvent, APIGatewayProxyResult>;

// Lambda handler function for creating a poll
const createPollHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Ensuring that event.body is not null or undefined
    if (!event.body) {
        return {
            statusCode: 400, // Bad Request
            body: JSON.stringify({ error: 'Missing request body' }),
        };
    }

    try {
        // Safely parse the JSON
        const body = JSON.parse(event.body);

        // Continue with creating the poll after successful JSON parsing
        // ...

        // Replacing this with Prisma or database code to create the poll
        // ...

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Poll created successfully' }),
        };
    } catch (error: any) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};

//checkAuth middleware to check authentication
const middlewareOptions: checkAuthInput = {
    blockExecution: true,
};
const authMiddleware: MiddlewareType = {
    before: (handler, next) => {
        // Apply the checkAuth middleware
        checkAuth(middlewareOptions)(handler.event, handler.context, (error) => {
            if (error) {
                return handler.callback(null, {
                    statusCode: 401,
                    body: JSON.stringify({ error: 'Unauthorized' }),
                });
            }
            return next();
        });
    },
};

// authentication middleware to the Lambda handler
const handler = middy(createPollHandler).use(authMiddleware);

export { handler };
