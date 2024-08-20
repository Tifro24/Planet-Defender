const canvas = document.getElementById('grid')
const c = canvas.getContext("2d")


canvas.width = 1024
canvas.height = 576
c.fillStyle = 'blue'
c.fillRect(0,0,canvas.width, canvas.height)

c.fillStyle = 'red'
c.fillRect(0,0,canvas.width,150)

const gravity = 0.6

class Char{
    constructor({position, velocity, width, height, color}){
        this.position = position
        this.velocity = velocity
        this.height = height
        this.width = width
        this.color = color
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    update(){
        this.draw()
        
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100){
            this.velocity.y = 0
        } else this.velocity.y += gravity

        

        
    }
}

const char1 = new Char({
    position:{
        x: 457,
        y: 0
    },
    velocity:{
        x:0,
        y:0
    },
    width : 110,
    height: 50,
    color: 'yellow',
    
})

let lastKey

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    AR:{
        pressed: false
    },
    AL:{
        pressed: false
    }
    
}



function animate(){
    c.fillStyle = 'blue'
    c.fillRect(0,0,canvas.width, canvas.height)
    c.fillStyle = 'red'
    c.fillRect(0,476,canvas.width,100)
    char1.update()
    window.requestAnimationFrame(animate)

    char1.velocity.x = 0

    if (keys.a.pressed && lastKey == 'a' || keys.AL.pressed && lastKey == 'AL'){
        char1.velocity.x = -4
    } else if (keys.d.pressed && lastKey == 'd'|| keys.AR.pressed && lastKey == 'AR'){
        char1.velocity.x = 4}

    
    
}

animate()





window.addEventListener('keydown', (event) =>{
    switch(event.key){
        case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break


        case 'ArrowRight':
        keys.AR.pressed = true
         lastKey = 'AR'
        break
        case 'ArrowLeft':
        keys.AL.pressed = true
        lastKey = 'AL'
        break
    }
console.log(event.key)
})

window.addEventListener('keyup', (event) =>{
    switch(event.key){
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break

        
        case 'ArrowRight':
        keys.AR.pressed = false
        break
        case 'ArrowLeft':
        keys.AL.pressed = false
        break
    }
console.log(event.key)
})
