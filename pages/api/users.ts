

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { allUsersQuery } from '../../utils/queries'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET')
  {
    const query = allUsersQuery()

    console.log("GET /api/users")


    const data = await client.fetch(query)

    if(data) {
            res.status(200).json(data)

    }



  } 
}