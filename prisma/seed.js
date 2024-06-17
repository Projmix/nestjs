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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const firstNames = ["John", "Jane", "Alice", "Bob"];
const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
const genders = ["Male", "Female"];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 1000; i++) {
            yield prisma.user.create({
                data: {
                    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
                    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
                    age: Math.floor(Math.random() * 60) + 18,
                    gender: genders[Math.floor(Math.random() * genders.length)],
                    problems: Math.random() < 0.5,
                },
            });
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
