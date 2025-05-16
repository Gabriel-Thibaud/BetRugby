import { prisma } from '../prisma/client';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';


export class GameService {
    constructor(private db = prisma) { }

}