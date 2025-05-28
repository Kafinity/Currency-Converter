const baseURL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let dropDowns = document.querySelectorAll(".dropDown select ");
let btn = document.querySelector("button");
let amount = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
  updateMsg();
});

 for(let select of dropDowns){
   for(currCode in countryList){
     let newOption =document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     select.append(newOption);
     if (select.name === "from" && currCode ==="USD"){
       newOption.selected="selected";
     }else if (select.name === "to" && currCode ==="INR"){
       newOption.selected="selected";
     }
   }
   select.addEventListener("change",
     (evt)=>{
       flagChange(evt.target);
     });
 }
const flagChange =(el)=>{
  let currCode = el.value;
  let couCode = countryList[currCode];
  console.log(currCode,couCode);
  let newSrc=`https://flagsapi.com/${couCode}/flat/64.png`;
  let img = el.parentElement.querySelector("img");
  img.src= newSrc;
}

btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  updateMsg();
});

const updateMsg = async()=>{
  let amtVal = amount.value;
  if (amtVal===""||amtVal<0){
    amount.value=1;
    amtVal = 1;
  }
  console.log(amtVal);
  console.log(fromCurr.value,toCurr.value);
  const fromCode = fromCurr.value.toLowerCase();
  const toCode = toCurr.value.toLowerCase();
  let URL = `${baseURL}${fromCode}.json`
  console.log(URL);
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  console.log(data);
  let rate = `${data[fromCode][toCode]}`
  console.log(`${amtVal} ${fromCurr.value} = ${rate * amtVal}${toCurr.value}`);
  msg.innerText= `${amtVal} ${fromCurr.value} = ${rate * amtVal}${toCurr.value}`;
}