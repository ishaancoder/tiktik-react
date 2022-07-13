// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { singleUserQuery,userCreatedPostsQuery,userLikedPostsQuery } from '../../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method)
  if(req.method === 'GET')
  {
    console.log("entered")
    const { id } = req.query

    
    const query = await singleUserQuery(id)
    const queryVideoQuery = await userCreatedPostsQuery(id)
    const queryLikedQuery = await userLikedPostsQuery(id)

    const user = await client.fetch(query)
    const userVideos = await client.fetch(queryVideoQuery)
    const userLiked = await client.fetch(queryLikedQuery)
    
    console.log("User ",user)

    res.status(200).json({user :user[0] ,userVideos,userLiked})
  }
}