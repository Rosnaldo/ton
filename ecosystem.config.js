module.exports = {
  apps: [
    {
      script: './dist/main.js',
      watch: '.',
      env: {
        NODE_ENV: 'PROD',
      },
    },
  ],
}
