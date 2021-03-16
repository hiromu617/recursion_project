const config = {
  currentUser: ''
}
class User{
  constructor(name, age, days, money, purchases, clickNum){
    this.name = name
    this.age = age
    this.days = days
    this.money = money
    this.purchases = {"Flip machine": 1}
    this.clickNum = 0
  }
  clickBurger(){
    let num = this.purchases["Flip machine"]
    this.money += 25 * num
    this.clickNum += 1
    renderClickNum(this.clickNum)
    renderMoney(this.money)
  }
  
  getOld(){

  }
  makeMoney(){

  }
}

class Product{
  constructor(name, maximumNumberOfPerchases, price, type, value){
    this.name = name
    this.maximumNumberOfPerchases = maximumNumberOfPerchases
    this.price = price
    this.type = type
    this.value = value
  }

  purchases(){

  }
  increment(){
    
  }
}

function displayNone(ele){
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele){
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

function startGame(){
  let name = document.getElementById('userName').value
  if(!name){
    alert('ユーザー名を入力して下さい')
    return 
  }else if (name.length > 10){
    alert('ユーザー名は10文字以内で入力してください')
    return
  }
  user = new User(name, 20, 1, 50000)
  config.currentUser = user
  console.log(user)

  displayNone(document.getElementById('top'))
  let container = document.getElementById('main')
  container.innerHTML = 
  `
  <div class="container d-flex h-100 w-100 flex-wrap">
      <div class="left-wrap d-flex flex-column  bg-dark col-lg-5 row-12 p-3 col-md-12 ">
        <div class="bg-secondary w-100 h-auto m-auto text-center text-white ">
          <p class="pt-3 h5 font-weight-bold"><span id="clickNum">1</span> Bergers</p>
          <p class="pt-1 pb-2">$25 per second</p>
        </div>
        <div class="w-50 m-auto img-wrap flex-grow-1 d-flex align-items-center">
          <img src="./images/burger-307648_960_720.webp" alt="" id="burger" class="w-100 m-auto py-5">
        </div>
      </div>
      <div class="right-wrap col-lg-7 col-md-12 p-3 d-flex flex-column">
        <div class="bg-dark h-auto mb-3 w-100 p-2 pb-3 text-white text-center">
          <div class="d-flex w-100 h-50 mb-2">
            <div class="bg-secondary w-50 h-100 mr-2">${user.name}</div>
            <div class="bg-secondary w-50 h-100">${user.age} yrs old</div>
          </div>
          <div class="d-flex w-100 h-50">
            <div class="bg-secondary w-50 h-100 mr-2"><span id="days">${user.days}</span>days</div>
            <div class="bg-secondary w-50 h-100" id="money">$${user.money}</div>
          </div>
        </div>
        <div class="bg-dark  p-2 flex-grow-1" style="overflow: scroll;">
          <div class="bg-secondary w-100 mb-2 p-2 d-flex text-white" style="height: 100px;">
            <img src="./images/chart-1296049_960_720.png" alt="" style="height: 100%; width: auto;">
            <div class="flex-grow-1 pl-3 h5">
              <h3>House</h3>
              <div class="d-flex justify-content-between">
                <div>$20000</div>
                <div class="text-success">+$1313</div>
              </div>
            </div>
            <div class="w-25 text-center h3" style="line-height: 80px;">
              2
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  displayBlock(document.getElementById('main'))
  timeGoesby(user)

  let burger = document.getElementById('burger')
  burger.addEventListener('click', function(){
    user.clickBurger()
  })
}

document.getElementById('fromTheBeggining')
.addEventListener('click', function(){
  startGame()
})

function timeGoesby(user){
  let daysDiv = document.querySelectorAll('#days')[0]
  setInterval(function(){
    if(!config.currentUser) return 
    user.days += 1
    daysDiv.innerHTML = String(user.days)
  },1000)
}

function renderMoney(money){
  let moneyDiv = document.querySelectorAll('#money')[0]
  moneyDiv.innerHTML = String(money)
}

function renderClickNum(num){
  let clickNumDiv = document.querySelectorAll('#clickNum')[0]
  clickNumDiv.innerHTML = String(num)
}


