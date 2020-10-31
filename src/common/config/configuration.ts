export default () => ({
    app: {
        port: Number(process.env.APP_PORT),
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    cache: {
        ttl: Number(process.env.CACHE_TTL),
        size: Number(process.env.CACHE_SIZE),
        redis: process.env.CACHE_REDIS_HOST
    },
    github: {
        url: process.env.GITHUB_BASE_API_URL
    }
});