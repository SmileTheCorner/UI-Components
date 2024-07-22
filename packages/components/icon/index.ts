// const iconMap: Map<String, any> = new Map()
// const icons = import.meta.glob('../../packages/static/icons/*.svg')
// Object.keys(icons).map(async (key) => {
//   const iconComponent = await import(key)
//   const fileName = key.substring(key.lastIndexOf('/') + 1).split(".")[0]
//   const name = fileName.substring(0, fileName.lastIndexOf('-'))
//   iconMap.set(name, iconComponent)
// })
// export default iconMap

//引入所有文件
const requireAll = (requireContext) => {
  const context = Object.values(requireContext)
  return context
}

//引入所有的svg图标
const icons = import.meta.glob("../../packages/static/icons/*.svg")

//调用requireAll方法
requireAll(icons)
