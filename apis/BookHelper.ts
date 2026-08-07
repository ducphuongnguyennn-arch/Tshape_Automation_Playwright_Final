import { BaseAPI } from "../core/api/BaseApi";

export class BookHelper extends BaseAPI {

  async addBook(userId: string, isbn: string, token: string) {
    const body = {
      userId,
      collectionOfIsbns: [{ isbn }],
    };

    return await this.post("/BookStore/v1/Books", body, token);
  }

  async deleteBook(userId: string, isbn: string, token: string) {
    const body = { userId, isbn };

    return await this.delete("/BookStore/v1/Book", body, token);
  }

  async deleteAllBooksSafely(userId: string, token: string) {
    
     return await this.delete(`/BookStore/v1/Books?UserId=${userId}`, undefined, token);
  }
}
