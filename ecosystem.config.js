module.exports = {
  apps: [
    {
      name: 'mi-app-2',
      script: 'node_modules/ts-node/dist/bin.js',
      args: './src/index.ts',
      watch: true,
      ignore_watch: ["node_modules"],
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
    }
  ]
};