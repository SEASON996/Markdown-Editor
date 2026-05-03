import hljs from 'highlight.js/lib/core'

// 导入需要的语言
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import typescript from 'highlight.js/lib/languages/typescript'
import java from 'highlight.js/lib/languages/java'
import csharp from 'highlight.js/lib/languages/csharp'
import cpp from 'highlight.js/lib/languages/cpp'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
// ... 按需导入其他语言

// 注册语言及别名
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('jsx', javascript)

hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('shell', bash)

hljs.registerLanguage('html', xml)
hljs.registerLanguage('htm', xml)
hljs.registerLanguage('xml', xml)

hljs.registerLanguage('css', css)

hljs.registerLanguage('json', json)

hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('text', plaintext)
hljs.registerLanguage('txt', plaintext)

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)

hljs.registerLanguage('java', java)
hljs.registerLanguage('csharp', csharp)

hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('c++', cpp)

hljs.registerLanguage('go', go)
hljs.registerLanguage('golang', go)

hljs.registerLanguage('rust', rust)
hljs.registerLanguage('rs', rust)

// 导出
export default hljs
