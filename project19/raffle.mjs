export function Raffle(_min, _max){
    let num = [];
    let raffle = []
    for(let i = _min; i <= _max; i++){
        num.push(i)
    }
    function draw(){
        let limit = num.length
        if (limit>0) {
            let key = Math.floor(Math.random()*limit);
            let numRandom = num[key];
            num.splice(key,1);
            raffle.push(numRandom)
            return numRandom;
        } else {
            return null;
        }
    }
    function hasDraw(_num){
        let numFind = raffle.find((_el) => _el == _num);
        if (numFind) {
            return true;
        } else {
            return false;
        }
    }
    function list(){
        return raffle;
    }
    return{
        draw,
        hasDraw,
        list
    }
}