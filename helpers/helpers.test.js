const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");
const { sqlForPartialUpdate } = require("./sql");

describe("createToken", function () {
    test("works: not admin", function () {
        const token = createToken({ username: "test", is_admin: false });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });

    test("works: admin", function () {
        const token = createToken({ username: "test", isAdmin: true });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: true,
        });
    });

    test("works: default no admin", function () {
        // given the security risk if this didn't work, checking this specifically
        const token = createToken({ username: "test" });
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
        });
    });
});

describe("sqlForPartialUpdate", function () {
    test("Converts JS object to SQL params", () => {
        const dataToUpdate = { firstName: "Bob", age: 32 };
        const jsToSql = { firstName: "first_name" };
        const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

        expect(result).toEqual({
            setCols: '"first_name"=$1, "age"=$2',
            values: ["Bob", 32],
        });
    });
});
