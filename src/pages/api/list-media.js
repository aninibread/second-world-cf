import { getCloudflareContext } from "@opennextjs/cloudflare";

async function getCatImageKeys() {
  const { env } = await getCloudflareContext({ async: true });
  const catR2Bucket = env.CAT_R2_BUCKET;

  if (!catR2Bucket) {
    throw new Error("R2 Bucket not configured");
  }

  const catImageKeys = await catR2Bucket.list();

  return catImageKeys.objects.map(({ key }) => key);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const imageKeys = await getCatImageKeys();
    return res.status(200).json({ imageKeys });
  } catch (error) {
    console.error("Error listing cat media:", error);
    return res.status(500).json({ message: "Failed to list cat media" });
  }
}
