/**封装 AJAX */
const ajax = (method, url) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url)
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(null, request)
                } else {
                    reject.call(null, request)
                }
            }
        }
        request.send()
    })
}
/**封装 AJAX */

getCSS.onclick = () => {
    ajax('GET', '/style').then(request => {
        const style = document.createElement('style')
        style.innerHTML = request.response
        document.head.appendChild(style)
    })
}

getHTML.onclick = () => {
    ajax('GET', '/2').then(request => {
        const template = document.createElement('template')
        template.innerHTML = request.response.trim()
        document.body.appendChild(template.content.firstChild)
    })
}

getJS.onclick = () => {
    ajax('GET', '/3').then(request => {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    })
}

getXML.onclick = () => {
    ajax('GET', '/4').then(request => {
        const dom = request.responseXML
        const text = dom.getElementsByTagName('warning')[0]
        document.body.appendChild(text)
    })
}

getJSON.onclick = () => {
    ajax('GET', '/5').then(request => {
        const data = JSON.parse(request.response)
        userName.innerText = data.name
    })
}

let n = 1
getPage.onclick = () => {
    ajax('GET', `/page${n+1}`).then(request => {
        const data = JSON.parse(request.response)
        data.forEach(item => {
            const li = document.createElement('li')
            li.textContent = item.id
            xxx.appendChild(li);
        })
        n++
        if (n === 3) {
            getPage.disabled = true
        }
    })
}