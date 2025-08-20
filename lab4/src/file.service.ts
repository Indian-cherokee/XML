import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileAccessor {
  filePath: string;
}

@Injectable()
export class FileService<T> {
  private readonly filePath: string;

  constructor(filePath: string) {
    // Путь относительно src/assets
    this.filePath = path.join(__dirname, '..', 'src', 'assets', filePath);
  }

  public read(): T {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  public add(newData: any): void {
    const data = this.read();
    if (Array.isArray(data)) {
      (data as any[]).push(newData);
    }
    this.write(data);
  }

  public write(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}