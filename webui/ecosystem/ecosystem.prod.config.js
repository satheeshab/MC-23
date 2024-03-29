module.exports = {
    apps: [
        {
            name: 'WEBUI:BACKEND:PROD',
            script: 'src/server.js',
            args: '',
            instances: 1,
            autorestart: true,
            detached: true,
            watch: false,
            exec_mode: 'fork',
            node_args: [],
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}