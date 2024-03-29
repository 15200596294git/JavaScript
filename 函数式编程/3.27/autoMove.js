// project/projecta发生改变时
// 将projecta移动到projectb
import { watch, rmdir } from 'node:fs/promises'

// 监听文件夹
// 删除文件夹
// 移动文件夹
const targetFileUrl = './projects/projecta'
function watchProject(url) {
  return watch(url)
}

function deleteDir() {}

function copyTo(origin, target) {}

watchProject(targetFileUrl)






