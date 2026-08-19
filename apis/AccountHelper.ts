import { BaseAPI } from "../core/api/BaseApi";

export class AccountHelper extends BaseAPI {

  async generateToken(username: string, password: string): Promise<string> {
    const body = { username, password };

    const response = await this.post("/api/auth/login", body);
    const json = await response.json();
    return json.token;
  }
}
