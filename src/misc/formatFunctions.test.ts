import { formatTime } from './formatFunctions';

describe('formatTime()', () => {
  it('should render -1s correctly', () => {
    expect(formatTime(-1)).toBe('- 00 : 01');
  });
  it('should render 0s correctly', () => {
    expect(formatTime(0)).toBe('00 : 00');
  });
  it('should render 1s correctly', () => {
    expect(formatTime(1)).toBe('00 : 01');
  });

  it('should render 59s correctly', () => {
    expect(formatTime(59)).toBe('00 : 59');
  });
  it('should render 1m correctly', () => {
    expect(formatTime(60)).toBe('01 : 00');
  });
  it('should render 1m and 1s correctly', () => {
    expect(formatTime(61)).toBe('01 : 01');
  });

  it('should render 15m correctly', () => {
    expect(formatTime(900)).toBe('15 : 00');
  });

  it('should render 59m and 59s correctly', () => {
    expect(formatTime(3599)).toBe('59 : 59');
  });
  it('should render 60m correctly', () => {
    expect(formatTime(3600)).toBe('01 : 00 : 00');
  });
  it('should render 60m and 1s correctly', () => {
    expect(formatTime(3601)).toBe('01 : 00 : 01');
  });
});
