// 设置属性
export const handleAttribute = (attribute, defaultValue) => {
  if (attribute === false || attribute === 0 || attribute === '') {
    return attribute
  }
  return attribute || defaultValue
}
/**
 * 深拷贝
 * @param source 需要拷贝的数据
 * @returns target 目标数据
 */
export const deepCopy = (source) => {
  //如果不是对象类型直接返回
  if (typeof source !== 'object') return source;

  //创建一个区分数组和对象的目标变量target
  const target = source.constructor === Array ? [] : {};

  //循环
  Object.keys(source).forEach((key) => {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object') {
        //循环-如果是数组或者对象，则接着递归
        target[key] = source[key].construtor === Array ? [] : {};
        target[key] = deepCopy(source[key]);
      } else {
        //循环-如果不是对象，赋值到target
        target[key] = source[key];
      }
    }
  });

  return target;
};


