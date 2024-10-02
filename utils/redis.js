import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  // Check if Redis client is connected
  isAlive() {
    return this.client.isOpen;
  }

  // Get the value associated with the key in Redis
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error('Error getting value from Redis:', err);
      return null;
    }
  }

  // Set a key-value pair in Redis with an expiration time (in seconds)
  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (err) {
      console.error('Error setting value in Redis:', err);
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error('Error deleting value from Redis:', err);
    }
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;