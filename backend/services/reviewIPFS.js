import { create } from 'ipfs-http-client'
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' })

export async function storeReview(review) {
  const { cid } = await ipfs.add(JSON.stringify(review))
  return cid.toString()
}
