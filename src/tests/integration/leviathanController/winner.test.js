/* eslint-disable global-require */
describe("GET /winners", () => {
    const endpoint = "/api/v1/leviathan/list/winner";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("returns a paginated table with winners with no params", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith({}, 10, 0);
    });

    test("returns a paginated table with winners when adding page and size", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}?page=2&size=5`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: "2",
                size: "5",
                numberOfPages: 2,
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith(
            { page: "2", size: "5" },
            5,
            5
        );
    });

    test("returns a paginated table with winners when adding location", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
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
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina" },
            10,
            0
        );
    });

    test("returns a paginated table with winners when adding date", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}?date=2023`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith(
            { date: "2023" },
            10,
            0
        );
    });

    test("returns a paginated table with winners when adding date interval", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
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
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith(
            { initialDate: "2023", finalDate: "2024" },
            10,
            0
        );
    });

    test("returns a paginated table with winners when adding location and date interval", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
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
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina", initialDate: "2023", finalDate: "2024" },
            10,
            0
        );
    });

    test("returns a paginated table with winners when adding location and date", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        jest.mock("../../../services/winnerFilterService", () => ({
            execute: jest.fn(),
        }));

        await winnerFilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "winner 1" },
                { id: 2, name: "winner 2" },
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
                winners: [
                    { id: 1, name: "winner 1" },
                    { id: 2, name: "winner 2" },
                ],
            },
        });

        expect(winnerFilterService.execute).toHaveBeenCalledTimes(1);

        expect(winnerFilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina", date: "2023" },
            10,
            0
        );
    });

    test("returns a 500 error when an error occurs", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const winnerFilterService = require("../../../services/winnerFilterService");

        await winnerFilterService.execute.mockRejectedValue(
            new Error("Something went wrong")
        );

        const response = await request(app).get(`${endpoint}`);

        expect(response.status).toBe(500);

        expect(response.body).toEqual({ message: "Something went wrong" });
    });
});
