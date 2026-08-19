import { BaseAPI } from "../core/api/BaseApi";

export class UpdateUser extends BaseAPI {

  async updateProfile(multipart: any, token: string) {
    return await this.patchMultipart("/api/profile", multipart, token);
  }
}
