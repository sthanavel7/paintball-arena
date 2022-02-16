

AFRAME.registerComponent("bullets",{
    init:function(){
this.showBullet()
    },

    showBullet:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var bullet=document.createElement('a-entity')
                bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1


                })
                bullet.setAttribute("material","color","black")

                var cam=document=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                

                bullet.setAttribute("position",{
                    x:pos.x,y:pos.y,z:pos.z
                })


                bullet.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:0
                })
                // bullet.setAttribute("velocity",{
                //     x:0,y:0,z:-1
                

                var camera=document.querySelector("#camera").object3D
                //get camera direction
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)

                bullet.setAttribute("velocity",direction.multiplyScalar(-10))


                 var scene =document.querySelector("#scene")

                 //ading event listener -(collide ) to remove bullet

                 bullet.addEventListener("collide",this.removeBullet)
                 scene.appendChild(bullet)

                console.log(bullet)

                //cam.appendChild(bullet)
                // three.js to our aframe
                this.shootSound()

            }
        })
    

    },

    removeBullet:function(e){
        //checking the original target
        console.log(e.detail.target.el)

        //checking the other entity which bullet is touched
        console.log(e.detail.body.el)

        var element=e.detail.target.el

        var elementHit=e.detail.body.el

        //creating the paint splashes

        var paint=document.createElement("a-entity")
        var paintPosition=element.getAttribute("position")
        var paintRotation=elementHit.getAttribute("rotation")
        paint.setAttribute("position",{
            x:paintPosition.x,y:paintPosition.y,z:paintPosition.z
        })

        paint.setAttribute("rotation",{
            x:paintRotation.x,y:paintRotation.y,z:paintRotation.z
        })

        paint.setAttribute("scale",{
            x:2,y:2,z:2

        })

        //adding multiple images by using math.random
        const colorNumber=parseInt(Math.random()*8+1)
        paint.setAttribute("material",{
            src:"./images/paint splash-0"+colorNumber+".png",
            opacity:1,
            transparent:true
        })

        paint.setAttribute("geometry",{
            primitive:"plane",width:0.5,height:0.5
        })

        // if(elementHit.id.includes("box")){
        //     elementHit.setAttribute("material",{
        //         opacity:1,
        //         transparent:true

        //     })

            //create cannon effect
           // var impulse = new CANNON.Vec3(-2, 2 ,1)
            //var WorldPoint=new CANNON.Vec3().copy(
                //element.getAttribute("position")

          //  )

            //applyingimpulse and point vector

            //elementHit.body.applyImpulse(impulse,WorldPoint)
            


            

            //remove bullets from scene

            var scene=document.querySelector("#scene")
            scene.appendChild(paint)
            element.removeEventListener("collide",this.shoot)

            scene.removeChild(element)


        
    },

    shootSound:function(){
        var entity=document.querySelector("#sound1")
        entity.components.sound.playSound()


    },
})

