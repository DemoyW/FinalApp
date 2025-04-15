import {createRandomOTP} from '../../frontend/AmpliFitness/app/forgotPassword.tsx';

describe('createRandomOTP', () => {
    it('should generate a 4-digit OTP', async () => {
        const otp = await createRandomOTP();
        expect(otp).toMatch(/^\d{4}$/); // Check if the OTP is a 4-digit number
    });

    it('should generate a different OTP each time', async () => {
        const otp1 = await createRandomOTP();
        const otp2 = await createRandomOTP();
        expect(otp1).not.toBe(otp2); // Check if the two OTPs are different
    });
}
);