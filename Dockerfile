# 基础镜像：官方 Node.js 20 的 alpine 精简版（约 50MB）
FROM node:20-alpine

# 容器内的工作目录，后面的命令都在 /app 下执行
WORKDIR /app

# 生产模式
ENV NODE_ENV=production
# 待办数据保存的目录（docker-compose.yml 会把数据卷挂载到这里）
ENV DATA_DIR=/app/data

# 先只复制 package.json：它很少变，这一层能被缓存
COPY app/package.json ./

# 再复制程序代码（测试文件已在 .dockerignore 里排除，不会进入镜像）
COPY app/ ./

# 创建数据目录并交给 node 用户，否则非 root 用户写不进去
RUN mkdir -p /app/data && chown -R node:node /app/data

# 声明容器监听 3000 端口（真正的端口映射在 docker-compose.yml）
EXPOSE 3000

# 健康检查：每 30 秒用 wget 访问一次 /health，连续 3 次失败标记为 unhealthy
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

# 用镜像自带的非 root 用户 node 运行，更安全
USER node

# 启动命令（exec 格式，node 能直接收到 SIGTERM 实现优雅退出）
CMD ["node", "server.js"]
