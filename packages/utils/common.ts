//将16进制的颜色值转换成RGBA
export const hexToSemiTransparentRGBA = (hex: String, opacity = 0.5): String => {
  // 去除#号，并转换为小写
  hex = hex.replace('#', '').toLowerCase();
  //判断16进制的颜色值是否正确
  if (hex.length !== 6) {
    throw new Error('Invalid hex color format');
  }
  // 分割十六进制字符串为红、绿、蓝
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  // 返回一个RGBA字符串
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
