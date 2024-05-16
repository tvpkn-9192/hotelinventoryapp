import { Calculator } from './testservice';

describe('testservice', () => {
    it('should add two numbers', () => {
        const service = new Calculator();
        expect(service.add(2,3)).toBe(5);
    });
    it('should subtract two numbers', () => {
        const service = new Calculator();
        expect(service.subtract(5,3)).toBe(2);
    });
    it('should multiply two numbers', () => {
        const service = new Calculator();
        expect(service.multiply(2,3)).toBe(6);
    });
});