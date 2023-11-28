const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

/**
 * @swagger
 *  /user/{userId}:
 *    get:
 *      tags:
 *      - User
 *      description: 사용자 정보 조회
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          type: integer
 *      responses:
 *       200:
 *        description: 사용자 정보 조회 성공
 */
router.get("/:userId", UserController.getUser);

/**
 * @swagger
 *  /user/{userId}:
 *    put:
 *      tags:
 *      - User
 *      description: 사용자 정보 수정
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          type: integer
 *        - in: body
 *          name: body
 *          required: false
 *          description: 수정할 사용자 정보
 *          schema:
 *            properties:
 *              name:
 *                type: string
 *              age:
 *                type: string
 *      responses:
 *       200:
 *        description: 사용자 정보 수정 성공
 */
router.put("/:userId", UserController.updateUser);

module.exports = router;
