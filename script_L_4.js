// Задание №1
console.log('---------- Задание №1')

let strSimple = '\'Lorem ipsum, dolor sit\'s amet con\'sectetur adipisicing elit.\'';

let strChange = strSimple.replace(/\'/gi, '\"');

console.log(strChange);

// Задание №2
console.log('---------- Задание №2')

let strChangeUpgrade = strSimple.replace(/\B'|'\B/gi, '\"');

console.log(strChangeUpgrade);