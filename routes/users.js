const express = require("express");
const router = express.Router();

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email: "johnwick@gamil.com",
        DOB: "22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email: "johnsmith@gamil.com",
        DOB: "21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email: "joyalwhite@gamil.com",
        DOB: "21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
    res.send(users); // This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
    email = req.params.email;
    user = users.find(user => user.email === email);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send("User not found");
    }
});

// POST request: Create a new user
router.post("/", (req, res) => {
    const newUser = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        DOB: req.query.DOB,
    };

    try {
        if (
            !newUser.firstName ||
            !newUser.lastName ||
            !newUser.email ||
            !newUser.DOB
        ) {
            throw new Error("All fields are required");
        }

        if (users.find(user => user.email === newUser.email)) {
            throw new Error("User already exists");
        }

        users.push(newUser);
        res.send(`User: ${newUser.firstName} added successfully`);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;

    let filtered_users = users.filter(user => user.email === email);

    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.query.DOB;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;

        if (DOB) {
            filtered_user.DOB = DOB;
        }

        if (firstName) {
            filtered_user.firstName = firstName;
        }

        if (lastName) {
            filtered_user.lastName = lastName;
        }

        users = users.filter(user => user.email != email);
        users.push(filtered_user);

        res.send(`User with the email: ${email} has successfully updated their DOB`);
    } else {
        res.status(404).send("User not found");
    }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    res.send("Yet to be implemented"); // This line is to be replaced with actual return value
});

module.exports = router;
