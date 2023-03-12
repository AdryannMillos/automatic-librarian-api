/* eslint-disable global-require */
describe("GET /top4", () => {
    const endpoint = "/api/v1/leviathan/list/top4";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("returns a paginated table with top4 with no params", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith({}, 10, 0);
    });

    test("returns a paginated table with top4 when adding page and size", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}?page=2&size=5`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: "2",
                size: "5",
                numberOfPages: 2,
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith(
            { page: "2", size: "5" },
            5,
            5
        );
    });

    test("returns a paginated table with top4 when adding location", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
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
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina" },
            10,
            0
        );
    });

    test("returns a paginated table with top4 when adding date", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
            ],
        });

        const response = await request(app).get(`${endpoint}?date=2023`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            paginatedTable: {
                actualPage: 1,
                size: 10,
                numberOfPages: 1,
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith(
            { date: "2023" },
            10,
            0
        );
    });

    test("returns a paginated table with top4 when adding date interval", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
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
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith(
            { initialDate: "2023", finalDate: "2024" },
            10,
            0
        );
    });

    test("returns a paginated table with top4 when adding location and date interval", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
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
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina", initialDate: "2023", finalDate: "2024" },
            10,
            0
        );
    });

    test("returns a paginated table with top4 when adding location and date", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        jest.mock("../../../services/top4FilterService", () => ({
            execute: jest.fn(),
        }));

        await top4FilterService.execute.mockResolvedValue({
            count: 10,
            rows: [
                { id: 1, name: "top4 1" },
                { id: 2, name: "top4 2" },
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
                top4: [
                    { id: 1, name: "top4 1" },
                    { id: 2, name: "top4 2" },
                ],
            },
        });

        expect(top4FilterService.execute).toHaveBeenCalledTimes(1);

        expect(top4FilterService.execute).toHaveBeenCalledWith(
            { location: "Teresina", date: "2023" },
            10,
            0
        );
    });

    test("returns a 500 error when an error occurs", async () => {
        const request = require("supertest");
        const app = require("../../../app");
        const top4FilterService = require("../../../services/top4FilterService");

        await top4FilterService.execute.mockRejectedValue(
            new Error("Something went wrong")
        );

        const response = await request(app).get(`${endpoint}`);

        expect(response.status).toBe(500);

        expect(response.body).toEqual({ message: "Something went wrong" });
    });
});
