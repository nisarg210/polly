import { PrismaClient, QuestionType } from '@prisma/client';

export async function fetchQuestionText(roomId: string, prisma = new PrismaClient()) {

  const mcqQuestionIds = (await prisma.question.findMany({
    where: {
      roomId,
    },
    select: {
      id: true,
    }
  })).map((question) => question.id);

 
  const res: any = [];

  for(let questionId of mcqQuestionIds) {
    const questionText = (await prisma.mCQQuestion.findMany({
        where: {
          qid: questionId,
        },
        select: {
          description: true,
        }
      })).map((question) => question.description);
      res.push(questionText[0])
  }
  
   console.log(res);
    
  // const mcqQuestionOptions = awiat prisma.

  return res;

}