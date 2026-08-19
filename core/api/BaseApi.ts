import { APIRequestContext } from "@playwright/test";
import { ReadStream } from "fs";

export type MultipartValue = string | number | boolean | ReadStream | { name: string; mimeType: string; buffer: Buffer };

export class BaseAPI {
    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    protected authHeaders(token?: string) {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    protected async get(path: string, token?: string) {
        return await this.request.get(path, {
            headers: this.authHeaders(token),
        });
    }

    protected async post(path: string, body?: unknown, token?: string) {
        return await this.request.post(path, {
            headers: this.authHeaders(token),
            data: body ?? undefined   
        });
    }

    protected async put(path: string, body?: unknown, token?: string) {
        return await this.request.put(path, {
            headers: this.authHeaders(token),
            data: body ?? undefined
        });
    }

    protected async patch(path: string, body?: unknown, token?: string) {
        return await this.request.patch(path, {
            headers: this.authHeaders(token),
            data: body ?? undefined
        });
    }

    protected async patchMultipart(path: string, multipart: Record<string, MultipartValue>, token?: string) {
        const headers: Record<string, string> = {}; const formData = new FormData();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return await this.request.patch(path, {
            headers,
            multipart,
        });
    }

    protected async delete(path: string, body?: unknown, token?: string) {
        return await this.request.delete(path, {
            headers: this.authHeaders(token),
            data: body ?? undefined  
        });
    }
}
