const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

/**
 * @swagger
 *  /:userId:
 *    post:
 *      summary: 로그인
 *      tags:
 *      - Auth
 *      description: 로그인
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: Body
 *          schema:
 *            type: string
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *       200:
 *        description: 로그인 성공
 */
router.post("sign-in", AuthController.signIn);

module.exports = router;
