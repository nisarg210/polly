import { Prisma, PrismaClient } from '@prisma/client';
import { createRoomCore } from '../src/utils/createRoomCore';

// Add custom matcher to namespace to avoid TS errors
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidCreateRoomResponse(): CustomMatcherResult;
    }
  }
}

let prisma:PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

beforeAll(() => {
  
  prisma = new PrismaClient();      // Initialize db connection
})

afterAll(() => {
  
  prisma.$disconnect();             // Cleanup db connection
})

// Create custom matcher to test a valid function reponse
expect.extend({
  toBeValidCreateRoomResponse(response) {
    if (response && response.room && response.token && response.room.id) {
      return {
        pass: true,
        message: () => 'Valid response'
      }
    }

    return {
      pass: false,
      message: () => 'Invalid response'
    }
  }
})

test('valid params non existent user', async () => {

  const res = await createRoomCore(undefined, "test name", "test title", prisma);
  expect(res).toBeValidCreateRoomResponse();

})

test('valid params already existing user', async () => {

  // Create valid user to test
  const { id } = await prisma.player.create({
    data: {
      name: "foo",
    },
    select: {
      id: true,
    }
  })

  const res = await createRoomCore(id, "foo", "foo bar");
  expect(res).toBeValidCreateRoomResponse();

})
