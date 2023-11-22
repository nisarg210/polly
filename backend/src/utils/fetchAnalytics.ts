import { PrismaClient, QuestionType } from '@prisma/client';

export async function fetchAnalytics(roomId: string, prisma = new PrismaClient()) {

  const mcqQuestionIds = (await prisma.question.findMany({
    where: {
      roomId,
    },
    select: {
      id: true,
    }
  })).map((question) => question.id);

  const mcqQuestionData = await prisma.mCQQuestionPlayerAnswer.groupBy({

    by: ['answerId', 'qid'],
    having: {
      qid: {
        in: mcqQuestionIds
      }
    },
    _count: {
      answerId: true,
    }
  });

  const res: any = {};

  for(let questionId of mcqQuestionIds) {
    const options = await prisma.mCQOption.findMany({
      where: {
        questionId,
      }
    })
    
    const question= await prisma.mCQQuestion.findUnique({
      where:{
        qid:questionId,
      }
    })
  console.log(question?.description, "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    const optionsWithCount = options.map((option) => {

      const optionCount = mcqQuestionData.filter((_mcqQuestionData) => _mcqQuestionData.answerId === option.id && _mcqQuestionData.qid === questionId) 

      return {

        id: option.id,
        ques: (question)? question.description : "",
        description: option.description,
        count: (optionCount && optionCount.length) ? optionCount[0]._count['answerId'] : 0,
      }
    })

    res[questionId] = optionsWithCount;
    
  }
  
  // console.log(res);
    
  // const mcqQuestionOptions = awiat prisma.

  return res;

}