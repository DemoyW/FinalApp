import { createUser, loginUser } from "../../frontend/AmpliFitness/store/user"

global.fetch = jest.fn();


describe('User Authentication', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    it('should create a new user', async () => {
        const mockResponse = { id: 1, name: 'John Doe' };
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const user = await createUser({ name: 'John Doe', email: 'john@example.com', password: 'password' });
        expect(user).toEqual(mockResponse);
    });

    it('should log in a user', async () => {
        const mockResponse = { token: '12345' };
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const response = await loginUser({ email: 'john@example.com', password: 'password' });
        expect(response).toEqual(mockResponse);
    });
});