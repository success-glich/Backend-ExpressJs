import { mockRequest, mockResponse } from "../../__mocks__";
import UserController from "../../controllers/users.controller";

describe("getUsers", () => {
  it("should return a an array of users", () => {
    UserController.getUsers(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });
});
