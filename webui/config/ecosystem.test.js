module.exports = {
    apps: [
        {
            name: 'WEBUI',
            script: 'server/index.js',
            args: '',
            instances: 1,
            autorestart: true,
            detached: true,
            watch: 'server',
            exec_mode: 'fork',
            node_args: [],         
            env: {
                NODE_ENV: 'test',
                BABEL_ENV: 'test',
                http_proxy: '',
                https_proxy: ''
            }
        }
    ]
}