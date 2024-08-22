const canvas = document.getElementById('grid')
const c = canvas.getContext("2d")
const menu = document.querySelector('.menu')


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

class Rocks extends Char{
    constructor({position, velocity, width, height, color}){
        super({position, velocity, width, height, color})
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
    }


}

const rock = new Rocks({
    position:{
        x: 50,
        y: -40
    },
    velocity:{
        y: 1
    },
    width: 27,
    height: 27,
    color: 'red'
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


let gameStart = false


function animate(){
    c.fillStyle = 'blue'
    c.fillRect(0,0,canvas.width, canvas.height)
    c.fillStyle = 'red'
    c.fillRect(0,476,canvas.width,100)
    char1.update()
    
    window.requestAnimationFrame(animate)

if(gameStart){
    movement() 
    rock.update()
}


   

    

}

animate()

function movement(){
    if (keys.a.pressed && lastKey == 'a' || keys.AL.pressed && lastKey == 'AL'){
        char1.velocity.x = -4
    } else if (keys.d.pressed && lastKey == 'd'|| keys.AR.pressed && lastKey == 'AR'){
        char1.velocity.x = 4}
    else  char1.velocity.x = 0
}






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

 displayMenu = () =>{
    menu.style.display = 'block'
 }

setTimeout(displayMenu, 950)

playClick = () =>{
    menu.style.display = 'none'
    console.log('playclicked')
    gameStart = true
}


