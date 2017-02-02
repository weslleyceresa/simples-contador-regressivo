(function($){
	"use strict"

	$.fn.countDown = function(config){
        var defaultConfig = {
                dataFinal: null,

                onInit: null,
                onFinish: null,
                onLoad: null,
                onFire: null,
            },
            self = this,
            intervalTime = null,
            startDay = 0,
            startSecond = 0,
            startMinute = 0,
            startHour = 0;

        console.log("Contador Regressivo Instanciado.");

        if(config != undefined && typeof config != "object")
            throw "Configuração incorreta.";

        defaultConfig = $.extend( {}, defaultConfig, config );

        if(defaultConfig.dataFinal == null)
            throw "Informe o tempo.";

        createEvents();

        self.start = function(){
            if(intervalTime == null)
                render();
            else
                console.log("Contador ja iniciado.");
        };

        self.stop = function(){
            clearInterval(intervalTime);
            return generateTime();
        };

        function triggerEvent(ev, params){
            if(self[ev] != undefined && typeof self[ev] == "function")
                if(params != undefined)
                    self[ev](params);
                else
                    self[ev]();
        }

        function createEvents(){
            self.onLoad = defaultConfig.onLoad;
            self.onFinish = defaultConfig.onFinish;
            self.onInit = defaultConfig.onInit;
            self.onFire = defaultConfig.onFire;
        }

        function render(){
            generateTime();

            intervalTime = setInterval(function(){
                var t = Date.parse(defaultConfig.dataFinal) - Date.parse(new Date()),
                    seconds = Math.floor( (t/1000) % 60 ),
                    minutes = Math.floor( (t/1000/60) % 60 ),
                    hours = Math.floor( (t/(1000*60*60)) % 24 ),
                    days = Math.floor( t/(1000*60*60*24) );

                startDay = days;
                startHour = hours;
                startMinute = minutes;
                startSecond = seconds;

                generateTime();

                if(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0){                    clearInterval(intervalTime);
                    triggerEvent("onFinish");
                }

            }, 1000);

            triggerEvent("onInit");
        }

        function zeroLeft(n){
            return (n < 10) ? ("0" + n) : n;
        }

        function generateTime(){
            triggerEvent("onFire", {
                sec: zeroLeft(startSecond),
                min: zeroLeft(startMinute),
                hou: zeroLeft(startHour),
                day: zeroLeft(startDay),
            });
        }

        triggerEvent("onLoad");

        return this;
    };
	
})(jQury);