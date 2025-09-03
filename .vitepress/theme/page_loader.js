export function initPageLoader() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const loader = document.createElement('div')
  loader.id = 'app-loader'
  loader.innerHTML = `
    <div class="loader"></div>
    <div class="loader-text"></div>
    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
    <div class="progress-percent">0%</div>
    <div class="kc-logo"></div>
  `
  document.body.appendChild(loader)

  const progressBar = loader.querySelector('.progress-bar')
  const progressText = loader.querySelector('.progress-percent')

  const messages = [
    '正在逃离不可解空间',
    '转换片段中',
    '调查「Q」事件中',
    '收集记忆之卵中',
    '前往观测室...',
    '与破维魔战斗...',
    '正在窥探未来',
    '改写命运中',
    '魔女之子集结中...'
  ]
  const textContainer = loader.querySelector('.loader-text')
  let currentText = 0
  messages.forEach(msg => {
    const span = document.createElement('span')
    span.textContent = msg
    textContainer.appendChild(span)
  })
  const spans = Array.from(textContainer.children)
  function showNextText() {
    spans.forEach(s => {
      s.style.opacity = '0'
      s.style.transform = 'translateY(20px)'
    })

    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * spans.length)
    } while (randomIndex === currentText)

    const cur = spans[randomIndex]
    cur.style.opacity = '1'
    cur.style.transform = 'translateY(0)'

    currentText = randomIndex
  }
  showNextText()
  const textInterval = setInterval(showNextText, 2000)

  let progress = 0
  const targetBeforeLoad = 30
  const speed = 1
  const intervalId = setInterval(() => {
    if (progress < targetBeforeLoad) {
      progress += speed
      progressBar.style.width = progress + '%'
      progressText.textContent = progress + '%'
    }
  }, 50)

  window.addEventListener('load', () => {
    clearInterval(intervalId)
    const finalInterval = setInterval(() => {
      if (progress < 100) {
        progress += speed
        progressBar.style.width = progress + '%'
        progressText.textContent = progress + '%'
      } else {
        clearInterval(finalInterval)
        setTimeout(() => {
          clearInterval(textInterval)
          loader.classList.add('fade-out')
          setTimeout(() => {
            loader.remove()
            document.documentElement.classList.add("loaded")
          }, 600)
        }, 1000)
      }
    }, 20)
  })
}