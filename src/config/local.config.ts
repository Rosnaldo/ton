export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  domain: process.env.DOMAIN_REST || 'http://localhost:3001',
  whitelist: [/https?:\/\/(localhost|192\.168\.[\d]{1,3}\.[\d]{1,3}):([34]00[0-2]|7004|80[09][0-2]|9000)/],
})
