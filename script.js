// creating canvas and size
const canvas = document.getElementById('grid')
const c = canvas.getContext("2d")
const menu = document.querySelector('.menu')
const playerHp = document.querySelector('#playerHp')
const score = document.querySelector('#scoreNum')
const finalScore = document.querySelector('#goText')
const title = document.querySelector('#title')


canvas.width = 1024
canvas.height = 576
c.fillStyle = 'blue'
c.fillRect(0,0,canvas.width, canvas.height)

c.fillStyle = 'red'
c.fillRect(0,0,canvas.width,150)

const gravity = 0.6

// character class
class Char{
    constructor({position, velocity, width, height, color, collided}){
        this.position = position
        this.velocity = velocity
        this.height = height
        this.width = width
        this.color = color
        this.collided = collided
        this.health = 100
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

        if(this.position.x  <= 0 || this.position.x + this.width >= canvas.width){
            this.velocity.x = 0

        }
        
    }

    takeHit(){

        this.health -= 100
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
    collided: false
    
})


// rocks class
class Rocks extends Char{
    constructor({position, velocity, width, height, color, hitFloor}){
        super({position, velocity, width, height, color})

        this.hitFloor = hitFloor
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    update(){
        this.draw()
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 100){
            this.hitFloor = true
        } else this.hitFloor = false
    }


}

// Creating rocks
rocks = []

function createRocks(){
    rocks.push(new Rocks({
        position:{
            x: 997 * Math.random(),
            y: -40
        },
        velocity:{
            y: 1
        },
        width: 27,
        height: 27,
        color: 'red',
        hitFloor: false
    }))
}

let count = 0

function countUp(){

    // score.innerHTML = `Score: ${count}`
    if(char1.collided){
        count += 5
    }
}







// To help with smooth keybinding response
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





// to start game when play is pressed
let gameStart = false


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'blue'
    c.fillRect(0,0,canvas.width, canvas.height)
    c.fillStyle = 'grey'
    c.fillRect(0,476,canvas.width,100)
    char1.update()
    
    
    
    

if(gameStart){
    document.querySelector('.scoreCount').style.display = 'flex'
    document.querySelector('.healthContainer').style.display = 'flex'
    // movement() 
    // to allow rocks to fall and delete upon either collision with floor or char
    rocks.forEach((rock, index) =>{
        detectCollision(rock, char1)
        if(rock.position.y + rock.height + rock.velocity.y >= canvas.height - 100 || 
            char1.collided == true
        ){
            setTimeout(() => rocks.splice(index, 1), 0 )
            
            console.log(char1.collided)
        } else rock.update()

        if(rock.hitFloor){
            char1.takeHit()
            playerHp.style.width = char1.health + '%'
            rock.hitFloor = false
        }

        if(char1.health <= 0){
            rock.velocity.y = 0
            char1.velocity.x = 0
        } else countUp()
       
       
       
    })
    score.innerHTML = `SCORE: ${count}`
    gameOver()
    
    
}

}

function gameOver(){
    if(char1.health <= 0){
        finalScore.innerHTML = `GAME OVER YOUR SCORE: ${count} `
        finalScore.style.display = 'block'
        
        
    } else {
        movement()
    }
}

animate()

function movement(){
    if (keys.a.pressed && lastKey == 'a' && char1.position.x >= 0 || 
        keys.AL.pressed && lastKey == 'AL' && char1.position.x >= 0){
        char1.velocity.x = -4
    } else if (keys.d.pressed && lastKey == 'd' && char1.position.x + char1.width <= canvas.width || 
        keys.AR.pressed && lastKey == 'AR' && char1.position.x + char1.width <= canvas.width){
        char1.velocity.x = 4}
    else  char1.velocity.x = 0
}





// Binding keys to movement
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

})

 displayMenu = () =>{
    menu.style.display = 'block'
 }

setTimeout(displayMenu, 950)

playClick = () =>{
    menu.style.display = 'none'
    console.log('playclicked')
    gameStart = true
    setInterval(createRocks, 2000)
    title.classList.add('slideUp')
    
}


function detectCollision(a,b){
    if(
        a.position.y + a.height + a.velocity.y >= b.position.y &&
        a.position.x + a.width >= b.position.x &&
        a.position.x <= b.position.x + b.width 
        // a.position.y + a.velocity.y <= b.position.x + b.width
    )
    return b.collided = true
    else return b.collided = false
}