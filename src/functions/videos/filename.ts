export async function onRequest({ params, env }: any) {
  const { filename } = params

  const object = await env.VIDEOS.get(`videoLandingpage/video/${filename}`)

  if (!object) {
    return new Response("Video not found", { status: 404 })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set("Content-Type", "video/mp4")
  headers.set("Cache-Control", "public, max-age=31536000, immutable")

  return new Response(object.body, { headers })
}
