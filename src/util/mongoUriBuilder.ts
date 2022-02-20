export default function mongoUriBuilder(params?) {
  const db = params?.db
  const host = params?.host
  return `mongodb://${host}/${db}`
}
