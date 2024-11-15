// window.onload = () => document.body.innerText += 'EDGE'
window.onload = () => {
    appendImage()
    animate()

    setTimeout(() => {
        document.querySelectorAll('.img-peace').forEach(el => {
            el.style.setProperty('animation-play-state', 'paused')
        })
    }, 5000);
    setTimeout(() => {
        document.querySelectorAll('.img-peace').forEach(el => {
            el.style.setProperty('animation-play-state', 'running')
        })
    }, 7000);
}

function appendImage() {
    let img = Object.assign(document.createElement('img'), {
        id: 'fimg',
        src: 'img.jpeg',
        width: 400,
        height: 400,
        alt: 'main-image',
    })
    // img.style.position = 'relative'

    // const myArray = Array.apply(null, Array(25)).map((u, i) => document.createElement('span'))

    const positionX = (i) => `${i % 5 * 20}%`
    const positionY = (i) => `${Math.trunc(i / 5) * 20}%`
    const positionBg = (i) => `${Math.trunc(i % 5) * 25}% ${Math.trunc(i / 5) * 25}%`

    const imgPeaceArr = Array.apply(null, Array(25)).map((u, i) => {
        let e = document.createElement('span')
        e.id = i
        e.classList.add('img-peace')
        e.style.width = '80px'
        e.style.height = '80px'
        e.style.backgroundImage = `url('img.jpeg')`
        e.style.backgroundSize = `400px 400px`
        e.style.backgroundPosition = `00% 00%`
        e.style.position = `absolute`
        e.style.setProperty('--s', Math.random())
        e.style.setProperty('--b', Math.random()*20)
        e.style.setProperty('--g', Math.random()*100)
        e.style.setProperty('--r', Math.random()*180)
        e.style.setProperty('--z', Math.random()*700)
        e.style.setProperty('--x', Math.random()*700)
        e.style.setProperty('--y', Math.random()*700)
        e.style.backgroundPosition = positionBg(i)
        e.style.top = positionY(i)
        e.style.left = positionX(i)

        return e
    })

    // document.getElementById('canvas').appendChild(img)
    imgPeaceArr.forEach(element => document.getElementById('canvas')?.appendChild(element));

    // console.log(imgPeaceArr);
}

function animate() {
    const imgPeaces = document.querySelectorAll('.img-peace')
}