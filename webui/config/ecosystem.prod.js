module.exports = {
    apps: [
        {
            name: 'WEBUI',
            script: 'dist/index.js',
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