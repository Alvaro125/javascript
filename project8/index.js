const user = {
    "name": String(),
    "birthDate": Date(),
    "weight": Number(),
    "height": Number(),
    "gender": "woman"||"man"
};

const elm_name = document.querySelector('section#user input#name');
const elm_birthDate = document.querySelector('section#user input#birthDate');
const elm_weight = document.querySelector('section#user input#weight');
const elm_height = document.querySelector('section#user input#height');
const elm_gender = document.querySelector('section#user select#gender');
const button_user = document.querySelector('section#user button');
const res_user = document.querySelector('section#user .result');
const hoje = new Date()
// nome,dataNascimento,peso,altura,genero
function Insert() {
    try{
        if(elm_name.value.length<5){
            res_user.innerHTML=`<label for="name">${'Field “name” is invalid!'}</label><br/>`
            throw new RangeError('Field “name” is invalid!');
        }
        if(new Date(elm_birthDate.valueAsDate)>new Date() || elm_birthDate.valueAsDate==null){
            res_user.innerHTML=`<label for="birthDate">${'Field “birthDate” is invalid!'}</label><br/>`
            throw new RangeError('Field “birthDate” is invalid!');
        }
        if (elm_weight.valueAsNumber<=0 ||
            elm_weight.value=='') {
            res_user.innerHTML=`<label for="weight">${'Field “weight” is invalid!'}</label><br/>`
            throw new RangeError('Field “weight” is invalid!');
        }
        if (elm_height.valueAsNumber<=0 || 
            elm_height.value=='' || 
            (elm_height.valueAsNumber % 1) !== 0) {
            res_user.innerHTML=`<label for="height">${'Field “height” is invalid!'}</label><br/>`
            throw new RangeError('Field “height” is invalid!');
        }
        if (elm_gender.value!="Mulher" &&
            elm_gender.value!="Homem") {
            res_user.innerHTML=`<label for="gender">${'Field “gender” is invalid!'}</label><br/>`
            throw new RangeError('Field “gender” is invalid!');
        }

        user.name = elm_name.value
        user.birthDate = elm_birthDate.valueAsDate
        user.weight = elm_weight.valueAsNumber
        user.height = elm_height.valueAsNumber
        user.gender = elm_gender.value
        res_user.innerHTML=`
        <label for="name">Nome:${user.name}</label><br/>
        <label for="birthDate">Data de Nascimento:${new Date(user.birthDate).toISOString().slice(0, 10)}</label><br/>
        <label for="weight">Peso: ${user.weight}Kg</label><br/>
        <label for="height">Altura: ${user.height}cm</label><br/>
        <label for="gender">Genero: ${user.gender}</label>
        `
        res_user.innerHTML += `<pre>${JSON.stringify(user, null, 2)}</pre>`
        console.log(user)
        

    } catch(err){
        if (err instanceof RangeError) {
			console.log('RangeError!');
			console.log(err.stack);
		}else if (err instanceof ReferenceError) {
			console.log('ReferenceError!');
			console.log(err.stack);
		} else {
			console.log('Outro tipo de erro!');
			console.log(err.stack);
		}
    }
}

button_user.addEventListener('click', Insert)




const elm_text = document.querySelector('section#parse textarea#text');
const button_parse = document.querySelector('section#parse button');
const res_parse = document.querySelector('section#parse .result');
// var ssd = JSON.parse('dsadafrwefef')
// console.dir(ssd)

function ParseJSON() {
    try{
        let json = JSON.parse(elm_text.value)
        res_parse.innerHTML = `<pre>${JSON.stringify(json, null, 3)}</pre>`
    } catch(err){
        if (err instanceof RangeError) {
			console.log('RangeError!');
			console.log(err.stack);
		}else if (err instanceof ReferenceError) {
			console.log('ReferenceError!');
			console.log(err.stack);
		} else {
			console.log('Outro tipo de erro!');
			console.log(err.stack);
            res_parse.innerHTML=`Parsable JSON string!`;
		}
    }
}
button_parse.addEventListener('click', ParseJSON)



const obj = new Object();
obj['numero qualquer']=1;
Object.defineProperty(obj, "um atributo", {value:2})
console.log(obj['numero qualquer']);
console.log(Object.defineProperty(obj, 'um atributo'));
console.dir(obj);