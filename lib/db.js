/**
 * Created by web-01 on 2017/12/3.
 */
const mysql=require('mysql');

module.exports.pool=mysql.createPool({
    user:'root'
});