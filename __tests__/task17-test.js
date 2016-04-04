jest.unmock('../task17/js/main'); // unmock to use the actual implementation of 

var data = { '2016-01-01': 271,
  '2016-01-02': 236,
  '2016-01-03': 77,
  '2016-01-04': 86,
  '2016-01-05': 149,
  '2016-01-06': 243,
  '2016-01-07': 49,
  '2016-01-08': 50,
  '2016-01-09': 75,
  '2016-01-10': 418,
  '2016-01-11': 310,
  '2016-01-12': 79,
  '2016-01-13': 79,
  '2016-01-14': 155,
  '2016-01-15': 185,
  '2016-01-16': 444,
  '2016-01-17': 421,
  '2016-01-18': 345,
  '2016-01-19': 470,
  '2016-01-20': 167,
  '2016-01-21': 58,
  '2016-01-22': 268,
  '2016-01-23': 26,
  '2016-01-24': 208,
  '2016-01-25': 209,
  '2016-01-26': 406,
  '2016-01-27': 214,
  '2016-01-28': 338,
  '2016-01-29': 315,
  '2016-01-30': 456,
  '2016-01-31': 362,
  '2016-02-01': 248,
  '2016-02-02': 177,
  '2016-02-03': 411,
  '2016-02-04': 184,
  '2016-02-05': 396,
  '2016-02-06': 446,
  '2016-02-07': 329,
  '2016-02-08': 160,
  '2016-02-09': 468,
  '2016-02-10': 159,
  '2016-02-11': 444,
  '2016-02-12': 440,
  '2016-02-13': 152,
  '2016-02-14': 414,
  '2016-02-15': 423,
  '2016-02-16': 351,
  '2016-02-17': 364,
  '2016-02-18': 237,
  '2016-02-19': 36,
  '2016-02-20': 158,
  '2016-02-21': 292,
  '2016-02-22': 396,
  '2016-02-23': 488,
  '2016-02-24': 305,
  '2016-02-25': 98,
  '2016-02-26': 361,
  '2016-02-27': 356,
  '2016-02-28': 77,
  '2016-02-29': 54,
  '2016-03-01': 264,
  '2016-03-02': 14,
  '2016-03-03': 341,
  '2016-03-04': 93,
  '2016-03-05': 482,
  '2016-03-06': 151,
  '2016-03-07': 102,
  '2016-03-08': 137,
  '2016-03-09': 30,
  '2016-03-10': 303,
  '2016-03-11': 379,
  '2016-03-12': 160,
  '2016-03-13': 196,
  '2016-03-14': 352,
  '2016-03-15': 112,
  '2016-03-16': 210,
  '2016-03-17': 201,
  '2016-03-18': 383,
  '2016-03-19': 228,
  '2016-03-20': 63,
  '2016-03-21': 390,
  '2016-03-22': 130,
  '2016-03-23': 56,
  '2016-03-24': 236,
  '2016-03-25': 116,
  '2016-03-26': 145,
  '2016-03-27': 44,
  '2016-03-28': 411,
  '2016-03-29': 198,
  '2016-03-30': 313,
  '2016-03-31': 28 };

describe('initAqiChartData', () => {
  it('initAqiChartData', () => {
    const initAqiChartData = require('../task17/js/main');
    expect(initAqiChartData(data, '周')).toBe(3);
  });
});