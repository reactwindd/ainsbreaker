"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("./util");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});
router.get("/getid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, util_1.getID)();
    res.json(data);
}));
router.get("/getBook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, util_1.getBook)();
    res.json(data);
}));
exports.default = router;
//# sourceMappingURL=route.js.map