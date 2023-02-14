const Sequelize = require("sequelize");
const eventRepository = require("../../../repositories/eventRepository");
const Models = require("../../../models/index");

const { Op } = Sequelize;
describe("getCommanderPaginated", () => {
    const limit = 10;
    const skip = 0;
    const location = null;
    const date = null;
    const initialDate = null;
    const finalDate = null;
    it("returns the expected searching only for the commander name", async () => {
        Models.Deck.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [{ id: 1 }, { id: 2 }],
        });
        const result = await eventRepository.getCommanderPaginated(
            limit,
            skip,
            location,
            date,
            "Ragavan",
            initialDate,
            finalDate
        );
        expect(Models.Deck.findAndCountAll).toHaveBeenCalledWith({
            where: {
                commander: { [Op.iLike]: `%Ragavan%` },
            },
            include: ["event"],
            limit: 10,
            offset: 0,
            distinct: true,
            order: [["id", "DESC"]],
        });
        expect(result).toEqual({ count: 2, rows: [{ id: 1 }, { id: 2 }] });
    });
    it("returns the expected searching only for the commander name and location", async () => {
        const locationParam = "teresina";
        Models.Deck.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [{ id: 1 }, { id: 2 }],
        });
        const result = await eventRepository.getCommanderPaginated(
            limit,
            skip,
            locationParam,
            date,
            "Ragavan",
            initialDate,
            finalDate
        );
        expect(Models.Deck.findAndCountAll).toHaveBeenCalledWith({
            where: {
                commander: { [Op.iLike]: `%Ragavan%` },
                "$event.location$": { [Op.iLike]: `%${locationParam}%` },
            },
            include: ["event"],
            limit: 10,
            offset: 0,
            distinct: true,
            order: [["id", "DESC"]],
        });
        expect(result).toEqual({ count: 2, rows: [{ id: 1 }, { id: 2 }] });
    });
    it("returns the expected searching only for the commander name and date", async () => {
        const dateParam = "2023";
        Models.Deck.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [{ id: 1 }, { id: 2 }],
        });
        const result = await eventRepository.getCommanderPaginated(
            limit,
            skip,
            location,
            dateParam,
            "Ragavan",
            initialDate,
            finalDate
        );
        expect(Models.Deck.findAndCountAll).toHaveBeenCalledWith({
            where: {
                commander: { [Op.iLike]: `%Ragavan%` },
                "$event.date$": { [Op.iLike]: `%${dateParam}%` },
            },
            include: ["event"],
            limit: 10,
            offset: 0,
            distinct: true,
            order: [["id", "DESC"]],
        });
        expect(result).toEqual({ count: 2, rows: [{ id: 1 }, { id: 2 }] });
    });
    it("returns the expected searching only for the commander name and interval", async () => {
        const initialDateParams = "2023-1-1";
        const finalDateParams = "2023-1-3";

        Models.Deck.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [{ id: 1 }, { id: 2 }],
        });
        const result = await eventRepository.getCommanderPaginated(
            limit,
            skip,
            location,
            date,
            "Ragavan",
            initialDateParams,
            finalDateParams
        );
        expect(Models.Deck.findAndCountAll).toHaveBeenCalledWith({
            where: {
                commander: { [Op.iLike]: `%Ragavan%` },
                "$event.date$": {
                    [Op.between]: [initialDateParams, finalDateParams],
                },
            },
            include: ["event"],
            limit: 10,
            offset: 0,
            distinct: true,
            order: [["id", "DESC"]],
        });
        expect(result).toEqual({ count: 2, rows: [{ id: 1 }, { id: 2 }] });
    });
    it("returns the expected searching for the commander name, location and date", async () => {
        const locationParam = "teresina";
        const dateParam = "2023";
        Models.Deck.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [{ id: 1 }, { id: 2 }],
        });
        const result = await eventRepository.getCommanderPaginated(
            limit,
            skip,
            locationParam,
            dateParam,
            "Ragavan",
            initialDate,
            finalDate
        );
        expect(Models.Deck.findAndCountAll).toHaveBeenCalledWith({
            where: {
                commander: { [Op.iLike]: `%Ragavan%` },
                "$event.location$": { [Op.iLike]: `%${locationParam}%` },
                "$event.date$": { [Op.iLike]: `%${dateParam}%` },
            },
            include: ["event"],
            limit: 10,
            offset: 0,
            distinct: true,
            order: [["id", "DESC"]],
        });
        expect(result).toEqual({ count: 2, rows: [{ id: 1 }, { id: 2 }] });
    });
    it("returns the expected searching for the commander name, location and interval", async () => {
        const locationParam = "teresina";
        const initialDateParams = "2023-1-1";
        const finalDateParams = "2023-1-3";

        Models.Deck.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [{ id: 1 }, { id: 2 }],
        });
        const result = await eventRepository.getCommanderPaginated(
            limit,
            skip,
            locationParam,
            date,
            "Ragavan",
            initialDateParams,
            finalDateParams
        );
        expect(Models.Deck.findAndCountAll).toHaveBeenCalledWith({
            where: {
                commander: { [Op.iLike]: `%Ragavan%` },
                "$event.location$": { [Op.iLike]: `%${locationParam}%` },
                "$event.date$": {
                    [Op.between]: [initialDateParams, finalDateParams],
                },
            },
            include: ["event"],
            limit: 10,
            offset: 0,
            distinct: true,
            order: [["id", "DESC"]],
        });
        expect(result).toEqual({ count: 2, rows: [{ id: 1 }, { id: 2 }] });
    });
});
