const GerarCor = (opacidade = 1)=>{
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
 
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}
const GerarNum = (_end, _start = 0)=>{
    let n = Math.floor((Math.random()*Math.abs(_end-_start)) + _start)
 
    return n;
}
export {GerarCor, GerarNum};