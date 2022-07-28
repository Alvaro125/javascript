const res_pi = document.querySelector('section#primos p')
const limit = BigInt(100)
let i = 2n;
let x = (10n ** 1020n);
let sin = 1n
let pi = 3n*x;

for (let j = 1500; j > 0; j--) {
    let t = x*4n / (i * (i+1n) * (i+2n));
    pi+=sin*t
    sin *= -1n;
    i += 2n;
}
pi = pi / (10n ** 20n)
console.log(pi);
res_pi.innerHTML = pi;