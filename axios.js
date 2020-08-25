// // 发送 POST 请求
// axios({
//   method: 'post',
//   url: '/user/12345',
//   baseURL: '',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   },
//   headers: {
//     "content-type":"application/x-www-form-urlencoded"
//   },
//   params: {
//     ID: 12345
//   },
// });
// const request = new Request('http://yuanjin.tech:5005/api/movie')
// var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

function axios(config) {
  const method = config.method.toLowerCase() || 'get'
  const baseURL = config.baseURL || ''
  const url = config.url || ''
  const data = config.data || {}
  const originHeaders = config.headers || {}
  const headers = Object.assign({}, originHeaders, {
    "Content-Type": "application/x-www-form-urlencoded"
  })
  const params = config.params || null

  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  if (method === 'get') {
    const lastParams = paramsToString(params)
    const lastUrl = baseURL + url + lastParams
    xhr.open(method, lastUrl, true)
    for (const header in headers) {
      xhr.setRequestHeader(header, headers[header])
    }
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState)
    }
    xhr.send(null)
  } else if (method === 'post') {
    xhr.open(method, baseURL + url, true)
    for (const header in headers) {
      xhr.setRequestHeader(header, headers[header])
    }
    xhr.send(data)
  }
}

function paramsToString(params) {
  if (Object.getPrototypeOf(params) !== Object.prototype) {
    return;
  }
  let arr = []
  for (const key in params) {
    arr.push(`${key}=${params[key]}`)
  }
  return arr.length > 0 ? `?${arr.join('&')}` : ''
}
