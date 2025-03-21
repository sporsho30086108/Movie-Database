const bcrypt = require('bcryptjs');
const assert = require('assert');

// Function to hash a password
const hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

describe("Password Hashing Function", () => {
    it("should correctly hash a password", () => {
        const password = "securepassword";
        const hash = hashPassword(password);
        
        // Check that the hash matches the original password
        const isMatch = bcrypt.compareSync(password, hash);
        assert.strictEqual(isMatch, true);
    });
});
