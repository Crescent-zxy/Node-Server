getCSS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/style')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const style = document.createElement('style')
                style.innerHTML = request.response
                document.head.appendChild(style)
            }
        }
    }
    request.send()
}
getHTML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/2')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const template = document.createElement('template')
                template.innerHTML = request.response.trim()
                document.body.appendChild(template.content.firstChild)
            }
        }
    }
    request.send()
}
getJS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/3')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const script = document.createElement('script')
                script.innerHTML = request.response
                document.body.appendChild(script)
            }
        }
    }
    request.send()
}
getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/4')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const dom = request.responseXML
                const text = dom.getElementsByTagName('warning')[0]
                document.body.appendChild(text)
            }
        }
    }
    request.send()
}
getJSON.onclick = () => {
    const request = new XMLHttpRequest
    request.open('GET', '/5')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const data = JSON.parse(request.response)
                userName.innerText = data.name
            }
        }
    }
    request.send()
}
let n = 1
getPage.onclick = () => {
    const request = new XMLHttpRequest
    request.open('GET', `/page${n+1}`)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const data = JSON.parse(request.response)
                const elements = data.forEach(item => {
                    const li = document.createElement('li')
                    li.textContent = item.id
                    xxx.appendChild(li);
                })
                n++
                if (n === 3) {
                    getPage.disabled = true
                }
            }
        }
    }
    request.send()
}