import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 如果仓库名称是 username.github.io，base 应该是 '/'
// 否则 base 应该是 '/仓库名称/'
// 可以通过环境变量 GITHUB_REPOSITORY 获取，格式为 'owner/repo'
const getBase = () => {
  if (process.env.GITHUB_ACTIONS) {
    const repo = process.env.GITHUB_REPOSITORY || ''
    const repoName = repo.split('/')[1] || 'NY'
    // 如果仓库名以 .github.io 结尾，说明是用户页面，base 为 '/'
    if (repoName.endsWith('.github.io')) {
      return '/'
    }
    return `/${repoName}/`
  }
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBase(),
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
