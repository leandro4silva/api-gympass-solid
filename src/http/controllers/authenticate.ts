import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentials } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(200).send()
}
