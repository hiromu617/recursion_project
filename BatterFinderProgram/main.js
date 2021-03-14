// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

// console.log(battery);
// console.log(camera);

// brandからmodel配列を返す
function getModelsFromBrand(brand){
    let models = []
    for(let i = 0; i < camera.length; i++){
        if(brand.value == camera[i].brand){
            models.push(camera[i].model)
        }
    }
    generateHtmlOfModel(models)
    return
}

// modelのDOMを作成
function generateHtmlOfModel(models){
    const target = document.getElementById('model') 
    target.innerHTML = ''

    let html = '<option>Please select</option>'
    for(let i = 0; i < models.length; i++){
        html += 
        `
        <option>${models[i]}</option>
        `
    }
    target.innerHTML = html
}

// modelからbatteries配列
function getBattery(model){
    let selectedCamera = camera.find(e => e.model == model.value)

    let accessaryPowerComsumption = Number(document.getElementById('accessoryPower').value)

    let batteries = filterBattery(selectedCamera.powerConsumptionWh + accessaryPowerComsumption)

    generateHtmlOfBattery(batteries, selectedCamera)
    return batteries
}

//消費電力からbatteryをフィルター 
function filterBattery(powerComsumption){
    return battery.filter(b => b.maxDraw * b.maxDraw >  powerComsumption)
}

// battryのDOMを作成
function generateHtmlOfBattery(batteries , camera){
    const target = document.getElementById('batteryTarget')
    let html = ""
    for(let i = 0; i < batteries.length; i++){
        let time = getSustainableTime(batteries[i],camera)
        html +=
        `
        <div class="card d-flex flex-nowrap py-2">
            <div class="col-5 align-middle">${batteries[i].batteryName}</div>
            <div class="col-5 text-nowrap align-middle" style="font-size: 0.75rem">Estimated ${time} hours on selected setup</div>
        </div>
        `
    }
    target.innerHTML = html
}

// 持続可能時間を返す
// b.capacityAh * b.voltage / c.powerConsumptionWh
function getSustainableTime(battery, camera){
    // console.log(battery.capacityAh)
    // console.log(battery.voltage)
    // console.log(camera.powerConsumptionWh)
    // console.log(accessoryPower.value)
    let time = battery.capacityAh * battery.voltage / (camera.powerConsumptionWh + accessoryPower.value)
    
    return time.toPrecision(2)
}

// addEventListenerを設定
let brand = document.getElementById('brand')
brand.addEventListener('change', function(){
    getModelsFromBrand(brand)
})
let model = document.getElementById('model')
model.addEventListener('change', function(){
    getBattery(model)
    // console.log(getBattery(model))
})
let accessoryPower = document.getElementById('accessoryPower')
accessoryPower.addEventListener('change', function(){
    getBattery(model)
    // console.log(getBattery(model))
})
