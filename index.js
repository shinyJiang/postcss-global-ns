const postcss = require('postcss')

module.exports = postcss.plugin('postcss-global-ns', opts => {
  opts = opts || {}
  let globalClsNames = Array.isArray(opts.globalClsNames) ? opts.globalClsNames : []
  return root => {
    root.walk(node => {
      let selectorArr = (node.selector || '').split(',')
      return node.selector = ((selectorArr || []).map((item) => {
        if (item.match(/^(\s*)(html|body)(\s*)$/)) {
          return item
        }
        let clsName = globalClsNames.find(v => {
          return root.source && root.source.input.file.indexOf(v.filePath) >= 0
        })
        if (clsName) {
          return clsName.selector + ' ' + item
        } else {
          return item
        }
      }).join(','))
    })
  }
})