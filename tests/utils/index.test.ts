import { generateRandomCode, isValidCode } from '../../src/utils/index';

describe('generateRandomCode', () => {
    it('should generate a random code of the specified length', () => {
        const codeLength = 8;
        const generatedCode = generateRandomCode(codeLength);
        expect(generatedCode).toHaveLength(codeLength);
    });

    it('should generate a code containing only alphanumeric characters', () => {
        const generatedCode = generateRandomCode(10);
        expect(generatedCode).toMatch(/^[a-zA-Z0-9]+$/);
    });
});

describe('isValidCode', () => {
    it('should return true for a valid code', () => {
        const validCode = 'Abc123';
        const result = isValidCode(validCode);
        expect(result).toBe(true);
    });

    it('should return false if the code does not contain a lowercase letter', () => {
        const invalidCode = 'ABC123';
        const result = isValidCode(invalidCode);
        expect(result).toBe(false);
    });

    it('should return false if the code does not contain an uppercase letter', () => {
        const invalidCode = 'abc123';
        const result = isValidCode(invalidCode);
        expect(result).toBe(false);
    });

    it('should return false if the code does not contain a number', () => {
        const invalidCode = 'Abcdef';
        const result = isValidCode(invalidCode);
        expect(result).toBe(false);
    });

    it('should return false if the code is empty', () => {
        const emptyCode = '';
        const result = isValidCode(emptyCode);
        expect(result).toBe(false);
    });
});
