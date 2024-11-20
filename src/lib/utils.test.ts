import { humanSeconds, getAccuracy, getAward } from './utils';

describe('utils', () => {
  describe('humanSeconds', () => {
    it('should give singular for 1 second', () => {
      expect(humanSeconds(1)).toBe('1 second');
    });

    it('should give plural for more than 1 second', () => {
      expect(humanSeconds(0.5)).toBe('0.5 seconds');
      expect(humanSeconds(2)).toBe('2 seconds');
      expect(humanSeconds(5)).toBe('5 seconds');
      expect(humanSeconds(3.3)).toBe('3.3 seconds');
    });

    it('should give fixed when toFixed flag is true', () => {
      expect(humanSeconds(1 / 3)).toBe('0.3333333333333333 seconds');
      expect(humanSeconds(1 / 3, true)).toBe('0.333 seconds');
    });
  });
  describe('getAccuracy', () => {
    it('should give correct accuracy', () => {
      expect(getAccuracy(10, 1)).toBe(90);
      expect(getAccuracy(5, 5)).toBe(0);
      expect(getAccuracy(5, null)).toBe(0);
      expect(getAccuracy(5, 2.5)).toBe(50);
      expect(getAccuracy(5, 3)).toBe(40);
      expect(getAccuracy(5, 1.45)).toBe(71);
      expect(getAccuracy(5, 1.33)).toBe(73.4);
      expect(getAccuracy(7, 0.019)).toBe(99.73);
    });
  });
  describe('getAward', () => {
    it("should return correct award's class", () => {
      // for no award
      expect(getAward(3)).toBeNull();
      expect(getAward(69.99)).toBeNull();

      // for bronze award
      expect(getAward(70)).toBe('bronze');
      expect(getAward(74.44)).toBe('bronze');
      expect(getAward(79.99)).toBe('bronze');

      // for silver award
      expect(getAward(80)).toBe('silver');
      expect(getAward(83.12)).toBe('silver');
      expect(getAward(89.99)).toBe('silver');

      // for gold award
      expect(getAward(90)).toBe('gold');
      expect(getAward(97.88)).toBe('gold');
      expect(getAward(99.99)).toBe('gold');

      // for diamond award
      expect(getAward(100)).toBe('diamond');
    });
  });
});
