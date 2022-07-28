export function Bingo() {
    const num = [];
    const listNum = [];
    for (let i = 1; i <= 75; i++) {
        listNum.push(i);
    }
    let win = false;
    while (num.length < 10) {
        let limit = listNum.length;
        let key = Math.floor(Math.random() * limit);
        let numRandom = listNum[key];
        listNum.splice(key, 1);
        num.push({
            value: numRandom,
            hasMark: false
        })
    }

    function list() {
        num.sort((a, b) => {
            return a['value'] - b['value'];
        });
        return num;
    }
    function numMark(_num) {
        let numFind = num.find((_el) => _el['value'] == _num);
        if (numFind) {
            num.forEach((_el) => {
                if (_el['value'] == _num) {
                    _el['hasMark'] = true;
                }
            });
            return true;
        } else {
            return false;
        }
    }
    function fullMark() {
        let numFind = num.find((_el) => _el['hasMark'] == false);
        if (!numFind) {
            win = true;
            return true;
        } else {
            return false;
        }
    }
    return {
        list,
        numMark,
        fullMark,
    };
}
