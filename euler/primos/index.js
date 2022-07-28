const res_primos = document.querySelector('section#primos ul')
const limit = BigInt(100000)
function isPrimo(p) {
    for (let j = 2n; j * j <= p; j++) {
      if (p % j === 0n) return false;
    }
    return true;
}
for (let i = 1n; i <= limit; i++) {
    if (isPrimo(i)) {
        res_primos.innerHTML += `<li>${i.toLocaleString('pt-BR')}</li>`
    }
}