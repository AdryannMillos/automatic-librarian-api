/* eslint-disable global-require */
describe("GET /played", () => {
    const endpoint = "/api/v1/leviathan/list/played";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("returns a paginated table with played with no params", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith({}, 10, 0);
    });

    test("returns a paginated table with played when adding page and size", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}?page=2&size=5`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: "2",
                size: "5",
                numberOfPages: 2,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith(
            { page: "2", size: "5" },
            5,
            5
        );
    });

    test("returns a paginated table with played when adding location", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(
            `${endpoint}?location=Teresina`
        );

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina" },
            10,
            0
        );
    });

    test("returns a paginated table with played when adding date", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}?date=2023`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith(
            { date: "2023" },
            10,
            0
        );
    });

    test("returns a paginated table with played when adding date interval", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(
            `${endpoint}?initialDate=2023&finalDate=2024`
        );

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith(
            { initialDate: "2023", finalDate: "2024" },
            10,
            0
        );
    });

    test("returns a paginated table with played when adding location and date interval", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(
            `${endpoint}?location=Teresina&initialDate=2023&finalDate=2024`
        );

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina", initialDate: "2023", finalDate: "2024" },
            10,
            0
        );
    });

    test("returns a paginated table with played when adding location and date", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        jest.mock("../../../services/playedFilterService", () => ({
            execute: jest.fn(),
        }));

        await playedFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "played 1" },
                { id: 2, name: "played 2" },
            ],
        });

        const response = await request(app).get(
            `${endpoint}?location=Teresina&date=2023`
        );

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                played: [
                    { id: 1, name: "played 1" },
                    { id: 2, name: "played 2" },
                ],
            },
        });

        expect(playedFilterService.execute).toHaveBeenCalledTimes(1);

        expect(playedFilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina", date: "2023" },
            10,
            0
        );
    });

    test("returns a 500 error when an error occurs", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const playedFilterService = require("../../../services/playedFilterService");

        await playedFilterService.execute.mockRejectedValue(
            new Error("Something went wrong")
        );

        const response = await request(app).get(`${endpoint}`);

        expect(response.status).toBe(500);

        expect(response.body).toEqual({ message: "Something went wrong" });
    });
});
