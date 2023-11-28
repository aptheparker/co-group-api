const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

/**
 * @swagger
 *  /:userId:
 *    get:
 *      summary: 사용자 정보 조회
 *      tags:
 *      - user
 *      description: 사용자 정보 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: param
 *          name: userId
 *          required: true
 *          schema:
 *            type: string
 *            description: 유저 아이디
 *      responses:
 *       200:
 *        description: 사용자 정보 조회 성공
 */
router.get("/", UserController.getUser);

/**
 * @swagger
 *  /:userId:
 *    put:
 *      summary: 사용자 정보 수정
 *      tags:
 *      - user
 *      description: 사용자 정보 수정
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: param
 *          name: userId
 *          required: true
 *        - in: body
 *          name: name
 *          required: false
 *          schema:
 *            type: string
 *            description: 유저 이름
 *      responses:
 *       200:
 *        description: 사용자 정보 수정 성공
 */

router.put("/", UserController.updateUser);

module.exports = router;
