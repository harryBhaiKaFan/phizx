
import { SHM } from "./SHM.js";

const screen = document.querySelector("#screen");
const ctx = screen.getContext("2d");

const freqCtrl = document.querySelector("#freq");
const ampCtrl = document.querySelector("#amp");

screen.width = parseInt(getComputedStyle(screen).width);
screen.height = parseInt(getComputedStyle(screen).height);

const App = {
    init: function () {
        let amp = 30;
        let deltaTheta = 1/50;
        let sy = 300;

        ampCtrl.oninput = (e) => {
            amp = ampCtrl.value;
            this.renderWave(amp,deltaTheta,sy)
        }
        
        freqCtrl.oninput = (e) => {
            deltaTheta = 1/freqCtrl.value;
            this.renderWave(amp,deltaTheta,sy)
        }

        this.renderWave(amp,deltaTheta,sy)
    },
    renderWave: function(amp,deltaTheta,sy){
        ctx.clearRect(0,0,screen.width,screen.height);

        let theta = 0;
        let y = 0;

        for (let x = 0; x < screen.width; x++)
        {
            y = -SHM.y(amp,theta)
            ctx.fillRect(x,sy+y,10,10);

            theta = (theta + deltaTheta) % (2*Math.PI);
        }
    }
}


window.onload = App.init.bind(App);