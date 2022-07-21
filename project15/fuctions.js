function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
export const helpers = {
  converterDays: (date) => {
    return parseInt(date / 1000 / 60 / 60 / 24);
  },
  dataHora: (date) => {
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  },
  converterReal: (num)=>{
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
};
