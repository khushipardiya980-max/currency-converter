
let base_url = "https://hexarate.paikama.co/api/rates/latest";


let dropdowns = document.querySelectorAll('.dropdown select');
let button = document.querySelector('form button');
let fromCurr = document.querySelector(".from  select");
let toCurr = document.querySelector(".to select");
let massage = document.querySelector(".msg")





for (select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode; // ye jo text dikhega
        newOption.value = currcode; // value option tag me hoti h isliye 
        select.append(newOption);


        if (select.name === 'from' && currcode == 'INR') {
            newOption.selected = 'selected'; // jo usd wala option he use select kar diya
        }
        else if (select.name === 'to' && currcode == 'USD') {
            newOption.selected = 'selected'; // selected se default option select kar rhe h 
        }



    }
    select.addEventListener("change", (e) => {

        updateFlag(e.target)
    })


}
const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

}

button.addEventListener('click', async (e) => {
    e.preventDefault();
    let amount = document.querySelector('#inputamount');
    let amtVal = amount.value;
    if (amtVal == " " || amtVal < 1) {
        amtVal = 1;
        amount.value = '1';// The amount is taken for me, that's why the change will be displayed in amount.value.


        // console.log(fromCurr.value, toCurr.value)


    }
    let url = `${base_url}/${fromCurr.value}?target=${toCurr.value} `;

    let response = await fetch(url);
    let data = await response.json();

    console.log(data);


    const rate = data.data.mid;
    console.log(rate)


    let result = amtVal * rate;

    massage.innerHTML = `${amtVal} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}`;



});

