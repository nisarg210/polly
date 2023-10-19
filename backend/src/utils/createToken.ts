import jwt from 'jsonwebtoken';
export function createToken(playerId: string): string {

  //return jwt.sign({playerId}, process.env.JWT_SECRET!);
  
  return jwt.sign({playerId}, 'secret');
}
