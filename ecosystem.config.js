module.exports = {
  apps: [{
    name: 'zeeremind-frontend',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3002',
    
    // Environment
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    },
    
    // Instances
    instances: 1,
    exec_mode: 'cluster',
    
    // Restart behavior
    watch: false,
    max_memory_restart: '300M',
    
    // Logging
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    
    // Advanced
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000,
    
    // Environment file
    env_file: '.env.local'
  }]
};
