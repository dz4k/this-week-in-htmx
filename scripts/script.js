
Object.setPrototypeOf(NodeList.prototype, Array.prototype)

// Collapsing navigation
{
    console.log('asdasd')

    let 
        $nav = document.querySelector('.site-header'),
        $menuButton = document.querySelector('.menu-button')
        
    let isOpen = false
    let clientHeight = $nav.clientHeight

    function update() {
        const overflows = $nav.scrollHeight > clientHeight
        $menuButton.style.display = overflows ? 'block' : 'none'
        if (!overflows) toggle(false)
    }

    window.addEventListener('resize', update)
    update()

    function toggle(doOpen) {
        if (doOpen === isOpen) return
        isOpen = doOpen
        const
            openFrame =   { maxHeight: $nav.scrollHeight + 'px', backgroundColor: 'black' },
            closedFrame = { maxHeight: clientHeight      + 'px', backgroundColor: 'transparent' }
            $nav.animate([
                isOpen ? openFrame : closedFrame,
            ], { duration: 200, easing: 'ease-in-out', fill: 'forwards' })
    }

    $menuButton.addEventListener('click', e => {
        toggle(!isOpen);
    })
}

// Navigation animation
{
    const inFrame =  { transform: 'translateX(3rem)',  opacity: 0 }
    const outFrame = { transform: 'translateX(-3rem)', opacity: 0 }
    const animOptions = { duration: 200, easing: 'ease-in-out' }

    function animate() {
        return Promise.all(
            [...document.querySelectorAll('.page-head > *')]
                .map($el => $el.animate(...arguments).finished))
    }

    document.addEventListener('htmx:beforeRequest', e => {
        if (e.detail.target === document.body) animate([{}, outFrame], { ...animOptions, fill: 'forwards' })
    })

    document.addEventListener('htmx:historyRestore', e => {
        animate([outFrame, {}], animOptions)
    })

    function installBackAnimation() {
        if (installBackAnimation.done) return
        const onpopstate_old = onpopstate
        window.onpopstate = e => {
            animate([{}, inFrame], { ...animOptions, fill: 'forwards' })
            onpopstate_old(e)
        }
        installBackAnimation.done = true
    }
        
    document.body.addEventListener('htmx:afterSwap', e => {
        installBackAnimation()
        if (e.target === document.body) animate([inFrame, {}], animOptions)
    })
}