module.exports = {
    apps: [
        {
            name: 'WEBUI:BACKEND:DEV',
            script: 'server/index.js',
            args: '',
            instances: 1,
            autorestart: true,
            detached: true,
            watch: true,
            exec_mode: 'fork',
            node_args: [            
            ],
            env: {
                NODE_ENV: 'development',
                http_proxy: '',
                https_proxy: ''
            },
            env_test: {
                NODE_ENV: 'test',
                BABEL_ENV : 'test',
                http_proxy: '',
                https_proxy: ''
            }
        }
    ]
}