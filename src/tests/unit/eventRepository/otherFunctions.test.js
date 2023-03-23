const Models = require("../../../models/index");
const eventRepository = require("../../../repositories/eventRepository");

jest.mock("../../../models/index");

describe("findAll", () => {
    it("returns all events", async () => {
        Models.Event.findAll = jest
            .fn()
            .mockReturnValue([{ id: 1 }, { id: 2 }]);
        const result = await eventRepository.findAll();
        expect(Models.Event.findAll).toHaveBeenCalled();
        expect(result).toMatchObject([{ id: 1 }, { id: 2 }]);
    });
});
