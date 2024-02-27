AFRAME.registerComponent("drive", {
    init: function () {
        var gameStateValue = this.el.getAttribute("game")

        if (gameStateValue == "play") {
            this.driveCar()
        }
    },
    isVelocityActive: function () {
        console.log("Hi")
        return Math.random() < 0.25;
    },

    driveCar: function() {
        var multiply = 10;
        var wheelRotation = 0;
        
        //Key Down Events
        window.addEventListener("keydown", function (e) {
            //Steering Wheel Rotation on A and D
            var wheel = document.querySelector("#control-wheel")

            if (e.code == "D" && wheelRotation > -40) {
                wheelRotation -= 5
                wheel.setAttribute("rotation", {x: 0, y: 0, z: wheelRotation})
            }

            if (e.code == "A" && wheelRotation < 40) {
                wheelRotation += 5
                wheel.setAttribute("rotation", {x: 0, y: 0, z: wheelRotation})
            }

            //Camera Movement Control: Rotation and Direction on A & D
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "D") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", {x: 0, y: cameraRotation, z: 0})
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl + 0.005})
            }

            if (e.code == "A") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", {x: 0, y: cameraRotation, z: 0})
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl + 0.005})
            }

            //Speed up or Accelerate on W
        })
    }
})