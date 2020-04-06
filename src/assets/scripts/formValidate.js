// 数字(用户权限相关)
export function regNumber (rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  var regexps = /^[0-9]*$/;
  if (regexps.test(value)) {
    callback();
  } else {
    callback(new Error('请输入数字'));
  }
}
