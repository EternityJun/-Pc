import themeArray from './themeArray'

// 切换主题
export function changeTheme (themeValue) {
  let cssArray = themeArray

  removeCss()

  for (let i = 0, len = cssArray.length; i < len; i++) {
    let itemPath = '../../static/theme/' + themeValue + '/' + cssArray[i].toLowerCase() + '.css'
    loadCss(itemPath)
  }

  sessionStorage.setItem('themeValue', themeValue)

  function loadCss (path) {
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.href = path
    link.rel = 'stylesheet'
    link.type = 'text/css'
    head.appendChild(link)
  }

  function removeCss (href) {
    const links = document.getElementsByTagName('link')
    const head = document.getElementsByTagName('head')[0]
    let arr = []
    if (links && links.length > 0) {
      for (let i = 0, len = links.length; i < len; i++) {
        if (links[i]) {
          arr.push(links[i])
        }
      }
      for (let i = 0, len = arr.length; i < len; i++) {
        head.removeChild(arr[i])
      }
    }
  }
}
