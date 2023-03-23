const Sequelize = require("sequelize");
const eventRepository = require("../../../repositories/eventRepository");
const Models = require("../../../models/index");

const { Op } = Sequelize;

const EventRowsArray = [
    {
        id: 335,
        name: "Super Commander Leviathan - 10th Edition, Jan 29, Brazil, Teresina",
        location: "Brazil/Teresina",
        date: "2023-01-29",
        numberOfPlayers: "20",
        url: "https://leviathancommander.wixsite.com/home/post/super-commander-leviathan-10th-edition-jan-29-brazil-teresina",
        createdAt: "2023-02-10T03:19:44.044Z",
        updatedAt: "2023-02-10T03:19:44.044Z",
        decks: [
            {
                id: 3483,
                eventId: 335,
                commander: "Cultist//Wilson",
                decklist:
                    "https://www.moxfield.com/decks/wmXbZqrxS0-_WBWS5SL1xQ",
                position: "20",
                createdAt: "2023-02-10T03:19:44.119Z",
                updatedAt: "2023-02-10T03:19:44.119Z",
            },
            {
                id: 3464,
                eventId: 335,
                commander: "Niv-Mizzet Reborn",
                decklist:
                    "https://www.moxfield.com/decks/Nqp2getQX0eT-ijJ_uFAZw",
                position: "1",
                createdAt: "2023-02-10T03:19:44.085Z",
                updatedAt: "2023-02-10T03:19:44.085Z",
            },
            {
                id: 3465,
                eventId: 335,
                commander: "Jeska//Krark",
                decklist:
                    "https://www.moxfield.com/decks/S9kddwDsoUmlB62lSyJ7zg",
                position: "2",
                createdAt: "2023-02-10T03:19:44.087Z",
                updatedAt: "2023-02-10T03:19:44.087Z",
            },
            {
                id: 3466,
                eventId: 335,
                commander: "Keleth//Yoshimaru",
                decklist:
                    "https://www.moxfield.com/decks/87mJgRU2CUq6vIg3Fe-4ow",
                position: "3",
                createdAt: "2023-02-10T03:19:44.088Z",
                updatedAt: "2023-02-10T03:19:44.088Z",
            },
            {
                id: 3467,
                eventId: 335,
                commander: "Grist, the Hunger Tide",
                decklist:
                    "https://www.moxfield.com/decks/xEmHFE5SxkK_Jlp9S39kLw",
                position: "4",
                createdAt: "2023-02-10T03:19:44.090Z",
                updatedAt: "2023-02-10T03:19:44.090Z",
            },
            {
                id: 3468,
                eventId: 335,
                commander: "Minsc & Boo, Timeless Heroes",
                decklist:
                    "https://www.moxfield.com/decks/94TMJPnx1kqoSXPtom-Wuw",
                position: "5",
                createdAt: "2023-02-10T03:19:44.092Z",
                updatedAt: "2023-02-10T03:19:44.092Z",
            },
            {
                id: 3469,
                eventId: 335,
                commander: "Tivit, Seller of Secrets",
                decklist:
                    "https://www.moxfield.com/decks/q1NyYRBADUWhwhTHvxLTaA",
                position: "6",
                createdAt: "2023-02-10T03:19:44.094Z",
                updatedAt: "2023-02-10T03:19:44.094Z",
            },
            {
                id: 3470,
                eventId: 335,
                commander: "Aminatou, the Fateshifter",
                decklist:
                    "https://www.moxfield.com/decks/wXYlLzoBtUWupyw06VUeTA",
                position: "7",
                createdAt: "2023-02-10T03:19:44.095Z",
                updatedAt: "2023-02-10T03:19:44.095Z",
            },
            {
                id: 3471,
                eventId: 335,
                commander: "Galazeth Prismari",
                decklist:
                    "https://www.moxfield.com/decks/UNzvOBGc0keQtV22hyryHw",
                position: "8",
                createdAt: "2023-02-10T03:19:44.097Z",
                updatedAt: "2023-02-10T03:19:44.097Z",
            },
            {
                id: 3472,
                eventId: 335,
                commander: "Leovold, Emissary of Trest",
                decklist:
                    "https://www.moxfield.com/decks/jke5l5yo1EGxMR8QrrEjPA",
                position: "9",
                createdAt: "2023-02-10T03:19:44.098Z",
                updatedAt: "2023-02-10T03:19:44.098Z",
            },
            {
                id: 3473,
                eventId: 335,
                commander: "Sythis, Harvest's Hand",
                decklist:
                    "https://www.moxfield.com/decks/fvKdncpQtkeJrbBnyXR17w",
                position: "10",
                createdAt: "2023-02-10T03:19:44.100Z",
                updatedAt: "2023-02-10T03:19:44.100Z",
            },
            {
                id: 3474,
                eventId: 335,
                commander: "Esior//Jeska",
                decklist:
                    "https://www.moxfield.com/decks/kYPtGf5j2keatVOUN3JsvQ",
                position: "11",
                createdAt: "2023-02-10T03:19:44.102Z",
                updatedAt: "2023-02-10T03:19:44.102Z",
            },
            {
                id: 3475,
                eventId: 335,
                commander: "Kura, the Boundless Sky",
                decklist:
                    "https://www.moxfield.com/decks/ajjjVskQgEmH60kd11lW6w",
                position: "12",
                createdAt: "2023-02-10T03:19:44.103Z",
                updatedAt: "2023-02-10T03:19:44.103Z",
            },
            {
                id: 3476,
                eventId: 335,
                commander: "Arahbo, Roar of the World",
                decklist:
                    "https://www.moxfield.com/decks/iFVpdjEmfkmTLMD2Sm8Wzg",
                position: "13",
                createdAt: "2023-02-10T03:19:44.105Z",
                updatedAt: "2023-02-10T03:19:44.105Z",
            },
            {
                id: 3477,
                eventId: 335,
                commander: "Minsc & Boo, Timeless Heroes",
                decklist:
                    "https://www.moxfield.com/decks/CbRP8G1uJ02ORmqlAj3shg",
                position: "14",
                createdAt: "2023-02-10T03:19:44.106Z",
                updatedAt: "2023-02-10T03:19:44.106Z",
            },
            {
                id: 3478,
                eventId: 335,
                commander: "Sythis, Harvest's Hand",
                decklist:
                    "https://www.moxfield.com/decks/XkReiXuxZkWYlulMQaNgtA",
                position: "15",
                createdAt: "2023-02-10T03:19:44.108Z",
                updatedAt: "2023-02-10T03:19:44.108Z",
            },
            {
                id: 3479,
                eventId: 335,
                commander: "Leovold, Emissary of Trest",
                decklist:
                    "https://www.moxfield.com/decks/hqx1geyr-EKjbufyX0Mgcg",
                position: "16",
                createdAt: "2023-02-10T03:19:44.110Z",
                updatedAt: "2023-02-10T03:19:44.110Z",
            },
            {
                id: 3480,
                eventId: 335,
                commander: "Soul of Windgrace",
                decklist:
                    "https://www.moxfield.com/decks/zU002x3IZUWIhHy4sMhFvw",
                position: "17",
                createdAt: "2023-02-10T03:19:44.111Z",
                updatedAt: "2023-02-10T03:19:44.111Z",
            },
            {
                id: 3481,
                eventId: 335,
                commander: "Soul of Windgrace",
                decklist:
                    "https://www.moxfield.com/decks/CZcGEhcZ_k6CY5KXI6_nLQ",
                position: "18",
                createdAt: "2023-02-10T03:19:44.113Z",
                updatedAt: "2023-02-10T03:19:44.113Z",
            },
            {
                id: 3482,
                eventId: 335,
                commander: "Urza, Chief Artificer",
                decklist:
                    "https://www.moxfield.com/decks/AqGSpNZOoUac3r6SPY2rFg",
                position: "19",
                createdAt: "2023-02-10T03:19:44.116Z",
                updatedAt: "2023-02-10T03:19:44.116Z",
            },
        ],
    },
    {
        id: 328,
        name: "Commander Leviathan, Jan 29, Brazil, Teresina",
        location: "Brazil/Teresina",
        date: "2023-01-29",
        numberOfPlayers: "10",
        url: "https://leviathancommander.wixsite.com/home/post/commander-leviathan-jan-29-brazil-teresina",
        createdAt: "2023-02-10T03:19:36.233Z",
        updatedAt: "2023-02-10T03:19:36.233Z",
        decks: [
            {
                id: 3408,
                eventId: 328,
                commander: "Niv-Mizzer Reborn",
                decklist: null,
                position: "7",
                createdAt: "2023-02-10T03:19:36.275Z",
                updatedAt: "2023-02-10T03:19:36.275Z",
            },
            {
                id: 3409,
                eventId: 328,
                commander: "Kroxa, Titan of Death's Hunger",
                decklist: null,
                position: "8",
                createdAt: "2023-02-10T03:19:36.276Z",
                updatedAt: "2023-02-10T03:19:36.276Z",
            },
            {
                id: 3410,
                eventId: 328,
                commander: "Hazoret the Fervent",
                decklist: null,
                position: "9",
                createdAt: "2023-02-10T03:19:36.277Z",
                updatedAt: "2023-02-10T03:19:36.277Z",
            },
            {
                id: 3411,
                eventId: 328,
                commander: "Archangel Avacyn",
                decklist: null,
                position: "10",
                createdAt: "2023-02-10T03:19:36.279Z",
                updatedAt: "2023-02-10T03:19:36.279Z",
            },
            {
                id: 3402,
                eventId: 328,
                commander: "Elminster ",
                decklist:
                    "https://www.moxfield.com/decks/aX93D6LF4ESzIsKiCFPSlA",
                position: "1",
                createdAt: "2023-02-10T03:19:36.267Z",
                updatedAt: "2023-02-10T03:19:36.267Z",
            },
            {
                id: 3403,
                eventId: 328,
                commander: "Urza, Chief Artificer",
                decklist: null,
                position: "2",
                createdAt: "2023-02-10T03:19:36.268Z",
                updatedAt: "2023-02-10T03:19:36.268Z",
            },
            {
                id: 3404,
                eventId: 328,
                commander: "Geist of Saint Traft",
                decklist: null,
                position: "3",
                createdAt: "2023-02-10T03:19:36.270Z",
                updatedAt: "2023-02-10T03:19:36.270Z",
            },
            {
                id: 3405,
                eventId: 328,
                commander: "Leovold, Emissary of Trest",
                decklist:
                    "https://www.moxfield.com/decks/jke5l5yo1EGxMR8QrrEjPA",
                position: "4",
                createdAt: "2023-02-10T03:19:36.271Z",
                updatedAt: "2023-02-10T03:19:36.271Z",
            },
            {
                id: 3406,
                eventId: 328,
                commander: "Queen Marchesa",
                decklist: null,
                position: "5",
                createdAt: "2023-02-10T03:19:36.272Z",
                updatedAt: "2023-02-10T03:19:36.272Z",
            },
            {
                id: 3407,
                eventId: 328,
                commander: "Cultist//Gut",
                decklist: null,
                position: "6",
                createdAt: "2023-02-10T03:19:36.273Z",
                updatedAt: "2023-02-10T03:19:36.273Z",
            },
        ],
    },
    {
        id: 319,
        name: "Commander Leviathan, Jan 22, Brazil, Fortaleza",
        location: "Brazil/Fortaleza",
        date: "2023-01-22",
        numberOfPlayers: "11",
        url: "https://leviathancommander.wixsite.com/home/post/commander-leviathan-jan-22-brazil-fortaleza",
        createdAt: "2023-02-03T17:01:27.113Z",
        updatedAt: "2023-02-03T17:01:27.113Z",
        decks: [
            {
                id: 3300,
                eventId: 319,
                commander: "Cultist //Gut",
                decklist: null,
                position: "2",
                createdAt: "2023-02-03T17:01:27.149Z",
                updatedAt: "2023-02-03T17:01:27.149Z",
            },
            {
                id: 3301,
                eventId: 319,
                commander: "Ragavan, Nimble Pilferer",
                decklist: null,
                position: "3",
                createdAt: "2023-02-03T17:01:27.150Z",
                updatedAt: "2023-02-03T17:01:27.150Z",
            },
            {
                id: 3302,
                eventId: 319,
                commander: "Aminatou, the Fateshifter",
                decklist: null,
                position: "4",
                createdAt: "2023-02-03T17:01:27.150Z",
                updatedAt: "2023-02-03T17:01:27.150Z",
            },
            {
                id: 3303,
                eventId: 319,
                commander: "Yusri, Fortune's Flame",
                decklist: null,
                position: "5",
                createdAt: "2023-02-03T17:01:27.151Z",
                updatedAt: "2023-02-03T17:01:27.151Z",
            },
            {
                id: 3304,
                eventId: 319,
                commander: "Grist, the Hunger Tide",
                decklist: null,
                position: "6",
                createdAt: "2023-02-03T17:01:27.152Z",
                updatedAt: "2023-02-03T17:01:27.152Z",
            },
            {
                id: 3305,
                eventId: 319,
                commander: "Rafiq of the Many",
                decklist: null,
                position: "7",
                createdAt: "2023-02-03T17:01:27.153Z",
                updatedAt: "2023-02-03T17:01:27.153Z",
            },
            {
                id: 3306,
                eventId: 319,
                commander: "Leovold, Emissary of Trest",
                decklist: null,
                position: "8",
                createdAt: "2023-02-03T17:01:27.154Z",
                updatedAt: "2023-02-03T17:01:27.154Z",
            },
            {
                id: 3307,
                eventId: 319,
                commander: "Galazeth Prismari",
                decklist: null,
                position: "9",
                createdAt: "2023-02-03T17:01:27.156Z",
                updatedAt: "2023-02-03T17:01:27.156Z",
            },
            {
                id: 3308,
                eventId: 319,
                commander: "Geist of Saint Traft",
                decklist: null,
                position: "10",
                createdAt: "2023-02-03T17:01:27.157Z",
                updatedAt: "2023-02-03T17:01:27.157Z",
            },
            {
                id: 3309,
                eventId: 319,
                commander: "Lazav, Dimir Mastermind",
                decklist: null,
                position: "11",
                createdAt: "2023-02-03T17:01:27.159Z",
                updatedAt: "2023-02-03T17:01:27.159Z",
            },
            {
                id: 3299,
                eventId: 319,
                commander: "Leovold, Emissary of Trest",
                decklist: null,
                position: "1",
                createdAt: "2023-02-03T17:01:27.148Z",
                updatedAt: "2023-02-03T17:01:27.148Z",
            },
        ],
    },
    {
        id: 318,
        name: "Commander Leviathan, Jan 15, Brazil, Parnaíba",
        location: "Brazil/Parnaíba",
        date: "2023-01-15",
        numberOfPlayers: "12",
        url: "https://leviathancommander.wixsite.com/home/post/commander-leviathan-jan-15-brazil-parnaíba",
        createdAt: "2023-02-03T17:01:26.145Z",
        updatedAt: "2023-02-03T17:01:26.145Z",
        decks: [
            {
                id: 3288,
                eventId: 318,
                commander: "Malcolm//Tevesh",
                decklist: null,
                position: "2",
                createdAt: "2023-02-03T17:01:26.183Z",
                updatedAt: "2023-02-03T17:01:26.183Z",
            },
            {
                id: 3287,
                eventId: 318,
                commander: "Omnath, Locus of Creation",
                decklist: null,
                position: "1",
                createdAt: "2023-02-03T17:01:26.178Z",
                updatedAt: "2023-02-03T17:01:26.178Z",
            },
            {
                id: 3289,
                eventId: 318,
                commander: "Leovold, Emissary of Trest",
                decklist: null,
                position: "3",
                createdAt: "2023-02-03T17:01:26.184Z",
                updatedAt: "2023-02-03T17:01:26.184Z",
            },
            {
                id: 3290,
                eventId: 318,
                commander: "Arahbo, Roar of the World",
                decklist: null,
                position: "4",
                createdAt: "2023-02-03T17:01:26.185Z",
                updatedAt: "2023-02-03T17:01:26.185Z",
            },
            {
                id: 3291,
                eventId: 318,
                commander: "Grist, the Hunger Tide",
                decklist: null,
                position: "5",
                createdAt: "2023-02-03T17:01:26.186Z",
                updatedAt: "2023-02-03T17:01:26.186Z",
            },
            {
                id: 3292,
                eventId: 318,
                commander: "Gut, True Soul Zealot",
                decklist: null,
                position: "6",
                createdAt: "2023-02-03T17:01:26.187Z",
                updatedAt: "2023-02-03T17:01:26.187Z",
            },
            {
                id: 3293,
                eventId: 318,
                commander: "Keranos, God of Storms",
                decklist: null,
                position: "7",
                createdAt: "2023-02-03T17:01:26.188Z",
                updatedAt: "2023-02-03T17:01:26.188Z",
            },
            {
                id: 3294,
                eventId: 318,
                commander: "Breya, Etherium Shaper",
                decklist: null,
                position: "8",
                createdAt: "2023-02-03T17:01:26.190Z",
                updatedAt: "2023-02-03T17:01:26.190Z",
            },
            {
                id: 3295,
                eventId: 318,
                commander: "Geist of Saint Traft",
                decklist: null,
                position: "9",
                createdAt: "2023-02-03T17:01:26.191Z",
                updatedAt: "2023-02-03T17:01:26.191Z",
            },
            {
                id: 3296,
                eventId: 318,
                commander: "Galazeth Prismari",
                decklist: null,
                position: "10",
                createdAt: "2023-02-03T17:01:26.192Z",
                updatedAt: "2023-02-03T17:01:26.192Z",
            },
            {
                id: 3297,
                eventId: 318,
                commander: "Momir",
                decklist: null,
                position: "11",
                createdAt: "2023-02-03T17:01:26.192Z",
                updatedAt: "2023-02-03T17:01:26.192Z",
            },
            {
                id: 3298,
                eventId: 318,
                commander: "Raff Capashen, Ship's Mage",
                decklist: null,
                position: "12",
                createdAt: "2023-02-03T17:01:26.194Z",
                updatedAt: "2023-02-03T17:01:26.194Z",
            },
        ],
    },
];
describe("getAllEventsPaginated", () => {
    const limit = 10;
    const skip = 0;

    it("returns the expected searching only for the location", async () => {
        const location = "teresina";
        const date = null;
        const initialDate = null;
        const finalDate = null;

        Models.Event.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [EventRowsArray[0], EventRowsArray[1]],
        });

        const result = await eventRepository.getAllEventsPaginated(
            limit,
            skip,
            location,
            date,
            initialDate,
            finalDate
        );

        expect(Models.Event.findAndCountAll).toHaveBeenCalledWith({
            where: {
                location: { [Op.iLike]: `%${location}%` },
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        expect(result).toEqual({
            count: 2,
            rows: [EventRowsArray[0], EventRowsArray[1]],
        });
    });
    it("returns the expected searching only for the date", async () => {
        const location = null;
        const date = "2023";
        const initialDate = null;
        const finalDate = null;

        Models.Event.findAndCountAll = jest.fn().mockReturnValue({
            count: 4,
            rows: EventRowsArray,
        });

        const result = await eventRepository.getAllEventsPaginated(
            limit,
            skip,
            location,
            date,
            initialDate,
            finalDate
        );

        expect(Models.Event.findAndCountAll).toHaveBeenCalledWith({
            where: {
                date: { [Op.iLike]: `%${date}%` },
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        expect(result).toEqual({
            count: 4,
            rows: EventRowsArray,
        });
    });
    it("returns the expected searching only for the interval", async () => {
        const location = null;
        const date = null;
        const initialDate = "2023-1-1";
        const finalDate = "2023-1-20";

        Models.Event.findAndCountAll = jest.fn().mockReturnValue({
            count: 1,
            rows: EventRowsArray[3],
        });

        const result = await eventRepository.getAllEventsPaginated(
            limit,
            skip,
            location,
            date,
            initialDate,
            finalDate
        );

        expect(Models.Event.findAndCountAll).toHaveBeenCalledWith({
            where: {
                date: { [Op.between]: [initialDate, finalDate] },
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        expect(result).toEqual({
            count: 1,
            rows: EventRowsArray[3],
        });
    });
    it("returns the expected searching only for location and the interval", async () => {
        const location = "Parnaíba";
        const date = null;
        const initialDate = "2023-1-1";
        const finalDate = "2023-1-20";

        Models.Event.findAndCountAll = jest.fn().mockReturnValue({
            count: 1,
            rows: EventRowsArray[3],
        });

        const result = await eventRepository.getAllEventsPaginated(
            limit,
            skip,
            location,
            date,
            initialDate,
            finalDate
        );

        expect(Models.Event.findAndCountAll).toHaveBeenCalledWith({
            where: {
                location: { [Op.iLike]: `%${location}%` },
                date: { [Op.between]: [initialDate, finalDate] },
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        expect(result).toEqual({
            count: 1,
            rows: EventRowsArray[3],
        });
    });
    it("returns the expected searching only for location and date", async () => {
        const location = "Teresina";
        const date = "2023";
        const initialDate = null;
        const finalDate = null;

        Models.Event.findAndCountAll = jest.fn().mockReturnValue({
            count: 2,
            rows: [EventRowsArray[0], EventRowsArray[1]],
        });

        const result = await eventRepository.getAllEventsPaginated(
            limit,
            skip,
            location,
            date,
            initialDate,
            finalDate
        );

        expect(Models.Event.findAndCountAll).toHaveBeenCalledWith({
            where: {
                location: { [Op.iLike]: `%${location}%` },
                date: { [Op.iLike]: `%${date}%` },
            },
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        expect(result).toEqual({
            count: 2,
            rows: [EventRowsArray[0], EventRowsArray[1]],
        });
    });
    it("returns the expected searching with no parameters", async () => {
        const location = null;
        const date = null;
        const initialDate = null;
        const finalDate = null;

        Models.Event.findAndCountAll = jest.fn().mockReturnValue({
            count: 4,
            rows: EventRowsArray,
        });

        const result = await eventRepository.getAllEventsPaginated(
            limit,
            skip,
            location,
            date,
            initialDate,
            finalDate
        );

        expect(Models.Event.findAndCountAll).toHaveBeenCalledWith({
            include: ["decks"],
            limit,
            offset: skip,
            distinct: true,
            order: [["date", "DESC"]],
        });
        expect(result).toEqual({
            count: 4,
            rows: EventRowsArray,
        });
    });
});
