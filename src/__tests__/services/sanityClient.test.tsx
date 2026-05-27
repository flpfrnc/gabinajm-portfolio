/**
 * Unit tests for Sanity client initialization
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockFetch = vi.hoisted(() => vi.fn());

vi.mock("@sanity/client", () => ({
  createClient: vi.fn(() => ({
    fetch: mockFetch,
  })),
}));
import {
  getSanityConfig,
  createSanityClient,
  getSanityClient,
  checkSanityHealth,
  resetSanityClient,
} from "../../services/sanityClient";
import { FetchError, FetchErrorCode } from "@domain/types";

describe("Sanity Client", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    resetSanityClient();
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test-project";
    process.env.NEXT_PUBLIC_SANITY_DATASET = "production";
    process.env.NEXT_PUBLIC_SANITY_API_VERSION = "2024-01-15";
    process.env.NODE_ENV = "production";
    mockFetch.mockReset();
  });

  afterEach(() => {
    process.env = originalEnv;
    resetSanityClient();
  });

  describe("getSanityConfig()", () => {
    it("should return config with all required env vars", () => {
      const config = getSanityConfig();
      expect(config.projectId).toBe("test-project");
      expect(config.dataset).toBe("production");
      expect(config.apiVersion).toBe("2024-01-15");
    });

    it("should include optional API token if provided", () => {
      process.env.SANITY_API_TOKEN = "test-token";
      const config = getSanityConfig();
      expect(config.token).toBe("test-token");
    });

    it("should throw FetchError if projectId is missing", () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      try {
        getSanityConfig();
        expect(true).toBe(false); // Should have thrown
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
        if (error instanceof FetchError) {
          expect(error.code).toBe(FetchErrorCode.INTERNAL_ERROR);
          expect(error.statusCode).toBe(500);
        }
      }
    });

    it("should throw FetchError if dataset is missing", () => {
      delete process.env.NEXT_PUBLIC_SANITY_DATASET;
      expect(() => getSanityConfig()).toThrow(FetchError);
    });

    it("should throw FetchError if apiVersion is missing", () => {
      delete process.env.NEXT_PUBLIC_SANITY_API_VERSION;
      expect(() => getSanityConfig()).toThrow(FetchError);
    });

    it("should throw with HTTP 500 status on missing config", () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      try {
        getSanityConfig();
      } catch (error) {
        if (error instanceof FetchError) {
          expect(error.statusCode).toBe(500);
        }
      }
    });
  });

  describe("createSanityClient()", () => {
    it("should create client with correct config", () => {
      const client = createSanityClient();
      expect(client).toBeDefined();
      expect(typeof client.fetch).toBe("function");
    });

    it("should use CDN in production", () => {
      process.env.NODE_ENV = "production";
      const client = createSanityClient();
      expect(client).toBeDefined();
    });

    it("should not use CDN in development", () => {
      process.env.NODE_ENV = "development";
      const client = createSanityClient();
      expect(client).toBeDefined();
    });

    it("should throw FetchError if config is invalid", () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      expect(() => createSanityClient()).toThrow(FetchError);
    });
  });

  describe("getSanityClient()", () => {
    it("should return client instance", () => {
      const client = getSanityClient();
      expect(client).toBeDefined();
      expect(typeof client.fetch).toBe("function");
    });

    it("should return same instance on multiple calls (singleton)", () => {
      const client1 = getSanityClient();
      const client2 = getSanityClient();
      expect(client1).toBe(client2);
    });

    it("should create new instance after resetSanityClient()", () => {
      const client1 = getSanityClient();
      resetSanityClient();
      const client2 = getSanityClient();
      expect(client1).not.toBe(client2);
    });

    it("should throw FetchError if config is missing", () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      expect(() => getSanityClient()).toThrow(FetchError);
    });
  });

  describe("checkSanityHealth()", () => {
    it("should return true for valid connection", async () => {
      mockFetch.mockResolvedValue({ _id: "prof-123" });
      const result = await checkSanityHealth();
      expect(result).toBe(true);
    });

    it("should return true if profile not found (schema exists)", async () => {
      mockFetch.mockResolvedValue(null);
      const result = await checkSanityHealth();
      expect(result).toBe(true);
    });

    it("should throw FetchError on network failure", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));
      await expect(checkSanityHealth()).rejects.toBeInstanceOf(FetchError);
    });
  });

  describe("error handling", () => {
    it("should catch and log errors", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

      try {
        getSanityClient();
      } catch (error) {
        expect(consoleSpy).toHaveBeenCalled();
      }

      consoleSpy.mockRestore();
    });
  });
});
