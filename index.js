const postcss = require('postcss');

module.exports = postcss.plugin('postcss-global-ns', opts => {
  opts = opts || {};
  let globalClsNames = opts.hasOwnProperty('globalClsNames') && opts.globalClsNames
  return root => {
		root.walk(node => {
			let selectorArr = (node.selector || '').split(',')
			return node.selector = ((selectorArr || []).map((itm) => {
				if (itm.match(/^(\s*)(html|body)(\s*)$/)) {
					return itm
        }
        let clsName = globalClsNames.find(v=>{
          return root.source && root.source.input.file.indexOf(v.filePath) >=0
        })
        if(clsName){
          return clsName.selector + ' ' + itm
        } else {
          return itm
        }
			}).join(','))
		})
	};

})