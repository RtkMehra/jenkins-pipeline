import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsNotEmpty({ message: 'Tagline is required' })
  readonly tagline: string;

  @IsNotEmpty({ message: 'Body is required' })
  readonly body: string;

  @IsBoolean()
  readonly pinned?: boolean;
}
