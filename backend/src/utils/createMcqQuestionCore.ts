import {PrismaClient, QuestionType} from '@prisma/client';
import createHttpError from 'http-errors';
import {verifyHost} from './verifyHost';

export async function createMcqQuestionCore(
  playerId: string | undefined,
  roomId: string | undefined,
  title: string | undefined,
  options: string[] | undefined,
  correctAnswer: number | undefined,
  prisma = new PrismaClient()
) {
  //allowing undefined as a type in parameters and throwing error.
  if (playerId === undefined) {
    throw new Error('Player is undefined');
  }
  if (roomId === undefined) {
    throw new Error('Room is undefined');
  }
  if (title === undefined) {
    throw new Error('Title is undefined');
  }
  if (options === undefined) {
    throw new Error('Option is undefined');
  }
  if (correctAnswer === undefined) {
    throw new Error('Answer is undefined');
  }
  if (!(await verifyHost(playerId, roomId, prisma))) {
    throw new createHttpError.Forbidden('Not allowed');
  }

  const question = await prisma.question.create({
    data: {
      roomId,
      questionType: QuestionType.MCQ,
      mcqQuestion: {
        create: {
          description: title,
          correctAnswer: correctAnswer,
        },
      },
    },
  });

  const _options = await prisma.mCQOption.createMany({
    data: options.map((option: string) => {
      return {
        description: option,
        questionId: question.id,
      };
    }),
  });

  return {question, options};
}
