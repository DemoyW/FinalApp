import { hashPassword, comparePassword } from "../../backend/controllers/user.controller.js";

describe("Password Hashing and Comparison", () => {
    it("should hash a password correctly", async () => {
        const password = "mysecretpassword";
        const hashedPassword = await hashPassword(password);
        expect(hashedPassword).not.toBe(password); // The hashed password should not be the same as the original password
    });
    
    it("should compare a password with its hash correctly", async () => {
        const password = "mysecretpassword";
        const hashedPassword = await hashPassword(password);
        const isMatch = await comparePassword(password, hashedPassword);
        expect(isMatch).toBe(true); // The password should match the hashed password
    });
    
    it("should return false for incorrect password comparison", async () => {
        const password = "mysecretpassword";
        const wrongPassword = "wrongpassword";
        const hashedPassword = await hashPassword(password);
        const isMatch = await comparePassword(wrongPassword, hashedPassword);
        expect(isMatch).toBe(false); // The wrong password should not match the hashed password
    });
    }
);