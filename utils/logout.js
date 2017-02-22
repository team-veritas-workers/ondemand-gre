module.exports = (event, arg, ses) => {
  ses.remove('http://www.auth.com', arg.name, (data) => console.log(data));
}