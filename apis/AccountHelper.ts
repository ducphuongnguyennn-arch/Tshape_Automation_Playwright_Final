import { BaseAPI } from "../core/api/BaseApi";

export class AccountHelper extends BaseAPI {

  async generateToken(username: string, password: string): Promise<string> {
    const body = { userName: username, password };

    const response = await this.post("/Account/v1/GenerateToken", body);
    const json = await response.json();
    return json.token;
  }
}
