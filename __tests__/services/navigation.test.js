const oldEnv = process.env;

let navigation;
let mockAxios;

beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnv };

    process.env.NAVIGATION_SERVICE = 'test-navigation-service';
    navigation = require('../../services/navigation');
    mockAxios = require('axios');
});

afterEach(() => {
    process.env = oldEnv;
});

describe('Navigation Tests', () => {

    it('should call the proper endpoint', async () => {

        mockAxios.get.mockResolvedValueOnce({ data: {} });

        await navigation.getHeader();

        expect(mockAxios.get).toHaveBeenCalledWith('http://test-navigation-service/component/header');

    });

    it('should respond with data when request is successful', async () => {

        mockAxios.get.mockResolvedValueOnce({ data: 'api response' });

        const res = await navigation.getHeader();

        expect(res).toEqual('api response');

    });

    it('should forward error on error', async () => {

        mockAxios.get.mockRejectedValueOnce(new Error('oh no!'));

        await expect(navigation.getHeader).rejects.toThrow('oh no!');

    });

});

