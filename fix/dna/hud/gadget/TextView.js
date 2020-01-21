'use strict'

// @depends(/dna/hud/Container)
const Container = dna.hud.Container
// @depends(/dna/hud/gadget/Slider)
const Slider = dna.hud.gadget.Slider
// @depends(/dna/hud/gadget/TextPane)
const TextPane = dna.hud.gadget.TextPane

let instances = 0

function TextView(st) {
    if (!this.name) this.name = 'textView' + ++instances

    this.clip = true
    this.disabled = false
    this.hidden = false
    this.opaque = true

    this.pos = 0
    this.max = 100
    this.span = 40

    Container.call(this, st)

    this.attach(new Slider({
        name: 'slider',
        x: 0,
        y: 0,
        w: 15,
        h: this.h,
        onScroll: (pos) => {
            this.pane.ty = Math.round(this.slider.pos)
        },
    }))

    this.attach(new TextPane({
        name: 'pane',
        text: st.text,
    }))
}
TextView.prototype = Object.create(Container.prototype)

TextView.prototype.adjust = function() {
    if (!this.slider || !this.pane) return

    this.pane.x = this.slider.w
    this.pane.y = 0
    this.pane.w = this.w - this.slider.w
    this.pane.h = this.h
    this.pane.adjust()

    this.slider.h = this.h
    this.slider.span = this.h
    this.slider.step = this.slider.span/2
    this.slider.max = this.pane.page.h
    this.span = Math.floor(this.slider.span)

    /*
    this.slider.h = this.h
    this.slider.span = this.h/(this.baseHeight + this.itemsPadding)
    this.slider.step = this.slider.span/2
    this.slider.max = this.max + 1
    this.span = Math.floor(this.slider.span)
    */
}

/*
TextView.prototype.drawContent = function() {
    fill(.2, .6, .7)
    rect(10, 10, 40, 40)
}
*/
