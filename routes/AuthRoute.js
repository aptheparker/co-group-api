const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

/**
 * @swagger
 *  /auth/sign-up:
 *    post:
 *      tags:
 *      - Auth
 *      description: 로그인
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          description: 로그인 정보
 *          schema:
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
