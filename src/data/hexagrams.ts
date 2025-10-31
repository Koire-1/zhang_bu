// 64卦数据库
export interface Hexagram {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

export const hexagrams: Hexagram[] = [
  { id: 1, name: "乾为天", code: "111111", symbol: "☰" },
  { id: 2, name: "坤为地", code: "000000", symbol: "☷" },
  { id: 3, name: "水雷屯", code: "010001", symbol: "☵" },
  { id: 4, name: "山水蒙", code: "100010", symbol: "☶" },
  { id: 5, name: "水天需", code: "010111", symbol: "☵" },
  { id: 6, name: "天水讼", code: "111010", symbol: "☰" },
  { id: 7, name: "地水师", code: "000010", symbol: "☷" },
  { id: 8, name: "水地比", code: "010000", symbol: "☵" },
  { id: 9, name: "风天小畜", code: "110111", symbol: "☴" },
  { id: 10, name: "天泽履", code: "111011", symbol: "☰" },
  { id: 11, name: "地天泰", code: "000111", symbol: "☷" },
  { id: 12, name: "天地否", code: "111000", symbol: "☰" },
  { id: 13, name: "天火同人", code: "111101", symbol: "☰" },
  { id: 14, name: "火天大有", code: "101111", symbol: "☲" },
  { id: 15, name: "地山谦", code: "000100", symbol: "☷" },
  { id: 16, name: "雷地豫", code: "001000", symbol: "☳" },
  { id: 17, name: "泽雷随", code: "011001", symbol: "☱" },
  { id: 18, name: "山风蛊", code: "100110", symbol: "☶" },
  { id: 19, name: "地泽临", code: "000011", symbol: "☷" },
  { id: 20, name: "风地观", code: "110000", symbol: "☴" },
  { id: 21, name: "火雷噬嗑", code: "101001", symbol: "☲" },
  { id: 22, name: "山火贲", code: "100101", symbol: "☶" },
  { id: 23, name: "山地剥", code: "100000", symbol: "☶" },
  { id: 24, name: "地雷复", code: "000001", symbol: "☷" },
  { id: 25, name: "天雷无妄", code: "111001", symbol: "☰" },
  { id: 26, name: "山天大畜", code: "100111", symbol: "☶" },
  { id: 27, name: "山雷颐", code: "100001", symbol: "☶" },
  { id: 28, name: "泽风大过", code: "011110", symbol: "☱" },
  { id: 29, name: "坎为水", code: "010010", symbol: "☵" },
  { id: 30, name: "离为火", code: "101101", symbol: "☲" },
  { id: 31, name: "泽山咸", code: "011100", symbol: "☱" },
  { id: 32, name: "雷风恒", code: "001110", symbol: "☳" },
  { id: 33, name: "天山遁", code: "111100", symbol: "☰" },
  { id: 34, name: "雷天大壮", code: "001111", symbol: "☳" },
  { id: 35, name: "火地晋", code: "101000", symbol: "☲" },
  { id: 36, name: "地火明夷", code: "000101", symbol: "☷" },
  { id: 37, name: "风火家人", code: "110101", symbol: "☴" },
  { id: 38, name: "火泽睽", code: "101011", symbol: "☲" },
  { id: 39, name: "水山蹇", code: "010100", symbol: "☵" },
  { id: 40, name: "雷水解", code: "001010", symbol: "☳" },
  { id: 41, name: "山泽损", code: "100011", symbol: "☶" },
  { id: 42, name: "风雷益", code: "110001", symbol: "☴" },
  { id: 43, name: "泽天夬", code: "011111", symbol: "☱" },
  { id: 44, name: "天风姤", code: "111110", symbol: "☰" },
  { id: 45, name: "泽地萃", code: "011000", symbol: "☱" },
  { id: 46, name: "地风升", code: "000110", symbol: "☷" },
  { id: 47, name: "泽水困", code: "011010", symbol: "☱" },
  { id: 48, name: "水风井", code: "010110", symbol: "☵" },
  { id: 49, name: "泽火革", code: "011101", symbol: "☱" },
  { id: 50, name: "火风鼎", code: "101110", symbol: "☲" },
  { id: 51, name: "震为雷", code: "001001", symbol: "☳" },
  { id: 52, name: "艮为山", code: "100100", symbol: "☶" },
  { id: 53, name: "风山渐", code: "110100", symbol: "☴" },
  { id: 54, name: "雷泽归妹", code: "001011", symbol: "☳" },
  { id: 55, name: "雷火丰", code: "001101", symbol: "☳" },
  { id: 56, name: "火山旅", code: "101100", symbol: "☲" },
  { id: 57, name: "巽为风", code: "110110", symbol: "☴" },
  { id: 58, name: "兑为泽", code: "011011", symbol: "☱" },
  { id: 59, name: "风水涣", code: "110010", symbol: "☴" },
  { id: 60, name: "水泽节", code: "010011", symbol: "☵" },
  { id: 61, name: "风泽中孚", code: "110011", symbol: "☴" },
  { id: 62, name: "雷山小过", code: "001100", symbol: "☳" },
  { id: 63, name: "水火既济", code: "010101", symbol: "☵" },
  { id: 64, name: "火水未济", code: "101010", symbol: "☲" },
];

// 生成随机卦象
export const generateHexagram = (): Hexagram => {
  const randomIndex = Math.floor(Math.random() * hexagrams.length);
  return hexagrams[randomIndex];
};
