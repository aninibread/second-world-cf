
export const runtime = 'edge';

async function getCatImageKeys() {

  const catR2Bucket = process.env.CAT_R2_BUCKET;

  if (!catR2Bucket) {
    return res.status(500).json({ message: 'R2 Bucket not configured' });
  }

  const catImageKeys = await catR2Bucket.list();

  return catImageKeys.objects.map(({ key }) => {
    return key;
  });

}

export default async function GET() {
	return Response.json({ imageKeys: await getCatImageKeys() });
}