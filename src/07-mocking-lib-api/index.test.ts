// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

interface MockData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const mockData: MockData = {
  userId: 1,
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body:
    'quia et suscipit\n' +
    'suscipit recusandae consequuntur expedita et cum\n' +
    'reprehenderit molestiae ut ut quas totam\n' +
    'nostrum rerum est autem sunt rem eveniet architecto',
};
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockImplementationOnce((path) =>
      Promise.resolve({ data: { data: mockData, url: path } }),
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('posts/1');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const res = await throttledGetDataFromApi('posts/1');
    expect(res.url).toEqual('posts/1');
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi('posts/1');

    expect(res.data).toEqual(mockData);
  });
});
