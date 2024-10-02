import redis from 'redis';
import { promisify } from 'util';

/**
 * Represents redis client
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err.message}`);
    });
    this.client.on('connect', () => {
    });
  }

  /**
   * Checks if connection to Redis is Alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrives value corresponding to key in redis
   * @key {string} key to search for in redis
   * @return {string}  value of key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Stores key and its value along with expiration time
   * @key {string} key to be saved
   * @value {string} value to be asigned to key
   * @duration {number} duration of key
   * @return {undefined}  No return
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key
   * @key {string} key to be removed
   * @return {undefined}  No return
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
