import CryptoJS from 'crypto-js/crypto-js'

/**
 * 加密--应和后台java解密或是前台js解密的密钥保持一致（16进制）
 * */
const KEY = CryptoJS.enc.Utf8.parse('cn.framewiki.com')
const IV = CryptoJS.enc.Utf8.parse('hk.framewiki.com')

/**
 * AES加密 ： 字符串 key iv  返回base64
 *
 */
export default {
  encrypt (word) {
    let key = KEY
    let iv = IV
    // 偏移量
    let encryption = CryptoJS.enc.Utf8.parse(word)
    // 算法
    let encrypted = CryptoJS.AES.encrypt(encryption, key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  },
  /**
   * AES 解密 ：字符串 key iv  返回base64
   *
   */
  decrypt (word) {
    let key = KEY
    let iv = IV
    let base64 = CryptoJS.enc.Base64.parse(word)
    let base64Value = CryptoJS.enc.Base64.stringify(base64)
    // AES解密
    var decrypt = CryptoJS.AES.decrypt(base64Value, key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
