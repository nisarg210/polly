import { PrismaClient, QuestionType } from '@prisma/client';

export async function loginUser(userId: string, password: string, prisma = new PrismaClient()) {

  const user = (await prisma.user.findOne({
    where: {
      userId,
    },
    select: {
      id: true,
    }
  })).map((user) => user.id);

  const res: any = {};

  if(user.password == password){
    res["loggedIn"] = true;
    res["userId"] = user.id;
  } else{
    res["loggedIn"] = false;
    res["userId"] = null;
  }

  return res;
}