'use strict';

const currentdate = new Date();
const datetime1 = currentdate.getDate() + '/'
  + (currentdate.getMonth() + 1) + '/'
  + currentdate.getFullYear() + ' @ '
  + currentdate.getHours() + ':'
  + currentdate.getMinutes() + ':'
  + currentdate.getSeconds();

const datetime2 = currentdate.getDate() + '/'
  + (currentdate.getMonth() + 1) + '/'
  + currentdate.getFullYear() + ' @ '
  + (currentdate.getHours() + 1) + ':'
  + (currentdate.getMinutes() + 12) + ':'
  + currentdate.getSeconds();

const datetime3 = currentdate.getDate() + '/'
  + (currentdate.getMonth() + 1) + '/'
  + currentdate.getFullYear() + ' @ '
  + (currentdate.getHours() + 3) + ':'
  + currentdate.getMinutes() + ':'
  + currentdate.getSeconds();

module.exports = {
  datetime1,
  datetime2,
  datetime3,
};

